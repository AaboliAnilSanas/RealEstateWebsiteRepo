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
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ListingCard = ({ propertyData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!propertyData) {
    return null;
  }

  const { basicDetails, location, propertyProfile, media } = propertyData;

  return (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: isMobile ? 'column' : 'row',
      width: '100%', 
      height: isMobile ? 'auto' : 250,
      mb: 2,
      boxSizing: 'border-box'
    }}>
      {/* Image Section */}
      <Box sx={{ 
        width: isMobile ? '100%' : '30%', 
        height: isMobile ? 200 : '100%',
        flexShrink: 0 
      }}>
        <Box
          component="img"
          src={media?.imageUrl || "/real-estate-hero.jpg"}
          alt="Property"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </Box>

      {/* Content Section */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1,
        p: isMobile ? 1.5 : 2,
        minWidth: 0
      }}>
        <CardContent sx={{ 
          flex: '1 0 auto', 
          p: 0, 
          pb: isMobile ? 0.5 : 0.5,
          '&:last-child': { pb: isMobile ? 0.5 : 0.5 }
        }}>
          {/* Title and Price - Stack vertically on mobile */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between', 
            alignItems: isMobile ? 'flex-start' : 'flex-start',
            mb: 1,
            gap: isMobile ? 0.5 : 0
          }}>
            <Box sx={{ 
              minWidth: 0, 
              flex: 1, 
              mr: isMobile ? 0 : 1 
            }}>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: isMobile ? '0.95rem' : '1rem'
                }} 
                noWrap={!isMobile}
              >
                {basicDetails?.propertyType}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: isMobile ? '0.8rem' : '0.875rem'
                }} 
                noWrap={!isMobile}
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
                fontSize: isMobile ? '0.95rem' : '1rem',
                alignSelf: isMobile ? 'flex-start' : 'auto'
              }}
            >
              {propertyProfile?.price}
            </Typography>
          </Box>

          {/* Location */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: isMobile ? 1 : 1.5 
          }}>
            <LocationOnIcon sx={{ 
              fontSize: isMobile ? 14 : 16, 
              color: 'text.secondary', 
              mr: 0.5, 
              flexShrink: 0 
            }} />
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontSize: isMobile ? '0.8rem' : '0.875rem'
              }} 
              noWrap={!isMobile}
            >
              {location?.apartment}, {location?.locality}, {location?.city}
            </Typography>
          </Box>

          {/* Additional Details */}
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              mb: isMobile ? 1 : 1.5, 
              flexWrap: 'wrap',
              gap: isMobile ? 0.5 : 1
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary', 
                fontSize: isMobile ? '0.75rem' : '0.875rem' 
              }}
            >
              Floor: {propertyProfile?.floor}/{propertyProfile?.totalFloors}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary', 
                fontSize: isMobile ? '0.75rem' : '0.875rem' 
              }}
            >
              • {propertyProfile?.availability}
            </Typography>
          </Stack>

          {/* Key Features - Adjust spacing and wrap on mobile */}
          <Stack 
            direction="row" 
            spacing={isMobile ? 1 : 1.5} 
            sx={{ 
              mb: isMobile ? 1 : 1.5,
              flexWrap: isMobile ? 'wrap' : 'nowrap'
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexShrink: 0,
              mb: isMobile ? 0.5 : 0
            }}>
              <HotelIcon sx={{ 
                fontSize: isMobile ? 14 : 16, 
                color: 'primary.main', 
                mr: 0.5 
              }} />
              <Typography 
                variant="body2" 
                sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
              >
                {propertyProfile?.bedrooms} Beds
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexShrink: 0,
              mb: isMobile ? 0.5 : 0
            }}>
              <BathtubIcon sx={{ 
                fontSize: isMobile ? 14 : 16, 
                color: 'primary.main', 
                mr: 0.5 
              }} />
              <Typography 
                variant="body2" 
                sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
              >
                {propertyProfile?.bathrooms} Baths
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexShrink: 0,
              mb: isMobile ? 0.5 : 0
            }}>
              <BalconyIcon sx={{ 
                fontSize: isMobile ? 14 : 16, 
                color: 'primary.main', 
                mr: 0.5 
              }} />
              <Typography 
                variant="body2" 
                sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
              >
                {propertyProfile?.balconies} Balcony
              </Typography>
            </Box>
          </Stack>

          {/* Description - Show fewer lines on mobile */}
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
                WebkitLineClamp: isMobile ? 1 : 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                cursor: 'pointer',
                fontSize: isMobile ? '0.8rem' : '0.875rem',
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
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'stretch' : 'center',
          gap: isMobile ? 1 : 0,
          mt: 'auto' 
        }}>
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            justifyContent: isMobile ? 'space-between' : 'flex-start'
          }}>
            <Link to={`/properties/${propertyData.id}`} style={{ textDecoration: 'none', flex: isMobile ? 1 : 'none' }}>
              <Button 
                size="small" 
                variant="outlined"
                sx={{ 
                  fontSize: isMobile ? '0.75rem' : '0.875rem', 
                  minWidth: 'auto', 
                  px: isMobile ? 1 : 1.5,
                  width: isMobile ? '100%' : 'auto'
                }}
              >
                View Details
              </Button>
            </Link>
            <Button 
              size="small" 
              variant="contained"
              sx={{ 
                fontSize: isMobile ? '0.75rem' : '0.875rem', 
                minWidth: 'auto', 
                px: isMobile ? 1 : 1.5,
                width: isMobile ? '100%' : 'auto'
              }}
            >
              Contact
            </Button>
          </Box>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary', 
              fontSize: isMobile ? '0.7rem' : '0.75rem',
              textAlign: isMobile ? 'center' : 'right',
              mt: isMobile ? 0.5 : 0
            }}
          >
            ID: {propertyData.id}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ListingCard;