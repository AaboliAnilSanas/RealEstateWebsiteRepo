package com.realestate.realestateapp.filter.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaginationResultDTO {
    private int currentPage;
    private int limit;
    private long totalItems;
    private int totalPages;
}