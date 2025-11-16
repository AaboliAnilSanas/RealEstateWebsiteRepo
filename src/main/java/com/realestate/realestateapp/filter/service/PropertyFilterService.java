package com.realestate.realestateapp.filter.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.realestate.realestateapp.SellProperty.entity.Media;
import com.realestate.realestateapp.SellProperty.entity.Property;
import com.realestate.realestateapp.filter.dto.request.FiltersDTO;
import com.realestate.realestateapp.filter.dto.request.SearchRequestDTO;
import com.realestate.realestateapp.filter.dto.response.*;
import com.realestate.realestateapp.filter.repository.PropertyFilterRepository;
import com.realestate.realestateapp.filter.specification.PropertySpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PropertyFilterService {

    private final PropertyFilterRepository propertyRepository;
    private final PropertySpecification propertySpecification;
    private final ObjectMapper objectMapper;

    @Transactional(readOnly = true)
    public ResponseEntity<Object> searchProperties(SearchRequestDTO request, String ifNoneMatch) {

        long startTime = System.currentTimeMillis();
        String etag = generateETag(request);

        // --- 1. HTTP Caching Check ---
        if (ifNoneMatch != null && ifNoneMatch.equals(etag)) {
            log.info("ETag match found. Returning 304 Not Modified.");
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).eTag(etag).build();
        }

        // --- 2. Build Dynamic Query ---
        Specification<Property> spec = propertySpecification.build(request.getFilters());

        // --- 3. Build Sort & Pagination ---
        String sortField = request.getSort().getField();
        if ("price".equals(sortField)) {
            sortField = "priceValue";
        } else if ("area".equals(sortField)) {
            sortField = "carpetAreaValue";
        }

        Sort sort = request.getSort().getOrder().equalsIgnoreCase("asc") ?
                Sort.by(sortField).ascending() :
                Sort.by(sortField).descending();
        
        Pageable pageable = PageRequest.of(
                request.getPagination().getPage() - 1,
                request.getPagination().getLimit(),
                sort
        );

        // --- 4. Execute Query ---
        Page<Property> propertyPage = propertyRepository.findAll(spec, pageable);

        // --- 5. Map Results to DTOs ---
        List<PropertyDTO> propertyDTOs = propertyPage.getContent().stream()
                .map(this::mapToPropertyDTO)
                .collect(Collectors.toList());

        // --- 6. Build Summary & Pagination DTOs ---
        SummaryDTO summary = SummaryDTO.builder()
                .totalCount(null) 
                .filteredCount(propertyPage.getTotalElements())
                .averagePrice(null)
                .priceRange(null)   
                .build();

        PaginationResultDTO paginationResult = PaginationResultDTO.builder()
                .currentPage(request.getPagination().getPage())
                .limit(request.getPagination().getLimit())
                .totalItems(propertyPage.getTotalElements())
                .totalPages(propertyPage.getTotalPages())
                .build();

        // --- 7. Build Final Response ---
        SearchDataDTO searchData = SearchDataDTO.builder()
                .properties(propertyDTOs)
                .summary(summary)
                .pagination(paginationResult)
                .filters(buildFiltersResult(request.getFilters()))
                .build();

        // --- THIS IS THE FIX ---
        // We provide a default value "N/A" in case getSearchQuery() is null.
        String searchQuery = request.getSearchQuery() != null ? request.getSearchQuery() : "N/A";
        
        MetadataDTO metadata = MetadataDTO.builder()
                .responseTime((System.currentTimeMillis() - startTime) + "ms")
                .searchId(UUID.randomUUID().toString())
                .cacheHit(false)
                .requestInfo(Map.of("search_query", searchQuery)) // Use the null-safe variable
                .build();

        SearchResponseDTO response = SearchResponseDTO.builder()
                .success(true)
                .data(searchData)
                .metadata(metadata)
                .build();

        // --- 8. Return 200 OK with ETag ---
        return ResponseEntity.ok()
                .eTag(etag)
                .body(response);
    }

    private String generateETag(SearchRequestDTO request) {
        try {
            String jsonRequest = objectMapper.writeValueAsString(request);
            return "\"" + DigestUtils.md5Hex(jsonRequest) + "\"";
        } catch (JsonProcessingException e) {
            log.error("Failed to serialize request for ETag", e);
            return "no-etag-" + UUID.randomUUID(); 
        }
    }

    // --- (Fully Null-Safe) Helper to map your Entity -> DTO ---
    private PropertyDTO mapToPropertyDTO(Property property) {
        
        List<String> photoUrls = Collections.emptyList();
        if (property.getMediaFiles() != null) {
            photoUrls = property.getMediaFiles().stream()
                    .filter(media -> "photo".equalsIgnoreCase(media.getType()) && media.getFileUrl() != null)
                    .map(Media::getFileUrl)
                    .collect(Collectors.toList());
        }

        List<String> amenities = (property.getAmenities() != null) ? property.getAmenities() : Collections.emptyList();

        return PropertyDTO.builder()
                .id(property.getId())
                .city(property.getCity())
                .locality(property.getLocality())
                .subLocality(property.getSubLocality())
                .transactionType(property.getLookingTo())
                .propertyType(property.getPropertyType())
                .price(toLong(property.getPriceValue()))
                .bedrooms(property.getBedrooms())
                .bathrooms(property.getBathrooms())
                .parking(property.getParking())
                .possession(property.getAvailabilityStatus())
                .area(toInt(property.getCarpetAreaValue()))
                .areaUnit(property.getCarpetAreaUnit())
                .description(property.getDescription())
                .amenities(amenities)
                .photos(photoUrls)
                .build();
    }
    
    // Helper for the "filters" response object
    private Object buildFiltersResult(FiltersDTO appliedFilters) {
        return Map.of(
            "applied", appliedFilters,
            "available", Map.of(),
            "quick_filters", Map.of(
                "popular_localities", List.of(),
                "price_trends", Map.of()
            )
        );
    }

    // Null-safe helper
    private Long toLong(BigDecimal decimal) {
        return (decimal != null) ? decimal.longValue() : null;
    }

    // Null-safe helper
    private Integer toInt(BigDecimal decimal) {
        return (decimal != null) ? decimal.intValue() : null;
    }
}