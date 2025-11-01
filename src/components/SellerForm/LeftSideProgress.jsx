import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const LeftSideProgress = ({ 
  activeStep, 
  isSidebarVisible, 
  setIsSidebarVisible, 
  SellerFormDetailsData,
  progressPercentage,
  setActiveStep 
}) => {
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

  return (
    <AnimatePresence>
      {isSidebarVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={slideInVariants}
          className="w-120 bg-white/95 backdrop-blur-xl border-r border-amber-200/60 shadow-2xl relative overflow-hidden"
        >
          {/* Sidebar Background with Premium Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(245,158,11,0.03)_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(45deg,_transparent_48%,_#000_48%,_#000_52%,_transparent_52%)] bg-[size:20px_20px]"></div>
          
          {/* Close Button */}
          <button
            onClick={() => setIsSidebarVisible(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-amber-200 hover:bg-amber-50 flex items-center justify-center text-amber-600 hover:text-amber-800 transition-all z-10 shadow-sm"
          >
            ×
          </button>

          <div className="relative z-1 h-full flex flex-col p-8">
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
                               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/80 to-amber-200/10 border border-amber-300  backdrop-blur-sm mb-4 shadow-lg"
                             >
                               <motion.div
                                 animate={{ scale: [1, 1.2, 1] }}
                                 transition={{ duration: 2, repeat: Infinity }}
                                 className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mr-3 shadow-md animate-pulse rounded-full"
                               />
                               <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
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
              <div className="w-full bg-amber-200/80 rounded-full h-2.5 mb-2 overflow-hidden">
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
                      ? 'bg-gradient-to-r from-amber-50 to-orange-50/50 border-amber-200 shadow-lg shadow-amber-500/10'
                      : 'bg-white/60 border-amber-200/60 hover:bg-white hover:border-amber-100 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        index === activeStep
                          ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                          : 'bg-amber-100 text-amber-600 group-hover:bg-amber-100 group-hover:text-amber-600'
                      }`}
                    >
                      <span className="text-lg">{step.icon}</span>
                    </motion.div>
                    <div className="flex-1">
                      <div className={`font-semibold transition-colors ${
                        index === activeStep ? 'text-amber-700' : 'text-slate-800 group-hover:text-amber-600'
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
                        className="w-2 h-2 bg-amber-500 rounded-full"
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
  );
};

export default LeftSideProgress;