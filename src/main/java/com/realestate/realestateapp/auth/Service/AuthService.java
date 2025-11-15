package com.realestate.realestateapp.auth.Service;

import com.realestate.realestateapp.auth.Entity.Otp;
import com.realestate.realestateapp.auth.Repository.OtpRepository;
import com.realestate.realestateapp.auth.dto.*;
import com.realestate.realestateapp.shared.exception.CooldownException;
import com.realestate.realestateapp.shared.exception.ResourceNotFoundException;
import com.realestate.realestateapp.shared.service.EmailService;
import com.realestate.realestateapp.shared.service.JwtService; // <-- Import
import com.realestate.realestateapp.shared.util.OtpUtil;
import com.realestate.realestateapp.user.Entity.User;
import com.realestate.realestateapp.user.Repository.UserRepository;
import com.realestate.realestateapp.shared.exception.CooldownException;
import com.realestate.realestateapp.shared.exception.ResourceNotFoundException;
import java.time.Duration;

import lombok.RequiredArgsConstructor;
// Import these for registerUser
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    // This is our cooldown period in seconds
    private static final long OTP_COOLDOWN_SECONDS = 60;

    private final UserRepository userRepository;
    private final OtpRepository otpRepository;
    private final EmailService emailService;
    private final JwtService jwtService; // <-- INJECT THE SERVICE

    // --- sendOtp method stays exactly the same ---
    @Transactional
    public String sendOtp(String email) {
        otpRepository.deleteByEmail(email);
        String otpCode = OtpUtil.generateOtp();
        Otp otp = new Otp(email, otpCode, LocalDateTime.now().plusMinutes(10));
        otpRepository.save(otp);
        emailService.sendOtpEmail(email, otpCode);
        return userRepository.findByEmail(email).isPresent() ? "email_exists" : "new_email";
    }

    @Transactional
    public void resendOtp(EmailRequest request) {
        String email = request.getEmail();
        LocalDateTime now = LocalDateTime.now();

        // 1. Find the existing OTP request
        Otp otp = otpRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("No active OTP request found. Please start the login process again."));

        // 2. Check the cooldown period
        Duration timeSinceLastSend = Duration.between(otp.getLastSentAt(), now);
        
        if (timeSinceLastSend.getSeconds() < OTP_COOLDOWN_SECONDS) {
            long secondsToWait = OTP_COOLDOWN_SECONDS - timeSinceLastSend.getSeconds();
            throw new CooldownException("Please wait " + secondsToWait + " more seconds before resending.");
        }

        // 3. Cooldown has passed. Issue a new code.
        String newOtpCode = OtpUtil.generateOtp();
        
        // 4. Update the *existing* OTP object
        otp.setOtpCode(newOtpCode);
        otp.setExpiresAt(now.plusMinutes(10));
        otp.setLastSentAt(now);
        
        otpRepository.save(otp); // Save the updated record

        // 5. Send the new email
        emailService.sendOtpEmail(email, newOtpCode);
    }

    // --- verifyOtp is MODIFIED to return AuthResponse ---
    @Transactional
    public AuthResponse verifyOtp(VerifyOtpRequest request) {
        Otp otp = otpRepository.findByEmailAndOtpCode(request.getEmail(), request.getOtp())
                .orElseThrow(() -> new RuntimeException("Invalid or incorrect OTP."));

        if (otp.getExpiresAt().isBefore(LocalDateTime.now())) {
            otpRepository.delete(otp);
            throw new RuntimeException("OTP has expired.");
        }
        otpRepository.delete(otp);

        var userOptional = userRepository.findByEmail(request.getEmail());
        
        if (userOptional.isPresent()) {
            // User exists: Issue a long-lived LOGIN token (1 hour)
            User user = userOptional.get();
            String token = jwtService.generateToken(user);
            return new AuthResponse("login_successful", "Login Successful!", null, token);
        } else {
            // New user: Issue a short-lived REGISTRATION token (10 minutes)
            String token = jwtService.generateRegistrationToken(request.getEmail());
            return new AuthResponse("proceed_to_registration", "Please complete your registration.", null, token);
        }
    }

    // --- registerUser is MODIFIED to be secure ---
    public AuthResponse registerUser(RegisterRequest request) {
        // Get the email from the short-lived token, NOT the request body
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // This is the email from the token

        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("User with this email already exists.");
        }
        
        User newUser = new User();
        newUser.setEmail(email); // Set email from the authenticated token
        newUser.setFullName(request.getFullName());
        newUser.setPhone(request.getPhone());
        newUser.setRole(request.getRole());
        
        User savedUser = userRepository.save(newUser);
        
        // Success! Issue a long-lived LOGIN token (1 hour)
        String token = jwtService.generateToken(savedUser);
        return new AuthResponse("registration_successful", "User registered successfully.", savedUser, token);
    }
}