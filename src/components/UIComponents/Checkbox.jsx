import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const CheckboxComp = ({ items, position = 'end' }) => {
  return (
    <FormGroup sx={{ width: '100%' }}>
      {items.map((label, index) => (
        <FormControl key={index} component="fieldset" sx={{ width: '100%' }}>
          <FormGroup aria-label="position" row sx={{ width: '100%' }}>
            <FormControlLabel
              value={label}
              control={
                <Checkbox 
                  sx={{
                    color: 'var(--gold-base)',
                    '&.Mui-checked': {
                      color: 'var(--gold-base)',
                    },
                    '&:hover': {
                      backgroundColor: 'var(--gold-light)',
                    },
                    padding: '8px',
                    '& .MuiSvgIcon-root': {
                      fontSize: '20px',
                    }
                  }}
                />
              }
              label={label}
              labelPlacement={position}
              sx={{
                width: '100%',
                margin: '4px 0',
                padding: '4px 8px',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'var(--gold-light)',
                },
                '& .MuiFormControlLabel-label': {
                  fontSize: '14px',
                  color: 'var(--location-blue-800)',
                  fontWeight: '500',
                }
              }}
            />
          </FormGroup>
        </FormControl>
      ))}
    </FormGroup>
  )
}

export default CheckboxComp