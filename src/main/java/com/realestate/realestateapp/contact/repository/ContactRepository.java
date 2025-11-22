package com.realestate.realestateapp.contact.repository;

import com.realestate.realestateapp.contact.entity.ContactLead;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactLead, Long> {
}