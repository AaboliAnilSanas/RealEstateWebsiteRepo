package com.realestate.realestateapp.auth.Repository; // <-- Updated package

import com.realestate.realestateapp.auth.Entity.Otp; // <-- Updated import
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    Optional<Otp> findByEmailAndOtpCode(String email, String otpCode);
    void deleteByEmail(String email);
}