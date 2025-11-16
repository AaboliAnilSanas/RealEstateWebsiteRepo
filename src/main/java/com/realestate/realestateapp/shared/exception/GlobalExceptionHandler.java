package com.realestate.realestateapp.shared.exception;

// --- Imports for Auth/Existing Exceptions ---
import com.realestate.realestateapp.auth.dto.AuthResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// --- Imports for Filter/New Validation Exception ---
import com.realestate.realestateapp.filter.dto.response.ErrorDTO;
import com.realestate.realestateapp.filter.dto.response.ErrorFieldDetailsDTO;
import com.realestate.realestateapp.filter.dto.response.ErrorResponseDTO;
import com.realestate.realestateapp.filter.dto.response.MetadataDTO;
import org.springframework.validation.FieldError; // <-- IMPORT THIS
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.Map;

@RestControllerAdvice // This catches exceptions from all @RestControllers
public class GlobalExceptionHandler {

    /**
     * Handles validation errors from @Valid, e.g., for the filter API.
     * Returns HTTP 400 Bad Request with the detailed ErrorResponseDTO.
     * --- THIS IS NOW NULL-SAFE ---
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleValidationExceptions(MethodArgumentNotValidException ex) {
        
        String field = "unknown.field";
        String issue = "Invalid input";

        // Null-safe check for fieldError
        FieldError fieldError = ex.getBindingResult().getFieldError();
        if (fieldError != null) {
            field = fieldError.getField();
            issue = fieldError.getDefaultMessage();
        }

        ErrorFieldDetailsDTO fieldDetails = ErrorFieldDetailsDTO.builder()
                .field(field)
                .issue(issue)
                .build();

        ErrorDTO error = ErrorDTO.builder()
                .code("VALIDATION_ERROR")
                .message("Invalid input provided")
                .details(fieldDetails)
                .build();

        MetadataDTO metadata = MetadataDTO.builder()
                .requestInfo(Map.of("search_query", "N/A on validation fail"))
                .build();

        ErrorResponseDTO errorResponse = ErrorResponseDTO.builder()
                .success(false)
                .error(error)
                .data(null)
                .metadata(metadata)
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

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
     * --- THIS IS NOW NULL-SAFE ---
     * Returns HTTP 400 Bad Request.
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<AuthResponse> handleRuntimeException(RuntimeException ex) {
        // Create a null-safe message
        String message = ex.getMessage() != null ? ex.getMessage() : "An unexpected error occurred. Check server logs.";
        
        // Also log the real error to your console
        ex.printStackTrace(); // <-- THIS IS KEY
        
        AuthResponse response = new AuthResponse("error_generic", message);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles NullPointerExceptions specifically.
     * --- THIS IS THE FINAL FIX ---
     * This will catch the NPE, log it, and return your error JSON.
     */
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<AuthResponse> handleNullPointerException(NullPointerException ex) {
        // Log the full stack trace so you can see *exactly* which line is null
        ex.printStackTrace(); 
        
        AuthResponse response = new AuthResponse("error_npe", "A null pointer exception occurred. Check server logs for details.");
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR); // Use 500 for NPEs
    }
}