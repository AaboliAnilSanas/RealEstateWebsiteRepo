
import React, { useState } from 'react';
import VerticalLinearStepper from '../UIComponents/verticalLinearStepper';
import { motion, AnimatePresence } from "framer-motion";

const SellerForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const slideInVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const SellerFormDetailsData = [
    {
      header: 'Basic Details',
      label: 'Fill out Basic Details',
      icon: '🏠',
      description: 'Start with the fundamental information about your property listing',
      gradient: 'from-blue-500 to-cyan-400',
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
      gradient: 'from-emerald-500 to-green-400',
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
      gradient: 'from-purple-500 to-pink-400',
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
          label: 'Add Area Details',
          subLabel: 'At least one area is mandatory',
          fieldType: 'CreatableDropdown',
          fieldData: [
            { InputLabel: 'Carpet Area*',DropdownLabel:'Units*', units: ['sq.ft', 'sq.yards'] },
            { InputLabel: 'Built-up Area*', DropdownLabel:'Units*', units: ['sq.ft', 'acres'] },
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
      header: 'Photos, Videos',
      label: 'Add one video of property',
      subLabel: 'Property with photos and videos get higher page views. Make sure you follow video guidelines.',
      icon: '📷',
      description: 'Visual content increases engagement and trust with potential buyers',
      gradient: 'from-orange-500 to-red-400',
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
    },
  ];

  const progressPercentage = ((activeStep + 1) / SellerFormDetailsData.length) * 100;

  // Floating background elements
  const floatingElements = [
    { top: '10%', left: '5%', delay: 0, size: 'w-8 h-8', type: 'hexagon' },
    { top: '20%', right: '10%', delay: 1, size: 'w-12 h-12', type: 'bubble' },
    { top: '60%', left: '8%', delay: 2, size: 'w-6 h-6', type: 'hexagon' },
    { top: '70%', right: '15%', delay: 3, size: 'w-10 h-10', type: 'bubble' },
    { top: '40%', left: '15%', delay: 4, size: 'w-14 h-14', type: 'hexagon' },
    { top: '30%', right: '5%', delay: 5, size: 'w-8 h-8', type: 'bubble' },
  ];

  return (
    <>
      {/* Premium Background with Floating Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 -z-10 overflow-hidden">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-cyan-100/20"></div>
        
        {/* Clipped Tilted Section */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-500/5 to-cyan-500/10 transform -skew-x-6 origin-top-left"></div>
        
        {/* Hexagonal Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(30deg,_transparent_40%,_#000_40%,_#000_60%,_transparent_60%),_linear-gradient(-30deg,_transparent_40%,_#000_40%,_#000_60%,_transparent_60%)] bg-[size:60px_60px]"></div>
        
        {/* Subtle Bubble Pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_30%_30%,_#000_2px,_transparent_2px)] bg-[size:40px_40px]"></div>

        {/* Floating Animated Elements */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            initial={{ 
              y: element.type === 'bubble' ? 100 : -100,
              opacity: 0,
              rotate: element.type === 'hexagon' ? 0 : 180 
            }}
            animate={{ 
              y: element.type === 'bubble' ? [0, -40, 0] : [0, 30, 0],
              opacity: [0.3, 0.6, 0.3],
              rotate: element.type === 'hexagon' ? [0, 10, 0] : [0, -10, 0]
            }}
            transition={{
              duration: 8,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute ${element.size} ${
              element.type === 'hexagon' 
                ? 'bg-gradient-to-br from-blue-400/20 to-cyan-400/20 clip-path-hexagon' 
                : 'bg-gradient-to-br from-blue-300/15 to-cyan-300/15 rounded-full blur-sm'
            } backdrop-blur-sm`}
            style={{
              top: element.top,
              left: element.left,
              right: element.right,
            }}
          />
        ))}

        {/* Large Floating Accents */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 clip-path-hexagon blur-lg"
        />
      </div>

      <div className="min-h-screen flex">
        {/* Premium Cutout Sidebar - Light Theme */}
        <AnimatePresence>
          {isSidebarVisible && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={slideInVariants}
              className="w-80 bg-white/95 backdrop-blur-xl border-r border-slate-200/60 shadow-2xl relative overflow-hidden"
            >
              {/* Sidebar Background with Premium Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(59,130,246,0.03)_0%,_transparent_50%)]"></div>
              <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(45deg,_transparent_48%,_#000_48%,_#000_52%,_transparent_52%)] bg-[size:20px_20px]"></div>
              
              {/* Close Button */}
              <button
                onClick={() => setIsSidebarVisible(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-800 transition-all z-10 shadow-sm"
              >
                ×
              </button>

              <div className="relative z-1 h-full flex flex-col p-8">
                {/* Premium Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200/80 backdrop-blur-sm mb-8"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  />
                  <span className="text-blue-700 text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    PREMIUM LISTING
                  </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-bold text-slate-900 mb-2"
                >
                  List Your
                  <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
                    Property
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-slate-600 mb-8 leading-relaxed"
                >
                  Complete your premium listing to reach qualified buyers faster
                </motion.p>

                {/* Progress Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-700 text-sm font-medium">Progress</span>
                    <span className="text-blue-600 text-sm font-bold">{Math.round(progressPercentage)}%</span>
                  </div>
                  
                  {/* Animated Progress Bar */}
                  <div className="w-full bg-slate-200/80 rounded-full h-2.5 mb-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 shadow-lg shadow-blue-500/30 relative overflow-hidden"
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>
                  </div>
                  
                  <div className="text-slate-500 text-xs">
                    Step {activeStep + 1} of {SellerFormDetailsData.length}
                  </div>
                </motion.div>

                {/* Steps Navigation */}
                <div className="space-y-4 flex-1">
                  {SellerFormDetailsData.map((step, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      onClick={() => setActiveStep(index)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group ${
                        index === activeStep
                          ? 'bg-gradient-to-r from-blue-50 to-cyan-50/50 border-blue-200 shadow-lg shadow-blue-500/10'
                          : 'bg-white/60 border-slate-200/60 hover:bg-white hover:border-blue-100 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            index === activeStep
                              ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                              : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                          }`}
                        >
                          <span className="text-lg">{step.icon}</span>
                        </motion.div>
                        <div className="flex-1">
                          <div className={`font-semibold transition-colors ${
                            index === activeStep ? 'text-blue-700' : 'text-slate-800 group-hover:text-blue-600'
                          }`}>
                            {step.header}
                          </div>
                          <div className="text-xs text-slate-500 mt-1 group-hover:text-slate-600">
                            {step.description}
                          </div>
                        </div>
                        {index === activeStep && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-blue-500 rounded-full"
                          />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarVisible ? 'ml-0' : 'ml-0'}`}>
          <div className="h-full flex flex-col">
            {/* Header Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {!isSidebarVisible && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsSidebarVisible(true)}
                      className="w-10 h-10 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-800 transition-all shadow-sm"
                    >
                      ☰
                    </motion.button>
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {SellerFormDetailsData[activeStep]?.header}
                    </h2>
                    <p className="text-slate-600 text-sm">
                      {SellerFormDetailsData[activeStep]?.label}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-blue-600 font-bold text-lg">
                      {activeStep + 1}<span className="text-slate-400">/{SellerFormDetailsData.length}</span>
                    </div>
                    <div className="text-slate-500 text-xs">Current Step</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form Content */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 p-8 overflow-auto"
            >
              <div className="max-w-6xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-2xl overflow-hidden">
                  <div className="p-8">
                    <VerticalLinearStepper 
                      SellerFormDetails={SellerFormDetailsData}
                      activeStep={activeStep}
                      onStepChange={setActiveStep}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Premium Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25 border border-blue-400/20 cursor-pointer z-50"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-white text-lg"
        >
          💎
        </motion.span>
      </motion.div>

      {/* Custom CSS for Hexagon Clip Path */}
      <style jsx>{`
        .clip-path-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </>
  );
};

export default SellerForm;