import React, { useState, useEffect } from "react";
import VerticalLinearStepper from "../UIComponents/verticalLinearStepper";
import { motion, AnimatePresence } from "framer-motion";
import LeftSideProgress from "./LeftSideProgress";

const SellerForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const formVariants = {
    hidden: { opacity: 0, x: isMobile ? 0 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const SellerFormDetailsData = [
    {
      header: 'Basic Details',
      label: 'Fill out Basic Details',
      icon: '🏠',
      description: 'Start with the fundamental information about your property listing',
      gradient: 'from-[var(--location-blue-400)] to-[var(--location-blue-600)]',
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
      icon: '📍',
      description: 'Help buyers find your property with precise location details',
      gradient: 'from-[var(--location-blue-500)] to-[var(--location-blue-700)]',
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
      icon: '📊',
      description: 'Showcase your property features and unique selling points',
      gradient: 'from-[var(--location-blue-600)] to-[var(--location-blue-800)]',
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
          label: 'No. of Parking',
          fieldType: 'Chips',
          fieldData: ['1', '2', '3','4','+']
        },
        {
          label: 'Add Area Details*',
          subLabel: 'At least one area is mandatory',
          fieldType: 'CreatableDropdown',
          fieldData: [
            { InputLabel: 'Carpet Area*',DropdownLabel:'Units*', units: ['sq.ft', 'sq.yards'] },
            { InputLabel: 'Built-up Area', DropdownLabel:'Units', units: ['sq.ft', 'acres'] },
            { InputLabel: 'Super build-up Area', DropdownLabel:'Units', units: ['sq.ft', 'cents'] },
          ],
          inputFirst:true
        },  
        {
          label: 'Availability Status*',
          fieldType: 'Chips',
          fieldData: ['Ready to Move', 'Under Construction']
        }, 
        {
          label: 'Floor Details',
          subLabel: 'Total number of floors and floor details',
          fieldType: 'CreatableDropdown',
          fieldData: [
            { InputLabel: 'Total Floors',DropdownLabel:'Units', units: ['Basement', 'Lower Ground', 'Ground', '1', '2', '3', '5', '6', '7', '8'] },         
          ],
          inputFirst:true
        },      
        {
          label: 'Age of Property / Possession By*',
          fieldType: 'CreatableDropdown',
          fieldData: [
            { InputLabel: 'Year', DropdownLabel:'Units',units: ['January','Feburary','March'] },         
          ],
          inputFirst:true
        },
        {
          label: 'Furnishing',
          fieldType: 'Chips',
          fieldData: ['Furnished', 'Semi-Furnished', 'Un-Furnished']
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
            { InputLabel: 'Price',DropdownLabel:'Units', units: ['₹'] },         
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
      header: 'Amenities',
      label: 'Select the amenities available in your property',
      subLabel: 'Choose all that apply to attract more buyers',
      icon: '⭐',
      description: 'Highlight the features that make your property stand out',
      gradient: 'from-[var(--location-blue-700)] to-[var(--location-blue-900)]',
      fields: [
        {
          label: 'Basic Amenities*',
          fieldType: 'CheckboxGroup',
          fieldData: [
            'Power Backup',
            'Water Supply',
            'Parking',
            'Security',
            'Lift',
            'Fire Safety'
          ]
        },
        {
          label: 'Luxury Amenities',
          fieldType: 'CheckboxGroup', 
          fieldData: [
            'Swimming Pool',
            'Gym',
            'Club House',
            'Landscaped Garden',
            'Children\'s Play Area',
            'Jogging Track'
          ]
        },
        {
          label: 'Interior Amenities',
          fieldType: 'CheckboxGroup',
          fieldData: [
            'Modular Kitchen',
            'Wooden Flooring',
            'Air Conditioning',
            'Wi-Fi',
            'Modular Wardrobes',
            'Balcony/Terrace'
          ]
        },
        {
          label: 'Community Amenities',
          fieldType: 'CheckboxGroup',
          fieldData: [
            'Shopping Center',
            'Hospital',
            'School',
            'Public Transport',
            'Restaurant',
            'Park'
          ]
        },
        {
          label: 'Additional Amenities',
          fieldType: 'CreatableDropdown',
          fieldData: [
            { InputLabel: 'Other Amenities', DropdownLabel: 'Type', units: ['Add custom amenity'] },         
          ],
          inputFirst: true
        }
      ]
    },
    {
      header: 'Photos & Videos',
      label: 'Add photos and videos of your property',
      subLabel: 'Properties with photos and videos get higher page views',
      icon: '📷',
      description: 'Visual content increases engagement and trust with potential buyers',
      gradient: 'from-[var(--location-blue-800)] to-[var(--location-blue-900)]',
      fields: [
        {
          label: 'Upload Videos',
          fieldType: 'UploadFile',
        },
        {
          label: 'Upload Photos*',
          subLabel: 'At least one photo is mandatory',
          fieldType: 'UploadFile'
        }
      ]
    },
  ];

  const progressPercentage = ((activeStep + 1) / SellerFormDetailsData.length) * 100;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const updateFormData = (fieldData) => {
    setFormData(prev => ({ ...prev, ...fieldData }));
  };

  // Mobile sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className={`relative ${isMobile ? 'min-h-screen' : 'min-h-[92vh]'} flex flex-col md:flex-row bg-gradient-to-br from-[var(--location-blue-50)] via-[var(--location-blue-100)] to-[var(--location-cyan-100)] overflow-hidden`}>

      {/* Mobile Header Bar */}
      {isMobile && (
        <div className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-[var(--location-blue-200)] px-4 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleSidebar}
              className="w-10 h-10 bg-gradient-to-br from-[var(--location-blue-400)] to-[var(--location-blue-600)] rounded-xl flex items-center justify-center shadow-lg"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h2 className="text-lg font-black bg-gradient-to-r from-[var(--location-blue-800)] to-[var(--primary-color-dark)] bg-clip-text text-transparent">
                Property Details
              </h2>
              <p className="text-[var(--location-gray-600)] text-xs">Step {activeStep + 1} of {SellerFormDetailsData.length}</p>
            </div>
          </div>
          
          {/* Mobile Progress Circle */}
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#mobileProgress)"
                strokeWidth="3"
                strokeDasharray={`${progressPercentage}, 100`}
              />
              <defs>
                <linearGradient id="mobileProgress" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--location-blue-500)" />
                  <stop offset="100%" stopColor="var(--location-blue-700)" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[var(--location-blue-700)]">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>
      )}

      {/* Background Elements - Reduced for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-[var(--location-blue-300)] to-[var(--location-blue-500)] rounded-full opacity-70 blur-xl"
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-40 right-32 w-20 h-20 bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-base)] rounded-full opacity-60 blur-lg"
              animate={{
                y: [0, 40, 0],
                x: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </>
        )}
        
        {/* Simplified mobile background */}
        {isMobile && (
          <>
            <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-[var(--location-blue-300)] to-[var(--location-blue-500)] rounded-full opacity-50 blur-lg"></div>
            <div className="absolute bottom-20 left-5 w-12 h-12 bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-base)] rounded-full opacity-40 blur-md"></div>
          </>
        )}
      </div>

      {/* Left Section - Progress Tracker (Overlay on mobile) */}
      <AnimatePresence>
        {isSidebarVisible && isMobile && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setIsSidebarVisible(false)}
            />
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm z-50">
              <LeftSideProgress
                activeStep={activeStep}
                isSidebarVisible={isSidebarVisible}
                setIsSidebarVisible={setIsSidebarVisible}
                SellerFormDetailsData={SellerFormDetailsData}
                progressPercentage={progressPercentage}
                setActiveStep={setActiveStep}
                formData={formData}
                isMobile={isMobile}
                onCloseMobile={() => setIsSidebarVisible(false)}
              />
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Left Section */}
      {!isMobile && (
        <div className="max-h-[92vh] overflow-y-auto overflow-x-hidden hide-scrollbar">
          <LeftSideProgress
            activeStep={activeStep}
            isSidebarVisible={true}
            setIsSidebarVisible={setIsSidebarVisible}
            SellerFormDetailsData={SellerFormDetailsData}
            progressPercentage={progressPercentage}
            setActiveStep={setActiveStep}
            formData={formData}
            isMobile={isMobile}
          />
        </div>
      )}

      {/* Vertical Divider - Hidden on mobile */}
      {!isMobile && (
        <div className="relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-64 z-10">
            <div className="w-full h-full bg-gradient-to-b from-[var(--location-blue-400)] via-[var(--location-blue-600)] to-[var(--location-blue-800)] rounded-full shadow-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent rounded-full"></div>
          </div>
        </div>
      )}
       
      {/* Right Section - Main Form Content (Always visible) */}
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className={`${isMobile ? 'w-full flex-1' : 'w-full overflow-y-hidden'} ${isMobile && isSidebarVisible ? 'blur-sm' : ''}`}
        style={isMobile ? {} : { maxHeight: '92vh' }}
      >
        <div className={`${isMobile ? 
          'w-full overflow-x-hidden overflow-y-auto py-4 px-4' : 
          'w-[100%] overflow-x-hidden overflow-y-hidden py-9 px-9 max-w-8xl relative'}`}>

          {/* Background Bubble Effect - Reduced for mobile */}
          {!isMobile && (
            <>
              <div className="absolute -top-8 -right-2 w-40 h-40 bg-gradient-to-br from-[var(--location-blue-200)] to-[var(--location-blue-400)] rounded-full opacity-40 blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold-base)] rounded-full opacity-40 blur-2xl"></div>
            </>
          )}

          {/* Main Form Container */}
          <div className={`relative bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-white shadow-2xl overflow-hidden ${
            isMobile ? 'rounded-xl shadow-lg' : ''
          }`}>
            
            {/* Form Header - Simplified for mobile */}
            {!isMobile && (
              <div className="relative p-6 bg-gradient-to-r from-white to-[var(--location-blue-50)] border-b border-[var(--location-blue-200)]">
                <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-b from-[var(--location-blue-400)] to-[var(--location-blue-600)]"></div>
                <div className="flex items-center space-x-3 ml-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--location-blue-400)] to-[var(--location-blue-600)] rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black bg-gradient-to-r from-[var(--location-blue-800)] to-[var(--primary-color-dark)] bg-clip-text text-transparent">
                      Property Details
                    </h2>
                    <p className="text-[var(--location-gray-600)] text-sm font-medium">Complete all sections for maximum visibility</p>
                  </div>
                </div>
              </div>
            )}

            {/* Form Content */}
            <div className={`${isMobile ? 'max-h-[calc(100vh-140px)]' : 'max-h-[66vh]'} overflow-y-auto hide-scrollbar`}>
              <VerticalLinearStepper 
                SellerFormDetails={SellerFormDetailsData}
                activeStep={activeStep}
                onStepChange={handleStepChange}
                formData={formData}
                updateFormData={updateFormData}
                isMobile={isMobile}
              />
            </div>

            {/* Form Footer - Simplified for mobile */}
            {!isMobile && (
              <div className="px-6 py-4 bg-gradient-to-r from-[var(--location-blue-50)] to-[var(--location-blue-100)] border-t border-[var(--location-blue-200)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-[var(--location-blue-400)] to-[var(--location-blue-600)] rounded-full animate-pulse"></div>
                    <span className="text-[var(--location-gray-600)] text-xs font-medium">Auto-save enabled • Secure premium listing</span>
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3].map((dot) => (
                      <motion.div
                        key={dot}
                        className="w-1.5 h-1.5 bg-gradient-to-r from-[var(--location-blue-400)] to-[var(--location-blue-600)] rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: dot * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .clip-path-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        .clip-path-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        /* Hide scrollbar but keep functionality */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .mobile-safe-area {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      `}</style>
    </div>
  );
};

export default SellerForm;