package com.realestate.realestateapp.contact.service;

import com.realestate.realestateapp.contact.dto.ContactRequestDTO;
import com.realestate.realestateapp.contact.entity.ContactLead;
import com.realestate.realestateapp.contact.repository.ContactRepository;
import com.realestate.realestateapp.shared.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;
    private final EmailService emailService;

    // Reads admin email from application.properties
    @Value("${app.admin.email}")
    private String adminEmail;

    public void saveLead(ContactRequestDTO request) {
        // 1. Save to Database 
        // (We do NOT set submittedAt here; @CreationTimestamp in the Entity handles it)
        ContactLead lead = ContactLead.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .message(request.getMessage())
                .userType(request.getUserType())
                .intent(request.getIntent())
                .build();

        contactRepository.save(lead);

        // 2. Get Current Time & Format it for the Email (e.g., "22-Nov-2025 08:38 PM")
        String formattedTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MMM-yyyy hh:mm a"));

        // 3. Prepare Email Body
        String subject = "New Lead: " + request.getName();
        String body = String.format("""
                New Real Estate Inquiry!
                Time: %s
                
                Name: %s
                Email: %s
                Phone: %s
                User Type: %s
                Intent: %s
                
                Message:
                %s
                """,
                formattedTime, // <--- Date displayed in email
                request.getName(),
                request.getEmail(),
                request.getPhone(),
                request.getUserType(),
                request.getIntent(),
                request.getMessage()
        );

        // 4. Send Email
        emailService.sendEmail(adminEmail, subject, body);
    }
}