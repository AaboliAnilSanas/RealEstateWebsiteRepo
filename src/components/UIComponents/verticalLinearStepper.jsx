import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Content from "../SellerForm/Content";
import { useSimpleValidation } from "../../hooks/useSimpleValidation";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axiosInstance from '../../services/axios'; // <-- ADDED IMPORT
import { showToast } from "../Toast/ToastContainer";


// Create a custom theme with golden as primary color
const theme = createTheme({
  palette: {
    primary: {
      main: '#d2a63f', // Gold as primary color
      light: '#fbf1d4', // Light gold
      dark: '#b8860b', // Dark gold
    },
    secondary: {
      main: '#2563EB', // Blue as secondary color
    },
  },
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#93C5FD', // Light blue
          '&.Mui-checked': {
            color: '#d2a63f', // Gold - primary color
          },
          '&:hover': {
            backgroundColor: '#fef9c3', // Light gold - was var(--gold-100)
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#93C5FD', // Light blue
          '&.Mui-checked': {
            color: '#d2a63f', // Gold - primary color
          },
          '&:hover': {
            backgroundColor: '#fef9c3', // Light gold
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-completed': {
            color: '#d2a63f', // Gold for completed steps
          },
          '&.Mui-active': {
            color: '#d2a63f', // Gold for active steps
          },
        },
      },
    },
  },
});

function VerticalLinearStepper({ SellerFormDetails, activeStep, onStepChange, formData, updateFormData }) {
  
  const steps = SellerFormDetails || [];
  const { errors, completedSteps, validateStep, clearFieldError, clearErrors, isStepCompleted } = useSimpleValidation();
   
  //FormData
  const buildApiPayload = () => {
  return {
    basic_details: {
      looking_to: formData["I'm looking to*"],
      property_type: formData["What kind of property do you have ?*"],
      property_sub_type: formData["Property Type*"]
    },

    location_details: {
      city: formData["City*"],
      locality: formData["Locality*"],
      sub_locality: formData["Sub Locality"],
      apartment_society: formData["Apartment/Society*"],
      house_no: formData["House No."]
    },

    property_profile: {
      bedrooms: Number(formData["No. of Bedrooms*"]) || 0,
      bathrooms: Number(formData["No. of Bathrooms*"]) || 0,
      balconies: Number(formData["No. of Balconies*"]) || 0,

      area_details: {
        carpet_area: { 
          value: formData["Add Area Details*"]?.values?.[0]?.value || 0,
          unit: formData["Add Area Details*"]?.values?.[0]?.unit || "sq.ft"
        },
        built_up_area: { 
          value: formData["Add Area Details*"]?.values?.[1]?.value || 0,
          unit: formData["Add Area Details*"]?.values?.[1]?.unit || "sq.ft"
        }
      },

      floor_details: {
        total_floors: formData["Floor Details"]?.values?.[0] || 0,
        selected_floor: formData["Floor Details"]?.values?.[1] || ""
      },

      availability_status: formData["Availability Status*"],

      possession_date: {
        month: Number(formData["Age of Property / Possession By*"]?.units?.[0]) || 1,
        year: Number(formData["Age of Property / Possession By*"]?.values?.[0]) || 2025
      },

      ownership: formData["Ownership*"],

      price_details: {
        value: Number(formData["Price Details*"]?.values?.[0]) || 0,
        unit: formData["Price Details*"]?.units?.[0] || "₹"
      },

      description: formData["What makes your property unique"]
    },

    media: {
      videos: (formData["Upload Videos"] || []).map(v => v.url || v),
      photos: (formData["Upload Photos*"] || [])
           .filter(p => typeof p === "string" || p.url)
           .map(p => typeof p === "string" ? p : p.url),
    },

    metadata: {
      submission_date: new Date().toISOString().split(".")[0],
      form_version: "1.0"
    }
  };
};

  // Check if user can navigate to a specific step
  const canNavigateToStep = (targetStep) => {
    // Allow going back to any previous step
    if (targetStep < activeStep) return true;
    
    // For going forward, check if all previous steps are completed
    for (let i = 0; i < targetStep; i++) {
      if (!isStepCompleted(i, steps[i].fields, formData)) {
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    const currentStep = steps[activeStep];
    const isStepValid = validateStep(currentStep.fields, formData, activeStep);
    
    if (isStepValid) {
      onStepChange(activeStep + 1);
    }
  };

  const handleBack = () => onStepChange(activeStep - 1);
  
  const handleStepClick = (index) => {
    if (canNavigateToStep(index)) {
      onStepChange(index);
    }
  };
  
  const handleReset = () => {
    onStepChange(0);
    clearErrors();
  };

  const handleFormDataUpdate = (fieldName, value) => {
    updateFormData({ [fieldName]: value });
    
    // Clear error when user selects a value
    if (value && errors[fieldName]) {
      clearFieldError(fieldName);
    }
  };

  // Check if all steps are completed for the Finish button
  const isAllStepsCompleted = () => {
    return steps.every((step, index) => isStepCompleted(index, step.fields, formData));
  };

const handleFinish = async () => {
  let allValid = true;

  steps.forEach((step, index) => {
    const stepValid = validateStep(step.fields, formData, index);
    if (!stepValid) allValid = false;
  });

  if (!allValid) {
    showToast("error", "Please complete all required fields.");
    return;
  }

  const payload = buildApiPayload();

  try {
    const res = await axiosInstance.post("/property/add", payload);

    showToast("success", "Property added successfully!");

    console.log("SUCCESS:", res.data);

  } catch (error) {
    console.error("Property Submit Error:", error?.response || error);

    if (error?.response?.status === 403) {
        showToast("error", "You are not logged in. Please login to add a property.");
    } else if (error?.response?.status === 400) {
        showToast("error", "Invalid property data. Please check your inputs.");
    } else if (error?.response?.status === 500) {
        showToast("error", "Server error. Please try again later.");
    } else {
        showToast("error", "Failed to submit property. Please try again.");
    }
}
};

  // Lock Icon Component with Tooltip
  const LockIconWithTooltip = ({ index }) => {
    const [showTooltip, setShowTooltip] = React.useState(false);

    return (
      <Box 
        sx={{ 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          sx={{
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9CA3AF', // Gray
            cursor: 'pointer',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#fef9c3', // Light gold
            }
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5 5 5 0 0 1 5 5v2h1m-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3z"/>
          </svg>
        </Box>

        {/* Hover Tooltip */}
        {showTooltip && (
          <Box
            sx={{
              position: 'absolute',
              top: '-45px',
              left: '-110%',
              transform: 'translateX(-50%)',
              background: '#854d0e', // Dark gold - was var(--gold-800)
              color: 'white',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 'normal',
              whiteSpace: 'nowrap',
              zIndex: 1000,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '8px',
                height: '8px',
                background: '#854d0e', // Dark gold
                rotate: '45deg'
              }
            }}
          >
            Complete previous steps
          </Box>
        )}
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", maxWidth: "98%", mx: "auto", mt: "2", mb: "var(--spacing-xl)" }}>
        <Stepper nonLinear activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index) || isStepCompleted(index, step.fields, formData);
            const isStepAccessible = canNavigateToStep(index);
            const isCurrent = index === activeStep;
            
            return (
              <Step key={step.header} completed={isCompleted}>
                <Box sx={{ position: 'relative' }}>
                  <StepLabel
                    onClick={() => isStepAccessible && handleStepClick(index)}
                    sx={{
                      cursor: isStepAccessible ? "pointer" : "default",
                      fontWeight: "bold",
                      opacity: isStepAccessible ? 1 : 0.6,
                      "& .MuiStepIcon-root": { 
                        color: isCompleted ? "#d2a63f" : "#93C5FD" // Gold : Light blue
                      },
                      "&.Mui-active .MuiStepIcon-root": { color: "#d2a63f" }, // Gold for active steps
                      "&.Mui-completed .MuiStepIcon-root": { color: "#d2a63f" }, // Gold for completed steps
                      "&:hover": {
                        opacity: isStepAccessible ? 1 : 0.6,
                      }
                    }}
                  >
                    {step.header}
                  </StepLabel>

                  {/* Lock Icon for Inaccessible Steps - Positioned absolutely */}
                  {!isStepAccessible && index > activeStep && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                      }}
                    >
                      <LockIconWithTooltip index={index} />
                    </Box>
                  )}
                </Box>

                <StepContent>
                  <Box
                    className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-md"
                    sx={{ 
                      border: "1px solid #BFDBFE", // Light blue border
                      mb: 3, 
                      p: 1,
                      background: "linear-gradient(135deg, #EFF6FF, white)" // Light blue to white
                    }}
                  >
                    <Content 
                      formDetails={step}
                      formData={formData}
                      updateFormData={handleFormDataUpdate}
                      errors={errors}
                    />

                    <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap",  justifyContent: "right" }}>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{
                          mt: 1, mr: 1,
                          color: "#d2a63f", // Gold
                          border: "1px solid #fde047", // Light gold - was var(--gold-300)
                          "&:hover": { 
                            backgroundColor: "#fef9c3", // Light gold
                            border: "1px solid #d2a63f" // Gold
                          },
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        onClick={index === steps.length - 1 ? handleFinish : handleNext}
                        disabled={index === steps.length - 1 ? !isAllStepsCompleted() : !isStepCompleted(index, step.fields, formData)}
                        sx={{
                          mt: 1, mr: 1,
                          background: "linear-gradient(90deg, #d2a63f, #b8860b)", // Gold gradient
                          color: "white",
                          "&:hover": { 
                            background: "linear-gradient(90deg, #b8860b, #d2a63f)", // Gold gradient reversed
                            boxShadow: "0 4px 12px rgba(210, 166, 63, 0.3)" // Gold shadow
                          },
                          "&:disabled": {
                            background: "#D1D5DB", // Gray
                            color: "#4B5563", // Dark gray
                            boxShadow: "none"
                          }
                        }}
                      >
                        {index === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Box>
                  </Box>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ 
            p: "var(--padding-y)", 
            py:"20px",
            mb:"10px",
            
            textAlign: "center", 
            background: "linear-gradient(135deg, #fef9c3, #fbf1d4)", // Light gold gradient
            borderRadius: "var(--radius-lg)",
            border: "1px solid #fde047" // Light gold border
          }}>
            <Typography sx={{ 
              mb: "10px", 
              color: "#b8860b", // Dark gold
              fontWeight: "bold",
              fontSize: "1.1rem"
            }}>
              🎉 All steps completed — you're finished!
            </Typography>
            <Button 
              onClick={handleReset} 
              sx={{ 
                background: "linear-gradient(90deg, #d2a63f, #b8860b)", // Gold gradient
                color: "white", 
                "&:hover": { 
                  background: "linear-gradient(90deg, #b8860b, #d2a63f)", // Gold gradient reversed
                  boxShadow: "0 4px 12px rgba(210, 166, 63, 0.3)" // Gold shadow
                } 
              }}
            >
              Create New Listing
            </Button>
          </Paper>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default VerticalLinearStepper;