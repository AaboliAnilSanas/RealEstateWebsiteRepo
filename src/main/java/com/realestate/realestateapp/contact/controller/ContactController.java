package com.realestate.realestateapp.contact.controller;

import com.realestate.realestateapp.contact.dto.ContactRequestDTO;
import com.realestate.realestateapp.contact.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<?> submitContact(@RequestBody ContactRequestDTO request) {
        contactService.saveLead(request);
        
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Inquiry sent successfully."
        ));
    }
}