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

function VerticalLinearStepper({ SellerFormDetails }) {
  const steps = SellerFormDetails || [];
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});
  const { errors, validateStep, clearFieldError, clearErrors } = useSimpleValidation();

  const handleNext = () => {
    const currentStep = steps[activeStep];
    const isStepValid = validateStep(currentStep.fields, formData);
    
    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  
  const handleStepClick = (index) => {
    setActiveStep(index);
  };
  
  const handleReset = () => {
    setActiveStep(0);
    setFormData({});
    clearErrors();
  };

  const updateFormData = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear error when user selects a value
    if (value && errors[fieldName]) {
      clearFieldError(fieldName);
    }
  };

  const handleFinish = () => {
    // Validate all steps
    let allValid = true;
    
    steps.forEach(step => {
      const stepValid = validateStep(step.fields, formData);
      if (!stepValid) allValid = false;
    });

    if (allValid) {
      console.log('=== FORM SUBMISSION DATA ===');
      console.log('Form submitted successfully!');
      
      // Print all form data in a readable format
      Object.keys(formData).forEach(fieldName => {
        const value = formData[fieldName];
        
        if (typeof value === 'object' && value !== null) {
          // Handle CreatableDropdown data
          if (value.values && value.units) {
            console.log(`${fieldName}:`);
            value.values.forEach((val, index) => {
              if (val && val.trim() !== '') {
                console.log(`  - ${val} ${value.units[index]}`);
              }
            });
          } else {
            console.log(`${fieldName}:`, value);
          }
        } else {
          console.log(`${fieldName}:`, value);
        }
      });
      
      console.log('=== END FORM DATA ===');
      setActiveStep(steps.length);
    } else {
      console.log('Please fill all required fields before submitting.');
      console.log('Current errors:', errors);
      console.log('Current form data:', formData);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "95%", mx: "auto", mt: "var(--spacing-lg)", mb: "var(--spacing-xl)" }}>
      <Stepper nonLinear activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.header} completed={false}>
            <StepLabel
              onClick={() => handleStepClick(index)}
              sx={{
                cursor: "pointer",
                fontWeight: "bold",
                "& .MuiStepIcon-root": { color: "var(--primary-color)" },
                "&.Mui-active .MuiStepIcon-root": { color: "var(--secondary-color)" },
                "&.Mui-completed .MuiStepIcon-root": { color: "var(--primary-color-light)" },
              }}
            >
              {step.header}
            </StepLabel>

            <StepContent>
              <Box
                className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-md"
                sx={{ border: "1px solid rgba(210, 166, 63, 0.3)", mb: "var(--gap)", p: "var(--padding-y)" }}
              >
                <Content 
                  formDetails={step}
                  formData={formData}
                  updateFormData={updateFormData}
                  errors={errors}
                />

                <Box sx={{ mt: "var(--gap)", display: "flex", flexWrap: "wrap", gap: "var(--gap-sm)", justifyContent: "right" }}>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{
                      mt: 1, mr: 1,
                      color: "var(--primary-color)",
                      border: "1px solid var(--primary-color)",
                      "&:hover": { backgroundColor: "rgba(210,166,63,0.08)" },
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={index === steps.length - 1 ? handleFinish : handleNext}
                    sx={{
                      mt: 1, mr: 1,
                      background: "linear-gradient(90deg, var(--tertiary-color), var(--primary-color))",
                      color: "white",
                      "&:hover": { background: "linear-gradient(90deg, var(--primary-color), var(--tertiary-color))" },
                    }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: "var(--padding-y)", textAlign: "center", background: "var(--secondary-color-light)", borderRadius: "var(--radius-lg)" }}>
          <Typography sx={{ mb: "var(--gap)" }}>
            🎉 All steps completed — you're finished!
          </Typography>
          <Button onClick={handleReset} sx={{ background: "linear-gradient(90deg, var(--primary-color), var(--tertiary-color))", color: "white", "&:hover": { background: "linear-gradient(90deg, var(--tertiary-color), var(--primary-color))" } }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default VerticalLinearStepper;