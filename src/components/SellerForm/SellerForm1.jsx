import React from "react";
import VerticalLinearStepper from "../UIComponents/verticalLinearStepper";
import { motion } from "framer-motion";

const SellerForm = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 30 },
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

  // Progress tracking data
  const progressSteps = [
    { step: 1, title: "Basic Details", completed: true, icon: "🏠" },
    { step: 2, title: "Location", completed: false, icon: "📍" },
    { step: 3, title: "Property Profile", completed: false, icon: "📊" },
    { step: 4, title: "Media", completed: false, icon: "📷" },
    { step: 5, title: "Review", completed: false, icon: "✅" }
  ];

  return (
    <div className="relative min-h-30 flex bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden">

      {/* Premium Background with Funky Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Vertical Slit Patterns */}
        <div className="absolute left-1/4 top-0 w-1 h-full bg-gradient-to-b from-transparent via-purple-300/40 to-transparent"></div>
        <div className="absolute left-3/4 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-pink-300/30 to-transparent"></div>
        
        {/* Floating Bubbles */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full opacity-60 blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-16 h-16 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full opacity-50 blur-lg"
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full opacity-40 blur-md"
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Geometric Cut Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 border-2 border-amber-300/30 rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-rose-300/20 rotate-12"></div>
        
        {/* Diagonal Stripes */}
        <div className="absolute inset-0 opacity-[0.02] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,black_10px,black_11px)]"></div>
      </div>

      {/* Left Section - Progress Tracker */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full lg:w-1/3 xl:w-1/4 flex flex-col justify-center p-6 lg:p-8 relative"
      >
        {/* Vertical Slit Divider */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-64">
          <div className="w-full h-full bg-gradient-to-b from-amber-400 via-orange-400 to-rose-400 rounded-full shadow-lg"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent rounded-full"></div>
        </div>

        <motion.div variants={itemVariants} className="space-y-8">
          {/* Progress Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200 shadow-lg">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mr-3 shadow-md animate-pulse"></div>
              <span className="text-sm font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                LISTING PROGRESS
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
                Almost There!
              </h1>
              <p className="text-slate-600 font-medium">
                Complete your premium listing in few steps
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-6">
            <div className="relative">
              <div className="w-full h-2 bg-white/60 rounded-full shadow-inner">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg"
                  initial={{ width: "20%" }}
                  animate={{ width: "20%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-slate-500">0%</span>
                <span className="text-xs font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">20%</span>
                <span className="text-xs text-slate-500">100%</span>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-4">
              {progressSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className={`flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
                    step.completed 
                      ? 'bg-white/60 border-amber-200 shadow-lg' 
                      : 'bg-white/30 border-white/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                    step.completed 
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500' 
                      : 'bg-white/60 border border-amber-100'
                  }`}>
                    <span className={`text-lg ${step.completed ? 'text-white' : 'text-amber-600'}`}>
                      {step.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${
                        step.completed 
                          ? 'bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent' 
                          : 'text-slate-600'
                      }`}>
                        {step.title}
                      </span>
                      {step.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center"
                        >
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {step.completed ? 'Completed' : 'Pending'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg">
            <h3 className="font-bold text-slate-800 mb-4">Listing Impact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">3.2x</div>
                <div className="text-slate-600 text-xs">More Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">89%</div>
                <div className="text-slate-600 text-xs">Faster Sale</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Section - Expanded Form */}
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="w-full lg:w-2/3 xl:w-3/4 flex items-start justify-center p-4 lg:p-8 overflow-y-auto"
        style={{ maxHeight: '100vh' }}
      >
        <div className="w-full max-w-6xl relative">
          {/* Background Bubble Effect */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-30 blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full opacity-30 blur-2xl"></div>

          {/* Main Form Container */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border-2 border-white shadow-2xl overflow-hidden">
            
            {/* Form Header with Funky Cut */}
            <div className="relative p-8 bg-gradient-to-r from-white to-amber-50 border-b border-amber-100">
              <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-b from-amber-400 to-orange-400"></div>
              <div className="flex items-center space-x-4 ml-2">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
                    Property Details
                  </h2>
                  <p className="text-slate-500 font-medium">Complete all sections for maximum visibility</p>
                </div>
              </div>
            </div>

            {/* Form Content - Now with more space */}
            <div className="p-6 lg:p-8 max-h-[70vh] overflow-y-auto">
              <VerticalLinearStepper SellerFormDetails={SellerFormDetailsData} />
            </div>

            {/* Form Footer */}
            <div className="px-8 py-6 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-600 text-sm font-medium">Auto-save enabled • Secure premium listing</span>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((dot) => (
                    <motion.div
                      key={dot}
                      className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: dot * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default SellerForm;