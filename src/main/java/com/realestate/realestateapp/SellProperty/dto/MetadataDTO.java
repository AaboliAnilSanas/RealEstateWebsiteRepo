package com.realestate.realestateapp.SellProperty.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class MetadataDTO {
    @JsonProperty("submission_date")
    private String submissionDate;

    @JsonProperty("form_version")
    private String formVersion;
}
