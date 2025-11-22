import React, { useState, useEffect } from "react";
import CustomAutocomplete from "./CustomAutocomplete.jsx";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FilterComponent = ({ 
  data: propData, 
  filterOptions: propFilterOptions, 
  onSearch 
}) => {
  const [transactionType, setTransactionType] = useState("sell");
  const [selectedValues, setSelectedValues] = useState({
    city: "",
    budget: "",
    propertyType: [],
    bedroom: [],
    bathroom: [],
    parking: [],
    possessionStatus: [],
    furnishingStatus: [],
  });

  // Mobile filter drawer state
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  // isMobile is true for screens below 'md' (768px by default)
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); 
  const navigate = useNavigate();
  // Different slider ranges for Buy vs Rent
  const [buySliderValue, setBuySliderValue] = useState([0, 100]);
  const [rentSliderValue, setRentSliderValue] = useState([10, 50]);
  
  // Validation state for all required fields
  const [validationErrors, setValidationErrors] = useState({
    city: false,
    propertyType: false,
    bedroom: false,
    bathroom: false,
    parking: false,
    possessionStatus: false,
    furnishingStatus: false,
  });

  // Use props if provided, otherwise use default data
  const data = propData;

  // City options - you can customize this list
  const cityOptions = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", 
    "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  const PossessionStatus = propFilterOptions?.possessionStatus || {
    fieldType: "RadioButton",
    fieldData: ["Ready To Move", "Under Construction"],
  };

  const PropertyType = propFilterOptions?.propertyType || {
    fieldType: "Checkbox",
    fieldData: [
      "Apartment",
      "Plot",
      "Builder Floor",
      "Villa",
      "Office Space",
      "Shop",
      "Land",
      "Showroom",
    ],
  };

  const Bedroom = propFilterOptions?.bedroom || {
    fieldType: "Checkbox",
    fieldData: ["1RK", "1BHK", "2BHK", "3BHK", "4Bhk+"],
  };

  const Bathroom = propFilterOptions?.bathroom || {
    fieldType: "Checkbox",
    fieldData: ["1", "2", "3", "4", "5+"],
  };

  const Parking = propFilterOptions?.parking || {
    fieldType: "Checkbox",
    fieldData: ["1", "2", "3", "4", "5+"],
  };

  const FurnishingStatus = propFilterOptions?.furnishingStatus || {
    fieldType: "Checkbox",
    fieldData: ["Fully Furnished", "Semi Furnished", "Unfurnished"],
  };

  // Check if field is required based on asterisk in label
  const isFieldRequired = (fieldLabel) => {
    return fieldLabel && fieldLabel.includes('*');
  };

  // Mobile filter handlers
  const handleMobileOpen = () => setMobileOpen(true);
  const handleMobileClose = () => setMobileOpen(false);

  const getCurrentSliderValue = () => {
    return transactionType === "sell" ? buySliderValue : rentSliderValue;
  };

  const formatValue = (value) => {
    if (value >= 100) {
      return `${(value / 100).toFixed(1)} Cr`;
    }
    return `${value} L`;
  };
  const [searchQuery, setSearchQuery] = useState("");
  // Validate all required fields
  const validateAllFields = () => {
    const newErrors = {
      city: false,
      propertyType: false,
      bedroom: false,
      bathroom: false,
      parking: false,
      possessionStatus: false,
      furnishingStatus: false,
    };

    let isValid = true;

    // Validate city
    if (isFieldRequired("City*")) {
      const cityEmpty = !selectedValues.city || selectedValues.city.trim() === '';
      newErrors.city = cityEmpty;
      const searchEmpty = !searchQuery || searchQuery.trim() === '';

      if (cityEmpty && searchEmpty) {
        newErrors.city = true;
        isValid = false;
      } else {
        newErrors.city = false;
      }
    }

    // Validate property type if required
    if (isFieldRequired("Property Type")) {
      const propertyTypeEmpty = !selectedValues.propertyType || selectedValues.propertyType.length === 0;
      newErrors.propertyType = propertyTypeEmpty;
      if (propertyTypeEmpty) isValid = false;
    }

    // Validate bedroom if required
    if (isFieldRequired("Bedroom")) {
      const bedroomEmpty = !selectedValues.bedroom || selectedValues.bedroom.length === 0;
      newErrors.bedroom = bedroomEmpty;
      if (bedroomEmpty) isValid = false;
    }

    // Validate bathroom if required
    if (isFieldRequired("Bathroom")) {
      const bathroomEmpty = !selectedValues.bathroom || selectedValues.bathroom.length === 0;
      newErrors.bathroom = bathroomEmpty;
      if (bathroomEmpty) isValid = false;
    }

    // Validate parking if required
    if (isFieldRequired("Parking")) {
      const parkingEmpty = !selectedValues.parking || selectedValues.parking.length === 0;
      newErrors.parking = parkingEmpty;
      if (parkingEmpty) isValid = false;
    }

    // Validate possession status if required and transaction type is buy
    if (transactionType === "sell" && isFieldRequired("Possession")) {
      const possessionEmpty = !selectedValues.possessionStatus || selectedValues.possessionStatus.length === 0;
      newErrors.possessionStatus = possessionEmpty;
      if (possessionEmpty) isValid = false;
    }

    // Validate furnishing status if required and transaction type is rent
    if (transactionType === "rent" && isFieldRequired("Furnishing")) {
      const furnishingEmpty = !selectedValues.furnishingStatus || selectedValues.furnishingStatus.length === 0;
      newErrors.furnishingStatus = furnishingEmpty;
      if (furnishingEmpty) isValid = false;
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  // Clear validation error for a specific field
  const clearFieldError = (fieldName) => {
    setValidationErrors(prev => ({
      ...prev,
      [fieldName]: false
    }));
  };

  const handleFieldChange = (fieldName, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear validation error when user interacts with the field
    if (validationErrors[fieldName]) {
      clearFieldError(fieldName);
    }
  };

  const handleAutocompleteChange = (fieldName) => (event, value) => {
    handleFieldChange(fieldName, value);
  };

  const handleSliderChange = (event, newValue) => {
    if (transactionType === "sell") {
      setBuySliderValue(newValue);
    } else {
      setRentSliderValue(newValue);
    }
  };

  function valuetext(value) {
    return formatValue(value);
  }

  const getRangeText = () => {
    const currentValue = getCurrentSliderValue();
    const min = formatValue(currentValue[0]);
    const max = formatValue(currentValue[1]);
    return `${min} - ${max}`;
  };

  const getSliderConfig = () => {
    if (transactionType === "sell") {
      return {
        min: 0,
        max: 1000,
        step: 1,
        marks: [
          { value: 0, label: "0" },
          { value: 100, label: "1 Cr" },
          { value: 500, label: "5 Cr" },
          { value: 1000, label: "10 Cr+" },
        ],
      };
    } else {
      return {
        min: 10,
        max: 500,
        step: 5,
        marks: [
          { value: 10, label: "10 L" },
          { value: 50, label: "50 L" },
          { value: 100, label: "1 Cr" },
          { value: 250, label: "2.5 Cr" },
          { value: 500, label: "5 Cr+" },
        ],
      };
    }
  };
const buildBackendPayload = (filters, page = 1, limit = 20) => {
  const payload = {
    transaction_type: filters.transaction_type,
    search_query: filters.search_metadata?.text_input || "",
    filters: {},
    sort: { field: "price", order: "asc" },
    pagination: { page, limit }
  };

  // ---------------- LOCATION ----------------
  // ---------------- LOCATION ----------------
const location = {};

// ONLY send city when search_query is empty
if (!payload.search_query && filters.filters.city) {
  location.city = filters.filters.city;
}

if (filters.filters.locality?.length > 0)
  location.locality = filters.filters.locality;

if (Object.keys(location).length > 0)
  payload.filters.location = location;

  // ---------------- PRICE ----------------
  const price = {};
  if (filters.filters.budget_range?.min !== undefined)
    price.min = filters.filters.budget_range.min;
  if (filters.filters.budget_range?.max !== undefined)
    price.max = filters.filters.budget_range.max;

  if (Object.keys(price).length > 0)
    payload.filters.price = price;

  // ---------------- PROPERTY ----------------
  const property = {};

  if (filters.filters.property_type?.length > 0)
    property.type = filters.filters.property_type;

  if (filters.filters.bedroom?.length > 0)
    property.bedrooms = filters.filters.bedroom.map(Number);

  if (filters.filters.bathroom?.length > 0)
    property.bathrooms = filters.filters.bathroom.map(Number);

  if (filters.filters.parking?.length > 0)
    property.parking = filters.filters.parking.map(Number);

  if (filters.filters.possession_status?.length > 0)
    property.possession = filters.filters.possession_status;

  if (Object.keys(property).length > 0)
    payload.filters.property = property;

  // ---------------- AMENITIES ----------------
  if (filters.filters.amenities?.length > 0)
    payload.filters.amenities = filters.filters.amenities;

  return payload;
};

const handleSearch = async () => {
  console.log("HANDLE SEARCH STARTED");

  const currentSliderValue = getCurrentSliderValue();

  // Build local filters object
  const filters = {
    transaction_type: transactionType,
    search_metadata: {
      text_input: searchQuery || ""
    },
    filters: {
      city: selectedValues.city || "",
      locality: [],

      budget_range: {
  min: transactionType === "sell"
    ? currentSliderValue[0] * 100000
    : currentSliderValue[0] * 1000 * 100,

  max: transactionType === "sell"
    ? currentSliderValue[1] * 100000
    : currentSliderValue[1] * 1000 * 100,
},

      property_type: selectedValues.propertyType,
      bedroom: selectedValues.bedroom,
      bathroom: selectedValues.bathroom,
      parking: selectedValues.parking,

      possession_status:
        transactionType === "sell" ? selectedValues.possessionStatus : [],

      furnishing_status:
        transactionType === "rent" ? selectedValues.furnishingStatus : [],

      amenities: []
    }
  };

  try {
    const payload = buildBackendPayload(filters, 1, 20);

    console.log("FINAL API PAYLOAD:", payload);

    const response = await axios.post("http://localhost:7000/api/properties/search", payload);

    navigate("/properties", { state: response.data });

    if (onSearch) onSearch(response.data);

  } catch (error) {
    console.error("API ERROR:", error);
  }

  if (isMobile) handleMobileClose();
};



  const handleClearAll = () => {
    setSelectedValues({
      city: "",
      budget: "",
      propertyType: [],
      bedroom: [],
      bathroom: [],
      parking: [],
      possessionStatus: [],
      furnishingStatus: [],
    });
    setBuySliderValue([0, 100]);
    setRentSliderValue([10, 50]);
    
    // Clear all validation errors
    setValidationErrors({
      city: false,
      propertyType: false,
      bedroom: false,
      bathroom: false,
      parking: false,
      possessionStatus: false,
      furnishingStatus: false,
    });
  };

  const sliderConfig = getSliderConfig();

  // Hexagon SVG Component with Animation - Using CSS variables
  const HexagonBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Right Top Corner - 3 Hexagons */}
      <div className="absolute top-0 right-0">
        {/* Hexagon 1 - Top Right */}
        <svg 
          className="absolute -top-4 right-10"
          width={isMobile ? "50" : "80"}
          height={isMobile ? "50" : "80"}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: isMobile ? 0.10 : 0.20,
            animation: 'floatHexagon1 8s ease-in-out infinite'
          }}
        >
          <defs>
            <linearGradient id="hexagonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--gold-base)" />
              <stop offset="100%" stopColor="var(--gold-base)" style={{ stopOpacity: 0.7 }} />
            </linearGradient>
          </defs>
          <polygon
            points="50,15 85,30 85,70 50,85 15,70 15,30"
            fill="url(#hexagonGradient1)"
            strokeWidth="1"
            stroke="var(--gold-base)"
          />
        </svg>

        {/* Hexagon 2 - Middle Right */}
        <svg 
          className="absolute top-10 right-3"
          width={isMobile ? "40" : "60"}
          height={isMobile ? "40" : "60"}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: isMobile ? 0.08 : 0.15,
            animation: 'floatHexagon2 6s ease-in-out infinite 1s'
          }}
        >
          <defs>
            <linearGradient id="hexagonGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--gold-base)" />
              <stop offset="100%" stopColor="var(--gold-base)" style={{ stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>
          <polygon
            points="50,15 85,30 85,70 50,85 15,70 15,30"
            fill="url(#hexagonGradient2)"
            strokeWidth="1"
            stroke="var(--gold-base)"
            style={{ opacity: 0.6 }}
          />
        </svg>

        {/* Hexagon 3 - Bottom Right */}
        <svg 
          className="absolute top-1 right-1"
          width={isMobile ? "30" : "50"}
          height={isMobile ? "30" : "50"}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: isMobile ? 0.05 : 0.10,
            animation: 'floatHexagon3 7s ease-in-out infinite 0.5s'
          }}
        >
          <defs>
            <linearGradient id="hexagonGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--gold-base)" style={{ stopOpacity: 0.5 }} />
              <stop offset="100%" stopColor="var(--gold-base)" />
            </linearGradient>
          </defs>
          <polygon
            points="50,15 85,30 85,70 50,85 15,70 15,30"
            fill="url(#hexagonGradient3)"
            strokeWidth="1"
            stroke="var(--gold-base)"
            style={{ opacity: 0.4 }}
          />
        </svg>
      </div>

      {/* Left Bottom Corner - 4 Hexagons (Hidden for max compactness on mobile) */}
      {!isMobile && (
        <div className="absolute bottom-0 left-0">
          {/* Hexagon 4 - Bottom Left Large */}
          <svg 
            className="absolute bottom-11 left-2 opacity-20"
            width="75"
            height="70"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              animation: 'floatHexagon5 7s ease-in-out infinite 1.2s'
            }}
          >
            <defs>
              <linearGradient id="hexagonGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--gold-base)" style={{ stopOpacity: 0.7 }} />
                <stop offset="100%" stopColor="var(--gold-base)" style={{ stopOpacity: 0.5 }} />
              </linearGradient>
            </defs>
            <polygon
              points="50,15 85,30 85,70 50,85 15,70 15,30"
              fill="url(#hexagonGradient5)"
              strokeWidth="1"
              stroke="var(--gold-base)"
              style={{ opacity: 0.6 }}
            />
          </svg>

          {/* Hexagon 5 - Middle Left Medium */}
          <svg 
            className="absolute -bottom-1 -left-2 opacity-25"
            width="70"
            height="70"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              animation: 'floatHexagon5 7s ease-in-out infinite 1.2s'
            }}
          >
            <defs>
              <linearGradient id="hexagonGradient5-b" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--gold-base)" style={{ stopOpacity: 0.7 }} />
                <stop offset="100%" stopColor="var(--gold-base)" style={{ stopOpacity: 0.5 }} />
              </linearGradient>
            </defs>
            <polygon
              points="50,15 85,30 85,70 50,85 15,70 15,30"
              fill="url(#hexagonGradient5-b)"
              strokeWidth="1"
              stroke="var(--gold-base)"
              style={{ opacity: 0.6 }}
            />
          </svg>

          {/* Hexagon 6 - Top Left Small */}
          <svg 
            className="absolute bottom-6 left-14 opacity-25"
            width="45"
            height="45"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              animation: 'floatHexagon6 8s ease-in-out infinite 0.8s'
            }}
          >
            <defs>
              <linearGradient id="hexagonGradient6" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--gold-base)" style={{ stopOpacity: 0.5 }} />
                <stop offset="100%" stopColor="var(--gold-base)" style={{ stopOpacity: 0.3 }} />
              </linearGradient>
            </defs>
            <polygon
              points="50,15 85,30 85,70 50,85 15,70 15,30"
              fill="url(#hexagonGradient6)"
              strokeWidth="1"
              stroke="var(--gold-base)"
              style={{ opacity: 0.4 }}
            />
          </svg>

          {/* Hexagon 7 - Center Left Tiny */}
          <svg 
            className="absolute bottom-12 left-8 opacity-10"
            width="30"
            height="30"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              animation: 'floatHexagon7 6s ease-in-out infinite 1.5s'
            }}
          >
            <defs>
              <linearGradient id="hexagonGradient7" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--gold-base)" style={{ stopOpacity: 0.4 }} />
                <stop offset="100%" stopColor="var(--gold-base)" style={{ stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            <polygon
              points="50,15 85,30 85,70 50,85 15,70 15,30"
              fill="url(#hexagonGradient7)"
              strokeWidth="0.5"
              stroke="var(--gold-base)"
              style={{ opacity: 0.3 }}
            />
          </svg>
        </div>
      )}

      <style>{`
        @keyframes floatHexagon1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-3px, -5px) rotate(2deg); }
          50% { transform: translate(5px, 3px) rotate(-1deg); }
          75% { transform: translate(-4px, 6px) rotate(1deg); }
        }
        
        @keyframes floatHexagon2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(4px, -3px) rotate(-1deg); }
          50% { transform: translate(-2px, 5px) rotate(2deg); }
          75% { transform: translate(3px, -4px) rotate(-2deg); }
        }
        
        @keyframes floatHexagon3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-2px, 4px) rotate(1deg); }
          50% { transform: translate(3px, -2px) rotate(-1deg); }
          75% { transform: translate(-3px, 3px) rotate(2deg); }
        }
        
        @keyframes floatHexagon4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(4px, 3px) rotate(-2deg); }
          50% { transform: translate(-3px, -4px) rotate(1deg); }
          75% { transform: translate(2px, 5px) rotate(-1deg); }
        }
        
        @keyframes floatHexagon5 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-3px, -2px) rotate(1deg); }
          50% { transform: translate(2px, 3px) rotate(-1deg); }
          75% { transform: translate(-4px, -3px) rotate(2deg); }
        }
        
        @keyframes floatHexagon6 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(3px, -3px) rotate(-1deg); }
          50% { transform: translate(-2px, 2px) rotate(1deg); }
          75% { transform: translate(4px, -2px) rotate(-2deg); }
        }
        
        @keyframes floatHexagon7 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-2px, 2px) rotate(2deg); }
          50% { transform: translate(3px, -3px) rotate(-1deg); }
          75% { transform: translate(-1px, 4px) rotate(1deg); }
        }
      `}</style>
    </div>
  );

  // Filter content component with 6x6 grid layout
  const FilterContent = () => (
    <div style={{ 
      padding: isMobile ? '12px' : '8px', 
      borderRadius: '16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Hexagon Background */}
      <HexagonBackground />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Buy/Rent Toggle Row - Standalone */}
        <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
    flexWrap: "wrap",
  }}
>
  <Button
    variant={transactionType === "sell" ? "contained" : "outlined"}
    onClick={() => setTransactionType("sell")}
    size={isMobile ? "small" : "medium"}
    sx={{
      "&.MuiButton-contained": {
        backgroundColor: "var(--gold-base)",
        "&:hover": { backgroundColor: "var(--gold-dark)" },
      },
      "&.MuiButton-outlined": {
        borderColor: "var(--gold-base)",
        color: "var(--gold-base)",
        "&:hover": {
          borderColor: "var(--gold-dark)",
          backgroundColor: "var(--gold-light)",
        },
      },
      fontSize: isMobile ? "12px" : "14px",
      padding: isMobile ? "8px 10px" : "13px 23px",
      minHeight: isMobile ? "30px" : "36px",
      minWidth: isMobile ? "80px" : "100px",
    }}
  >
    Buy
  </Button>

  <Button
    variant={transactionType === "rent" ? "contained" : "outlined"}
    onClick={() => setTransactionType("rent")}
    size={isMobile ? "small" : "medium"}
    sx={{
      "&.MuiButton-contained": {
        backgroundColor: "var(--gold-base)",
        "&:hover": { backgroundColor: "var(--gold-dark)" },
      },
      "&.MuiButton-outlined": {
        borderColor: "var(--gold-base)",
        color: "var(--gold-base)",
        "&:hover": {
          borderColor: "var(--gold-dark)",
          backgroundColor: "var(--gold-light)",
        },
      },
      fontSize: isMobile ? "12px" : "14px",
      padding: isMobile ? "8px 10px" : "13px 18px",
      minHeight: isMobile ? "30px" : "36px",
      minWidth: isMobile ? "80px" : "100px",
    }}
  >
    Rent
  </Button>

  {/* Search Input */}
  <input
  type="text"
  placeholder="Search by City"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  style={{
    flexGrow: 1,        // ⭐ makes it full width
    width: "100%",      // ⭐ ensures full width on mobile + desktop
    padding: "10px 14px",
    fontSize: "14px",
    border: "1px solid var(--gold-base)",
    borderRadius: "8px",
    outline: "none",
    minWidth: isMobile ? "100%" : "250px", // ⭐ force full width on mobile
  }}
/>
</div>

        {/* 6x6 Grid Layout for Filters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(6, 1fr)',
          gap: isMobile ? '4px' : '4px',
          marginBottom: isMobile ? '12px' : '4px'
        }}>
          {/* City - spans 2 columns */}
          <div style={{ 
            gridColumn: isMobile ? '1' : 'span 2'
          }}>
            <CustomAutocomplete
              label="City*"
              multiple={false}
              value={selectedValues.city}
              onChange={handleAutocompleteChange("city")}
              options={cityOptions}
              error={validationErrors.city}
            />
          </div>

          {/* Property Type - spans 2 columns */}
          <div style={{ 
            gridColumn: isMobile ? '1' : 'span 2'
          }}>
            <CustomAutocomplete
              label="Property Type"
              multiple={true}
              value={selectedValues.propertyType}
              onChange={handleAutocompleteChange("propertyType")}
              options={PropertyType.fieldData}
              error={validationErrors.propertyType}
              helperText={validationErrors.propertyType ? "Please select at least one property type" : ""}
            />
          </div>

          {/* Bedroom - spans 2 columns */}
          <div style={{ 
            gridColumn: isMobile ? '1' : 'span 2'
          }}>
            <CustomAutocomplete
              label="Bedroom"
              multiple={true}
              value={selectedValues.bedroom}
              onChange={handleAutocompleteChange("bedroom")}
              options={Bedroom.fieldData}
              error={validationErrors.bedroom}
              helperText={validationErrors.bedroom ? "Please select at least one bedroom option" : ""}
            />
          </div>

          {/* Bathroom - spans 2 columns */}
          <div style={{ 
            gridColumn: isMobile ? '1' : 'span 2'
          }}>
            <CustomAutocomplete
              label="Bathroom"
              multiple={true}
              value={selectedValues.bathroom}
              onChange={handleAutocompleteChange("bathroom")}
              options={Bathroom.fieldData}
              error={validationErrors.bathroom}
              helperText={validationErrors.bathroom ? "Please select at least one bathroom option" : ""}
            />
          </div>

          {/* Parking - spans 2 columns */}
          <div style={{ 
            gridColumn: isMobile ? '1' : 'span 2'
          }}>
            <CustomAutocomplete
              label="Parking"
              multiple={true}
              value={selectedValues.parking}
              onChange={handleAutocompleteChange("parking")}
              options={Parking.fieldData}
              error={validationErrors.parking}
              helperText={validationErrors.parking ? "Please select at least one parking option" : ""}
            />
          </div>

          {/* Conditional filters - spans full width on mobile, 3 columns on desktop */}
          {transactionType === "sell" && (
            <div style={{ 
              gridColumn: isMobile ? '1' : 'span 2'
            }}>
              <CustomAutocomplete
                label="Possession"
                multiple={true}
                value={selectedValues.possessionStatus}
                onChange={handleAutocompleteChange("possessionStatus")}
                options={PossessionStatus.fieldData}
                error={validationErrors.possessionStatus}
                helperText={validationErrors.possessionStatus ? "Please select possession status" : ""}
              />
            </div>
          )}

          {transactionType === "rent" && (
            <div style={{ 
              gridColumn: isMobile ? '1' : 'span 2'
            }}>
              <CustomAutocomplete
                label="Furnishing"
                multiple={true}
                value={selectedValues.furnishingStatus}
                onChange={handleAutocompleteChange("furnishingStatus")}
                options={FurnishingStatus.fieldData}
                error={validationErrors.furnishingStatus}
                helperText={validationErrors.furnishingStatus ? "Please select furnishing status" : ""}
              />
            </div>
          )}

          {/* Empty space for alignment */}
          <div style={{ 
            gridColumn: isMobile ? '1' : 'span 3'
          }}>
            {/* This space can be used for additional filters or left empty */}
          </div>
        </div>

        {/* Buttons and Slider Row - spans full width */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
          gap: isMobile ? '8px' : '12px',
          marginBottom: isMobile ? '8px' : '12px'
        }}>
          {/* Slider Section */}
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '16px' : '24px', 
            padding: isMobile ? '6px 10px' : '1px 5px', 
            borderRadius: '8px',
            backgroundColor: "var(--gold-light)",
            border: '1px solid var(--gold-base)',
            boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
          }}>
            {/* Range Display */}
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}>
              <span style={{ 
                fontWeight: 600, 
                color: 'var(--location-blue-800)',
                fontSize: isMobile ? '12px' : '14px', 
              }}>
                {transactionType === "sell" ? "Price:" : "Rent:"}
              </span>
              <span style={{ 
                fontWeight: 'bold', 
                color: 'var(--gold-base)',
                fontSize: isMobile ? '12px' : '14px',
              }}>
                {getRangeText()}
              </span>
            </div>

            {/* Slider */}
            <Box sx={{ width: "100%" }}>
              <Slider
                getAriaLabel={() =>
                  transactionType === "sell"
                    ? "Buy price range"
                    : "Monthly rent range"
                }
                value={getCurrentSliderValue()}
                onChange={handleSliderChange}
                valueLabelDisplay="off"
                valueLabelFormat={formatValue}
                getAriaValueText={valuetext}
                min={sliderConfig.min}
                max={sliderConfig.max}
                step={sliderConfig.step}
                sx={{
                  color: "var(--gold-base)",
                  "& .MuiSlider-thumb": {
                    backgroundColor: "var(--gold-base)",
                    width: isMobile ? 12 : 14, 
                    height: isMobile ? 12 : 14,
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "var(--gold-base)",
                    height: 3,
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "var(--location-gray-300)",
                    height: 3,
                  },
                }}
              />
            </Box>
          </div>

          {/* Buttons Section */}
          <div style={{ 
            display: 'flex', 
            gap: isMobile ? '4px' : '8px'
          }}>
            {/* Search Button */}
            <Button
              className="button"
                onClick={() => {
      console.log("SEARCH BUTTON CLICKED");
      handleSearch();
  }}
              sx={{
                minWidth: isMobile ? '100px' : '120px', 
                height: isMobile ? "40px" : "53px",
                background: "linear-gradient(135deg, var(--gold-base), var(--gold-dark)) !important",
                color: "white !important",
                border: "none !important",
                borderRadius: "12px !important",
                fontWeight: "600 !important",
                fontSize: isMobile ? "12px !important" : "14px !important",
                boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06) !important",
                transition: "all 0.3s ease !important",
                "&:hover": {
                  background: "linear-gradient(135deg, var(--gold-dark), var(--gold-base)) !important",
                  transform: "translateY(-2px) translateZ(0) !important",
                  boxShadow:" 0 8px 20px rgba(0, 0, 0, 0.2) !important"
                },
                flex: 1
              }}
            >
              Search
            </Button>
            {/* Clear All Button */}
            <Button
              onClick={handleClearAll}
              variant="outlined"
              sx={{
                minWidth: isMobile ? '100px' : '120px', 
                height: isMobile ? "40px" : "53px",
                borderColor: "var(--gold-base)",
                color: "var(--gold-base)",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: isMobile ? "12px" : "14px",
                "&:hover": {
                  borderColor: "var(--gold-dark)",
                  backgroundColor: "var(--gold-light)",
                  transform: "translateY(-2px) translateZ(0)",
                  boxShadow:" 0 8px 20px rgba(0, 0, 0, 0.1)"
                },
                flex: 1
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      {isMobile && (
        <div style={{ 
          padding: '12px', 
          borderRadius: '8px',
          backgroundColor: 'white',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05), inset 0 1px 1px 0 rgba(0, 0, 0, 0.05)'
        }}>
          {/* Mobile Hexagon Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg 
              className="absolute -top-4 -right-4 opacity-10"
              width="50"
              height="50"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                animation: 'floatHexagon1 6s ease-in-out infinite'
              }}
            >
              <defs>
                <linearGradient id="mobileHexagon" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--gold-base)" />
                  <stop offset="100%" stopColor="var(--gold-dark)" />
                </linearGradient>
              </defs>
              <polygon
                points="50,15 85,30 85,70 50,85 15,70 15,30"
                fill="url(#mobileHexagon)"
                strokeWidth="1"
                stroke="var(--gold-base)"
              />
            </svg>
          </div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleMobileOpen}
              fullWidth
              size="small"
              sx={{
                borderColor: "var(--gold-base)",
                color: "var(--gold-base)",
                "&:hover": {
                  borderColor: "var(--gold-dark)",
                  backgroundColor: "var(--gold-light)",
                },
                fontSize: '12px',
                padding: '6px 12px',
              }}
            >
              Filters
              {(selectedValues.propertyType.length > 0 ||
                selectedValues.bedroom.length > 0 ||
                selectedValues.bathroom.length > 0) && (
                <span style={{
                  marginLeft: '6px',
                  backgroundColor: 'var(--location-blue-600)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px'
                }}>
                  {selectedValues.propertyType.length +
                    selectedValues.bedroom.length +
                    selectedValues.bathroom.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Desktop View */}
      {!isMobile && (
        <div style={{ 
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05), inset 0 1px 1px 0 rgba(0, 0, 0, 0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <FilterContent />
        </div>
      )}

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleMobileClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100vw",
            maxWidth: "380px",
            backgroundColor: "white",
            color: "var(--location-blue-800)",
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 1px 1px 0 rgba(0, 0, 0, 0.05)'
          },
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 12px", 
            borderBottom: "1px solid var(--location-gray-300)",
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'white'
          }}
        >
          <h2 style={{ 
            fontSize: "16px",
            fontWeight: "bold",
            margin: 0,
            color: "var(--location-blue-800)"
          }}>
            Filters
          </h2>
          <IconButton
            onClick={handleMobileClose}
            sx={{ color: "var(--location-blue-800)" }}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <div style={{ 
          overflowY: "auto", 
          padding: "8px",
          position: 'relative',
          zIndex: 1
        }}>
          <FilterContent />
        </div>
      </Drawer>
    </>
  );
};

export default FilterComponent;