// hooks/useSimpleValidation.js
import { useState } from 'react';

export const useSimpleValidation = () => {
  const [errors, setErrors] = useState({});

  // Updated validation for CreatableDropdown - matches FilterComponent logic
  const validateCreatableDropdown = (value, isRequired, fieldData = []) => {
    if (!isRequired) return true;
    
    // If no value at all
    if (!value) return false;
    
    // Extract field requirements from fieldData (same as FilterComponent)
    const isTextFieldRequired = fieldData[0]?.InputLabel ? 
      fieldData[0].InputLabel.includes('*') : false;
    const isAutocompleteRequired = fieldData[0]?.DropdownLabel ? 
      fieldData[0].DropdownLabel.includes('*') : false;
    
    const textFieldValue = value.textField || '';
    const autocompleteValue = value.autocomplete || '';
    
    // Validate each field separately based on their own requirement
    const textFieldValid = !isTextFieldRequired || (textFieldValue && textFieldValue.trim() !== '');
    const autocompleteValid = !isAutocompleteRequired || (autocompleteValue && autocompleteValue.trim() !== '');
    
    // Return true only if all required fields are valid
    return textFieldValid && autocompleteValid;
  };

  // Rest of your validation functions remain exactly the same
  const validateFileUpload = (value, isRequired) => {
    if (!isRequired) return true;
    return value && value.length > 0;
  };

  const validateArrayField = (value, isRequired) => {
    if (!isRequired) return true;
    return value && value !== '' && !(Array.isArray(value) && value.length === 0);
  };

  const validateTextField = (value, isRequired) => {
    if (!isRequired) return true;
    return value && value !== '' && !(Array.isArray(value) && value.length === 0);
  };

  // Main step validation function - only change is passing fieldData
  const validateStep = (stepFields, formData) => {
    const newErrors = {};
    let isValid = true;

    stepFields.forEach(field => {
      const fieldName = field.label;
      const isRequired = field.label.includes('*');
      const value = formData[fieldName];

      if (isRequired) {
        let fieldValid = true;
        
        switch (field.fieldType) {
          case "CreatableDropdown":
            fieldValid = validateCreatableDropdown(value, isRequired, field.fieldData);
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
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Validate a single field - only change is passing fieldData
  const validateField = (fieldName, fieldType, value, isRequired = false, fieldData = []) => {
    const newErrors = { ...errors };
    
    if (isRequired) {
      let fieldValid = true;
      
      switch (fieldType) {
        case "CreatableDropdown":
          fieldValid = validateCreatableDropdown(value, isRequired, fieldData);
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

  // Rest of your functions remain exactly the same
  const clearFieldError = (fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  const clearErrors = () => setErrors({});

  const hasErrors = () => Object.keys(errors).length > 0;

  const getFieldError = (fieldName) => errors[fieldName];

  return {
    errors,
    validateStep,
    validateField,
    clearFieldError,
    clearErrors,
    hasErrors,
    getFieldError,
    validateCreatableDropdown,
    validateFileUpload,
    validateArrayField,
    validateTextField
  };
};