package com.realestate.realestateapp.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo") // Using /api/v1/ is good practice
public class DemoController {

    /**
     * This endpoint is automatically protected by your SecurityConfig
     * (.anyRequest().authenticated())
     */
    @GetMapping("/hello")
    public ResponseEntity<String> getHello(Authentication authentication) {
        // 'authentication.getName()' will be the user's email from the token
        String message = "Hello, " + authentication.getName() + "! You have access to this secure endpoint. 🔒";
        return ResponseEntity.ok(message);
    }
}