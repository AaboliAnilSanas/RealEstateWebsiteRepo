package com.realestate.realestateapp.SellProperty.repository;

import com.realestate.realestateapp.SellProperty.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    // Optional custom queries
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
}
