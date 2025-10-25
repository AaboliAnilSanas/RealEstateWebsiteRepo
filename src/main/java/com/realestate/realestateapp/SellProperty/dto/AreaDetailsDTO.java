package com.realestate.realestateapp.SellProperty.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.Map;

@Data
public class AreaDetailsDTO {
    @JsonProperty("carpet_area")
    private Map<String, Object> carpetArea;

    @JsonProperty("built_up_area")
    private Map<String, Object> builtUpArea;
}
