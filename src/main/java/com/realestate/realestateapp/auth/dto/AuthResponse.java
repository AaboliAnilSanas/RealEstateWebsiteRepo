package com.realestate.realestateapp.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String status;
    private String message;
    private Object data;
    private String token; // <-- ADD THIS FIELD

    // Add a new constructor for simple responses (like send-otp)
    public AuthResponse(String status, String message) {
        this.status = status;
        this.message = message;
        this.token = null;
        this.data = null;
    }
}