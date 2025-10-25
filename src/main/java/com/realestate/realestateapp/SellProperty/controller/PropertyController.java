package com.realestate.realestateapp.SellProperty.controller;

import com.realestate.realestateapp.SellProperty.dto.PropertyListingDTO;
import com.realestate.realestateapp.SellProperty.entity.Property;
import com.realestate.realestateapp.SellProperty.service.PropertyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/seller")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    /**
     * Step 1: Define endpoint
     * Step 2: Accept data from frontend
     * Step 6: Return a response
     */
    @PostMapping("/{sellerId}/addProperty")
    public ResponseEntity<Map<String, Object>> addProperty(
            @PathVariable Long sellerId,
            @RequestBody PropertyListingDTO listingDTO) {

        // Steps 3, 4, 5 are handled by the service
        Property savedProperty = propertyService.createProperty(listingDTO, sellerId);

        // Step 6: Return response
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Property added successfully");
        response.put("propertyId", savedProperty.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}