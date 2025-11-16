package com.realestate.realestateapp.filter.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SearchDataDTO {
    private List<PropertyDTO> properties;
    private SummaryDTO summary;
    private PaginationResultDTO pagination;
    private Object filters;
}