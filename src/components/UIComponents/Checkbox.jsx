import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
const CheckboxComp = (items,position) => {
  return (
     <>
    {items.map((label)=><FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value={label}
          control={<Checkbox />}
          label={label}
          labelPlacement={position}
        />
      </FormGroup>
    </FormControl>)}
      </>
  )
}

export default CheckboxComp
