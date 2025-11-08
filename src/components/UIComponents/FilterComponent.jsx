import React, { useState, useEffect } from "react";
import CreatableDropdown from "./CreatableDropDown.jsx";
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

const FilterComponent = ({ 
  data: propData, 
  filterOptions: propFilterOptions, 
  onSearch 
}) => {
  const [transactionType, setTransactionType] = useState("buy");
  const [selectedValues, setSelectedValues] = useState({
    city: "",
    budget: "",
    propertyType: [],
    bedroom: [],
    bathroom: [],
    parking: [],
    possessionStatus: [],
    furnishingStatus: [],
    creatableDropdown: {
      textField: "",
      autocomplete: "",
    },
  });

  // Mobile filter drawer state
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  // isMobile is true for screens below 'md' (768px by default)
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); 

  // Different slider ranges for Buy vs Rent
  const [buySliderValue, setBuySliderValue] = useState([0, 100]);
  const [rentSliderValue, setRentSliderValue] = useState([10, 50]);
  
  // Validation state for both fields
  const [validationErrors, setValidationErrors] = useState({
    textField: false,
    autocomplete: false
  });

  // Use props if provided, otherwise use default data
  const data = propData;

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
    return transactionType === "buy" ? buySliderValue : rentSliderValue;
  };

  const formatValue = (value) => {
    if (value >= 100) {
      return `${(value / 100).toFixed(1)} Cr`;
    }
    return `${value} L`;
  };

  const handleFieldChange = (fieldName, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleCityChange = (value) => {
    console.log("CreatableDropdown value:", value);

    // Clear validation errors when user starts typing in either field
    if (validationErrors.textField || validationErrors.autocomplete) {
      setValidationErrors({
        textField: false,
        autocomplete: false
      });
    }

    setSelectedValues((prev) => ({
      ...prev,
      creatableDropdown: {
        textField: value.textField || "",
        autocomplete: value.autocomplete || "",
      },
      city: value.autocomplete || value.textField || "",
    }));
  };

  const handleAutocompleteChange = (fieldName) => (event, value) => {
    handleFieldChange(fieldName, value);
  };

  const handleSliderChange = (event, newValue) => {
    if (transactionType === "buy") {
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
    if (transactionType === "buy") {
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

  const validateCity = () => {
  const { textField, autocomplete } = selectedValues.creatableDropdown;
  
const isTextFieldRequired = isFieldRequired(data.fieldData[0].InputLabel); // Check InputLabel
const isAutocompleteRequired = isFieldRequired(data.fieldData[0].DropdownLabel); // Check DropdownLabel
  
  const textFieldEmpty = !textField || textField.trim() === '';
  const autocompleteEmpty = !autocomplete || autocomplete.trim() === '';
  
  // Validate each field separately based on their own requirement
  const textFieldError = isTextFieldRequired && textFieldEmpty;
  const autocompleteError = isAutocompleteRequired && autocompleteEmpty;
  
  setValidationErrors({
    textField: textFieldError,
    autocomplete: autocompleteError
  });
  
  // Return true only if all required fields are valid
  return !textFieldError && !autocompleteError;
};

  const handleSearch = () => {
    // Validate city field
    const isCityValid = validateCity();
    
    if (!isCityValid) {
      console.log("City validation failed");
      console.log("TextField error:", validationErrors.textField);
      console.log("Autocomplete error:", validationErrors.autocomplete);
      return; // Stop execution if validation fails
    }

    const currentSliderValue = getCurrentSliderValue();
    const filterData = {
      transaction_type: transactionType,
      filters: {
        city: selectedValues.city,
        search_query: selectedValues.creatableDropdown.textField,
        budget_range: {
          min: currentSliderValue[0] * 100000,
          max: currentSliderValue[1] * 100000,
          display: getRangeText(),
          unit: transactionType === "buy" ? "buy_price" : "rent_price",
        },
        property_type: selectedValues.propertyType,
        bedroom: selectedValues.bedroom,
        bathroom: selectedValues.bathroom,
        parking: selectedValues.parking,
        ...(transactionType === "buy" && {
          possession_status: selectedValues.possessionStatus,
        }),
        ...(transactionType === "rent" && {
          furnishing_status: selectedValues.furnishingStatus,
        }),
      },
      search_metadata: {
        text_input: selectedValues.creatableDropdown.textField,
        selected_option: selectedValues.creatableDropdown.autocomplete,
      },
    };

    console.log("=== FILTER DATA TO SEND TO BACKEND ===");
    console.log(JSON.stringify(filterData, null, 2));

    // Call the onSearch callback if provided
    if (onSearch) {
      onSearch(filterData);
    }

    if (isMobile) {
      handleMobileClose();
    }
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
      creatableDropdown: {
        textField: "",
        autocomplete: "",
      },
    });
    setBuySliderValue([0, 100]);
    setRentSliderValue([10, 50]);
    setValidationErrors({
      textField: false,
      autocomplete: false
    });
  };

  const sliderConfig = getSliderConfig();

  // Check if each field is required separately
  const isTextFieldRequired = isFieldRequired(data.label);
  const isAutocompleteRequired = isFieldRequired(data.fieldData[0].label);

  // Hexagon SVG Component with Animation - Using CSS variables
  // NOTE: Reduced opacity and size of hexagons for mobile drawer (Drawer section)
  const HexagonBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Right Top Corner - 3 Hexagons */}
      <div className="absolute top-0 right-0">
        {/* Hexagon 1 - Top Right */}
        <svg 
          className="absolute -top-4 right-10"
          // Conditional size and opacity reduction for mobile
          width={isMobile ? "50" : "80"}
          height={isMobile ? "50" : "80"}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: isMobile ? 0.10 : 0.20, // Reduced opacity on mobile
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
          // Conditional size and opacity reduction for mobile
          width={isMobile ? "40" : "60"}
          height={isMobile ? "40" : "60"}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: isMobile ? 0.08 : 0.15, // Reduced opacity on mobile
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
          // Conditional size and opacity reduction for mobile
          width={isMobile ? "30" : "50"}
          height={isMobile ? "30" : "50"}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: isMobile ? 0.05 : 0.10, // Reduced opacity on mobile
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

      <style jsx>{`
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

  // Filter content component with uniform spacing
  const FilterContent = () => (
    <div style={{ 
      // 🚀 REDUCED PADDING ON MOBILE
      padding: isMobile ? '12px' : '8px', 
      borderRadius: '16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Hexagon Background */}
      <HexagonBackground />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Row: Buy/Rent Toggle + Budget Slider */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          // 🚀 REDUCED GAP ON MOBILE
          gap: isMobile ? '8px' : '16px', 
          // 🚀 REDUCED MARGIN BOTTOM ON MOBILE
          marginBottom: isMobile ? '12px' : '16px', 
          flexWrap: isMobile ? 'wrap' : 'nowrap'
        }}>
          {/* Buy/Rent Toggle Buttons */}
          <div style={{ 
            display: 'flex', 
            // 🚀 REDUCED GAP ON MOBILE
            gap: isMobile ? '2px' : '4px',
            flex: isMobile ? '1 1 100%' : 'none'
          }}>
            <Button
              variant={transactionType === "buy" ? "contained" : "outlined"}
              onClick={() => setTransactionType("buy")}
              // 🚀 REDUCED SIZE TO SMALLER FOR MOBILE
              size={isMobile ? "small" : "medium"} 
              fullWidth={isMobile}
              sx={{
                "&.MuiButton-contained": {
                  backgroundColor: "var(--gold-base)",
                  "&:hover": {
                    backgroundColor: "var(--gold-dark)",
                  },
                },
                "&.MuiButton-outlined": {
                  borderColor: "var(--gold-base)",
                  color: "var(--gold-base)",
                  "&:hover": {
                    borderColor: "var(--gold-dark)",
                    backgroundColor: "var(--gold-light)",
                  },
                },
                // 🚀 REDUCED FONT/PADDING ON MOBILE
                fontSize: isMobile ? '12px' : '14px', 
                padding: isMobile ? '8px 10px' : '13px 23px',
                minHeight: isMobile ? '30px' : '36px'
              }}
            >
              Buy
            </Button>
            <Button
              variant={transactionType === "rent" ? "contained" : "outlined"}
              onClick={() => setTransactionType("rent")}
              // 🚀 REDUCED SIZE TO SMALLER FOR MOBILE
              size={isMobile ? "small" : "medium"}
              fullWidth={isMobile}
              sx={{
                "&.MuiButton-contained": {
                  backgroundColor: "var(--gold-base)",
                  "&:hover": {
                    backgroundColor: "var(--gold-dark)",
                  },
                },
                "&.MuiButton-outlined": {
                  borderColor: "var(--gold-base)",
                  color: "var(--gold-base)",
                  "&:hover": {
                    borderColor: "var(--gold-dark)",
                    backgroundColor: "var(--gold-light)",
                  },
                },
                // 🚀 REDUCED FONT/PADDING ON MOBILE
                fontSize: isMobile ? '12px' : '14px', 
                padding: isMobile ? '8px 10px' : '13px 18px',
                minHeight: isMobile ? '30px' : '36px'
              }}
            >
              Rent
            </Button>
          </div>

          {/* Budget Slider */}
          <div style={{ 
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            // 🚀 REDUCED GAP ON MOBILE
            gap: isMobile ? '16px' : '24px', 
            // 🚀 REDUCED PADDING ON MOBILE
            padding: isMobile ? '6px 10px' : '8px 12px', 
            borderRadius: '8px',
            backgroundColor: "var(--gold-light)",
            border: '1px solid var(--gold-base)',
            minWidth: isMobile ? '100%' : '300px',
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
                // 🚀 REDUCED FONT SIZE ON MOBILE
                fontSize: isMobile ? '12px' : '14px', 
              }}>
                {transactionType === "buy" ? "Price:" : "Rent:"} {/* Shortened label for mobile */}
              </span>
              <span style={{ 
                fontWeight: 'bold', 
                color: 'var(--gold-base)',
                // 🚀 REDUCED FONT SIZE ON MOBILE
                fontSize: isMobile ? '12px' : '14px',
              }}>
                {getRangeText()}
              </span>
            </div>

            {/* Slider */}
            <Box sx={{ width: "100%" }}>
              <Slider
                getAriaLabel={() =>
                  transactionType === "buy"
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
                    // 🚀 REDUCED THUMB SIZE ON MOBILE
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
        </div>

        {/* Filter Dropdowns Section with Uniform Spacing */}
        <div style={{
          display: 'grid',
          // 🚀 Grid always uses 1 column on mobile
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
          // 🚀 REDUCED GAP ON MOBILE
          gap: isMobile ? '8px' : '8px',
          // 🚀 REDUCED MARGIN BOTTOM ON MOBILE
          marginBottom: isMobile ? '12px' : '16px'
        }}>
          {/* All CustomAutocomplete components will need internal sizing adjustments 
              (assuming CustomAutocomplete uses TextField, its height will shrink 
               due to less padding in the layout) */}
          <CustomAutocomplete
            label="Property Type"
            multiple={true}
            value={selectedValues.propertyType}
            onChange={handleAutocompleteChange("propertyType")}
            options={PropertyType.fieldData}
          />

          <CustomAutocomplete
            label="Bedroom"
            multiple={true}
            value={selectedValues.bedroom}
            onChange={handleAutocompleteChange("bedroom")}
            options={Bedroom.fieldData}
          />

          <CustomAutocomplete
            label="Bathroom"
            multiple={true}
            value={selectedValues.bathroom}
            onChange={handleAutocompleteChange("bathroom")}
            options={Bathroom.fieldData}
          />

          <CustomAutocomplete
            label="Parking"
            multiple={true}
            value={selectedValues.parking}
            onChange={handleAutocompleteChange("parking")}
            options={Parking.fieldData}
          />

          {/* Conditional filters */}
          {transactionType === "buy" && (
            <CustomAutocomplete
              label="Possession"
              multiple={true}
              value={selectedValues.possessionStatus}
              onChange={handleAutocompleteChange("possessionStatus")}
              options={PossessionStatus.fieldData}
            />
          )}

          {transactionType === "rent" && (
            <CustomAutocomplete
              label="Furnishing"
              multiple={true}
              value={selectedValues.furnishingStatus}
              onChange={handleAutocompleteChange("furnishingStatus")}
              options={FurnishingStatus.fieldData}
            />
          )}
        </div>

        {/* City Search Dropdown and Buttons Row */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start',
          // 🚀 REDUCED GAP ON MOBILE
          gap: isMobile ? '8px' : '12px',
          // 🚀 REDUCED MARGIN BOTTOM ON MOBILE
          marginBottom: isMobile ? '8px' : '12px',
          flexWrap: isMobile ? 'wrap' : 'nowrap'
        }}>
          {/* CreatableDropdown (assumed to be responsive/takes full width on mobile) */}
          <div style={{ flex: 1, minWidth: isMobile ? '100%' : 'auto' }}>
           <CreatableDropdown
            dropdownLabel={data.fieldData[0].InputLabel} // Add this prop
            key={`${selectedValues.creatableDropdown.textField}-${selectedValues.creatableDropdown.autocomplete}`}
            fieldData={data.fieldData}
            value={{
              textField: selectedValues.creatableDropdown.textField,
              autocomplete: selectedValues.creatableDropdown.autocomplete,
            }}
            onChange={handleCityChange}
            inputFirst={data.inputFirst}
            dropdownisRequired={isAutocompleteRequired}
            dropdownError={validationErrors.autocomplete}
            textfieldisRequired={isTextFieldRequired}
            textfieldError={validationErrors.textField}
          />
          </div>
          
          <div style={{ 
            display: 'flex', 
            // 🚀 REDUCED GAP ON MOBILE
            gap: isMobile ? '4px' : '8px',
            flex: isMobile ? '1 1 100%' : 'none'
          }}>
            {/* Search Button */}
            <Button
            className="button"
              onClick={handleSearch}
              sx={{
                // 🚀 REDUCED MIN-WIDTH/HEIGHT ON MOBILE
                minWidth: isMobile ? '100px' : '120px', 
                height: isMobile ? "40px" : "53px",
                background: "linear-gradient(135deg, var(--gold-base), var(--gold-dark)) !important",
                color: "white !important",
                border: "none !important",
                borderRadius: "12px !important",
                fontWeight: "600 !important",
                // 🚀 REDUCED FONT SIZE ON MOBILE
                fontSize: isMobile ? "12px !important" : "14px !important",
                boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06) !important",
                transition: "all 0.3s ease !important",
                "&:hover": {
                  background: "linear-gradient(135deg, var(--gold-dark), var(--gold-base)) !important",
                  transform: "translateY(-2px) translateZ(0) !important",
                  boxShadow:" 0 8px 20px rgba(0, 0, 0, 0.2) !important"
                },
                flex: 1 // Take up equal space
              }}
            >
              Search
            </Button>
            {/* Clear All Button */}
            <Button
              onClick={handleClearAll}
              variant="outlined"
              sx={{
                // 🚀 REDUCED MIN-WIDTH/HEIGHT ON MOBILE
                minWidth: isMobile ? '100px' : '120px', 
                height: isMobile ? "40px" : "53px",
                borderColor: "var(--gold-base)",
                color: "var(--gold-base)",
                borderRadius: "12px",
                fontWeight: "600",
                // 🚀 REDUCED FONT SIZE ON MOBILE
                fontSize: isMobile ? "12px" : "14px",
                "&:hover": {
                  borderColor: "var(--gold-dark)",
                  backgroundColor: "var(--gold-light)",
                  transform: "translateY(-2px) translateZ(0)",
                  boxShadow:" 0 8px 20px rgba(0, 0, 0, 0.1)"
                },
                flex: 1 // Take up equal space
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
          // 🚀 REDUCED PADDING ON MOBILE CONTAINER
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
              width="50" // Reduced size
              height="50" // Reduced size
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
              // 🚀 USED SMALL SIZE ON MOBILE BUTTON
              size="small"
              sx={{
                borderColor: "var(--gold-base)",
                color: "var(--gold-base)",
                "&:hover": {
                  borderColor: "var(--gold-dark)",
                  backgroundColor: "var(--gold-light)",
                },
                // 🚀 REDUCED FONT/PADDING ON MOBILE
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
                  width: '18px', // Reduced size
                  height: '18px', // Reduced size
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px' // Reduced font size
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
            // 🚀 REDUCED PADDING ON DRAWER HEADER
            padding: "8px 12px", 
            borderBottom: "1px solid var(--location-gray-300)",
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'white'
          }}
        >
          <h2 style={{ 
            // 🚀 REDUCED FONT SIZE ON DRAWER HEADER
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
            size="small" // Reduced button size
          >
            <CloseIcon fontSize="small" /> {/* Reduced icon size */}
          </IconButton>
        </div>
        <div style={{ 
          overflowY: "auto", 
          // 🚀 REDUCED PADDING ON DRAWER CONTENT
          padding: "8px",
          position: 'relative',
          zIndex: 1
        }}>
          {/* FilterContent renders the now-compacted filters */}
          <FilterContent />
        </div>
      </Drawer>
    </>
  );
};

export default FilterComponent;