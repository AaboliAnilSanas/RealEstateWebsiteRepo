import React from 'react'
import VerticalLinearStepper from '../UIComponents/verticalLinearStepper'
import { motion } from "framer-motion";

const SellerForm = () => {
  // --- Animation Variants ---
  const textContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, type: "spring" },
    },
  };

  const SellerFormDetailsData = [
    {
      header: 'Basic Details',
      label: 'Fill out Basic Details',
      fields: [
        {
          label: "I'm looking to*",
          fieldType: 'Chips',
          fieldData: ['Sell', 'Rent/Lease', 'PG']
        },
        {
          label: 'What kind of property do you have ?*',
          fieldType: 'RadioButton',
          fieldData: ['Residential', 'Commercial']
        },
        {
          label: 'Property Type*',
          fieldType: 'Chips',
          fieldData: [
            'Flat/Apartment',
            'Independent House/Villa',
            'Independent/Builder Floor',
            'Plot/Land',
            'Other'
          ]
        }
      ]
    },

    {
      header: 'Location Details',
      label: 'Where is your property located?',
      subLabel: 'An accurate location helps you connect with the right buyers',
      fields: [
        {
          label: 'City*',
          fieldType: 'InputField',
          fieldData: ['Enter city']
        },
        {
          label: 'Locality*',
          fieldType: 'InputField', 
          fieldData: ['Enter locality']
        },
        {
          label: 'Sub Locality',
          fieldType: 'InputField',
          fieldData: ['Enter sub locality']
        },
        {
          label: 'Apartment/Society*',
          fieldType: 'InputField',
          fieldData: ['Enter apartment/society name']
        },
        {
          label: 'House No.',
          fieldType: 'InputField',
          fieldData: ['Enter house number']
        }
      ]
    },

    {
      header: 'Property Profile',
      label: 'Tell us about your property',
      fields: [
        {
          label: 'No. of Bedrooms*',
          fieldType: 'Chips',
          fieldData: ['1', '2', '3','4','+']
        },
        {
          label: 'No. of Bathrooms*',
          fieldType: 'Chips',
          fieldData: ['1', '2', '3','4','+']
        },
        {
          label: 'No. of Balconies*',
          fieldType: 'Chips',
          fieldData: ['1', '2', '3','4','+']
        },
        {
          label: 'Add Area Details*',
          subLabel: 'At least one area is mandatory',
          fieldType: 'CreatableDropdown',
          fieldData: [
            { label: 'Carpet Area', units: ['sq.ft', 'sq.yards'] },
            { label: 'Built-up Area', units: ['sq.ft', 'acres'] },
            { label: 'Super build-up Area', units: ['sq.ft', 'cents'] },
          ],
          inputFirst:true
        },   
        {
          label: 'Floor Details*',
          subLabel: 'Total number of floors and floor details',
          fieldType: 'CreatableDropdown',
          fieldData: [
            { label: 'Total Floors', units: ['Basement', 'Lower Ground', 'Ground', '1', '2', '3', '5', '6', '7', '8'] },         
          ],
          inputFirst:true
        },
        {
          label: 'Availability Status*',
          fieldType: 'Chips',
          fieldData: ['Ready to Move', 'Under Construction']
        },
         {
          label: 'Age of Property / Possession By*',
          fieldType: 'CreatableDropdown',
          fieldData: [
            { label: 'Year', units: ['January','Feburary','March'] },         
          ],
          inputFirst:true
        },
        {
          label: 'Ownership*',
          fieldType: 'Chips',
          fieldData: ['Freehold', 'Leasehold', 'Co-operative society', 'Power of Attorney']
        },
        {
          label: 'Price Details*',
          fieldType: 'CreatableDropdown',
          fieldData: [
            { label: 'Price', units: ['₹'] },         
          ],
          inputFirst:true
        },
        {
          label: 'What makes your property unique',
          subLabel: 'Adding a description will increase your listing visibility',
          fieldType: 'TextArea',
          fieldData: ['Share some details about your property']
        }
      ]
    },

    {
      header: 'Photos, Videos',
      label: 'Add one video of property',
      subLabel: 'Property with photos and videos get higher page views. Make sure you follow video guidelines.',
      fields: [
        {
          label: 'Upload Videos',
          fieldType: 'UploadFile'
        },
        {
          label: 'Upload Photos',
          subLabel: 'At least one photo is mandatory',
          fieldType: 'UploadFile'
        }
      ]
    }
  ];

  return (
    <>
      <div className="absolute top-0 left-0 w-full -z-10">
        {/* First Wave - Base */}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-[220px] xl:h-[250px]"
        >
          <path
            fill="var(--secondary-color)"
            fillOpacity="0.3"
            d="M0,160L60,176C120,192,240,224,360,208C480,192,600,128,720,96C840,64,960,64,1080,80C1200,96,1320,128,1380,144L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg> */}

        {/* Second Wave - Overlay */}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-[140px] sm:h-[170px] md:h-[200px] lg:h-[240px] xl:h-[270px] absolute top-0 left-0"
        >
          <path
            fill="var(--tertiary-color)"
            fillOpacity="0.3"
            d="M0,224L60,202.7C120,181,240,139,360,101.3C480,64,600,32,720,21.3C840,11,960,21,1080,37.3C1200,53,1320,75,1380,85.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg> */}
      </div>
      
      {/* --- Page Layout --- */}
      <div className="flex flex-row">
        {/* --- Left 30%: Animated Gradient Text --- */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className="w-[20%] flex items-center justify-center"
        >
          <motion.h1
            className="font-extrabold bg-gradient-to-r from-[var(--tertiary-color)] via-[var(--primary-color)] to-[var(--tertiary-color)] bg-clip-text text-transparent drop-shadow-lg [text-stroke:1px_white] text-center leading-tight"
            style={{
              fontSize: "4vw",
              textTransform: "uppercase",
            }}
            variants={textContainerVariants}
          >
            Sell or Rent <br /> House Form
          </motion.h1>
        </motion.div>

        <div className='w-[80%]' style={{paddingTop:'4%',paddingRight:'2%' }}>
          <VerticalLinearStepper SellerFormDetails={SellerFormDetailsData}/>
        </div>
      </div>
    </>
  )
}

export default SellerForm