// src/components/PropertyPages/PropertListing.jsx
import React, { useState, useEffect, useCallback } from "react";
import ListingCard from "../UIComponents/ListingCard.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import debounce from "lodash/debounce";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../UIComponents/PageLoader.jsx";

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(4); // Show 4 properties per page

  // Price range configurations
  const priceRanges = {
    buy: {
      min: 0,
      max: 100000000, // 1 Cr
      step: 500000,
      displayMin: "0 L",
      displayMax: "1 Cr+"
    },
    rent: {
      min: 5000,
      max: 6000000, // 60 L
      step: 5000,
      displayMin: "₹5K",
      displayMax: "60 L+"
    }
  };

  // Updated filters state to match your JSON structure
  const [filters, setFilters] = useState({
    transaction_type: "buy",
    filters: {
      city: "",
      budget_range: {
        min: priceRanges.buy.min,
        max: priceRanges.buy.max,
        display: `${priceRanges.buy.displayMin} - ${priceRanges.buy.displayMax}`,
        unit: "buy_price"
      },
      property_type: [],
      bedroom: [],
      bathroom: [],
      parking: [],
      possession_status: []
    },
    search_metadata: {
      text_input: "",
      selected_option: ""
    }
  });

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
        carpetArea: "1200",
        floor: "5",
        totalFloors: "12",
        availability: "Ready to Move",
        possession: "2024",
        ownership: "Freehold",
        price: 25000000,
        description: "Beautiful 3BHK apartment with modern amenities and great location.",
      },
      media: {
        imageUrl: "/house1.jpg",
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
        carpetArea: "1800",
        floor: "2",
        totalFloors: "2",
        availability: "Ready to Move",
        possession: "2023",
        ownership: "Freehold",
        price: 85000,
        description: "Spacious villa with garden and modern amenities in prime location.",
      },
      media: {
        imageUrl: "/house1.jpg",
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
        bedrooms: "1",
        bathrooms: "2",
        balconies: "1",
        carpetArea: "800",
        floor: "3",
        totalFloors: "10",
        availability: "Ready to Move",
        possession: "2024",
        ownership: "Leasehold",
        price: 12000000,
        description: "Premium office space in central business district with great connectivity.",
      },
      media: {
        imageUrl: "/house1.jpg",
        photos: ["/office1.jpg", "/office2.jpg"],
      },
    },
    {
      id: 4,
      basicDetails: {
        transactionType: "BUY",
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
        carpetArea: "900",
        floor: "1",
        totalFloors: "3",
        availability: "Ready to Move",
        possession: "2024",
        ownership: "Freehold",
        price: 15000,
        description: "Cozy PG accommodation with all modern facilities and security.",
      },
      media: {
        imageUrl: "/house1.jpg",
        photos: ["/pg1.jpg", "/pg2.jpg"],
      },
    },
    {
      id: 5,
      basicDetails: {
        transactionType: "Sell",
        propertyCategory: "Residential",
        propertyType: "Flat/Apartment",
      },
      location: {
        city: "Bangalore",
        locality: "Electronic City",
        apartment: "Tech Park Residences",
        subLocality: "Electronic City",
        houseNo: "B-304",
      },
      propertyProfile: {
        bedrooms: "2",
        bathrooms: "2",
        balconies: "1",
        carpetArea: "1100",
        floor: "3",
        totalFloors: "8",
        availability: "Ready to Move",
        possession: "2024",
        ownership: "Freehold",
        price: 8500000,
        description: "Modern 2BHK apartment in tech hub with great amenities.",
      },
      media: {
        imageUrl: "/house1.jpg",
        photos: ["/property5.jpg", "/property6.jpg"],
      },
    },
    {
      id: 6,
      basicDetails: {
        transactionType: "Rent/Lease",
        propertyCategory: "Residential",
        propertyType: "Flat/Apartment",
      },
      location: {
        city: "Mumbai",
        locality: "Andheri West",
        apartment: "Skyline Towers",
        subLocality: "Andheri",
        houseNo: "C-1201",
      },
      propertyProfile: {
        bedrooms: "3",
        bathrooms: "2",
        balconies: "2",
        carpetArea: "1300",
        floor: "12",
        totalFloors: "15",
        availability: "Ready to Move",
        possession: "2024",
        ownership: "Freehold",
        price: 55000,
        description: "Luxurious 3BHK with sea view and premium amenities.",
      },
      media: {
        imageUrl: "/house1.jpg",
        photos: ["/property7.jpg", "/property8.jpg"],
      },
    },
  ];

  // Updated filter options to match your JSON structure
  const filterOptions = {
    transaction_type: ["buy", "rent"],
    property_type: ["Apartment", "Independent House/Villa", "Office Space", "Builder Floor"],
    city: ["Mumbai", "Bangalore", "Delhi", "Pune"],
    bedroom: ["1", "2", "3", "4", "4+"],
    bathroom: ["1", "2", "3", "4", "5+"],
    parking: ["0", "1", "2", "3", "4+"],
    possession_status: ["Ready To Move", "Under Construction"]
  };

  // Color scheme
  const colors = {
    blue: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E3A8A',
      900: '#1E3A8A'
    },
    gold: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      base: '#d2a63f',
      light: '#fbf1d4',
      dark: '#b8860b'
    },
    gray: {
      300: '#D1D5DB',
      400: '#9CA3AF',
      600: '#4B5563'
    }
  };

  // Format price for display
  const formatPrice = (price, type = "buy") => {
    if (type === "rent") {
      if (price >= 100000) {
        return `₹${(price / 100000).toFixed(1)}L`;
      } else if (price >= 1000) {
        return `₹${(price / 1000).toFixed(0)}K`;
      }
      return `₹${price}`;
    } else {
      if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(1)}Cr`;
      }
      return `₹${(price / 100000).toFixed(0)}L`;
    }
  };

  // Get current price range based on transaction type
  const getCurrentPriceRange = () => {
    return priceRanges[filters.transaction_type];
  };

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;

  // Update displayed properties when filtered properties or page changes
  useEffect(() => {
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
    setDisplayedProperties(currentProperties);
  }, [filteredProperties, currentPage, indexOfFirstProperty, indexOfLastProperty]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProperties]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Simulate API call for initial data
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setProperties(dummyProperties);
        setFilteredProperties(dummyProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Update price range when transaction type changes
  useEffect(() => {
    const currentRange = getCurrentPriceRange();
    setFilters(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        budget_range: {
          min: currentRange.min,
          max: currentRange.max,
          display: `${currentRange.displayMin} - ${currentRange.displayMax}`,
          unit: `${prev.transaction_type}_price`
        }
      }
    }));
  }, [filters.transaction_type]);

  // Debounced API call for filters
  const debouncedApiCall = useCallback(
    debounce(async (filters) => {
      try {
        setFilterLoading(true);
        
        // Prepare the API payload
        const apiPayload = {
          transaction_type: filters.transaction_type,
          filters: {
            ...filters.filters,
            budget_range: {
              ...filters.filters.budget_range,
              display: `${formatPrice(filters.filters.budget_range.min, filters.transaction_type)} - ${formatPrice(filters.filters.budget_range.max, filters.transaction_type)}`
            }
          },
          search_metadata: {
            text_input: "",
            selected_option: filters.filters.city
          }
        };
        
        console.log("API Call - Sending filters to backend:", JSON.stringify(apiPayload, null, 2));
        
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        // Client-side filtering
        const filtered = dummyProperties.filter(property => {
          // Transaction Type filter mapping
          if (apiPayload.transaction_type === "buy" && property.basicDetails.transactionType !== "Sell") {
            return false;
          }
          if (apiPayload.transaction_type === "rent" && !["Rent/Lease", "PG"].includes(property.basicDetails.transactionType)) {
            return false;
          }
          
          // City filter
          if (apiPayload.filters.city && property.location.city !== apiPayload.filters.city) {
            return false;
          }
          
          // Property Type filter mapping
          if (apiPayload.filters.property_type.length > 0) {
            const propertyTypeMap = {
              "Flat/Apartment": "Apartment",
              "Independent House/Villa": "Independent House/Villa", 
              "Office Space": "Office Space",
              "Builder Floor": "Builder Floor"
            };
            const mappedPropertyType = propertyTypeMap[property.basicDetails.propertyType];
            if (!apiPayload.filters.property_type.includes(mappedPropertyType)) {
              return false;
            }
          }
          
          // Bedroom filter
          if (apiPayload.filters.bedroom.length > 0) {
            const propertyBedrooms = property.propertyProfile.bedrooms;
            if (!apiPayload.filters.bedroom.some(filterBedroom => {
              if (filterBedroom === "4+") return parseInt(propertyBedrooms) >= 4;
              return propertyBedrooms === filterBedroom;
            })) {
              return false;
            }
          }
          
          // Bathroom filter
          if (apiPayload.filters.bathroom.length > 0) {
            const propertyBathrooms = property.propertyProfile.bathrooms;
            if (!apiPayload.filters.bathroom.some(filterBathroom => {
              if (filterBathroom === "5+") return parseInt(propertyBathrooms) >= 5;
              return propertyBathrooms === filterBathroom;
            })) {
              return false;
            }
          }
          
          // Parking filter
          if (apiPayload.filters.parking.length > 0) {
            const propertyParking = property.propertyProfile.balconies;
            if (!apiPayload.filters.parking.some(filterParking => {
              if (filterParking === "4+") return parseInt(propertyParking) >= 4;
              return propertyParking === filterParking;
            })) {
              return false;
            }
          }
          
          // Price Range filter
          const price = property.propertyProfile.price;
          if (price < apiPayload.filters.budget_range.min || price > apiPayload.filters.budget_range.max) {
            return false;
          }
          
          // Possession Status filter mapping
          if (apiPayload.filters.possession_status.length > 0) {
            const availabilityMap = {
              "Ready to Move": "Ready To Move",
              "Under Construction": "Under Construction"
            };
            const mappedAvailability = availabilityMap[property.propertyProfile.availability];
            if (!apiPayload.filters.possession_status.includes(mappedAvailability)) {
              return false;
            }
          }
          
          return true;
        });
        
        setFilteredProperties(filtered);
      } catch (error) {
        console.error("Error applying filters:", error);
      } finally {
        setFilterLoading(false);
      }
    }, 400),
    []
  );

  // Call API whenever filters change
  useEffect(() => {
    const hasActiveFilters = 
      filters.transaction_type !== "buy" ||
      filters.filters.city !== "" ||
      filters.filters.property_type.length > 0 ||
      filters.filters.bedroom.length > 0 ||
      filters.filters.bathroom.length > 0 ||
      filters.filters.parking.length > 0 ||
      filters.filters.possession_status.length > 0 ||
      filters.filters.budget_range.min > getCurrentPriceRange().min ||
      filters.filters.budget_range.max < getCurrentPriceRange().max;
    
    if (hasActiveFilters && properties.length > 0) {
      debouncedApiCall(filters);
    } else if (properties.length > 0) {
      setFilteredProperties(properties);
    }
  }, [filters, properties, debouncedApiCall]);

  // Handle filter changes
  const handleFilterChange = (filterType, value, isNested = false) => {
    if (isNested) {
      setFilters(prev => ({
        ...prev,
        filters: {
          ...prev.filters,
          [filterType]: value
        }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  // Handle nested budget range changes
  const handleBudgetRangeChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        budget_range: {
          ...prev.filters.budget_range,
          [field]: value
        }
      }
    }));
  };

  // Handle checkbox changes for array filters
  const handleCheckboxChange = (filterType, option, isNested = false) => {
    if (isNested) {
      setFilters(prev => ({
        ...prev,
        filters: {
          ...prev.filters,
          [filterType]: prev.filters[filterType].includes(option)
            ? prev.filters[filterType].filter(item => item !== option)
            : [...prev.filters[filterType], option]
        }
      }));
    }
  };

  // Reset filters
  const resetFilters = () => {
    const currentRange = getCurrentPriceRange();
    setFilters({
      transaction_type: "buy",
      filters: {
        city: "",
        budget_range: {
          min: currentRange.min,
          max: currentRange.max,
          display: `${currentRange.displayMin} - ${currentRange.displayMax}`,
          unit: "buy_price"
        },
        property_type: [],
        bedroom: [],
        bathroom: [],
        parking: [],
        possession_status: []
      },
      search_metadata: {
        text_input: "",
        selected_option: ""
      }
    });
  };

  // Toggle mobile filter drawer
  const toggleMobileFilter = () => {
    setMobileFilterOpen(!mobileFilterOpen);
  };

  // Apply filters and close mobile drawer
  const applyFiltersAndClose = () => {
    setMobileFilterOpen(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const FilterSection = ({ title, options, filterType, type = "checkbox" }) => (
    <Box sx={{ mb: 1 }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", fontSize: "1rem", color: colors.blue[800] }}>
        {title}
      </Typography>
      {type === "checkbox" ? (
        <FormGroup>
          {options.map(option => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  size="small"
                  checked={filters.filters[filterType].includes(option)}
                  onChange={() => handleCheckboxChange(filterType, option, true)}
                  sx={{
                    color: colors.blue[400],
                    '&.Mui-checked': {
                      color: colors.gold.base, // Gold for checked state
                    },
                    '&:hover': {
                      backgroundColor: colors.gold[100], // Light gold on hover
                    },
                  }}
                />
              }
              label={option}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '14px',
                  color: colors.gray[600],
                }
              }}
            />
          ))}
        </FormGroup>
      ) : type === "select" ? (
        <FormControl fullWidth size="small">
          <Select
            value={filters.filters[filterType]}
            onChange={(e) => handleFilterChange(filterType, e.target.value, true)}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.gray[300],
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.gold.base, // Gold on hover
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.gold.base, // Gold when focused
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {options.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}
    </Box>
  );

  // Filter Content Component (reused in both desktop and mobile)
  const FilterContent = ({ onApply }) => (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: colors.blue[800] }}>
          Filters
        </Typography>
        <Button 
          onClick={resetFilters} 
          size="small" 
          variant="outlined"
          sx={{
            borderColor: colors.gold.base,
            color: colors.gold.base,
            '&:hover': {
              borderColor: colors.gold.dark,
              backgroundColor: colors.gold[100],
            }
          }}
        >
          Reset All
        </Button>
      </Box>

      {/* Price Range */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", fontSize: "1rem", color: colors.blue[800] }}>
          Price Range ({filters.transaction_type === "buy" ? "Buy" : "Rent"})
        </Typography>
        <Slider
          value={[filters.filters.budget_range.min, filters.filters.budget_range.max]}
          onChange={(_, newValue) => {
            handleBudgetRangeChange('min', newValue[0]);
            handleBudgetRangeChange('max', newValue[1]);
          }}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => formatPrice(value, filters.transaction_type)}
          min={getCurrentPriceRange().min}
          max={getCurrentPriceRange().max}
          step={getCurrentPriceRange().step}
          sx={{
            color: colors.gold.base, // Gold slider
            marginTop:'0px',
            paddingBottom:'1px',
            paddingLeft:'2px',
            '& .MuiSlider-thumb': {
              backgroundColor: colors.gold.base,
              height:'10px',
              width:'10px',
              '&:hover': {
                backgroundColor: colors.gold.dark,
              }
            },
            '& .MuiSlider-track': {
              backgroundColor: colors.gold.base,
              height:'3px'
            },
            '& .MuiSlider-rail': {
              backgroundColor: colors.gray[300],
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" sx={{ color: colors.gray[600] }}>
            {formatPrice(filters.filters.budget_range.min, filters.transaction_type)}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.gray[600] }}>
            {formatPrice(filters.filters.budget_range.max, filters.transaction_type)}
          </Typography>
        </Box>
      </Box>

      {/* Transaction Type */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", fontSize: "1rem", color: colors.blue[800] }}>
          Transaction Type
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={filters.transaction_type}
            onChange={(e) => handleFilterChange('transaction_type', e.target.value)}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.gray[300],
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.gold.base,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.gold.base,
              },
            }}
          >
            {filterOptions.transaction_type.map(option => (
              <MenuItem key={option} value={option}>
                {option === "buy" ? "Buy" : "Rent"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* City Dropdown */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", fontSize: "1rem", color: colors.blue[800] }}>
          City
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={filters.filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value, true)}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.gray[300],
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.gold.base,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.gold.base,
              },
            }}
          >
            <MenuItem value="">All Cities</MenuItem>
            {filterOptions.city.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      {/* Property Type */}
      <FilterSection
        title="Property Type"
        options={filterOptions.property_type}
        filterType="property_type"
      />

      {/* Possession Status */}
      <FilterSection
        title="Possession Status"
        options={filterOptions.possession_status}
        filterType="possession_status"
      />

      {/* Bedrooms */}
      <FilterSection
        title="Bedrooms"
        options={filterOptions.bedroom}
        filterType="bedroom"
      />

      {/* Bathrooms */}
      <FilterSection
        title="Bathrooms"
        options={filterOptions.bathroom}
        filterType="bathroom"
      />

      {/* Parking */}
      <FilterSection
        title="Parking"
        options={filterOptions.parking}
        filterType="parking"
      />

      {filterLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, py: 1 }}>
          <CircularProgress size={16} sx={{ color: colors.gold.base }} />
          <Typography variant="body2" sx={{ ml: 1, color: colors.gray[600] }}>
            Updating results...
          </Typography>
        </Box>
      )}

      {/* Apply Button for Mobile */}
      {onApply && (
        <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: colors.gray[300] }}>
          <Button
            fullWidth
            variant="contained"
            onClick={onApply}
            sx={{
              backgroundColor: colors.gold.base,
              color: 'white',
              '&:hover': {
                backgroundColor: colors.gold.dark,
              }
            }}
          >
            Apply Filters
          </Button>
        </Box>
      )}
    </Box>
  );

  if (loading) {
    return (
      <Loader loading={loading} fullScreen={false} theme="gold" />
    );
  }

  return (
    <Box sx={{ padding: { xs: 1, sm: 2 }, width: '100%' }} className="-mt-1">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Mobile Filter Header */}
        <Box sx={{ 
          display: { xs: 'flex', md: 'none' }, 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2 
        }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", color: colors.blue[800] }}>
            Properties
          </Typography>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={toggleMobileFilter}
            sx={{
              borderColor: colors.gold.base,
              color: colors.gold.base,
              '&:hover': {
                borderColor: colors.gold.dark,
                backgroundColor: colors.gold[50],
              }
            }}
          >
            Filters
          </Button>
        </Box>

        {/* Desktop Title */}
        <Typography 
          variant="h5" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: "bold", 
            mb: 3, 
            color: colors.blue[800],
            display: { xs: 'none', md: 'block' }
          }}
        >
          Property Listings: <span style={{ color: colors.gold.base }}>{filteredProperties.length} properties found</span> 
        </Typography>
      </motion.div>

      <Grid container spacing={2} className="-mt-2">
        {/* Desktop Filters Sidebar */}
        <Grid item xs={12} md={4} lg={2.4} sx={{ display: { xs: 'none', md: 'block' } }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper sx={{ 
              p: 3, 
              position: 'sticky', 
              top: 10, 
              height: '83vh', 
              overflowY: 'auto',
              overflowX: 'hidden',
              backgroundColor: 'white',
              '&::-webkit-scrollbar': {
                width: '3px',
              },
              '&::-webkit-scrollbar-track': {
                background: colors.blue[50],
              },
              '&::-webkit-scrollbar-thumb': {
                background: colors.gold.base, // Gold scrollbar
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: colors.gold.dark,
              }
            }}>
              <FilterContent />
            </Paper>
          </motion.div>
        </Grid>

        {/* Property Listings */}
        <Grid item xs={12} md={8} lg={9.6} flex={1}>
          {/* Mobile Results Count */}
          <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
            <Typography variant="body1" sx={{ color: colors.gray[600] }}>
              {filteredProperties.length} properties found
            </Typography>
          </Box>

          {filterLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '200px',
                flexDirection: 'column',
                gap: 2
              }}>
                <CircularProgress sx={{ color: colors.gold.base }} />
                <Typography variant="body1" sx={{ color: colors.gray[600] }}>
                  Updating results...
                </Typography>
              </Box>
            </motion.div>
          ) : filteredProperties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ textAlign: "center", mt: 8, py: 4 }}>
                <Typography variant="h6" sx={{ color: colors.gray[600] }} gutterBottom>
                  No properties found
                </Typography>
                <Typography variant="body2" sx={{ color: colors.gray[600] }}>
                  Try adjusting your search criteria or reset filters
                </Typography>
              </Box>
            </motion.div>
          ) : (
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: '82vh' }}>
              {/* Properties List */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ flex: 1 }}
              >
                <AnimatePresence>
                  {displayedProperties.map((property) => (
                    <motion.div
                      key={property.id}
                      variants={itemVariants}
                      layout
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <Box sx={{ width: '100%', mb: 2 }}>
                        <ListingCard propertyData={property} />
                      </Box>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Pagination Section */}
              <Box sx={{ 
                position: 'sticky', 
                bottom: 0, 
                backgroundColor: 'white', 
                py: 2, 
                borderTop: 1, 
                borderColor: colors.gray[300],
                mt: 'auto',
                px: 2
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  justifyContent: 'space-between', 
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: 2, 
                }}>
                  {/* Page info */}
                  <Typography variant="body2" sx={{ color: colors.gray[600] }}>
                    Showing {indexOfFirstProperty + 1}-{Math.min(indexOfLastProperty, filteredProperties.length)} of {filteredProperties.length} properties
                  </Typography>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <Pagination 
                        count={totalPages} 
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary" 
                        size={window.innerWidth < 600 ? "small" : "medium"}
                        showFirstButton 
                        showLastButton
                        sx={{
                          '& .MuiPaginationItem-root': {
                            borderRadius: '8px',
                            margin: '0 2px',
                            fontWeight: 'bold',
                          },
                          '& .MuiPaginationItem-page.Mui-selected': {
                            backgroundColor: colors.gold.base, // Gold for selected page
                            color: 'white',
                            '&:hover': {
                              backgroundColor: colors.gold.dark,
                            }
                          },
                          '& .MuiPaginationItem-page': {
                            color: colors.blue[800], // Blue for page numbers
                            '&:hover': {
                              backgroundColor: colors.blue[50],
                              color: colors.blue[600],
                            }
                          },
                          '& .MuiPaginationItem-ellipsis': {
                            color: colors.blue[600],
                          }
                        }}
                      />
                    </motion.div>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="right"
        open={mobileFilterOpen}
        onClose={toggleMobileFilter}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: '400px' },
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: colors.blue[800] }}>
            Filters
          </Typography>
          <IconButton onClick={toggleMobileFilter}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ height: '100%', overflowY: 'auto', pb: 2 }}>
          <FilterContent onApply={applyFiltersAndClose} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default PropertyListing;