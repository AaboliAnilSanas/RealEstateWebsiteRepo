package com.realestate.realestateapp.SellProperty.controller;

import com.realestate.realestateapp.SellProperty.dto.PropertyListingDTO;
import com.realestate.realestateapp.SellProperty.entity.Property;
import com.realestate.realestateapp.SellProperty.service.PropertyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal; // <-- CHANGED: Import Principal
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/property") // <-- CHANGED: A more generic base path
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    // CHANGED: The endpoint is now just '/add'
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addProperty(
            // CHANGED: No @PathVariable, we use Principal
            @RequestBody PropertyListingDTO listingDTO,
            Principal principal 
    ) {

        // CHANGED: Get the user's email from the JWT token
        String userEmail = principal.getName(); 

        // Steps 3, 4, 5: Pass the user's email to the service
        Property savedProperty = propertyService.createProperty(listingDTO, userEmail);

        // Step 6: Return response
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Property added successfully");
        response.put("propertyId", savedProperty.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}