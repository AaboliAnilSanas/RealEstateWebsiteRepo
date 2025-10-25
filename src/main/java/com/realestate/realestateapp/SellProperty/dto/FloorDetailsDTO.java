package com.realestate.realestateapp.SellProperty.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FloorDetailsDTO {
    @JsonProperty("total_floors")
    private int totalFloors;

    @JsonProperty("selected_floor")
    private String selectedFloor;
}
