package com.realestate.realestateapp.shared.exception;

// This custom exception will be caught to return a 429 Too Many Requests status
public class CooldownException extends RuntimeException {
    public CooldownException(String message) {
        super(message);
    }
}