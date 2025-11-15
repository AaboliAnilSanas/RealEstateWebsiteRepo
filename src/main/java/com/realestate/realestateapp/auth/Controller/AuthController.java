package com.realestate.realestateapp.auth.Controller;

import com.realestate.realestateapp.auth.Service.AuthService;
import com.realestate.realestateapp.auth.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // --- sendOtp is MODIFIED (to use AuthResponse) ---
    @PostMapping("/send-otp")
    public ResponseEntity<AuthResponse> sendOtp(@RequestBody EmailRequest request) {
        try {
            String status = authService.sendOtp(request.getEmail());
            String message = status.equals("email_exists") ? "OTP sent. Welcome back!" : "OTP sent. Please verify to register.";
            // We use the simple AuthResponse constructor (no token)
            return ResponseEntity.ok(new AuthResponse(status, message));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse("error", e.getMessage()));
        }
    }

    // --- verifyOtp is MODIFIED ---
    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponse> verifyOtp(@RequestBody VerifyOtpRequest request) {
        try {
            // The service now returns the full AuthResponse (with token)
            AuthResponse response = authService.verifyOtp(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse("error", e.getMessage(), null, null));
        }
    }

    // --- register is MODIFIED ---
    // This endpoint is now SECURED. You can only call it with a valid registration token.
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.registerUser(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse("error", e.getMessage(), null, null));
        }
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<AuthResponse> resendOtp(@RequestBody EmailRequest request) {
        // 1. Call the service. No try/catch needed!
        authService.resendOtp(request);
        
        // 2. If it succeeds, send a 200 OK response.
        return ResponseEntity.ok(new AuthResponse("success", "A new OTP has been sent."));
    }
}