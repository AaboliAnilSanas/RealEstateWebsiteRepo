package com.realestate.realestateapp.SellProperty.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class PropertyProfileDTO {
    private int bedrooms;
    private int bathrooms;
    private int balconies;

    @JsonProperty("area_details")
    private AreaDetailsDTO areaDetails;

    @JsonProperty("floor_details")
    private FloorDetailsDTO floorDetails;

    @JsonProperty("availability_status")
    private String availabilityStatus;

    @JsonProperty("possession_date")
    private PossessionDateDTO possessionDate;

    private String ownership;

    @JsonProperty("price_details")
    private PriceDetailsDTO priceDetails;

    private String description;
}
