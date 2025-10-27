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
  const data = propData || {
    label: "Search Here...",
    placeholder: "Search by Property Id, Pincode",
    fieldType: "CreatableDropdown",
    fieldData: [
      {
        label: "Select City*",
        units: [
          "Bangalore",
          "Mumbai",
          "Delhi",
          "Chennai",
          "Hyderabad",
          "Pune",
          "Kolkata",
          "Ahmedabad"
        ],
      },
    ],
    inputFirst: false,
  };

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
    
    // Check if each field is required based on asterisk in their respective labels
    const isTextFieldRequired = isFieldRequired(data.label);
    const isAutocompleteRequired = isFieldRequired(data.fieldData[0].label);
    
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

  // Hexagon SVG Component with Animation - Only Right Top and Left Bottom
  const HexagonBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Right Top Corner - 3 Hexagons */}
      <div className="absolute top-0 right-0">
        {/* Hexagon 1 - Top Right */}
        <svg 
          className="absolute -top-4 right-10 opacity-20"
          width="80"
          height="80"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: 'floatHexagon1 8s ease-in-out infinite'
          }}
        >
          <defs>
            <linearGradient id="hexagonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d2a63f" />
              <stop offset="100%" stopColor="#d2a63fb5" />
            </linearGradient>
          </defs>
          <polygon
            points="50,15 85,30 85,70 50,85 15,70 15,30"
            fill="url(#hexagonGradient1)"
            strokeWidth="1"
            stroke="#d2a63f"
          />
        </svg>

        {/* Hexagon 2 - Middle Right */}
        <svg 
          className="absolute top-10 right-3 opacity-15"
          width="60"
          height="60"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: 'floatHexagon2 6s ease-in-out infinite 1s'
          }}
        >
          <defs>
            <linearGradient id="hexagonGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d2a63f" />
              <stop offset="100%" stopColor="#d2a63f80" />
            </linearGradient>
          </defs>
          <polygon
            points="50,15 85,30 85,70 50,85 15,70 15,30"
            fill="url(#hexagonGradient2)"
            strokeWidth="1"
            stroke="#d2a63f60"
          />
        </svg>

        {/* Hexagon 3 - Bottom Right */}
        <svg 
          className="absolute top-1 right-1 opacity-10"
          width="50"
          height="50"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: 'floatHexagon3 7s ease-in-out infinite 0.5s'
          }}
        >
          <defs>
            <linearGradient id="hexagonGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d2a63f80" />
              <stop offset="100%" stopColor="#d2a63f" />
            </linearGradient>
          </defs>
          <polygon
            points="50,15 85,30 85,70 50,85 15,70 15,30"
            fill="url(#hexagonGradient3)"
            strokeWidth="1"
            stroke="#d2a63f40"
          />
        </svg>
      </div>

      {/* Left Bottom Corner - 4 Hexagons */}
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
              <stop offset="0%" stopColor="#d2a63fb5" />
              <stop offset="100%" stopColor="#d2a63f80" />
            </linearGradient>
          </defs>
          <polygon
            points="50,15 85,30 85,70 50,85 15,70 15,30"
            fill="url(#hexagonGradient5)"
            strokeWidth="1"
            stroke="#d2a63f60"
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
            <linearGradient id="hexagonGradient5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d2a63fb5" />
              <stop offset="100%" stopColor="#d2a63f80" />
            </linearGradient>
          </defs>
          <polygon
            points="50,15 85,30 85,70 50,85 15,70 15,30"
            fill="url(#hexagonGradient5)"
            strokeWidth="1"
            stroke="#d2a63f60"
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
              <stop offset="0%" stopColor="#d2a63f80" />
              <stop offset="100%" stopColor="#d2a63f40" />
            </linearGradient>
          </defs>
          <polygon
            points="50,15 85,30 85,70 50,85 15,70 15,30"
            fill="url(#hexagonGradient6)"
            strokeWidth="1"
            stroke="#d2a63f40"
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
              <stop offset="0%" stopColor="#d2a63f60" />
              <stop offset="100%" stopColor="#d2a63f20" />
            </linearGradient>
          </defs>
          <polygon
            points="50,15 85,30 85,70 50,85 15,70 15,30"
            fill="url(#hexagonGradient7)"
            strokeWidth="0.5"
            stroke="#d2a63f30"
          />
        </svg>
      </div>

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
      padding: '8px',
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
          gap: '16px',
          marginBottom: '16px',
          flexWrap: isMobile ? 'wrap' : 'nowrap'
        }}>
          {/* Buy/Rent Toggle Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '4px',
            flex: isMobile ? '1 1 100%' : 'none'
          }}>
            <Button
              variant={transactionType === "buy" ? "contained" : "outlined"}
              onClick={() => setTransactionType("buy")}
              size="medium"
              fullWidth={isMobile}
              sx={{
                "&.MuiButton-contained": {
                  backgroundColor: "#d2a63f",
                  "&:hover": {
                    backgroundColor: "#d2a63fb5",
                  },
                },
                "&.MuiButton-outlined": {
                  borderColor: "#d2a63f",
                  color: "#d2a63f",
                  "&:hover": {
                    borderColor: "#d2a63fb5",
                    backgroundColor: "rgba(210, 166, 63, 0.04)",
                  },
                },
                fontSize: '14px',
                padding: '13px 23px',
                minHeight: '36px'
              }}
            >
              Buy
            </Button>
            <Button
              variant={transactionType === "rent" ? "contained" : "outlined"}
              onClick={() => setTransactionType("rent")}
              size="medium"
              fullWidth={isMobile}
              sx={{
                "&.MuiButton-contained": {
                  backgroundColor: "#d2a63f",
                  "&:hover": {
                    backgroundColor: "#d2a63fb5",
                  },
                },
                "&.MuiButton-outlined": {
                  borderColor: "#d2a63f",
                  color: "#d2a63f",
                  "&:hover": {
                    borderColor: "#d2a63fb5",
                    backgroundColor: "rgba(210, 166, 63, 0.04)",
                  },
                },
                fontSize: '14px',
                padding: '13px 18px',
                minHeight: '36px'
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
            gap: '24px',
            padding: '8px 12px',
            borderRadius: '8px',
            backgroundColor: 'rgba(210, 166, 63, 0.05)',
            border: '1px solid #e5e5e5',
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
                color: '#374151',
                fontSize: '14px',
              }}>
                {transactionType === "buy" ? "Buy Price:" : "Monthly Rent:"}
              </span>
              <span style={{ 
                fontWeight: 'bold', 
                color: '#d2a63f',
                fontSize: '14px'
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
                  color: "#d2a63f",
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#d2a63f",
                    width: 14,
                    height: 14,
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "#d2a63f",
                    height: 3,
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "#e5e5e5",
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
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '8px',
          marginBottom: '16px'
        }}>
          {/* Property Type Dropdown */}
          <CustomAutocomplete
            label="Property Type"
            multiple={true}
            value={selectedValues.propertyType}
            onChange={handleAutocompleteChange("propertyType")}
            options={PropertyType.fieldData}
          />

          {/* Other filter components */}
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
          gap: '12px',
          marginBottom: '12px',
          flexWrap: isMobile ? 'wrap' : 'nowrap'
        }}>
          <div style={{ flex: 1, minWidth: isMobile ? '100%' : 'auto' }}>
            <CreatableDropdown
              dropdownLabel={data.label}
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
            gap: '8px',
            flex: isMobile ? '1 1 100%' : 'none'
          }}>
            <Button
              onClick={handleSearch}
              sx={{
                minWidth: '120px',
                height: "53px",
                background: "linear-gradient(135deg, #d2a63f, #d2a63fb5) !important",
                color: "white !important",
                border: "none !important",
                borderRadius: "12px !important",
                fontWeight: "600 !important",
                fontSize: "14px !important",
                boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06) !important",
                transition: "all 0.3s ease !important",
                "&:hover": {
                  background: "linear-gradient(135deg, #d2a63fb5, #d2a63f) !important",
                  transform: "scale(1.03)",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05) !important",
                },
              }}
            >
              Search
            </Button>
            <Button
              onClick={handleClearAll}
              variant="outlined"
              sx={{
                minWidth: '120px',
                height: "53px",
                borderColor: "#d2a63f",
                color: "#d2a63f",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "14px",
                "&:hover": {
                  borderColor: "#d2a63fb5",
                  backgroundColor: "rgba(210, 166, 63, 0.04)",
                },
              }}
            >
              Clear All
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
          padding: '16px',
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
              width="80"
              height="80"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                animation: 'floatHexagon1 6s ease-in-out infinite'
              }}
            >
              <defs>
                <linearGradient id="mobileHexagon" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d2a63f" />
                  <stop offset="100%" stopColor="#d2a63fb5" />
                </linearGradient>
              </defs>
              <polygon
                points="50,15 85,30 85,70 50,85 15,70 15,30"
                fill="url(#mobileHexagon)"
                strokeWidth="1"
                stroke="#d2a63f"
              />
            </svg>
          </div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleMobileOpen}
              fullWidth
              size="medium"
              sx={{
                borderColor: "#d2a63f",
                color: "#d2a63f",
                "&:hover": {
                  borderColor: "#d2a63fb5",
                  backgroundColor: "rgba(210, 166, 63, 0.04)",
                },
                fontSize: '14px',
                padding: '8px 16px',
              }}
            >
              Filters
              {(selectedValues.propertyType.length > 0 ||
                selectedValues.bedroom.length > 0 ||
                selectedValues.bathroom.length > 0) && (
                <span style={{
                  marginLeft: '6px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px'
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
            color: "#333333",
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 1px 1px 0 rgba(0, 0, 0, 0.05)'
          },
        }}
      >
        {/* Drawer Hexagon Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg 
            className="absolute -top-8 -left-8 opacity-5"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              animation: 'floatHexagon1 8s ease-in-out infinite'
            }}
          >
            <defs>
              <linearGradient id="drawerHexagon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d2a63f" />
                <stop offset="100%" stopColor="#d2a63fb5" />
              </linearGradient>
            </defs>
            <polygon
              points="50,15 85,30 85,70 50,85 15,70 15,30"
              fill="url(#drawerHexagon)"
              strokeWidth="1"
              stroke="#d2a63f"
            />
          </svg>
        </div>
        
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            borderBottom: "1px solid #e5e5e5",
            position: 'relative',
            zIndex: 1,
            backgroundColor: 'white'
          }}
        >
          <h2 style={{ 
            fontSize: "18px",
            fontWeight: "bold",
            margin: 0
          }}>
            Filters
          </h2>
          <IconButton
            onClick={handleMobileClose}
            sx={{ color: "#333333" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div style={{ 
          overflowY: "auto", 
          padding: "16px",
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