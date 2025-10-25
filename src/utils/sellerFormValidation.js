import { extractFieldNames } from './validation';

// Define validation schemas for each step
export const sellerFormValidationSchemas = (formDetailsData) => {
  return formDetailsData.map((step, index) => {
    switch (index) {
      case 0: // Basic Details
        return {
          looking_to: [{ rule: 'required', message: 'Please select what you are looking to do' }],
          property_type: [{ rule: 'required', message: 'Please select property type' }],
          property_kind: [{ rule: 'required', message: 'Please select property kind' }]
        };
        
      case 1: // Location Details
        return {
          city: [{ rule: 'required', message: 'City is required' }],
          locality: [{ rule: 'required', message: 'Locality is required' }],
          apartment_society: [{ rule: 'required', message: 'Apartment/Society is required' }]
        };
        
      case 2: // Property Profile
        return {
          bedrooms: [{ rule: 'required', message: 'Number of bedrooms is required' }],
          bathrooms: [{ rule: 'required', message: 'Number of bathrooms is required' }],
          balconies: [{ rule: 'required', message: 'Number of balconies is required' }],
          carpet_area: [{ rule: 'required', message: 'Carpet area is required' }],
          floor_details: [{ rule: 'required', message: 'Floor details are required' }],
          availability_status: [{ rule: 'required', message: 'Availability status is required' }],
          possession_month: [{ rule: 'required', message: 'Possession month is required' }],
          possession_year: [{ rule: 'required', message: 'Possession year is required' }],
          ownership: [{ rule: 'required', message: 'Ownership type is required' }],
          price: [{ rule: 'required', message: 'Price details are required' }]
        };
        
      case 3: // Photos, Videos
        return {
          photos: [{ rule: 'required', message: 'At least one photo is required' }]
        };
        
      default:
        return extractFieldNames(step);
    }
  });
};

// Initial form data structure
export const initialFormData = {
  // Step 0
  looking_to: '',
  property_type: '',
  property_kind: '',
  
  // Step 1
  city: '',
  locality: '',
  sub_locality: '',
  apartment_society: '',
  house_no: '',
  
  // Step 2
  bedrooms: '',
  bathrooms: '',
  balconies: '',
  carpet_area: '',
  built_up_area: '',
  super_build_up_area: '',
  total_floors: '',
  floor_number: '',
  availability_status: '',
  possession_month: '',
  possession_year: '',
  ownership: '',
  price: '',
  description: '',
  
  // Step 3
  videos: [],
  photos: []
};