package com.realestate.realestateapp.shared.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@yourrealestate.com"); // Set your 'from' address
        message.setTo(toEmail);
        message.setSubject("Your Real Estate App Login OTP");
        message.setText("Your OTP is: " + otp + "\nIt will expire in 10 minutes.");
        mailSender.send(message);
    }
}