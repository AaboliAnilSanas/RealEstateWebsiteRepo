package com.realestate.realestateapp.filter.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SearchRequestDTO {
    private String transactionType;
    private String searchQuery;

    @NotNull(message = "Filters object cannot be null")
    @Valid
    private FiltersDTO filters;

    @NotNull(message = "Sort object cannot be null")
    @Valid
    private SortDTO sort;

    @NotNull(message = "Pagination object cannot be null")
    @Valid
    private PaginationDTO pagination;
}