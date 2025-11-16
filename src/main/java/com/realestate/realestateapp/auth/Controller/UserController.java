package com.realestate.realestateapp.auth.Controller;

import com.realestate.realestateapp.user.Entity.User;
import com.realestate.realestateapp.user.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal; 
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    /**
     * Retrieves the full name of the currently authenticated user based on the JWT token.
     * The JWT is automatically read by Spring Security via the Principal object.
     */
    @GetMapping("/me")
    public ResponseEntity<Map<String, String>> getCurrentUser(Principal principal) {
        String email = principal.getName();

        // Fetch user by email from the JWT principal
        User user = userRepository.findByEmail(email)
                .orElse(null); 

        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }

        // Return just the essential data
        Map<String, String> response = new HashMap<>();
        response.put("email", user.getEmail());
        response.put("fullName", user.getFullName());
        
        return ResponseEntity.ok(response);
    }
}