package com.realestate.realestateapp.filter.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SortDTO {
    @NotBlank(message = "Sort field cannot be blank")
    private String field;
    private String order;
}