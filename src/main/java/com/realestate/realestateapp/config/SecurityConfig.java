package com.realestate.realestateapp.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // <-- IMPORT THIS
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.Customizer;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        // Your existing public auth rules
                        .requestMatchers(
                                "/api/auth/send-otp", 
                                "/api/auth/verify-otp",
                                "/api/auth/resend-otp")
                        .permitAll()
                        
                        // --- NEW RULE FOR PUBLIC FILTER API ---
                        .requestMatchers("/api/properties/search").permitAll()

                        // --- NEW RULE FOR PUBLIC "GET" (e.g., get by ID) ---
                        .requestMatchers(HttpMethod.GET, "/api/properties/**").permitAll()

                        // Your existing registration rule
                        .requestMatchers("/api/auth/register")
                        .hasAuthority("ROLE_PRE_REGISTRATION")
                        
                        // --- UPDATED RULE FOR SELLERS ---
                        // Secures endpoints like /api/property/add
                        .requestMatchers("/api/property/**")
                        .hasAuthority("ROLE_SELLER")
                        
                        // Your existing catch-all rule
                        .anyRequest()
                        .authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}