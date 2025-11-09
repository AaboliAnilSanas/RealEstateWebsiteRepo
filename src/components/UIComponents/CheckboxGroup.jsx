import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Box } from '@mui/material';

const CheckboxGroup = ({ value = [], onChange, isRequired = false, error = false, label, fieldData = [] }) => {
  const handleCheckboxChange = (amenity) => {
    const newValue = value.includes(amenity)
      ? value.filter(item => item !== amenity)
      : [...value, amenity];
    
    onChange(newValue);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <FormGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {fieldData.map((amenity, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={value.includes(amenity)}
                  onChange={() => handleCheckboxChange(amenity)}
                  sx={{
                    color: 'var(--location-blue-400)',
                    '&.Mui-checked': {
                      color: 'var(--gold-base)',
                    },
                  }}
                />
              }
              label={amenity}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.875rem',
                  color: 'var(--location-blue-800)',
                },
                border: '1px solid var(--location-gray-300)',
                borderRadius: '8px',
                padding: '8px 12px',
                margin: 0,
                '&:hover': {
                  borderColor: 'var(--gold-base)',
                  backgroundColor: 'var(--gold-light)',
                },
              }}
            />
          ))}
        </div>
      </FormGroup>
    </Box>
  );
};

export default CheckboxGroup;