package com.realestate.realestateapp.filter.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MetadataDTO {
    private String responseTime;
    private String searchId;
    private Boolean cacheHit;
    private Object requestInfo;
}