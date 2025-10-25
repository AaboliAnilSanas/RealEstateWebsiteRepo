import React, { useState, useEffect } from "react";
import ListingCard from "../UIComponents/ListingCard.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // ... (your dummyProperties data remains the same)
    const dummyProperties = [
    {
      id: 1,
      basicDetails: {
        transactionType: "Sell",
        propertyCategory: "Residential",
        propertyType: "Flat/Apartment",
      },
      location: {
        city: "Mumbai",
        locality: "Bandra West",
        apartment: "Sunrise Apartments",
        subLocality: "Bandra",
        houseNo: "A-501",
      },
      propertyProfile: {
        bedrooms: "3",
        bathrooms: "2",
        balconies: "2",
        carpetArea: "1200 sq.ft",
        floor: "5",
        totalFloors: "12",
        availability: "Ready to Move",
        possession: "2024",
        ownership: "Freehold",
        price: "₹2.5 Cr",
        description:
          "Beautiful 3BHK apartment with modern amenities and great location.",
      },
      media: {
        videoUrl: "/real-estate-hero.mp4",
        photos: ["/property1.jpg", "/property2.jpg"],
      },
    },
    {
      id: 2,
      basicDetails: {
        transactionType: "Rent/Lease",
        propertyCategory: "Residential",
        propertyType: "Independent House/Villa",
      },
      location: {
        city: "Bangalore",
        locality: "Whitefield",
        apartment: "Prestige Villas",
        subLocality: "Whitefield",
        houseNo: "V-12",
      },
      propertyProfile: {
        bedrooms: "4",
        bathrooms: "3",
        balconies: "3",
        carpetArea: "1800 sq.ft",
        floor: "2",
        totalFloors: "2",
        availability: "Ready to Move",
        possession: "2023",
        ownership: "Freehold",
        price: "₹85,000/month",
        description:
          "Spacious villa with garden and modern amenities in prime location.Spacious villa with garden and modern amenities in prime location.Spacious villa with garden and modern amenities in prime location.Spacious villa with garden and modern amenities in prime location.Spacious villa with garden and modern amenities in prime location.Spacious villa with garden and modern amenities in prime location.Spacious villa with garden and modern amenities in prime location.Spacious villa with garden and modern amenities in prime location.",
      },
      media: {
        videoUrl: "/real-estate-hero.mp4",
        photos: ["/villa1.jpg", "/villa2.jpg"],
      },
    },
    {
      id: 3,
      basicDetails: {
        transactionType: "Sell",
        propertyCategory: "Commercial",
        propertyType: "Office Space",
      },
      location: {
        city: "Delhi",
        locality: "Connaught Place",
        apartment: "Business Tower",
        subLocality: "CP",
        houseNo: "Office-305",
      },
      propertyProfile: {
        bedrooms: "1", // Conference rooms
        bathrooms: "2",
        balconies: "1",
        carpetArea: "800 sq.ft",
        floor: "3",
        totalFloors: "10",
        availability: "Ready to Move",
        possession: "2024",
        ownership: "Leasehold",
        price: "₹1.2 Cr",
        description:
          "Premium office space in central business district with great connectivity.",
      },
      media: {
        videoUrl: "/real-estate-hero.mp4",
        photos: ["/office1.jpg", "/office2.jpg"],
      },
    },
    {
      id: 4,
      basicDetails: {
        transactionType: "PG",
        propertyCategory: "Residential",
        propertyType: "Builder Floor",
      },
      location: {
        city: "Pune",
        locality: "Koregaon Park",
        apartment: "Green Valley Homes",
        subLocality: "KP",
        houseNo: "GF-2",
      },
      propertyProfile: {
        bedrooms: "2",
        bathrooms: "2",
        balconies: "1",
        carpetArea: "900 sq.ft",
        floor: "1",
        totalFloors: "3",
        availability: "Ready to Move",
        possession: "2024",
        ownership: "Freehold",
        price: "₹15,000/month",
        description:
          "Cozy PG accommodation with all modern facilities and security.",
      },
      media: {
        videoUrl: "/real-estate-hero.mp4",
        photos: ["/pg1.jpg", "/pg2.jpg"],
      },
    },
  ];
  // Simulate API call
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProperties(dummyProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading properties...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, width: '100%' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
          Property Listings : <span>{properties.length} properties found</span> 
        </Typography>
      
      </Box>

      {properties.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No properties found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria
          </Typography>
        </Box>
      ) : (
        <Box sx={{ width: '100%' }}>
          {properties.map((property) => (
            <ListingCard key={property.id} propertyData={property} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PropertyListing;