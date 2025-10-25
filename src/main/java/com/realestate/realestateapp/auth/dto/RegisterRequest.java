package com.realestate.realestateapp.auth.dto;

import lombok.Data;
@Data public class RegisterRequest {
    private String email;
    private String fullName;
    private String phone;
    private String role; // "BUYER" or "SELLER"
}