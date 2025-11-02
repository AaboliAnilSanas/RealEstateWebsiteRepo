import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSimpleValidation } from "../../hooks/useSimpleValidation";

const LeftSideProgress = ({ 
  activeStep, 
  isSidebarVisible, 
  setIsSidebarVisible, 
  SellerFormDetailsData,
  progressPercentage,
  setActiveStep,
  formData
}) => {
  const { isStepCompleted } = useSimpleValidation();
  
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

  // Check if step is accessible for navigation
  const isStepAccessible = (stepIndex) => {
    // Allow going back to any previous step
    if (stepIndex <= activeStep) return true;
    
    // For future steps, check if all previous steps are completed
    for (let i = 0; i < stepIndex; i++) {
      if (!isStepCompleted(i, SellerFormDetailsData[i].fields, formData)) {
        return false;
      }
    }
    return true;
  };

  const handleStepClick = (index) => {
    if (isStepAccessible(index)) {
      setActiveStep(index);
    }
  };

  // Lock Icon with Tooltip Component
  const LockIconWithTooltip = ({ index }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
      <div className="relative flex items-center justify-center">
        <div
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="w-5 h-5 flex items-center justify-center text-gray-400 cursor-pointer rounded transition-colors hover:bg-gray-100"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5 5 5 0 0 1 5 5v2h1m-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3z"/>
          </svg>
        </div>

        {/* Hover Tooltip */}
        {showTooltip && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 -translate-y-full z-20">
            <div className="bg-slate-800 text-white text-xs py-1 px-2 rounded-lg whitespace-nowrap shadow-lg">
              Complete previous steps
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isSidebarVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={slideInVariants}
          className="w-100 pr-20 mt-0  bg-white/95 backdrop-blur-xl border-r border-amber-200/60 shadow-2xl relative"
        >
          {/* Sidebar Background with Premium Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(245,158,11,0.03)_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(45deg,_transparent_48%,_#000_48%,_#000_52%,_transparent_52%)] bg-[size:20px_20px]"></div>

          <div className="relative z-10 h-full flex flex-col p-8">
            {/* Progress Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/80 to-amber-200/10 border border-amber-300 backdrop-blur-sm mb-4 shadow-lg"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mr-2"
                />
                <span className="text-xs font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  LISTING PROGRESS
                </span>
              </motion.div>
              
              <div className="text-2xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                Almost There!
              </div>
              <p className="text-slate-600 text-sm">
                Complete your premium listing in few steps
              </p>
            </motion.div>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-700 text-sm font-medium">Progress</span>
                <span className="text-amber-600 text-sm font-bold">{Math.round(progressPercentage)}%</span>
              </div>
              
              {/* Animated Progress Bar */}
              <div className="w-full bg-amber-200/30 rounded-full h-2.5 mb-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 shadow-lg shadow-amber-500/30 relative overflow-hidden"
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
            <div className="space-y-4 flex-1 overflow-y-auto gradient-scrollbar">
              {SellerFormDetailsData.map((step, index) => {
                const isCompleted = isStepCompleted(index, step.fields, formData);
                const isAccessible = isStepAccessible(index);
                const isCurrent = index === activeStep;
                
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    onClick={() => handleStepClick(index)}
                    disabled={!isAccessible}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group relative ${
                      isCurrent
                        ? 'bg-gradient-to-r from-amber-50 to-orange-50/50 border-amber-300 shadow-lg shadow-amber-500/10'
                        : isCompleted
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50/30 border-green-200 shadow-md'
                        : isAccessible
                        ? 'bg-white/60 border-amber-200/30 hover:bg-white hover:border-amber-200 hover:shadow-md'
                        : 'bg-gray-100/50 border-gray-200/30 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={isAccessible ? { scale: 1.1 } : {}}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isCurrent
                            ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                            : isCompleted
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg'
                            : isAccessible
                            ? 'bg-amber-100 text-amber-600 group-hover:bg-amber-200 group-hover:text-amber-700'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        <span className="text-lg">{step.icon}</span>
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold text-sm transition-colors ${
                          isCurrent 
                            ? 'text-amber-700' 
                            : isCompleted
                            ? 'text-green-700'
                            : isAccessible
                            ? 'text-slate-800 group-hover:text-amber-600'
                            : 'text-gray-500'
                        }`}>
                          {step.header}
                        </div>
                        <div className={`text-xs mt-1 ${
                          isCurrent 
                            ? 'text-amber-600' 
                            : isCompleted
                            ? 'text-green-600'
                            : isAccessible
                            ? 'text-slate-500 group-hover:text-slate-600'
                            : 'text-gray-400'
                        }`}>
                          {step.description}
                        </div>
                      </div>
                      {isCurrent && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-amber-500 rounded-full"
                        />
                      )}
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                      {!isAccessible && index > activeStep && (
                        <LockIconWithTooltip index={index} />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-6 p-4 bg-gradient-to-r from-amber-50/50 to-orange-50/30 rounded-xl border border-amber-200/50"
            >
              <h3 className="font-semibold text-slate-800 text-sm mb-3">Listing Impact</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">3.2x</div>
                  <div className="text-slate-600 text-xs">More Views</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-black bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">89%</div>
                  <div className="text-slate-600 text-xs">Faster Sale</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeftSideProgress;