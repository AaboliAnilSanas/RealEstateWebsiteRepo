package com.realestate.realestateapp.contact.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ContactRequestDTO {

    @JsonProperty("name")
    private String name;

    @JsonProperty("email")
    private String email;

    @JsonProperty("phone")
    private String phone;

    @JsonProperty("message")
    private String message;

    // Maps JSON "user_type" -> Java "userType"
    @JsonProperty("user_type")
    private String userType;

    // Maps JSON "intent" -> Java "intent"
    // (Redundant if names match, but kept for safety given your settings)
    @JsonProperty("intent")
    private String intent;
}