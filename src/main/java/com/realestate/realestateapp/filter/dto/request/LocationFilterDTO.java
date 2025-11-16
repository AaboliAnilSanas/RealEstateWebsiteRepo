package com.realestate.realestateapp.filter.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class LocationFilterDTO {
    private String city;
    private List<String> locality;
    private List<String> subLocality;
}