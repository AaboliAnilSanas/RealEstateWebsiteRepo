// hooks/useSimpleValidation.js
import { useState } from 'react';

export const useSimpleValidation = () => {
  const [errors, setErrors] = useState({});

  // Validation for CreatableDropdown with multiple fields
  const validateCreatableDropdown = (value, isRequired) => {
    if (!isRequired) return true;
    
    // If no value at all
    if (!value) return false;
    
    // If value exists but no values array
    if (!value.values || !Array.isArray(value.values)) return false;
    
    // Check if ALL values are empty (for CreatableDropdown, at least one should be filled)
    const allEmpty = value.values.every(val => !val || val.trim() === '');
    
    return !allEmpty;
  };

  // Validation for file uploads
  const validateFileUpload = (value, isRequired) => {
    if (!isRequired) return true;
    
    // Check if files were selected
    return value && value.length > 0;
  };

  // Validation for array fields (Chips, RadioButton)
  const validateArrayField = (value, isRequired) => {
    if (!isRequired) return true;
    
    return value && value !== '' && !(Array.isArray(value) && value.length === 0);
  };

  // Validation for text fields (InputField, TextArea)
  const validateTextField = (value, isRequired) => {
    if (!isRequired) return true;
    
    return value && value !== '' && !(Array.isArray(value) && value.length === 0);
  };

  // Main step validation function
  const validateStep = (stepFields, formData) => {
    const newErrors = {};
    let isValid = true;

    stepFields.forEach(field => {
      const fieldName = field.label;
      const isRequired = field.label.includes('*');
      const value = formData[fieldName];

      if (isRequired) {
        let fieldValid = true;
        
        // Different validation based on field type
        switch (field.fieldType) {
          case "CreatableDropdown":
            fieldValid = validateCreatableDropdown(value, isRequired);
            break;
            
          case "UploadFile":
            fieldValid = validateFileUpload(value, isRequired);
            break;
            
          case "Chips":
          case "RadioButton":
            fieldValid = validateArrayField(value, isRequired);
            break;
            
          case "InputField":
          case "TextArea":
            fieldValid = validateTextField(value, isRequired);
            break;
            
          default:
            // Default validation for unknown field types
            fieldValid = value && value !== '' && !(Array.isArray(value) && value.length === 0);
            break;
        }
        
        if (!fieldValid) {
          newErrors[fieldName] = `${fieldName} is required`;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Validate a single field (useful for real-time validation)
  const validateField = (fieldName, fieldType, value, isRequired = false) => {
    const newErrors = { ...errors };
    
    if (isRequired) {
      let fieldValid = true;
      
      // Different validation based on field type
      switch (fieldType) {
        case "CreatableDropdown":
          fieldValid = validateCreatableDropdown(value, isRequired);
          break;
          
        case "UploadFile":
          fieldValid = validateFileUpload(value, isRequired);
          break;
          
        case "Chips":
        case "RadioButton":
          fieldValid = validateArrayField(value, isRequired);
          break;
          
        case "InputField":
        case "TextArea":
          fieldValid = validateTextField(value, isRequired);
          break;
          
        default:
          fieldValid = value && value !== '' && !(Array.isArray(value) && value.length === 0);
          break;
      }
      
      if (!fieldValid) {
        newErrors[fieldName] = `${fieldName} is required`;
      } else {
        delete newErrors[fieldName];
      }
    } else {
      delete newErrors[fieldName];
    }
    
    setErrors(newErrors);
    return !newErrors[fieldName];
  };

  // Clear error for a specific field
  const clearFieldError = (fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  // Clear all errors
  const clearErrors = () => setErrors({});

  // Check if form has any errors
  const hasErrors = () => Object.keys(errors).length > 0;

  // Get error message for a specific field
  const getFieldError = (fieldName) => errors[fieldName];

  return {
    errors,
    validateStep,
    validateField,
    clearFieldError,
    clearErrors,
    hasErrors,
    getFieldError,
    // Export individual validators if needed elsewhere
    validateCreatableDropdown,
    validateFileUpload,
    validateArrayField,
    validateTextField
  };
};