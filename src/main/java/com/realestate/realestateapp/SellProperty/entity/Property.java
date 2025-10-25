package com.realestate.realestateapp.SellProperty.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private Seller seller;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Media> mediaFiles;

    @Column(name = "looking_to", length = 50)
    private String lookingTo;
    @Column(name = "property_type", length = 50)
    private String propertyType;
    @Column(name = "property_sub_type", length = 50)
    private String propertySubType;
    @Column(length = 100)
    private String city;
    @Column(length = 100)
    private String locality;
    @Column(name = "sub_locality", length = 100)
    private String subLocality;
    @Column(name = "apartment_society", length = 100)
    private String apartmentSociety;
    @Column(name = "house_no", length = 50)
    private String houseNo;
    private Integer bedrooms;
    private Integer bathrooms;
    private Integer balconies;
    @Column(name = "carpet_area_value", precision = 10, scale = 2)
    private BigDecimal carpetAreaValue;
    @Column(name = "carpet_area_unit", length = 10)
    private String carpetAreaUnit;
    @Column(name = "built_up_area_value", precision = 10, scale = 2)
    private BigDecimal builtUpAreaValue;
    @Column(name = "built_up_area_unit", length = 10)
    private String builtUpAreaUnit;
    @Column(name = "total_floors")
    private Integer totalFloors;
    @Column(name = "selected_floor", length = 10)
    private String selectedFloor;
    @Column(name = "availability_status", length = 50)
    private String availabilityStatus;
    @Column(name = "possession_date")
    private LocalDate possessionDate;
    @Column(length = 50)
    private String ownership;
    @Column(name = "price_value", precision = 19, scale = 2)
    private BigDecimal priceValue;
    @Column(name = "price_unit", length = 10)
    private String priceUnit;
    @Lob
    private String description;
    @Column(name = "submission_date")
    private LocalDateTime submissionDate;
    @Column(name = "form_version", length = 10)
    private String formVersion;
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}