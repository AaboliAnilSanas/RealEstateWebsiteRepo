// Validation utility functions
export const validationRules = {
  required: (value) => {
    if (value === null || value === undefined || value === '') return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') return value.trim().length > 0;
    return true;
  },
  
  minLength: (value, min) => {
    if (!value) return false;
    return value.toString().length >= min;
  },
  
  maxLength: (value, max) => {
    if (!value) return true; // Not required, so empty is valid
    return value.toString().length <= max;
  },
  
  email: (value) => {
    if (!value) return true; // Not required, so empty is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  
  number: (value) => {
    if (!value) return true; // Not required, so empty is valid
    return !isNaN(parseFloat(value)) && isFinite(value);
  },
  
  minValue: (value, min) => {
    if (!value) return true;
    return parseFloat(value) >= min;
  },
  
  maxValue: (value, max) => {
    if (!value) return true;
    return parseFloat(value) <= max;
  }
};

// Field validation function
export const validateField = (value, rules = []) => {
  for (const rule of rules) {
    if (rule.rule === 'required' && !validationRules.required(value)) {
      return { isValid: false, message: rule.message || 'This field is required' };
    }
    
    if (rule.rule === 'minLength' && !validationRules.minLength(value, rule.value)) {
      return { isValid: false, message: rule.message || `Minimum ${rule.value} characters required` };
    }
    
    if (rule.rule === 'maxLength' && !validationRules.maxLength(value, rule.value)) {
      return { isValid: false, message: rule.message || `Maximum ${rule.value} characters allowed` };
    }
    
    if (rule.rule === 'email' && !validationRules.email(value)) {
      return { isValid: false, message: rule.message || 'Invalid email format' };
    }
    
    if (rule.rule === 'number' && !validationRules.number(value)) {
      return { isValid: false, message: rule.message || 'Must be a valid number' };
    }
  }
  
  return { isValid: true, message: '' };
};

// Form validation function
export const validateForm = (formData, validationSchema) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationSchema).forEach(fieldName => {
    const fieldRules = validationSchema[fieldName];
    const fieldValue = formData[fieldName];
    
    const validationResult = validateField(fieldValue, fieldRules);
    
    if (!validationResult.isValid) {
      errors[fieldName] = validationResult.message;
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Helper to extract field names from your form structure
export const extractFieldNames = (formDetails) => {
  const fieldNames = {};
  
  formDetails.fields.forEach((field, index) => {
    if (field.label.includes('*')) {
      const baseName = field.label.replace('*', '').trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');
      
      if (field.fieldType === 'InputField' && Array.isArray(field.fieldData)) {
        field.fieldData.forEach((subField, subIndex) => {
          if (subField.includes('*')) {
            const subFieldName = `${baseName}_${subIndex}`;
            fieldNames[subFieldName] = [{ rule: 'required', message: `${subField.replace('*', '').trim()} is required` }];
          }
        });
      } else {
        fieldNames[baseName] = [{ rule: 'required', message: `${field.label.replace('*', '').trim()} is required` }];
      }
    }
  });
  
  return fieldNames;
};