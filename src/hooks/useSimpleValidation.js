// hooks/useSimpleValidation.js
import { useState } from 'react';

export const useSimpleValidation = () => {
  const [errors, setErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);

  // Enhanced validation for CreatableDropdown - checks individual field requirements
  const validateCreatableDropdown = (value, isRequired, fieldData = []) => {
    if (!isRequired) return true;
    
    // If no value at all
    if (!value || typeof value !== 'object') return false;
    
    let allRequiredFieldsValid = true;
    
    // Check each field in fieldData for its specific requirements
    fieldData.forEach((field, index) => {
      const fieldKey = field.InputLabel || `field_${index}`;
      
      // Check if this specific field is required
      const isTextFieldRequired = field?.InputLabel?.includes('*') || false;
      const isDropdownRequired = field?.DropdownLabel?.includes('*') || false;
      
      // For CreatableDropdown, the value structure is { textField: '', autocomplete: '' }
      // not nested under fieldKey
      const textFieldValue = value.textField || '';
      const dropdownValue = value.autocomplete || '';
      
      // Validate text field if required
      if (isTextFieldRequired) {
        const textFieldValid = textFieldValue && textFieldValue.trim() !== '';
        if (!textFieldValid) {
          allRequiredFieldsValid = false;
        }
      }
      
      // Validate dropdown field if required
      if (isDropdownRequired) {
        const dropdownValid = dropdownValue && dropdownValue.trim() !== '';
        if (!dropdownValid) {
          allRequiredFieldsValid = false;
        }
      }
    });
    
    return allRequiredFieldsValid;
  };

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

  // Check if a specific step is completed
  const isStepCompleted = (stepIndex, stepFields, formData) => {
    const stepFieldsValid = stepFields.every(field => {
      const fieldName = field.label;
      const isRequired = field.label.includes('*');
      const value = formData[fieldName];

      if (!isRequired) return true;
      
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
      
      return fieldValid;
    });
    
    return stepFieldsValid;
  };

  // Main step validation function
  const validateStep = (stepFields, formData, stepIndex = null) => {
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
            if (!fieldValid) {
              newErrors[fieldName] = `${getDisplayLabel(fieldName)} is required`;
            }
            break;
          case "UploadFile":
            fieldValid = validateFileUpload(value, isRequired);
            if (!fieldValid) {
              newErrors[fieldName] = `${getDisplayLabel(fieldName)} is required`;
            }
            break;
          case "Chips":
          case "RadioButton":
            fieldValid = validateArrayField(value, isRequired);
            if (!fieldValid) {
              newErrors[fieldName] = `${getDisplayLabel(fieldName)} is required`;
            }
            break;
          case "InputField":
          case "TextArea":
            fieldValid = validateTextField(value, isRequired);
            if (!fieldValid) {
              newErrors[fieldName] = `${getDisplayLabel(fieldName)} is required`;
            }
            break;
          default:
            fieldValid = value && value !== '' && !(Array.isArray(value) && value.length === 0);
            if (!fieldValid) {
              newErrors[fieldName] = `${getDisplayLabel(fieldName)} is required`;
            }
            break;
        }
        
        if (!fieldValid) {
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    
    // Update completed steps if this step is valid
    if (isValid && stepIndex !== null) {
      setCompletedSteps(prev => {
        if (!prev.includes(stepIndex)) {
          return [...prev, stepIndex];
        }
        return prev;
      });
    }
    
    return isValid;
  };

  // Validate a single field
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
        newErrors[fieldName] = `${getDisplayLabel(fieldName)} is required`;
      } else {
        delete newErrors[fieldName];
      }
    } else {
      delete newErrors[fieldName];
    }
    
    setErrors(newErrors);
    return !newErrors[fieldName];
  };

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

  // Helper function to remove asterisk from labels
  const getDisplayLabel = (label) => {
    return label ? label.replace(/\*$/, '') : label;
  };

  return {
    errors,
    completedSteps,
    validateStep,
    validateField,
    isStepCompleted,
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