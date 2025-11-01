import React from "react";
import Label from "../UIComponents/Label";
import InputField from "../UIComponents/InputField";
import Chips from "../UIComponents/Chips";
import RadioButton from "../UIComponents/RadioButton";
import CreatableDropdown from "../UIComponents/CreatableDropDown";
import UploadFile from "../UIComponents/UploadFiles";

const Content = ({ formDetails, formData, updateFormData, errors }) => {
  const handleFieldChange = (fieldName, value) => {
    updateFormData(fieldName, value);

    // Clear error when user selects a value
    if (value && errors[fieldName]) {
      // We'll handle this in the parent component
    }
  };

  // Check if field is required based on asterisk in label
  const isFieldRequired = (fieldLabel) => {
    return fieldLabel && fieldLabel.includes('*');
  };

  return (
    <div>
      <div className="mb-3 text-center">
        <Label
          LabelName={formDetails.label}
          className="text-[var(--heading-)]+text-[var(--tertiary-color)] font-extrabold uppercase tracking-wide"
        />
        {formDetails.subLabel && (
          <p className="text-[var(--small-text)]+text-[var(--secondary-color)] mt-2 italic">
            {formDetails.subLabel}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {formDetails.fields.map((field, idx) => {
          const fieldName = field.label;
          const fieldValue = formData[fieldName] || "";
          const isRequired = field.label.includes("*");
          const error = errors[fieldName];

          // // For CreatableDropdown, check individual field requirements
          // const isTextFieldRequired = field.fieldData?.[0]?.InputLabel ? 
          //   isFieldRequired(field.fieldData[0].InputLabel) : false;
          // const isAutocompleteRequired = field.fieldData?.[0]?.DropdownLabel ? 
          //   isFieldRequired(field.fieldData[0].DropdownLabel) : false;

          return (
            <div
              key={idx}
              className={`bg-white rounded-xl p-4 mx-4 shadow-sm border transition-all duration-300 ${
                error ? "border-red-500" : "border-gray-100 hover:shadow-lg"
              }`}
            >
              {field.label && (
                <h2 className="font-semibold text-[var(--primary-color),var(--heading-0)] mb-3">
                  {field.label}
                </h2>
              )}

              {field.subLabel && (
                <h4 className="text-[var(--secondary-color),var(--small-text)] mb-3 italic">
                  {field.subLabel}
                </h4>
              )}

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

              {(() => {
                const commonProps = {
                  value: fieldValue,
                  onChange: (value) => handleFieldChange(fieldName, value),
                  isRequired: isRequired,
                };

                switch (field.fieldType) {
                  case "InputField":
                    return (
                      <div style={{ width: "100%" }}>
                        <InputField
                          {...commonProps}
                          InputLabels={field.fieldData || []}
                          Width={"100%"}
                        />
                      </div>
                    );

                  case "Chips":
                    return (
                      <Chips
                        {...commonProps}
                        ChipLabel={field.fieldData || []}
                      />
                    );

                  case "RadioButton":
                    return (
                      <RadioButton
                        {...commonProps}
                        RadioLabels={field.fieldData || []}
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
                        className={`border rounded-lg w-full p-3 text-[var(--body-text)] focus:outline-none transition-all ${
                          error
                            ? "border-red-500 ring-2 ring-red-200"
                            : "border-gray-300 focus:ring-2 focus:ring-[var(--primary-color-light)]"
                        }`}
                        rows="4"
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
                        // Get individual field requirements
                        dropdownisRequired={field.fieldData?.[0]?.DropdownLabel?.includes('*') || false}
                        textfieldisRequired={field.fieldData?.[0]?.InputLabel?.includes('*') || false}
                        // Pass errors for individual fields
                        dropdownError={errors[`${fieldName}.autocomplete`]} 
                        textfieldError={errors[`${fieldName}.textField`]}
                      />
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
                      />
                    );

                  default:
                    return (
                      <p className="text-gray-400 italic">
                        Unknown field type: {field.fieldType}
                      </p>
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