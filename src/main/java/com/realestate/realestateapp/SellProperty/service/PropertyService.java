package com.realestate.realestateapp.SellProperty.service;

import com.realestate.realestateapp.SellProperty.dto.PropertyListingDTO;
import com.realestate.realestateapp.SellProperty.entity.Media;
import com.realestate.realestateapp.SellProperty.entity.Property;
// Import your existing User entity and Repository
import com.realestate.realestateapp.user.Entity.User; // <-- CHANGED
import com.realestate.realestateapp.user.Repository.UserRepository; // <-- CHANGED
import com.realestate.realestateapp.SellProperty.repository.PropertyRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository; // <-- CHANGED (from SellerRepository)

    @Transactional
    // CHANGED: The method now accepts the user's email (from the token) instead of a sellerId
    public Property createProperty(PropertyListingDTO dto, String userEmail) { 
        
        // CHANGED: Find the user by their email
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + userEmail));

        // Step 3: Map DTO to Property entity
        Property property = new Property();

        // (All mapping logic remains the same...)
        // Map Basic Details
        property.setLookingTo(dto.getBasicDetails().getLookingTo());
        property.setPropertyType(dto.getBasicDetails().getPropertyType());
        property.setPropertySubType(dto.getBasicDetails().getPropertySubType());

        // Map Location Details
        property.setCity(dto.getLocationDetails().getCity());
        property.setLocality(dto.getLocationDetails().getLocality());
        property.setSubLocality(dto.getLocationDetails().getSubLocality());
        property.setApartmentSociety(dto.getLocationDetails().getApartmentSociety());
        property.setHouseNo(dto.getLocationDetails().getHouseNo());

        // Map Property Profile
        property.setBedrooms(dto.getPropertyProfile().getBedrooms());
        property.setBathrooms(dto.getPropertyProfile().getBathrooms());
        property.setBalconies(dto.getPropertyProfile().getBalconies());
        property.setAvailabilityStatus(dto.getPropertyProfile().getAvailabilityStatus());
        property.setOwnership(dto.getPropertyProfile().getOwnership());
        property.setDescription(dto.getPropertyProfile().getDescription());

        // Map Area Details
        property.setCarpetAreaValue(new BigDecimal(dto.getPropertyProfile().getAreaDetails().getCarpetArea().get("value").toString()));
        property.setCarpetAreaUnit(dto.getPropertyProfile().getAreaDetails().getCarpetArea().get("unit").toString());
        property.setBuiltUpAreaValue(new BigDecimal(dto.getPropertyProfile().getAreaDetails().getBuiltUpArea().get("value").toString()));
        property.setBuiltUpAreaUnit(dto.getPropertyProfile().getAreaDetails().getBuiltUpArea().get("unit").toString());

        // Map Floor Details
        property.setTotalFloors(dto.getPropertyProfile().getFloorDetails().getTotalFloors());
        property.setSelectedFloor(dto.getPropertyProfile().getFloorDetails().getSelectedFloor());

        // Map Possession Date
        var possessionDTO = dto.getPropertyProfile().getPossessionDate();
        LocalDate possessionDate = LocalDate.of(possessionDTO.getYear(), possessionDTO.getMonth(), 1);
        property.setPossessionDate(possessionDate);

        // Map Price Details
        property.setPriceValue(BigDecimal.valueOf(dto.getPropertyProfile().getPriceDetails().getValue()));
        property.setPriceUnit(dto.getPropertyProfile().getPriceDetails().getUnit());

        // Map Metadata
        property.setSubmissionDate(LocalDateTime.parse(dto.getMetadata().getSubmissionDate()));
        property.setFormVersion(dto.getMetadata().getFormVersion());
        
        // CHANGED: Link the property to the logged-in User
        property.setUser(user); 
        
        // Step 4: Map media file names (This logic is unchanged)
        Set<Media> mediaFiles = new HashSet<>();
        if (dto.getMedia().getPhotos() != null) {
            for (String photoName : dto.getMedia().getPhotos()) {
                Media media = new Media();
                media.setType("photo");
                media.setFileUrl(photoName);
                media.setProperty(property);
                mediaFiles.add(media);
            }
        }
        if (dto.getMedia().getVideos() != null) {
            for (String videoName : dto.getMedia().getVideos()) {
                Media media = new Media();
                media.setType("video");
                media.setFileUrl(videoName);
                media.setProperty(property);
                mediaFiles.add(media);
            }
        }
        property.setMediaFiles(mediaFiles);

        // Step 5: Save Property (and Media)
        return propertyRepository.save(property);
    }
}