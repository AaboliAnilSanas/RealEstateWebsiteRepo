package com.realestate.realestateapp.user.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
// Import these new classes
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User implements UserDetails { // <-- Implement UserDetails

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String fullName;
    
    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String role; // "BUYER" or "SELLER"

    private LocalDateTime createdAt = LocalDateTime.now();

    // --- ADD ALL THESE METHODS FOR UserDetails ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // We use the 'role' (e.g., "BUYER") as the user's authority
        return List.of(new SimpleGrantedAuthority(this.role));
    }

    @Override
    public String getPassword() {
        // We don't use passwords, so this can be null
        return null; 
    }

    @Override
    public String getUsername() {
        // We use the email as the unique "username"
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}