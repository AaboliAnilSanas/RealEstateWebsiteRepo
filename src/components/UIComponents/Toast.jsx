// src/components/UIComponents/Toast.jsx

import React, { useEffect, useState, useRef } from 'react';
import { Check } from 'lucide-react'; 

const Toast = ({ 
  message, 
  header, /* ADDED: Prop for the main title */
  type = 'success', 
  duration = 0, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const timerRef = useRef(null); 
  
  const handleDismiss = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    setIsVisible(false);
    
    setTimeout(() => {
      setShouldRender(false);
      if (onClose) onClose();
    }, 300); 
  };
  
  useEffect(() => {
    if (!message) {
      setShouldRender(false);
      return;
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [message]);

  if (!shouldRender || !message) return null;

  const successColor = '#4caf50'; 

  const baseClasses = "fixed top-1/2 left-1/2 z-[1000] transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm sm:max-w-md overflow-visible";
  
  const containerClasses = "bg-white rounded-xl shadow-2xl overflow-visible pt-10 pb-4 relative text-center";
  
  const transform = isVisible ? "scale(1) opacity-100" : "scale(0.9) opacity-0";

  return (
    <div 
      className={`${baseClasses}`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
        opacity: isVisible ? 1 : 0, 
        transform: `${transform} -translate-x-1/2 -translate-y-1/2`,
      }}
    >
      <div className={containerClasses}>
        
        {/* Floating Success Icon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center shadow-xl"
             style={{ backgroundColor: successColor, boxShadow: `0 8px 25px ${successColor}40` }}>
          <Check className="h-10 w-10 text-white stroke-2" />
        </div>
        
        {/* Title: NOW USES HEADER PROP */}
        <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">
          {header}
        </h3>
        
        {/* Message */}
        <p className="text-sm text-gray-600 px-6 mb-8">
          {message}
        </p>
        
        {/* Action Button */}
        <div className="px-6 mb-4">
          <button
            onClick={handleDismiss}
            className="w-full py-3 rounded-lg font-semibold text-white text-base transition-all duration-300 hover:scale-[0.99]"
            style={{ backgroundColor: successColor, boxShadow: `0 4px 15px ${successColor}50` }}
          >
            OK
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Toast;