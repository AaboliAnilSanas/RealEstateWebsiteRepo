package com.realestate.realestateapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // 1. Set your frontend's URL.
        // (e.g., "http://localhost:3000" for React, "http://localhost:4200" for Angular)
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        
        // 2. Set the allowed HTTP methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // 3. Set the allowed headers (e.g., Authorization, Content-Type)
        configuration.setAllowedHeaders(Arrays.asList("*")); // Allows all headers
        
        // 4. Allow credentials (needed for sending tokens)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        
        // 5. Apply this configuration to all API paths
        source.registerCorsConfiguration("/api/**", configuration);
        
        return source;
    }
}