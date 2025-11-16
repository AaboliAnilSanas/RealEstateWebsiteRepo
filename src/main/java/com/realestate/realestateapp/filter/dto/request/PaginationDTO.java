package com.realestate.realestateapp.filter.dto.request;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class PaginationDTO {
    @Min(value = 1, message = "Page number must be at least 1")
    private int page;

    @Min(value = 1, message = "Page limit must be at least 1")
    private int limit;
}