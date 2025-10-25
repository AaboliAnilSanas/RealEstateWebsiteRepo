import React from "react";
import FilterComponent from "../../UIComponents/FilterComponent";

const FilterSearchPage = () => {
  // Define your data in the page component
  const filterData = {
    label: "Search Here...*",
    placeholder: "Search by Property Id, Pincode",
    fieldType: "CreatableDropdown",
    fieldData: [
      {
        label: "Select City",
        units: [
          "Bangalore",
          "Lower Ground",
          "Ground",
          "1",
          "2",
          "3",
          "5",
          "6",
          "7",
          "8",
        ],
      },
    ],
    inputFirst: false,
  };

  const filterOptions = {
    possessionStatus: {
      fieldType: "RadioButton",
      fieldData: ["Ready To Move", "Under Construction"],
    },
    propertyType: {
      fieldType: "Checkbox",
      fieldData: [
        "Apartment",
        "Plot",
        "Builder Floor",
        "Villa",
        "Office Space",
        "Shop",
        "Land",
        "Showroom",
      ],
    },
    bedroom: {
      fieldType: "Checkbox",
      fieldData: ["1RK", "1BHK", "2BHK", "3BHK", "4Bhk+"],
    },
    bathroom: {
      fieldType: "Checkbox",
      fieldData: ["1", "2", "3", "4", "5+"],
    },
    parking: {
      fieldType: "Checkbox",
      fieldData: ["1", "2", "3", "4", "5+"],
    },
    furnishingStatus: {
      fieldType: "Checkbox",
      fieldData: ["Fully Furnished", "Semi Furnished", "Unfurnished"],
    },
  };

  // Handle search results
  const handleSearchResults = (filterData) => {
    console.log("Search results:", filterData);
    // Here you can make API calls, update state, etc.
  };

  return (
    <div>
      <FilterComponent
        data={filterData}
        filterOptions={filterOptions}
        onSearch={handleSearchResults}
      />
    </div>
  );
};

export default FilterSearchPage;
