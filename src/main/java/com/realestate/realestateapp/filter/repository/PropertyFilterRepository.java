package com.realestate.realestateapp.filter.repository;

import com.realestate.realestateapp.SellProperty.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyFilterRepository extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property> {
    
    long countByCity(String city);
}