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
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
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
      style={{ width: 200, minWidth: 200 }}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label={label}
          // Show selected values permanently
          inputProps={{
            ...params.inputProps,
            value: getDisplayText(),
            readOnly: true,
            style: {
              cursor: 'pointer',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }
          }}
          // Custom placeholder that shows when no selection
          placeholder={getDisplayText() || label}
          
        />
      )}
      // Prevent chips from showing
      renderTags={() => null}
      // Clear input value when dropdown closes to show selected values
      onClose={() => setInputValue('')}
      // Force dropdown below
      componentsProps={{
        popper: {
          placement: 'bottom-start',
        },
      }}
      {...props}
    />
  );
};

export default CustomAutocomplete;