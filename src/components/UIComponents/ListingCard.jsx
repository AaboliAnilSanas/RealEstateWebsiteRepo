import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BathtubIcon from '@mui/icons-material/Bathtub';
import HotelIcon from '@mui/icons-material/Hotel';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BalconyIcon from '@mui/icons-material/OutdoorGrill';

const ListingCard = ({ propertyData }) => {
  if (!propertyData) {
    return null;
  }

  const { basicDetails, location, propertyProfile, media } = propertyData;

  return (
    <Card sx={{ 
      display: 'flex', 
      width: '100%', 
      height: 250, // Reduced from 250
      mb: 2,
      boxSizing: 'border-box'
    }}>
      {/* Left Section - Image */}
      <Box sx={{ 
        width: '30%', 
        flexShrink: 0 
      }}>
        <Box
          component="img"
          src={media?.imageUrl || "/real-estate-hero.jpg"}
          alt="Real Estate Hero"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </Box>

      {/* Right Section - Content */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1,
        p: 2, // Reduced from 2
        minWidth: 0
      }}>
        <CardContent sx={{ 
          flex: '1 0 auto', 
          p: 0, 
          pb: 0.5, // Reduced
          '&:last-child': { pb: 0.5 }
        }}>
          {/* Title and Price */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box sx={{ minWidth: 0, flex: 1, mr: 1 }}>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: '1rem' // Standardized
                }} 
                noWrap
              >
                {basicDetails?.propertyType}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '0.875rem' // Standardized
                }} 
                noWrap
              >
                For {basicDetails?.transactionType?.toLowerCase()}
              </Typography>
            </Box>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                color: 'primary.main', 
                fontWeight: 'bold', 
                flexShrink: 0,
                fontSize: '1rem' // Standardized
              }}
            >
              {propertyProfile?.price}
            </Typography>
          </Box>

          {/* Location */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <LocationOnIcon sx={{ 
              fontSize: 16, 
              color: 'text.secondary', 
              mr: 0.5, 
              flexShrink: 0 
            }} />
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontSize: '0.875rem'
              }} 
              noWrap
            >
              {location?.apartment}, {location?.locality}, {location?.city}
            </Typography>
          </Box>

          {/* Additional Details */}
          <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              Floor: {propertyProfile?.floor}/{propertyProfile?.totalFloors}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
              • {propertyProfile?.availability}
            </Typography>
          </Stack>
          {/* Key Features */}
          <Stack direction="row" spacing={1.5} sx={{ mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <HotelIcon sx={{ fontSize: 16, color: 'primary.main', mr: 0.5 }} />
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                {propertyProfile?.bedrooms} Beds
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <BathtubIcon sx={{ fontSize: 16, color: 'primary.main', mr: 0.5 }} />
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                {propertyProfile?.bathrooms} Baths
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <BalconyIcon sx={{ fontSize: 16, color: 'primary.main', mr: 0.5 }} />
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                {propertyProfile?.balconies} Balcony
              </Typography>
            </Box>
          </Stack>
          {/* Description */}
          <Tooltip 
            title={propertyProfile?.description || ''}
            placement="top"
            arrow
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                cursor: 'pointer',
                fontSize: '0.875rem',
                lineHeight: 1.4,
                '&:hover': {
                  color: 'text.primary'
                }
              }}
            >
              {propertyProfile?.description}
            </Typography>
          </Tooltip>
        </CardContent>

        {/* Bottom Section - Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              size="small" 
              variant="outlined"
              sx={{ fontSize: '0.875rem', minWidth: 'auto', px: 1.5 }}
            >
              View Details
            </Button>
            <Button 
              size="small" 
              variant="contained"
              sx={{ fontSize: '0.875rem', minWidth: 'auto', px: 1.5 }}
            >
              Contact
            </Button>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
            ID: {propertyData.id}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ListingCard;