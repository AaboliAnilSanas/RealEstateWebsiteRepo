package com.realestate.realestateapp.filter.specification;

import com.realestate.realestateapp.SellProperty.entity.Property;
import com.realestate.realestateapp.filter.dto.request.FiltersDTO;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class PropertySpecification {

    public Specification<Property> build(FiltersDTO filters) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // --- Location Filters (ADDED NULL CHECK) ---
            if (filters.getLocation() != null) {
                if (isValid(filters.getLocation().getCity())) {
                    predicates.add(cb.equal(root.get("city"), filters.getLocation().getCity()));
                }
                if (isValid(filters.getLocation().getLocality())) {
                    predicates.add(root.get("locality").in(filters.getLocation().getLocality()));
                }
                if (isValid(filters.getLocation().getSubLocality())) {
                    predicates.add(root.get("subLocality").in(filters.getLocation().getSubLocality()));
                }
            }

            // --- Price Filters (ADDED NULL CHECK) ---
            if (filters.getPrice() != null) {
                if (filters.getPrice().getMin() != null) {
                    predicates.add(cb.greaterThanOrEqualTo(root.get("priceValue"),
                                   BigDecimal.valueOf(filters.getPrice().getMin())));
                }
                if (filters.getPrice().getMax() != null) {
                    predicates.add(cb.lessThanOrEqualTo(root.get("priceValue"),
                                   BigDecimal.valueOf(filters.getPrice().getMax())));
                }
            }

            // --- Property Filters (ADDED NULL CHECK) ---
            if (filters.getProperty() != null) {
                if (isValid(filters.getProperty().getType())) {
                    predicates.add(root.get("propertyType").in(filters.getProperty().getType()));
                }
                if (isValid(filters.getProperty().getBedrooms())) {
                    predicates.add(root.get("bedrooms").in(filters.getProperty().getBedrooms()));
                }
                if (isValid(filters.getProperty().getBathrooms())) {
                    predicates.add(root.get("bathrooms").in(filters.getProperty().getBathrooms()));
                }
                if (isValid(filters.getProperty().getParking())) {
                    predicates.add(root.get("parking").in(filters.getProperty().getParking()));
                }
                if (isValid(filters.getProperty().getPossession())) {
                    predicates.add(root.get("availabilityStatus").in(filters.getProperty().getPossession()));
                }

                // Area Filter (ADDED NULL CHECK)
                if (filters.getProperty().getArea() != null) {
                    if (filters.getProperty().getArea().getMin() != null) {
                        predicates.add(cb.greaterThanOrEqualTo(root.get("carpetAreaValue"),
                                       BigDecimal.valueOf(filters.getProperty().getArea().getMin())));
                    }
                    if (filters.getProperty().getArea().getMax() != null) {
                        predicates.add(cb.lessThanOrEqualTo(root.get("carpetAreaValue"),
                                       BigDecimal.valueOf(filters.getProperty().getArea().getMax())));
                    }
                }
            }
            
            // --- Amenities Filter (This was already safe) ---
            if (isValid(filters.getAmenities())) {
                for (String amenity : filters.getAmenities()) {
                    predicates.add(cb.isMember(amenity, root.get("amenities")));
                }
                query.distinct(true); 
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private boolean isValid(String value) {
        return value != null && !value.isBlank();
    }

    private boolean isValid(List<?> list) {
        return list != null && !list.isEmpty();
    }
}