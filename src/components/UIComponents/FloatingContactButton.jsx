import React, { useState } from 'react';
import { MessageCircle, Mail, Phone } from 'lucide-react';

const FloatingContactButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const contactOptions = [
    {
      id: 'whatsapp',
      icon: MessageCircle,
      label: 'WhatsApp',
      color: '#25D366', // Keep existing color
      action: () => window.open('https://wa.me/1234567890', '_blank'),
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      color: '#EA4335', // Keep existing color
      action: () => window.location.href = 'mailto:contact@example.com',
    },
    {
      id: 'phone',
      icon: Phone,
      label: 'Phone',
      color: '#4285F4', // Keep existing color
      action: () => window.location.href = 'tel:+1234567890',
    },
  ];

  return (
    <>
      <style>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .contact-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .contact-option-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          animation: slideInFromRight 0.3s ease-out backwards;
        }

        .contact-label {
          background: white;
          padding: 8px 16px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          opacity: 0;
          transition: opacity 0.3s ease;
          white-space: nowrap;
        }

        .contact-option-wrapper:hover .contact-label {
          opacity: 1;
        }

        .contact-option-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
        }

        .contact-option-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        /* Updated Main Button Styles */
        .main-contact-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: white; /* Changed from gradient */
          border: 3px solid var(--location-blue-600); /* Added blue border */
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2); /* Adjusted shadow */
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .main-contact-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3); /* Adjusted shadow */
        }
        
        .main-contact-icon-wrapper {
            /* To apply the gold color via CSS variable */
            color: var(--location-blue-600); 
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .main-contact-icon {
          transition: transform 0.3s ease;
        }

        .main-contact-icon.expanded {
          transform: rotate(90deg);
        }
      `}</style>

      <div 
        className="contact-container"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Contact Options - appear above main button */}
        {isExpanded && (
          <div className="flex flex-col gap-3">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  className="contact-option-wrapper"
                  style={{
                    animationDelay: `${index * 0.08}s`,
                  }}
                >
                  {/* Label */}
                  <div className="contact-label">
                    <span className="text-sm font-semibold text-gray-700">
                      {option.label}
                    </span>
                  </div>

                  {/* Option Button */}
                  <button
                    className="contact-option-btn"
                    onClick={option.action}
                    style={{ backgroundColor: option.color }}
                  >
                    <Icon size={20} color="white" strokeWidth={2.5} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Main Contact Button */}
        <button className="main-contact-btn">
          <div className="main-contact-icon-wrapper">
            <MessageCircle
              size={24}
              /* Removed color prop to use CSS color: var(--gold-base) */
              strokeWidth={2.5}
              className={`main-contact-icon ${isExpanded ? 'expanded' : ''}`}
            />
          </div>
        </button>
      </div>
    </>
  );
};

export default FloatingContactButton;