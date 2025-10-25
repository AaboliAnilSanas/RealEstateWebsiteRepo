import React from 'react';
import TextField from '@mui/material/TextField';

const InputField = ({ InputLabels, Width, value, onChange, isRequired }) => {
  const labels = Array.isArray(InputLabels) ? InputLabels : [InputLabels];

  // For simplicity, let's assume we're only handling the first input field
  // You might need to adjust your form structure if you have multiple inputs in one field
  return (
    <TextField
      key={0}
      id="outlined-input"
      label={labels[0]} // Only use the first label
      variant="outlined"
      style={{ width: Width }}
      margin="normal"
      value={value || ''}
      onChange={(e) => onChange && onChange(e.target.value)}
      required={isRequired}
      fullWidth
    />
  );
};

export default InputField;