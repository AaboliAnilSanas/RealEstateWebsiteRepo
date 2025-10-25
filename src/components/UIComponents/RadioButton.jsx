import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function RadioButton({ RadioLabels, value, onChange, isRequired }) {
  const labels = Array.isArray(RadioLabels) ? RadioLabels : [RadioLabels];

  return (
    <FormControl>
      <RadioGroup 
        row 
        name="radio-options"
        value={value || ''} // Make sure value is not undefined
        onChange={(e) => onChange(e.target.value)} // Call parent's onChange
      >
        {labels.map((label, idx) => (
          <FormControlLabel
            key={idx}
            value={label}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButton;