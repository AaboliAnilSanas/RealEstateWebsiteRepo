package com.realestate.realestateapp.SellProperty.controller;

import com.realestate.realestateapp.SellProperty.entity.Seller;
import com.realestate.realestateapp.SellProperty.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/sellers")
public class SellerController {

    @Autowired
    private SellerRepository sellerRepository;

    // Helper endpoint to create a seller
    @PostMapping
    public ResponseEntity<Seller> createSeller(@RequestBody Map<String, String> sellerData) {
        Seller seller = new Seller();
        seller.setName(sellerData.get("name"));
        seller.setEmail(sellerData.get("email"));
        seller.setPhone(sellerData.get("phone"));
        Seller savedSeller = sellerRepository.save(seller);
        return ResponseEntity.ok(savedSeller);
    }
}