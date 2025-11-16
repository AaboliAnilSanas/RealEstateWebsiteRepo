package com.realestate.realestateapp.filter.dto.request;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class PriceFilterDTO {
    @Min(value = 0, message = "Minimum price cannot be negative")
    private Long min;
    private Long max;
}