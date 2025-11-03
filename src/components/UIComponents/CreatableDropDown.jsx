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
  inputFirst = true 
}) => {
  // Remove asterisk from labels for display
  const getDisplayLabel = (label) => {
    return label ? label.replace(/\*$/, '') : label;
  };

  // Initialize state for all fields
  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    fieldData?.forEach((field, index) => {
      const fieldKey = field.InputLabel || `field_${index}`;
      initialValues[fieldKey] = {
        textField: value?.textField || '',
        autocomplete: value?.autocomplete || ''
      };
    });
    return initialValues;
  });

  // Local error state to handle field-specific errors
  const [localErrors, setLocalErrors] = useState({
    textField: false,
    autocomplete: false
  });

  // Update local errors when props change
  useEffect(() => {
    setLocalErrors({
      textField: textfieldError,
      autocomplete: dropdownError
    });
  }, [textfieldError, dropdownError]);

  // Sync with external value changes
  useEffect(() => {
    if (value) {
      const newFieldValues = {};
      fieldData?.forEach((field, index) => {
        const fieldKey = field.InputLabel || `field_${index}`;
        newFieldValues[fieldKey] = {
          textField: value.textField || '',
          autocomplete: value.autocomplete || ''
        };
      });
      setFieldValues(newFieldValues);
    }
  }, [value, fieldData]);

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

  const handleInputChange = (fieldKey, event) => {
    const newValue = event.target.value;
    
    // Clear text field error when user starts typing
    if (localErrors.textField) {
      setLocalErrors(prev => ({
        ...prev,
        textField: false
      }));
    }
    
    setFieldValues(prev => {
      const updatedValues = {
        ...prev,
        [fieldKey]: {
          ...prev[fieldKey],
          textField: newValue
        }
      };
      
      // Get the first field value (since there's typically only one field)
      const firstFieldKey = Object.keys(updatedValues)[0];
      const firstFieldValue = updatedValues[firstFieldKey];
      
      // Use debounced function to update parent
      debouncedOnChange(firstFieldValue);
      
      return updatedValues;
    });
  };

  const handleAutocompleteChange = (fieldKey, event, newValue) => {
    const stringValue = newValue || '';
    
    // Clear autocomplete error when user selects an option
    if (localErrors.autocomplete) {
      setLocalErrors(prev => ({
        ...prev,
        autocomplete: false
      }));
    }
    
    setFieldValues(prev => {
      const updatedValues = {
        ...prev,
        [fieldKey]: {
          ...prev[fieldKey],
          autocomplete: stringValue
        }
      };
      
      // Get the first field value (since there's typically only one field)
      const firstFieldKey = Object.keys(updatedValues)[0];
      const firstFieldValue = updatedValues[firstFieldKey];
      
      // Update parent immediately for autocomplete changes
      if (onChange) {
        onChange(firstFieldValue);
      }
      
      return updatedValues;
    });
  };

  const handleAutocompleteInputChange = (fieldKey, event, newValue) => {
    // This handles free text input in the autocomplete field
    if (event && event.type === 'change') {
      const stringValue = newValue || '';
      
      // Clear autocomplete error when user starts typing
      if (localErrors.autocomplete) {
        setLocalErrors(prev => ({
          ...prev,
          autocomplete: false
        }));
      }
      
      setFieldValues(prev => {
        const updatedValues = {
          ...prev,
          [fieldKey]: {
            ...prev[fieldKey],
            autocomplete: stringValue
          }
        };
        
        // Get the first field value (since there's typically only one field)
        const firstFieldKey = Object.keys(updatedValues)[0];
        const firstFieldValue = updatedValues[firstFieldKey];
        
        // Also update parent immediately for autocomplete text input
        if (onChange) {
          onChange(firstFieldValue);
        }
        
        return updatedValues;
      });
    }
  };

  // Separate border colors for each field - Validation logic
  const getOverallBorderColor = () => {
    if (localErrors.textField || localErrors.autocomplete) return '1px solid #ef4444';
    return '1px solid var(--location-gray-300)';
  };

  // Get field-specific error state and helper text
  const getTextFieldErrorProps = (field) => {
    const isRequired = field?.InputLabel?.includes('*') || false;
    const fieldKey = field.InputLabel || `field_${0}`;
    const currentValue = fieldValues[fieldKey] || { textField: '', autocomplete: '' };
    
    return {
      error: localErrors.textField && isRequired && (!currentValue.textField || currentValue.textField.trim() === ''),
      // helperText: localErrors.textField && isRequired && (!currentValue.textField || currentValue.textField.trim() === '') 
      //   ? `${getDisplayLabel(field.InputLabel)} is required` 
      //   : ''
    };
  };

  const getAutocompleteErrorProps = (field) => {
    const isRequired = field?.DropdownLabel?.includes('*') || false;
    const fieldKey = field.InputLabel || `field_${0}`;
    const currentValue = fieldValues[fieldKey] || { textField: '', autocomplete: '' };
    
    return {
      error: localErrors.autocomplete && isRequired && (!currentValue.autocomplete || currentValue.autocomplete.trim() === ''),
      // helperText: localErrors.autocomplete && isRequired && (!currentValue.autocomplete || currentValue.autocomplete.trim() === '') 
      //   ? `${getDisplayLabel(field.DropdownLabel)} is required` 
      //   : ''
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
        
        const currentValue = fieldValues[fieldKey] || { textField: '', autocomplete: '' };
        
        const textFieldErrorProps = getTextFieldErrorProps(field);
        const autocompleteErrorProps = getAutocompleteErrorProps(field);

        return (
          <Box 
            key={fieldKey}
            sx={{ 
              display: 'flex', 
              width: '100%', 
              scrollPaddingLeft:'2px',
              flexDirection: inputFirst ? 'row' : 'row-reverse',
              border: getOverallBorderColor(),
              borderRadius: '6px',
              marginLeft:'2px',
              '&:hover': {
                border: localErrors.textField || localErrors.autocomplete 
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
                onChange={(event) => handleInputChange(fieldKey, event)}
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
                backgroundColor: localErrors.textField || localErrors.autocomplete 
                  ? '#ef4444' 
                  : 'var(--location-gray-300)',
                height: '80%',
                margin: '4px 0px',
                '&:hover': {
                  backgroundColor: localErrors.textField || localErrors.autocomplete 
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
                onChange={(event, newValue) => handleAutocompleteChange(fieldKey, event, newValue)}
                onInputChange={(event, newValue) => handleAutocompleteInputChange(fieldKey, event, newValue)}
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