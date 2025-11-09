// components/FilterIcon.jsx
import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

const FilterIcon = ({ 
  filterCount = 0, 
  onClick, 
  size = "medium",
  className = "" 
}) => {
  return (
    <IconButton
      onClick={onClick}
      size={size}
      className={className}
      sx={{
        color: 'var(--gold-base)',
        '&:hover': {
          backgroundColor: 'var(--gold-light)',
        },
      }}
    >
      <Badge
        badgeContent={filterCount}
        color="primary"
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: 'var(--location-blue-600)',
            color: 'white',
            fontSize: '10px',
            height: '16px',
            minWidth: '16px',
          },
        }}
      >
        <FilterListIcon 
          fontSize={size === "small" ? "small" : "medium"}
        />
      </Badge>
    </IconButton>
  );
};

export default FilterIcon;