// src/components/UIComponents/Toast.jsx
import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, AlertTriangle } from 'lucide-react';

const Toast = ({ 
  message, 
  type = 'success', 
  // duration is no longer used for automatic dismissal
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  // New function to handle manual closure via the cross button
  const handleManualClose = () => {
    setIsVisible(false);
    // Remove from DOM after transition
    setTimeout(() => {
      setShouldRender(false);
      if (onClose) onClose();
    }, 300);
  };
    
  useEffect(() => {
    // Component should only render if a message is present
    if (!message) {
      setShouldRender(false);
    }
  }, [message]);

  const baseClasses = "fixed right-4 z-[1000] p-4 rounded-xl shadow-2xl transition-all duration-300 transform";
  
  const getStyle = () => {
    switch (type) {
      case 'error':
        return {
          container: "bg-red-600 border border-red-800",
          icon: AlertTriangle,
          iconColor: "text-white",
          transform: isVisible ? "translateY(0) opacity-100" : "translateY(-20px) opacity-0",
          top: "top-4"
        };
      case 'success':
      default:
        // MODIFIED: Use a prominent green theme for success
        return {
          container: "bg-gradient-to-r from-emerald-600 to-green-500 border border-emerald-700",
          icon: CheckCircle2,
          iconColor: "text-white",
          transform: isVisible ? "translateY(0) opacity-100" : "translateY(-20px) opacity-0",
          top: "top-4"
        };
    }
  };

  if (!shouldRender || !message) return null;

  const { container, icon: Icon, iconColor, transform, top } = getStyle();

  return (
    <div 
      className={`${baseClasses} ${container} ${top} ${transform}`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Spring effect for pop-in
      }}
    >
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${iconColor}`} />
        <div className="text-sm font-medium text-white">
          {message}
        </div>
        <button 
          onClick={handleManualClose} // <-- Calls the manual close function
          className={`ml-2 flex-shrink-0 ${iconColor} opacity-70 hover:opacity-100 transition-opacity`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;