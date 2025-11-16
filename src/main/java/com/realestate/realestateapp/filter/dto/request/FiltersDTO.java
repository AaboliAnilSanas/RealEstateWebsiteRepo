package com.realestate.realestateapp.filter.dto.request;

import jakarta.validation.Valid;
import lombok.Data;
import java.util.List;

@Data
public class FiltersDTO {
    @Valid private LocationFilterDTO location;
    @Valid private PriceFilterDTO price;
    @Valid private PropertyFilterDTO property;
    private List<String> amenities;
}