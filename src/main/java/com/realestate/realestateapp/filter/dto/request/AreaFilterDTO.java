package com.realestate.realestateapp.filter.dto.request;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class AreaFilterDTO {
    @Min(value = 0, message = "Minimum area cannot be negative")
    private Integer min;
    private Integer max;
    private String unit;
}