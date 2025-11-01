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
  const [textFieldValue, setTextFieldValue] = useState(value?.textField || '');
  const [autocompleteValue, setAutocompleteValue] = useState(value?.autocomplete || '');
  
  // Get field data from the first item in fieldData array
  const fieldDataItem = fieldData?.[0] || {};
  const inputLabel = fieldDataItem?.InputLabel || 'Input';
  const dropdownLabelText = fieldDataItem?.DropdownLabel || 'Option';
  const options = fieldDataItem?.units || [];
  const placeholder = fieldDataItem?.placeholder;

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
    setTextFieldValue(value?.textField || '');
    setAutocompleteValue(value?.autocomplete || '');
  }, [value?.textField, value?.autocomplete]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedOnChange.cancel?.();
    };
  }, [debouncedOnChange]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setTextFieldValue(newValue);
    
    // Use debounced function to update parent
    debouncedOnChange({ 
      textField: newValue, 
      autocomplete: autocompleteValue 
    });
  };

  const handleAutocompleteChange = (event, newValue) => {
    const stringValue = newValue || '';
    setAutocompleteValue(stringValue);
    
    // Update parent immediately for autocomplete changes
    if (onChange) {
      onChange({ 
        textField: textFieldValue, 
        autocomplete: stringValue 
      });
    }
  };

  const handleAutocompleteInputChange = (event, newValue) => {
    // This handles free text input in the autocomplete field
    if (event && event.type === 'change') {
      const stringValue = newValue || '';
      setAutocompleteValue(stringValue);
      
      // Also update parent immediately for autocomplete text input
      if (onChange) {
        onChange({ 
          textField: textFieldValue, 
          autocomplete: stringValue 
        });
      }
    }
  };

  // Separate border colors for each field - Validation logic
  const getTextFieldBorderColor = () => {
    return textfieldError ? '1px solid red' : '1px solid transparent';
  };

  const getAutocompleteBorderColor = () => {
    return dropdownError ? '1px solid red' : '1px solid transparent';
  };

  const getOverallBorderColor = () => {
    if (textfieldError || dropdownError) return '1px solid red';
    return '1px solid #c4c4c4';
  };

  return (
    <>
     {fieldData.map((field, index) => (
    <Box sx={{ 
      display: 'flex', 
      width: '100%', 
      flexDirection: inputFirst ? 'row' : 'row-reverse',
      border: getOverallBorderColor(),
      borderRadius: '4px',
      '&:hover': {
        border: textfieldError || dropdownError ? '1px solid red' : '1px solid black',
      },
      overflow: 'hidden',
      alignItems: 'center',
    }}>
     

      {/* TextField - Always 80% width */}
      <Box sx={{ 
        width: '80%',
        padding: '0px 8px',
        borderRight: inputFirst && (textfieldError || dropdownError) ? '1px solid red' : 
                    inputFirst ? '1px solid #c4c4c4' : 'none',
        borderLeft: !inputFirst && (textfieldError || dropdownError) ? '1px solid red' : 
                   !inputFirst ? '1px solid #c4c4c4' : 'none',
      }}>
        <TextField
          id="creatable-input"
          label={inputLabel} 
          placeholder={placeholder}
          variant="standard"
          value={textFieldValue}
          onChange={handleInputChange}
          error={textfieldError}
          required={textfieldisRequired}
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
              color: 'white',
            }
          }}
        />
      </Box>
      
      {/* Divider - Always visible between fields */}
      <Divider 
        orientation="vertical" 
        flexItem 
        sx={{ 
          backgroundColor: textfieldError || dropdownError ? 'red' : '#c4c4c4',
          height: '80%',
          margin: '4px 0px',
          '&:hover': {
            backgroundColor: textfieldError || dropdownError ? 'red' : 'black',
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
          value={autocompleteValue}
          onChange={handleAutocompleteChange}
          onInputChange={handleAutocompleteInputChange}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label={dropdownLabelText} 
              error={dropdownError}
              required={dropdownisRequired}
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
                  color: 'white',
                }
              }}
            />
          )}
          fullWidth
        />
      </Box>
     
    </Box>
     ))}
     </>
  );
  
};

export default CreatableDropdown;