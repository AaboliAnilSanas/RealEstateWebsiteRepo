import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CustomAutocomplete = ({ 
  label, 
  options = [], 
  multiple = false,
  value,
  onChange,
  ...props 
}) => {
  const [inputValue, setInputValue] = useState('');
  
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
            '&:hover': {
              backgroundColor: 'var(--gold-light)',
            }
          }}
        >
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            sx={{
              color: 'var(--gold-base)',
              '&.Mui-checked': {
                color: 'var(--gold-base)',
              },
            }}
          />
          {getOptionLabel(option)}
        </li>
      )}
      value={value || (multiple ? [] : null)}
      onChange={onChange}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      style={{ width: 200, minWidth: '100%' }}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label={label}
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
              fontSize: '14px'
            }
          }}
          placeholder={getDisplayText() || label}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: 'white',
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--gold-base)',
                }
              },
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--gold-base)',
                  borderWidth: '1px',
                }
              }
            },
            '& .MuiInputLabel-root': {
              color: 'var(--location-gray-600)',
              fontSize: '14px',
              '&.Mui-focused': {
                color: 'var(--gold-base)',
              }
            },
            '& .MuiAutocomplete-popupIndicator': {
              color: 'var(--gold-base)',
            },
            '& .MuiAutocomplete-clearIndicator': {
              color: 'var(--gold-base)',
            },
          }}
        />
      )}
      renderTags={() => null}
      onClose={() => setInputValue('')}
      componentsProps={{
        popper: {
          placement: 'bottom-start',
          sx: {
            '& .MuiAutocomplete-paper': {
              backgroundColor: 'white',
              border: '1px solid var(--location-gray-300)',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }
          }
        },
      }}
      sx={{
        '& .MuiAutocomplete-listbox': {
          padding: '4px',
        },
        '& .MuiAutocomplete-option': {
          fontSize: '14px',
          borderRadius: '4px',
          margin: '2px 0',
          '&[aria-selected="true"]': {
            backgroundColor: 'var(--gold-light)',
          },
          '&.Mui-focused': {
            backgroundColor: 'var(--gold-light)',
          },
        },
      }}
      {...props}
    />
  );
};

export default CustomAutocomplete;