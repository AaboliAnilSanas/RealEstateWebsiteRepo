package com.realestate.realestateapp.SellProperty.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class PropertyListingDTO {
    @JsonProperty("basic_details")
    private BasicDetailsDTO basicDetails;

    @JsonProperty("location_details")
    private LocationDetailsDTO locationDetails;

    @JsonProperty("property_profile")
    private PropertyProfileDTO propertyProfile;

    private MediaDTO media;
    private MetadataDTO metadata;
}
