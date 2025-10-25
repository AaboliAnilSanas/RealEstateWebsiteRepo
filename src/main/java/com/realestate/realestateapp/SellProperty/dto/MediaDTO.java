package com.realestate.realestateapp.SellProperty.dto;

import lombok.Data;
import java.util.List;

@Data
public class MediaDTO {
    private List<String> videos;
    private List<String> photos;
}
