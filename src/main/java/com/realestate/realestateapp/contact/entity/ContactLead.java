package com.realestate.realestateapp.contact.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp; // <--- NEW IMPORT

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "contact_leads")
public class ContactLead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    private String userType;
    private String intent;

    @CreationTimestamp // <--- ADD THIS. Hibernate fills this automatically.
    @Column(nullable = false, updatable = false)
    private LocalDateTime submittedAt;
}