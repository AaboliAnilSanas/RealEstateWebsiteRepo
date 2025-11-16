package com.realestate.realestateapp.filter.dto.request;

import jakarta.validation.Valid;
import lombok.Data;
import java.util.List;

@Data
public class PropertyFilterDTO {
    private List<String> type;
    private List<Integer> bedrooms;
    private List<Integer> bathrooms;
    private List<Integer> parking;
    private List<String> possession;
    @Valid private AreaFilterDTO area;
}