package com.realestate.realestateapp.SellProperty.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LocationDetailsDTO {
    private String city;
    private String locality;

    @JsonProperty("sub_locality")
    private String subLocality;

    @JsonProperty("apartment_society")
    private String apartmentSociety;

    @JsonProperty("house_no")
    private String houseNo;
}
