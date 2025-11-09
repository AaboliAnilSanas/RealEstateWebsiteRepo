import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Autocomplete, TextField, Box, Divider } from '@mui/material';

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const CreatableDropdown = ({ 
  dropdownLabel,
  fieldData, 
  value,
  onChange, 
  dropdownisRequired = false,
  dropdownError = false,
  textfieldisRequired = false,
  textfieldError = false,
  inputFirst = true,
  onValidationChange
}) => {
  // Remove asterisk from labels for display
  const getDisplayLabel = (label) => {
    return label ? label.replace(/\*$/, '') : label;
  };

  // Initialize state for all fields - now as an array
  const [fieldValues, setFieldValues] = useState(() => {
    if (value && Array.isArray(value)) {
      return value;
    }
    
    // Create initial values for each field
    return fieldData?.map((field, index) => ({
      textField: '',
      autocomplete: '',
      fieldKey: field.InputLabel || `field_${index}`
    })) || [];
  });

  // Track if validation should be shown (after form submission attempt)
  const [showValidation, setShowValidation] = useState(false);

  // Show validation when parent errors change (after Next button click)
  useEffect(() => {
    if (dropdownError || textfieldError) {
      setShowValidation(true);
    }
  }, [dropdownError, textfieldError]);

  // Sync with external value changes
  useEffect(() => {
    if (value && Array.isArray(value)) {
      setFieldValues(value);
    }
  }, [value]);

  // Debounced onChange callback for text field
  const debouncedOnChange = useCallback(
    debounce((newValue) => {
      if (onChange) {
        onChange(newValue);
      }
    }, 300),
    [onChange]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedOnChange.cancel?.();
    };
  }, [debouncedOnChange]);

  const handleInputChange = (index, event) => {
    const newValue = event.target.value;
    
    setFieldValues(prev => {
      const updatedValues = [...prev];
      updatedValues[index] = {
        ...updatedValues[index],
        textField: newValue
      };
      
      // Update parent with all field values
      debouncedOnChange(updatedValues);
      
      return updatedValues;
    });
  };

  const handleAutocompleteChange = (index, event, newValue) => {
    const stringValue = newValue || '';
    
    setFieldValues(prev => {
      const updatedValues = [...prev];
      updatedValues[index] = {
        ...updatedValues[index],
        autocomplete: stringValue
      };
      
      // Update parent immediately for autocomplete changes
      if (onChange) {
        onChange(updatedValues);
      }
      
      return updatedValues;
    });
  };

  const handleAutocompleteInputChange = (index, event, newValue) => {
    if (event && event.type === 'change') {
      const stringValue = newValue || '';
      
      setFieldValues(prev => {
        const updatedValues = [...prev];
        updatedValues[index] = {
          ...updatedValues[index],
          autocomplete: stringValue
        };
        
        // Update parent immediately for autocomplete text input
        if (onChange) {
          onChange(updatedValues);
        }
        
        return updatedValues;
      });
    }
  };

  // Check if a specific field has validation error
  const hasFieldError = (field, index) => {
    // Don't show validation until after submission attempt
    if (!showValidation && !dropdownError && !textfieldError) {
      return false;
    }

    const currentValue = fieldValues[index] || { textField: '', autocomplete: '' };
    
    const isTextFieldRequired = field?.InputLabel?.includes('*');
    const isDropdownRequired = field?.DropdownLabel?.includes('*');
    
    const hasTextFieldError = isTextFieldRequired && (!currentValue.textField || currentValue.textField.trim() === '');
    const hasDropdownError = isDropdownRequired && (!currentValue.autocomplete || currentValue.autocomplete.trim() === '');
    
    return hasTextFieldError || hasDropdownError;
  };

  // Separate border colors for each field - Validation logic
  const getOverallBorderColor = (index) => {
    const field = fieldData?.[index];
    
    if (!field) return '1px solid var(--location-gray-300)';
    
    if (hasFieldError(field, index)) {
      return '1px solid #ef4444';
    }
    
    return '1px solid var(--location-gray-300)';
  };

  // Get field-specific error state and helper text
  const getTextFieldErrorProps = (field, index) => {
    const isRequired = field?.InputLabel?.includes('*') || false;
    const currentValue = fieldValues[index] || { textField: '', autocomplete: '' };
    
    const hasError = (showValidation || dropdownError || textfieldError) && 
                    isRequired && 
                    (!currentValue.textField || currentValue.textField.trim() === '');
    
    return {
      error: hasError,
      // helperText: hasError ? `${getDisplayLabel(field.InputLabel)} is required` : ''
    };
  };

  const getAutocompleteErrorProps = (field, index) => {
    const isRequired = field?.DropdownLabel?.includes('*') || false;
    const currentValue = fieldValues[index] || { textField: '', autocomplete: '' };
    
    const hasError = (showValidation || dropdownError || textfieldError) && 
                    isRequired && 
                    (!currentValue.autocomplete || currentValue.autocomplete.trim() === '');
    
    return {
      error: hasError,
      // helperText: hasError ? `${getDisplayLabel(field.DropdownLabel)} is required` : ''
    };
  };

  return (
    <div className="space-y-4">
      {fieldData?.map((field, index) => {
        const fieldKey = field.InputLabel || `field_${index}`;
        const inputLabel = field?.InputLabel || 'Input';
        const dropdownLabelText = field?.DropdownLabel || 'Option';
        const options = field?.units || [];
        const placeholder = field?.placeholder;
        
        // Check if this specific field is required
        const isTextFieldRequired = field?.InputLabel?.includes('*') || false;
        const isDropdownRequired = field?.DropdownLabel?.includes('*') || false;
        
        const currentValue = fieldValues[index] || { textField: '', autocomplete: '' };
        
        const textFieldErrorProps = getTextFieldErrorProps(field, index);
        const autocompleteErrorProps = getAutocompleteErrorProps(field, index);

        return (
          <Box 
            key={fieldKey}
            sx={{ 
              display: 'flex', 
              width: '100%', 
              scrollPaddingLeft:'2px',
              flexDirection: inputFirst ? 'row' : 'row-reverse',
              border: getOverallBorderColor(index),
              borderRadius: '6px',
              marginLeft:'2px',
              '&:hover': {
                border: getOverallBorderColor(index) === '1px solid #ef4444' 
                  ? '1px solid #ef4444' 
                  : '1px solid var(--gold-base)',
              },
              overflow: 'hidden',
              alignItems: 'center',
            }}
          >
            {/* TextField - Always 80% width */}
            <Box sx={{ 
              width: '80%',
              padding: '0px 8px',
              borderRight: inputFirst ? '1px solid var(--location-gray-300)' : 'none',
              borderLeft: !inputFirst ? '1px solid var(--location-gray-300)' : 'none',
            }}>
              <TextField
                id={`creatable-input-${fieldKey}`}
                label={getDisplayLabel(inputLabel)} 
                placeholder={placeholder}
                variant="standard"
                value={currentValue.textField}
                onChange={(event) => handleInputChange(index, event)}
                error={textFieldErrorProps.error}
                helperText={textFieldErrorProps.helperText}
                required={isTextFieldRequired}
                fullWidth
                size="small"
                sx={{
                  '& .MuiInput-underline:before': {
                    borderBottomColor: 'transparent',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'transparent',
                  },
                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottomColor: 'transparent',
                  },
                  '& .MuiInputBase-root': {
                    padding: '0px',
                  },
                  '& .MuiInputBase-input': {
                    padding: '8px 0px',
                    color: 'var(--location-blue-800)',
                  },
                  '& .MuiFormLabel-asterisk': {
                    color: '#ef4444',
                  },
                  '& .MuiInputLabel-root': {
                    color: textFieldErrorProps.error ? '#ef4444' : 'var(--location-gray-600)',
                    '&.Mui-focused': {
                      color: textFieldErrorProps.error ? '#ef4444' : 'var(--gold-base)',
                    },
                  },
                  '& .MuiFormHelperText-root': {
                    marginLeft: 0,
                    marginRight: 0,
                  }
                }}
              />
            </Box>
            
            {/* Divider - Always visible between fields */}
            <Divider 
              orientation="vertical" 
              flexItem 
              sx={{ 
                backgroundColor: getOverallBorderColor(index) === '1px solid #ef4444' 
                  ? '#ef4444' 
                  : 'var(--location-gray-300)',
                height: '80%',
                margin: '4px 0px',
                '&:hover': {
                  backgroundColor: getOverallBorderColor(index) === '1px solid #ef4444' 
                    ? '#ef4444' 
                    : 'var(--gold-base)',
                },
              }} 
            />
            
            {/* Autocomplete - Always 20% width */}
            <Box sx={{ 
              width: '20%', 
              padding: '0px 8px',
              marginTop: autocompleteErrorProps.error ? '0px' : '-10px'
            }}>
              <Autocomplete         
                freeSolo
                options={options}
                value={currentValue.autocomplete}
                onChange={(event, newValue) => handleAutocompleteChange(index, event, newValue)}
                onInputChange={(event, newValue) => handleAutocompleteInputChange(index, event, newValue)}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label={getDisplayLabel(dropdownLabelText)} 
                    error={autocompleteErrorProps.error}
                    helperText={autocompleteErrorProps.helperText}
                    required={isDropdownRequired}
                    variant="standard"
                    size="small"
                    sx={{
                      '& .MuiInput-underline:before': {
                        borderBottomColor: 'transparent',
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: 'transparent',
                      },
                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottomColor: 'transparent',
                      },
                      '& .MuiInputBase-root': {
                        padding: '0px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '8px 0px',
                        color: 'var(--location-blue-800)',
                      },
                      '& .MuiFormLabel-asterisk': {
                        color: '#ef4444',
                      },
                      '& .MuiInputLabel-root': {
                        color: autocompleteErrorProps.error ? '#ef4444' : 'var(--location-gray-600)',
                        '&.Mui-focused': {
                          color: autocompleteErrorProps.error ? '#ef4444' : 'var(--gold-base)',
                        },
                      },
                      '& .MuiFormHelperText-root': {
                        marginLeft: 0,
                        marginRight: 0,
                        whiteSpace: 'nowrap'
                      }
                    }}
                  />
                )}
                fullWidth
                sx={{
                  '& .MuiAutocomplete-popupIndicator': {
                    color: autocompleteErrorProps.error ? '#ef4444' : 'var(--gold-base)',
                  },
                  '& .MuiAutocomplete-clearIndicator': {
                    color: autocompleteErrorProps.error ? '#ef4444' : 'var(--gold-base)',
                  },
                }}
              />
            </Box>
          </Box>
        );
      })}
    </div>
  );
};

export default CreatableDropdown;