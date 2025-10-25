package com.realestate.realestateapp.SellProperty.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class BasicDetailsDTO {
    @JsonProperty("looking_to")
    private String lookingTo;

    @JsonProperty("property_type")
    private String propertyType;

    @JsonProperty("property_sub_type")
    private String propertySubType;
}
