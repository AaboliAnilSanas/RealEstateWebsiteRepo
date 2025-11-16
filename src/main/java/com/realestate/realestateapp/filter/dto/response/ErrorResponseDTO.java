package com.realestate.realestateapp.filter.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponseDTO {
    private boolean success;
    private ErrorDTO error;
    private Object data;
    private MetadataDTO metadata;
}