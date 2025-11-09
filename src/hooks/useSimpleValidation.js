// hooks/useSimpleValidation.js
import { useState, useCallback } from 'react';

export const useSimpleValidation = () => {
  const [errors, setErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);

  // Enhanced validation for CreatableDropdown
  const validateCreatableDropdown = (value, fieldData = [], fieldLabel = '') => {
    // If no value at all and field is required (main label has *)
    if (!value && fieldLabel.includes('*')) {
      return false;
    }

    // Handle array of values (multiple fields in CreatableDropdown)
    if (Array.isArray(value)) {
      // If main field is required (has *), check if at least one field is filled
      if (fieldLabel.includes('*')) {
        const atLeastOneFilled = value.some(fieldValue => {
          const textFieldValue = fieldValue?.textField || '';
          const dropdownValue = fieldValue?.autocomplete || '';
          return textFieldValue.trim() !== '' && dropdownValue.trim() !== '';
        });
        
        if (!atLeastOneFilled) {
          return false;
        }
      }
      
      // Check each field in fieldData for its specific requirements
      for (let i = 0; i < fieldData.length; i++) {
        const field = fieldData[i];
        const fieldValue = value[i] || { textField: '', autocomplete: '' };
        
        // Check if this specific field is required (nested requirement)
        const isTextFieldRequired = field?.InputLabel?.includes('*') || false;
        const isDropdownRequired = field?.DropdownLabel?.includes('*') || false;
        
        const textFieldValue = fieldValue.textField || '';
        const dropdownValue = fieldValue.autocomplete || '';
        
        // Validate text field if required
        if (isTextFieldRequired && (!textFieldValue || textFieldValue.trim() === '')) {
          return false;
        }
        
        // Validate dropdown field if required
        if (isDropdownRequired && (!dropdownValue || dropdownValue.trim() === '')) {
          return false;
        }
      }
    } 
    // Handle single object value
    else if (value) {
      const field = fieldData[0]; // Single field
      if (field) {
        const isTextFieldRequired = field?.InputLabel?.includes('*') || false;
        const isDropdownRequired = field?.DropdownLabel?.includes('*') || false;
        
        const textFieldValue = value.textField || '';
        const dropdownValue = value.autocomplete || '';
        
        // Validate text field if required
        if (isTextFieldRequired && (!textFieldValue || textFieldValue.trim() === '')) {
          return false;
        }
        
        // Validate dropdown field if required
        if (isDropdownRequired && (!dropdownValue || dropdownValue.trim() === '')) {
          return false;
        }
      }
    }
    
    return true;
  };

  // Check if a specific step is completed
  const isStepCompleted = useCallback((stepIndex, stepFields, formData) => {
    if (!stepFields || !formData) return false;
    
    for (let field of stepFields) {
      const fieldName = field.label;
      const isRequired = field.label.includes('*');
      const value = formData[fieldName];

      // For required fields, validate based on field type
      if (isRequired || field.fieldType === "CreatableDropdown") {
        let fieldValid = true;
        
        switch (field.fieldType) {
          case "CreatableDropdown":
            // For CreatableDropdown, validate based on nested requirements
            fieldValid = validateCreatableDropdown(value, field.fieldData, field.label);
            break;
            
          case "UploadFile":
            fieldValid = value && Array.isArray(value) && value.length > 0;
            break;
            
          case "Chips":
          case "RadioButton":
            fieldValid = value && value !== '';
            break;
            
          case "InputField":
          case "TextArea":
            fieldValid = value && value.trim() !== '';
            break;
            
          default:
            fieldValid = value && value !== '';
            break;
        }
        
        if (!fieldValid) {
          console.log('Field validation failed:', fieldName, 'Value:', value, 'Field:', field);
          return false;
        }
      }
    }
    
    console.log('Step completed:', stepIndex);
    return true;
  }, []);

  // Main step validation function
  const validateStep = useCallback((fields, formData, stepIndex) => {
    const newErrors = {};
    let isValid = true;

    fields.forEach(field => {
      const fieldName = field.label;
      const fieldValue = formData[fieldName];
      const isRequired = field.label.includes('*');

      // For required fields or CreatableDropdown (which has nested requirements)
      if (isRequired || field.fieldType === "CreatableDropdown") {
        let fieldValid = true;
        
        switch (field.fieldType) {
          case 'CreatableDropdown':
            fieldValid = validateCreatableDropdown(fieldValue, field.fieldData, field.label);
            if (!fieldValid) {
              newErrors[fieldName] = `${field.label.replace('*', '')} is required`;
              isValid = false;
            }
            break;
            
          case 'InputField':
          case 'TextArea':
            if (!fieldValue || fieldValue.trim() === '') {
              newErrors[fieldName] = `${field.label.replace('*', '')} is required`;
              isValid = false;
            }
            break;
            
          case 'Chips':
          case 'RadioButton':
            if (!fieldValue || fieldValue === '') {
              newErrors[fieldName] = `${field.label.replace('*', '')} is required`;
              isValid = false;
            }
            break;
            
          case 'UploadFile':
            if (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
              newErrors[fieldName] = `${field.label.replace('*', '')} is required`;
              isValid = false;
            }
            break;
            
          default:
            if (!fieldValue) {
              newErrors[fieldName] = `${field.label.replace('*', '')} is required`;
              isValid = false;
            }
        }
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    
    // Update completed steps
    if (isValid && !completedSteps.includes(stepIndex)) {
      setCompletedSteps(prev => [...prev, stepIndex]);
    } else if (!isValid && completedSteps.includes(stepIndex)) {
      setCompletedSteps(prev => prev.filter(step => step !== stepIndex));
    }
    
    return isValid;
  }, [completedSteps]);

  const clearFieldError = (fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  const clearErrors = () => {
    setErrors({});
    setCompletedSteps([]);
  };

  return {
    errors,
    completedSteps,
    validateStep,
    clearFieldError,
    clearErrors,
    isStepCompleted
  };
};