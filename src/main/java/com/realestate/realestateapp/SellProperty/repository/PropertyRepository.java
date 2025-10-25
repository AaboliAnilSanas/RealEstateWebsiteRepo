package com.realestate.realestateapp.SellProperty.repository;

import com.realestate.realestateapp.SellProperty.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
}