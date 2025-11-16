package com.realestate.realestateapp.filter.dto.response;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class PropertyDTO {
    private Long id;
    private String city;
    private String locality;
    private String subLocality;
    private String transactionType;
    private String propertyType;
    private Long price;
    private Integer bedrooms;
    private Integer bathrooms;
    private Integer parking;
    private String possession;
    private Integer area;
    private String areaUnit;
    private String description;
    private List<String> amenities;
    private List<String> photos; // A list of photo URLs
}