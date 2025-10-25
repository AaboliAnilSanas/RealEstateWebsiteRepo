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
    label: "Search Here...", // No asterisk - autocomplete is NOT required
    placeholder: "Search by Property Id, Pincode",
    fieldType: "CreatableDropdown",
    fieldData: [
      {
        label: "Select City*", // Has asterisk - textfield IS required
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
    const isTextFieldRequired = isFieldRequired(data.label); // "Select City*"
    const isAutocompleteRequired = isFieldRequired(data.fieldData[0].label); // "Search Here..."
    
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

  const sliderConfig = getSliderConfig();

  // Check if each field is required separately
  const isTextFieldRequired = isFieldRequired(data.label);
  const isAutocompleteRequired = isFieldRequired(data.fieldData[0].label);

  // Filter content component with inline styles
  const FilterContent = () => (
    <div style={{ 
      padding: '12px', 
      borderRadius: '20px'
    }}>
      {/* Buy/Rent Toggle Buttons at Top */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '12px'
      }}>
        <Button
          variant={transactionType === "buy" ? "contained" : "outlined"}
          onClick={() => setTransactionType("buy")}
          size="large"
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
          }}
        >
          Buy
        </Button>
        <Button
          variant={transactionType === "rent" ? "contained" : "outlined"}
          onClick={() => setTransactionType("rent")}
          size="large"
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
          }}
        >
          Rent
        </Button>
      </div>

      <div style={{ marginTop: '1.25rem' }}>
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

      {/* Budget Slider Section */}
      <div style={{ marginTop: '12px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '24px',
          padding: '12px',
          borderRadius: '12px',
          backgroundColor: 'rgba(210, 166, 63, 0.05)',
          border: '1px solid #e5e5e5'
        }}>
          <div style={{ 
            width: '20%', 
            minWidth: '150px'
          }}>
            <p style={{ 
              fontWeight: 600, 
              color: '#374151',
              margin: 0
            }}>
              {transactionType === "buy"
                ? "Buy Price Range:"
                : "Monthly Rent Range:"}
              <span style={{ 
                paddingLeft: '4px', 
                fontSize: '15px', 
                fontWeight: 'bold', 
                color: '#d2a63f'
              }}>
                {getRangeText()}
              </span>
            </p>
          </div>
          <Box sx={{ width: isMobile ? "100%" : "80%", mt: isMobile ? 2 : 0 }}>
            <Slider
              getAriaLabel={() =>
                transactionType === "buy"
                  ? "Buy price range"
                  : "Monthly rent range"
              }
              value={getCurrentSliderValue()}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              valueLabelFormat={formatValue}
              getAriaValueText={valuetext}
              min={sliderConfig.min}
              max={sliderConfig.max}
              step={sliderConfig.step}
              sx={{
                color: "#d2a63f",
                "& .MuiSlider-thumb": {
                  backgroundColor: "#d2a63f",
                },
                "& .MuiSlider-track": {
                  backgroundColor: "#d2a63f",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#e5e5e5",
                },
                "& .MuiSlider-markLabel": {
                  color: "#666666",
                  fontSize: "13px",
                },
              }}
            />
          </Box>
        </div>

        {/* Filter Dropdowns Section */}
        <div style={{
          display: isMobile ? 'flex' : 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'flex-start' : 'space-between',
          alignItems: isMobile ? 'stretch' : 'flex-start',
          gap: '24px',
          marginTop: '15px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            gap: '12px',
            flex: 1
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
                label="Possession Status"
                multiple={true}
                value={selectedValues.possessionStatus}
                onChange={handleAutocompleteChange("possessionStatus")}
                options={PossessionStatus.fieldData}
              />
            )}

            {transactionType === "rent" && (
              <CustomAutocomplete
                label="Furnishing Status"
                multiple={true}
                value={selectedValues.furnishingStatus}
                onChange={handleAutocompleteChange("furnishingStatus")}
                options={FurnishingStatus.fieldData}
              />
            )}
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            sx={{
              width: isMobile ? "100%" : "200px",
              height: "56px",
              background: "linear-gradient(135deg, #d2a63f, #d2a63fb5) !important",
              color: "white !important",
              border: "none !important",
              borderRadius: "20px !important",
              fontWeight: "600 !important",
              fontSize: "15px !important",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important",
              transition: "all 0.3s ease !important",
              "&:hover": {
                background: "linear-gradient(135deg, #d2a63fb5, #d2a63f) !important",
                transform: "scale(1.05)",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important",
              },
              marginTop: isMobile ? 2 : 0,
            }}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      {isMobile && (
        <div style={{ 
          padding: '24px', 
          borderRadius: '12px', 
          backgroundColor: 'white'
        }}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleMobileOpen}
            fullWidth
            size="large"
            sx={{
              borderColor: "#d2a63f",
              color: "#d2a63f",
              "&:hover": {
                borderColor: "#d2a63fb5",
                backgroundColor: "rgba(210, 166, 63, 0.04)",
              },
            }}
          >
            Filters
            {(selectedValues.propertyType.length > 0 ||
              selectedValues.bedroom.length > 0 ||
              selectedValues.bathroom.length > 0) && (
              <span style={{
                marginLeft: '8px',
                backgroundColor: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}>
                {selectedValues.propertyType.length +
                  selectedValues.bedroom.length +
                  selectedValues.bathroom.length}
              </span>
            )}
          </Button>
        </div>
      )}

      {/* Desktop View */}
      {!isMobile && (
        <div style={{ 
          borderRadius: '12px', 
          backgroundColor: 'white',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
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
            maxWidth: "400px",
            backgroundColor: "white",
            color: "#333333",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            borderBottom: "1px solid #e5e5e5"
          }}
        >
          <h2 style={{ 
            fontSize: "20px", 
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
          padding: "24px"
        }}>
          <FilterContent />
        </div>
      </Drawer>
    </>
  );
};

export default FilterComponent;