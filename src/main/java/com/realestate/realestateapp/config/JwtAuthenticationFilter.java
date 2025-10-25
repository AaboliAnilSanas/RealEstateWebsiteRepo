package com.realestate.realestateapp.config;

import com.realestate.realestateapp.shared.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

// Import for dummy registration user
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.io.IOException;
import java.util.List;

@Component // This makes it a Spring bean
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService; // From ApplicationConfig

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        final String tokenType;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7); // Get token from "Bearer ..."
        userEmail = jwtService.extractUsername(jwt);
        
        // Proceed only if we have an email and the user is not already authenticated
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            try {
                tokenType = jwtService.extractTokenType(jwt);
            } catch (Exception e) {
                // Token is malformed or signature is bad
                filterChain.doFilter(request, response);
                return;
            }

            if ("login".equals(tokenType)) {
                // --- Handle LOGIN Token (1 hour) ---
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    setAuthentication(userDetails, request);
                }
            } else if ("registration".equals(tokenType)) {
                // --- Handle REGISTRATION Token (10 minutes) ---
                if (jwtService.isRegistrationTokenValid(jwt)) {
                    // Create a "dummy" user principal with a special authority
                    UserDetails dummyUser = new org.springframework.security.core.userdetails.User(
                            userEmail, 
                            "", // No password
                            List.of(new SimpleGrantedAuthority("ROLE_PRE_REGISTRATION"))
                    );
                    setAuthentication(dummyUser, request);
                }
            }
        }
        filterChain.doFilter(request, response);
    }

    // Helper method to set the authentication in Spring's context
    private void setAuthentication(UserDetails userDetails, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null, // We don't have credentials/passwords
                userDetails.getAuthorities()
        );
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }
}