package com.realestate.realestateapp.filter.controller;

import com.realestate.realestateapp.filter.dto.request.SearchRequestDTO;
import com.realestate.realestateapp.filter.service.PropertyFilterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyFilterController {

    private final PropertyFilterService propertyFilterService;

    @PostMapping("/search")
    public ResponseEntity<Object> searchProperties(
            @Valid @RequestBody SearchRequestDTO request,
            @RequestHeader(value = "If-None-Match", required = false) String ifNoneMatch) {
        
        return propertyFilterService.searchProperties(request, ifNoneMatch);
    }
}