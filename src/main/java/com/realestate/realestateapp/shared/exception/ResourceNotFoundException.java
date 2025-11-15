package com.realestate.realestateapp.shared.exception;

// A standard exception for when we can't find something
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}