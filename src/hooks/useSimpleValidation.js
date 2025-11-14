// hooks/useSimpleValidation.js
import { useState, useCallback } from 'react';

export const useSimpleValidation = () => {
  const [errors, setErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);

  // SIMPLIFIED: Check if value is numeric
  const isNumeric = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'number') return true;
    if (typeof value !== 'string') return false;
    
    const cleanValue = value.trim().replace(/[₹$€£,\s]/g, '');
    return !isNaN(cleanValue) && !isNaN(parseFloat(cleanValue));
  };

  // SIMPLIFIED: Validate CreatableDropdown
  const validateCreatableDropdown = (value, fieldData = [], fieldLabel = '') => {
    if (fieldLabel.includes('*') && (!value || (Array.isArray(value) && value.length === 0))) {
      return false;
    }

    if (Array.isArray(value)) {
      for (let i = 0; i < fieldData.length; i++) {
        const field = fieldData[i];
        const fieldValue = value[i] || {};
        
        const textFieldValue = fieldValue.textField || '';
        const dropdownValue = fieldValue.autocomplete || '';
        
        const isTextFieldRequired = field?.InputLabel?.includes('*') || false;
        const isDropdownRequired = field?.DropdownLabel?.includes('*') || false;
        
        if (isTextFieldRequired && (!textFieldValue || textFieldValue.trim() === '')) {
          return false;
        }
        
        if (isDropdownRequired && (!dropdownValue || dropdownValue.trim() === '')) {
          return false;
        }

        if (textFieldValue.trim() !== '') {
          const fieldName = field?.InputLabel?.toLowerCase() || '';
          const isNumericField = fieldName.includes('price') || 
                                fieldName.includes('area') || 
                                fieldName.includes('carpet') || 
                                fieldName.includes('built') || 
                                fieldName.includes('super') ||
                                fieldName.includes('floor') ||
                                fieldName.includes('year');

          if (isNumericField && !isNumeric(textFieldValue)) {
            return false;
          }
        }
      }
      return true;
    } 
    else if (value && typeof value === 'object') {
      const field = fieldData[0];
      if (!field) return true;
      
      const textFieldValue = value.textField || '';
      const dropdownValue = value.autocomplete || '';
      
      const isTextFieldRequired = field?.InputLabel?.includes('*') || false;
      const isDropdownRequired = field?.DropdownLabel?.includes('*') || false;
      
      if (isTextFieldRequired && (!textFieldValue || textFieldValue.trim() === '')) {
        return false;
      }
      
      if (isDropdownRequired && (!dropdownValue || dropdownValue.trim() === '')) {
        return false;
      }

      if (textFieldValue.trim() !== '') {
        const fieldName = field?.InputLabel?.toLowerCase() || '';
        const isNumericField = fieldName.includes('price') || 
                              fieldName.includes('area') || 
                              fieldName.includes('carpet') || 
                              fieldName.includes('built') || 
                              fieldName.includes('super') ||
                              fieldName.includes('floor') ||
                              fieldName.includes('year');

        if (isNumericField && !isNumeric(textFieldValue)) {
          return false;
        }
      }
      
      return true;
    }
    
    return !fieldLabel.includes('*');
  };

  // SIMPLIFIED: Check if a specific step is completed
  const isStepCompleted = useCallback((stepIndex, stepFields, formData) => {
    if (!stepFields || !formData) {
      console.log(`❌ Step ${stepIndex}: No fields or form data`);
      return false;
    }
    
    console.log(`🔍 Checking step ${stepIndex} completion...`);

    for (let field of stepFields) {
      const fieldName = field.label;
      const isRequired = field.label.includes('*');
      const value = formData[fieldName];

      console.log(`   Field: ${fieldName}`, { 
        isRequired, 
        value, 
        fieldType: field.fieldType,
        hasValue: !!value 
      });

      // Only validate required fields
      if (isRequired) {
        let fieldValid = true;
        
        switch (field.fieldType) {
          case "CreatableDropdown":
            fieldValid = validateCreatableDropdown(value, field.fieldData, field.label);
            console.log(`   CreatableDropdown validation: ${fieldValid}`);
            break;
            
          case "UploadFile":
            // FIXED: Handle both Array and FileList
            const hasFiles = value && (
              (Array.isArray(value) && value.length > 0) || 
              (value instanceof FileList && value.length > 0)
            );
            fieldValid = hasFiles;
            console.log(`   UploadFile validation:`, { 
              fieldName,
              hasValue: !!value, 
              isArray: Array.isArray(value),
              isFileList: value instanceof FileList,
              fileCount: value ? (Array.isArray(value) ? value.length : value.length) : 0,
              fieldValid 
            });
            break;
            
          case "Chips":
          case "RadioButton":
          case "CheckboxGroup":
            fieldValid = value !== undefined && value !== null && value !== '';
            console.log(`   ${field.fieldType} validation: ${fieldValid}`);
            break;
            
          case "InputField":
          case "TextArea":
            fieldValid = value !== undefined && value !== null && value.toString().trim() !== '';
            
            if (fieldValid && field.fieldType === "InputField") {
              const fieldLabel = field.label.toLowerCase();
              const isNumericField = fieldLabel.includes('price') || 
                                   fieldLabel.includes('area') || 
                                   fieldLabel.includes('year') ||
                                   fieldLabel.includes('floor');
              
              if (isNumericField && !isNumeric(value)) {
                fieldValid = false;
              }
            }
            console.log(`   ${field.fieldType} validation: ${fieldValid}`);
            break;
            
          default:
            fieldValid = value !== undefined && value !== null && value !== '';
            console.log(`   Default validation: ${fieldValid}`);
            break;
        }
        
        if (!fieldValid) {
          console.log(`   ❌ Field FAILED: ${fieldName}`);
          return false;
        } else {
          console.log(`   ✅ Field PASSED: ${fieldName}`);
        }
      }
    }
    
    console.log(`🎉 Step ${stepIndex} COMPLETED`);
    return true;
  }, []);

  // SIMPLIFIED: Main step validation function
  const validateStep = useCallback((fields, formData, stepIndex) => {
    const newErrors = {};
    let isValid = true;

    console.log(`📋 Validating step ${stepIndex}...`);

    fields.forEach(field => {
      const fieldName = field.label;
      const fieldValue = formData[fieldName];
      const isRequired = field.label.includes('*');

      if (isRequired) {
        let fieldValid = true;
        let errorMessage = '';
        
        switch (field.fieldType) {
          case 'CreatableDropdown':
            fieldValid = validateCreatableDropdown(fieldValue, field.fieldData, field.label);
            if (!fieldValid) {
              errorMessage = `${field.label.replace('*', '')} is required`;
              newErrors[fieldName] = errorMessage;
              isValid = false;
            }
            break;
            
          case 'InputField':
            if (!fieldValue || fieldValue.toString().trim() === '') {
              newErrors[fieldName] = `${field.label.replace('*', '')} is required`;
              isValid = false;
            } else {
              const fieldLabel = field.label.toLowerCase();
              const isNumericField = fieldLabel.includes('price') || 
                                   fieldLabel.includes('area') || 
                                   fieldLabel.includes('year') ||
                                   fieldLabel.includes('floor');
              
              if (isNumericField && !isNumeric(fieldValue)) {
                newErrors[fieldName] = `${field.label.replace('*', '')} must be a valid number`;
                isValid = false;
              }
            }
            break;
            
          case 'TextArea':
            if (!fieldValue || fieldValue.toString().trim() === '') {
              newErrors[fieldName] = `${field.label.replace('*', '')} is required`;
              isValid = false;
            }
            break;
            
          case 'Chips':
          case 'RadioButton':
          case 'CheckboxGroup':
            if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
              newErrors[fieldName] = `${field.label.replace('*', '')} is required`;
              isValid = false;
            }
            break;
            
          case 'UploadFile':
            // FIXED: Handle both Array and FileList
            const hasFiles = fieldValue && (
              (Array.isArray(fieldValue) && fieldValue.length > 0) || 
              (fieldValue instanceof FileList && fieldValue.length > 0)
            );
            
            if (!hasFiles) {
              newErrors[fieldName] = `${field.label.replace('*', '')} is required`;
              isValid = false;
              console.log(`❌ UploadFile error: No files uploaded for ${fieldName}`);
            } else {
              console.log(`✅ UploadFile valid: ${fieldValue.length} files for ${fieldName}`);
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

    console.log(`Step ${stepIndex} validation result:`, { isValid, errors: newErrors });
    setErrors(prev => ({ ...prev, ...newErrors }));
    
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
    isStepCompleted,
    isNumeric
  };
};