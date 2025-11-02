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
        textField: value?.[fieldKey]?.textField || '',
        autocomplete: value?.[fieldKey]?.autocomplete || ''
      };
    });
    return initialValues;
  });

  // Debounced onChange callback
  const debouncedOnChange = useCallback(
    debounce((newValue) => {
      if (onChange) {
        onChange(newValue);
      }
    }, 1200),
    [onChange]
  );

  // Sync with external value changes
  useEffect(() => {
    const newFieldValues = {};
    fieldData?.forEach((field, index) => {
      const fieldKey = field.InputLabel || `field_${index}`;
      newFieldValues[fieldKey] = {
        textField: value?.[fieldKey]?.textField || '',
        autocomplete: value?.[fieldKey]?.autocomplete || ''
      };
    });
    setFieldValues(newFieldValues);
  }, [value, fieldData]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedOnChange.cancel?.();
    };
  }, [debouncedOnChange]);

  const handleInputChange = (fieldKey, event) => {
    const newValue = event.target.value;
    
    setFieldValues(prev => {
      const updatedValues = {
        ...prev,
        [fieldKey]: {
          ...prev[fieldKey],
          textField: newValue
        }
      };
      
      // Use debounced function to update parent
      debouncedOnChange(updatedValues);
      
      return updatedValues;
    });
  };

  const handleAutocompleteChange = (fieldKey, event, newValue) => {
    const stringValue = newValue || '';
    
    setFieldValues(prev => {
      const updatedValues = {
        ...prev,
        [fieldKey]: {
          ...prev[fieldKey],
          autocomplete: stringValue
        }
      };
      
      // Update parent immediately for autocomplete changes
      if (onChange) {
        onChange(updatedValues);
      }
      
      return updatedValues;
    });
  };

  const handleAutocompleteInputChange = (fieldKey, event, newValue) => {
    // This handles free text input in the autocomplete field
    if (event && event.type === 'change') {
      const stringValue = newValue || '';
      
      setFieldValues(prev => {
        const updatedValues = {
          ...prev,
          [fieldKey]: {
            ...prev[fieldKey],
            autocomplete: stringValue
          }
        };
        
        // Also update parent immediately for autocomplete text input
        if (onChange) {
          onChange(updatedValues);
        }
        
        return updatedValues;
      });
    }
  };

  // Separate border colors for each field - Validation logic
  const getOverallBorderColor = (textfieldError, dropdownError) => {
    if (textfieldError || dropdownError) return '1px solid red';
    return '1px solid #c4c4c4';
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

        return (
          <Box 
            key={fieldKey}
            sx={{ 
              display: 'flex', 
              width: '100%', 
              flexDirection: inputFirst ? 'row' : 'row-reverse',
              border: getOverallBorderColor(false, false), // You can pass specific errors per field if needed
              borderRadius: '4px',
              '&:hover': {
                border: '1px solid black',
              },
              overflow: 'hidden',
              alignItems: 'center',
            }}
          >
            {/* TextField - Always 80% width */}
            <Box sx={{ 
              width: '80%',
              padding: '0px 8px',
              borderRight: inputFirst ? '1px solid #c4c4c4' : 'none',
              borderLeft: !inputFirst ? '1px solid #c4c4c4' : 'none',
            }}>
              <TextField
                id={`creatable-input-${fieldKey}`}
                label={getDisplayLabel(inputLabel)} 
                placeholder={placeholder}
                variant="standard"
                value={currentValue.textField}
                onChange={(event) => handleInputChange(fieldKey, event)}
                error={false} // You can pass specific errors per field
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
                  },
                  '& .MuiFormLabel-asterisk': {
                    color: 'red',
                  }
                }}
              />
            </Box>
            
            {/* Divider - Always visible between fields */}
            <Divider 
              orientation="vertical" 
              flexItem 
              sx={{ 
                backgroundColor: '#c4c4c4',
                height: '80%',
                margin: '4px 0px',
                '&:hover': {
                  backgroundColor: 'black',
                },
              }} 
            />
            
            {/* Autocomplete - Always 20% width */}
            <Box sx={{ 
              width: '20%', 
              padding: '0px 8px',
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
                    error={false} // You can pass specific errors per field
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
                      },
                      '& .MuiFormLabel-asterisk': {
                        color: 'red',
                      }
                    }}
                  />
                )}
                fullWidth
              />
            </Box>
          </Box>
        );
      })}
    </div>
  );
};

export default CreatableDropdown;