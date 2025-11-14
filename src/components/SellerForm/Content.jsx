import React, { useState } from "react";
import Label from "../UIComponents/Label";
import InputField from "../UIComponents/InputField";
import Chips from "../UIComponents/Chips";
import RadioButton from "../UIComponents/RadioButton";
import CreatableDropdown from "../UIComponents/CreatableDropDown";
import UploadFile from "../UIComponents/UploadFiles";
import CheckboxGroup from "../UIComponents/CheckboxGroup";

const Content = ({ formDetails, formData, updateFormData, errors, isMobile = false }) => {
  const [dropdownValidations, setDropdownValidations] = useState({});

  const handleFieldChange = (fieldName, value) => {
    updateFormData(fieldName, value);

    if (value && errors[fieldName]) {
      // We'll handle this in the parent component
    }
  };

  // Handle validation status from CreatableDropdown
  const handleDropdownValidation = (fieldName, isValid) => {
    setDropdownValidations(prev => ({
      ...prev,
      [fieldName]: isValid
    }));
  };

  // Check if field is required based on asterisk in label
  const isFieldRequired = (fieldLabel) => {
    return fieldLabel && fieldLabel.includes('*');
  };

  // Remove asterisk from label for display
  const getDisplayLabel = (label) => {
    return label ? label.replace(/\*$/, '') : label;
  };

  // Check if field should be numeric based on label
  const isNumericField = (fieldLabel) => {
    const label = fieldLabel.toLowerCase();
    return label.includes('price') || 
           label.includes('area') || 
           label.includes('carpet') || 
           label.includes('built') || 
           label.includes('super') ||
           label.includes('floor') ||
           label.includes('year');
  };

  return (
    <div>
      <div className={`mb-2 ${isMobile ? 'px-1' : 'px-2'}`}>
        <Label
          LabelName={formDetails.label}
          className={`font-black bg-gradient-to-r from-[var(--location-blue-600)] to-[var(--location-blue-800)] bg-clip-text text-transparent uppercase tracking-wide mb-2 ${
            isMobile ? 'text-xl' : 'text-2xl'
          }`}
        />
        {formDetails.subLabel && (
          <h4 className="text-[var(--location-blue-600)] mt-1 text-sm mb-3 italic font-medium bg-[var(--location-blue-50)] px-3 py-2 rounded-lg border border-[var(--location-blue-200)]">
               💡 {formDetails.subLabel}
          </h4>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {formDetails.fields.map((field, idx) => {
          const fieldName = field.label;
          const fieldValue = formData[fieldName] || "";
          const isRequired = field.label.includes("*");
          const error = errors[fieldName];
          const isDropdownValid = dropdownValidations[fieldName] !== false;
          const shouldBeNumeric = isNumericField(field.label);

          return (
            <div
              key={idx}
              className={`bg-gradient-to-br from-white to-[var(--location-blue-50)] rounded-2xl p-3 mx-1 shadow-sm border-2 transition-all duration-300 hover:shadow-lg ${
                error || (field.fieldType === "CreatableDropdown" && !isDropdownValid)
                  ? "border-red-300 bg-red-50/50 shadow-red-100" 
                  : "border-[var(--location-blue-100)] hover:border-[var(--location-blue-200)] hover:shadow-[var(--location-blue-100)]"
              } ${isMobile ? 'rounded-lg' : ''}`}
            >
              {field.label && (
                <h3 className={`font-bold text-[var(--location-blue-800)] mb-3 pl-1 flex items-center gap-2 ${
                  isMobile ? 'text-base' : 'text-lg'
                }`}>
                  {getDisplayLabel(field.label)}
                  {isRequired && (
                    <span className="text-red-500 text-sm font-semibold">*</span>
                  )}
                  {shouldBeNumeric && (
                    <span className="text-blue-500 text-xs font-normal bg-blue-50 px-2 py-1 rounded">
                      Numeric
                    </span>
                  )}
                </h3>
              )}

              {field.subLabel && (
                <h4 className="text-[var(--gold-base)] text-sm mb-3 italic font-medium bg-[var(--gold-light)] px-3 py-2 rounded-lg border border-[var(--gold-base)]/30">
                  💡 {field.subLabel}
                </h4>
              )}

              {/* Enhanced Error Message */}
              {(error || (field.fieldType === "CreatableDropdown" && !isDropdownValid)) && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50/80 px-3 py-2 rounded-xl border border-red-200 mb-3">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">
                    {error || `${getDisplayLabel(field.label)} is required`}
                  </span>
                </div>
              )}

              {(() => {
                const commonProps = {
                  value: fieldValue,
                  onChange: (value) => handleFieldChange(fieldName, value),
                  isRequired: isRequired,
                  isMobile: isMobile,
                };

                switch (field.fieldType) {
                  case "InputField":
                    return (
                      <div className="w-full">
                        <InputField
                          {...commonProps}
                          InputLabels={field.fieldData || []}
                          Width={"100%"}
                          isNumeric={shouldBeNumeric}
                        />
                      </div>
                    );

                  case "Chips":
                    return (
                      <Chips
                        {...commonProps}
                        ChipLabel={field.fieldData || []}
                        isMobile={isMobile}
                      />
                    );

                  case "RadioButton":
                    return (
                      <RadioButton
                        {...commonProps}
                        RadioLabels={field.fieldData || []}
                        isMobile={isMobile}
                      />
                    );
                  case "CheckboxGroup":
                    return (
                      <CheckboxGroup
                        {...commonProps}
                        fieldData={field.fieldData || []}
                        isMobile={isMobile}
                      />
                    );
                  case "TextArea":
                    return (
                      <textarea
                        value={fieldValue}
                        onChange={(e) =>
                          handleFieldChange(fieldName, e.target.value)
                        }
                        placeholder={field.fieldData?.[0] || ""}
                        className={`w-full p-3 text-[var(--location-blue-800)] rounded-xl border-2 focus:outline-none transition-all duration-300 resize-none ${
                          isMobile ? 'text-sm' : ''
                        } ${
                          error
                            ? "border-red-300 bg-red-50/50 focus:ring-2 focus:ring-red-200"
                            : "border-[var(--location-gray-300)] bg-white focus:border-[var(--location-blue-400)] focus:ring-2 focus:ring-[var(--location-blue-100)]"
                        }`}
                        rows={isMobile ? "3" : "5"}
                      />
                    );
                  
                  case "CreatableDropdown":
                    return (
                      <div className="grid gap-3">
                        <CreatableDropdown
                          dropdownLabel={field.fieldData?.[0]?.InputLabel}
                          fieldData={field.fieldData}
                          value={fieldValue}
                          onChange={(value) => handleFieldChange(fieldName, value)}
                          inputFirst={field.inputFirst}
                          dropdownisRequired={field.fieldData?.some(field => field.DropdownLabel?.includes('*'))}
                          textfieldisRequired={field.fieldData?.some(field => field.InputLabel?.includes('*'))}
                          dropdownError={!!errors[fieldName]} 
                          textfieldError={!!errors[fieldName]}
                          onValidationChange={(isValid) => handleDropdownValidation(fieldName, isValid)}
                          isMobile={isMobile}
                          isNumericField={shouldBeNumeric}
                        />
                        {errors[fieldName] && (
                          <div className="flex items-center gap-2 text-red-600 bg-red-50/80 px-3 py-1 rounded-lg border border-red-200 mt-1">
                            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium">{errors[fieldName]}</span>
                          </div>
                        )}
                      </div>
                    );

                  case "UploadFile":
                    return (
                      <UploadFile
                        value={fieldValue}
                        onChange={(value) =>
                          handleFieldChange(fieldName, value)
                        }
                        isRequired={isRequired}
                        error={error}
                        isMobile={isMobile}
                      />
                    );

                  default:
                    return (
                      <div className="text-center py-6">
                        <p className="text-[var(--location-gray-400)] italic text-lg">
                          🔧 Field type coming soon: {field.fieldType}
                        </p>
                      </div>
                    );
                }
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;