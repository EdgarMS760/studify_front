import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectAtom = ({ items = [], placeholder = 'Selecciona', value, onChange }) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>{placeholder}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={placeholder}
      >
        {/* <MenuItem value="">
          <em>No Ordenar</em>
        </MenuItem> */}
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectAtom;
