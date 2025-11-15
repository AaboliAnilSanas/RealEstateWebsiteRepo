package com.realestate.realestateapp.shared.exception;

import com.realestate.realestateapp.auth.dto.AuthResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice // This catches exceptions from all @RestControllers
public class GlobalExceptionHandler {

    /**
     * Handles the "Please wait" cooldown error.
     * Returns HTTP 429 Too Many Requests.
     */
    @ExceptionHandler(CooldownException.class)
    public ResponseEntity<AuthResponse> handleCooldownException(CooldownException ex) {
        AuthResponse response = new AuthResponse("error_cooldown", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.TOO_MANY_REQUESTS);
    }

    /**
     * Handles errors for when an item (like an OTP request) isn't found.
     * Returns HTTP 404 Not Found.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<AuthResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
        AuthResponse response = new AuthResponse("error_not_found", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    /**
     * Handles all other generic runtime errors.
     * Returns HTTP 400 Bad Request.
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<AuthResponse> handleRuntimeException(RuntimeException ex) {
        AuthResponse response = new AuthResponse("error_generic", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}