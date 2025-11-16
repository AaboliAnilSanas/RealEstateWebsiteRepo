package com.realestate.realestateapp.filter.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorFieldDetailsDTO {
    private String field;
    private String issue;
}