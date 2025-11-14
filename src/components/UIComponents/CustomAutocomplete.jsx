import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useTheme, useMediaQuery } from '@mui/material';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CustomAutocomplete = ({ 
  label, 
  options = [], 
  multiple = false,
  value,
  onChange,
  error = false,
  helperText = "",
  ...props 
}) => {
  const [inputValue, setInputValue] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const getOptionLabel = (option) => {
    if (typeof option === 'string') return option;
    return option.label || option.title || option.toString();
  };

  // Get display text for selected values
  const getDisplayText = () => {
    if (multiple) {
      return value && value.length > 0 
        ? value.map(getOptionLabel).join(', ')
        : '';
    } else {
      return value ? getOptionLabel(value) : '';
    }
  };

  const isRequired = label && label.includes('*');
  const displayLabel = label ? label.replace('*', '') : '';

  // Only apply red styling if field is required AND has error
  const shouldShowError = isRequired && error;

  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      disableCloseOnSelect={multiple}
      getOptionLabel={getOptionLabel}
      renderOption={(props, option, { selected }) => (
        <li 
          {...props} 
          style={{
            backgroundColor: selected ? 'var(--gold-light)' : 'white',
            color: 'var(--location-blue-800)',
            fontSize: isMobile ? '14px' : '13px',
            padding: isMobile ? '12px 16px' : '8px 12px',
            minHeight: isMobile ? '48px' : '40px',
          }}
        >
          {multiple && (
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
              size={isMobile ? "medium" : "small"}
              sx={{
                color: 'var(--gold-base)',
                '&.Mui-checked': {
                  color: 'var(--gold-base)',
                },
              }}
            />
          )}
          {getOptionLabel(option)}
        </li>
      )}
      value={value || (multiple ? [] : null)}
      onChange={onChange}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      style={{ 
        width: '100%',
        minWidth: '100%',
      }}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label={displayLabel}
          error={shouldShowError}
          helperText={shouldShowError ? helperText : ""}
          required={isRequired}
          inputProps={{
            ...params.inputProps,
            value: getDisplayText(),
            readOnly: true,
            style: {
              cursor: 'pointer',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              color: 'var(--location-blue-800)',
              fontSize: isMobile ? '16px' : '14px', // Prevents zoom on iOS
              minHeight: isMobile ? '24px' : '20px',
              padding: isMobile ? '16px 14px' : '8px 14px',
            }
          }}
          placeholder={getDisplayText() || label}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: 'white',
              minHeight: isMobile ? '56px' : '40px',
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: shouldShowError ? '#d32f2f' : 'var(--gold-base)',
                }
              },
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: shouldShowError ? '#d32f2f' : 'var(--gold-base)',
                  borderWidth: '1px',
                }
              },
              '& fieldset': {
                borderColor: shouldShowError ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)',
                borderWidth: isMobile ? '2px' : '1px',
              },
            },
            '& .MuiInputLabel-root': {
              color: shouldShowError ? '#d32f2f' : 'var(--location-gray-600)',
              fontSize: isMobile ? '16px' : '14px',
              '&.Mui-focused': {
                color: shouldShowError ? '#d32f2f' : 'var(--gold-base)',
              },
              // Prevent label overlap on mobile
              '&.MuiInputLabel-shrink': {
                transform: 'translate(14px, -9px) scale(0.75)',
                backgroundColor: 'white',
                padding: '0 4px',
              }
            },
            '& .MuiInputLabel-asterisk': {
              color: shouldShowError ? '#d32f2f' : 'var(--gold-base)',
            },
            '& .MuiAutocomplete-popupIndicator': {
              color: shouldShowError ? '#d32f2f' : 'var(--gold-base)',
              padding: isMobile ? '8px' : '4px',
            },
            '& .MuiAutocomplete-clearIndicator': {
              color: shouldShowError ? '#d32f2f' : 'var(--gold-base)',
              padding: isMobile ? '8px' : '4px',
            },
            '& .MuiFormHelperText-root': {
              color: '#d32f2f',
              marginLeft: 0,
              fontSize: isMobile ? '14px' : '12px',
            }
          }}
        />
      )}
      renderTags={() => null}
      onClose={() => setInputValue('')}
      componentsProps={{
        popper: {
          placement: 'bottom-start',
          modifiers: [
            {
              name: 'preventOverflow',
              enabled: true,
              options: {
                altAxis: true,
                tether: false,
                rootBoundary: 'viewport'
              }
            }
          ],
          sx: {
            '& .MuiAutocomplete-paper': {
              backgroundColor: 'white',
              border: '1px solid var(--location-gray-300)',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              maxHeight: isMobile ? '60vh' : '40vh', // Prevent overflow on mobile
              overflow: 'auto',
            }
          }
        },
      }}
      sx={{
        '& .MuiAutocomplete-listbox': {
          padding: isMobile ? '8px' : '4px',
        },
        '& .MuiAutocomplete-option': {
          fontSize: isMobile ? '16px' : '14px', // Better touch targets
          borderRadius: '4px',
          margin: '2px 0',
          minHeight: isMobile ? '48px' : '36px', // Larger touch targets
          display: 'flex',
          alignItems: 'center',
          '&[aria-selected="true"]': {
            backgroundColor: 'var(--gold-light)',
          },
          '&.Mui-focused': {
            backgroundColor: 'var(--gold-light)',
          },
        },
        // Mobile-specific styles
        ...(isMobile && {
          '& .MuiAutocomplete-root': {
            touchAction: 'manipulation', // Better touch handling
          }
        })
      }}
      // Mobile-specific props
      disablePortal={isMobile} // Better performance on mobile
      openOnFocus={true} // Better UX for touch devices
      {...props}
    />
  );
};

export default CustomAutocomplete;