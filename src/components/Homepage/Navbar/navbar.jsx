// src/components/Homepage/Navbar/navbar.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, LogOut, User } from 'lucide-react'; // <-- ADDED ChevronDown, LogOut, User
import AuthFlowModal from '../../Authentication/AuthFlowModal';
import axiosInstance from '../../../services/axios'; 
gsap.registerPlugin(ScrollTrigger);

// Utility component for GSAP animations (unchanged for brevity)
const AnimatedContent = ({ children, distance = 100, direction = 'vertical', reverse = false, duration = 0.8, ease = 'power3.out', initialOpacity = 0, animateOpacity = true, scale = 1, threshold = 0.1, delay = 0, onComplete }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1
    });

    gsap.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
      delay,
      onComplete,
      scrollTrigger: {
        trigger: el,
        start: `top ${startPct}%`,
        toggleActions: 'play none none none',
        once: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
      gsap.killTweensOf(el);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
};

// <--- START ADDED LOGOUT CONFIRMATION MODAL COMPONENT --->
const LogoutConfirmModal = ({ isOpen, onConfirm, onCancel, userName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-2xl transform scale-100 opacity-100 transition-all duration-300">
                <div className="text-center">
                    <LogOut size={36} className="text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h3>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to log out, {userName}?
                    </p>
                    <div className="flex justify-center gap-3">
                        <button
                            onClick={onCancel}
                            className="w-full py-2 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                        >
                            No, Stay Logged In
                        </button>
                        <button
                            onClick={onConfirm}
                            className="w-full py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition shadow-md"
                        >
                            Yes, Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
// <--- END ADDED LOGOUT CONFIRMATION MODAL COMPONENT --->


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null); 
  
  // <--- START NEW DROPDOWN & MODAL STATE --->
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); 
  // <--- END NEW DROPDOWN & MODAL STATE --->

  const logoRef = useRef(null);
  const loginRef = useRef(null);
  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const location = useLocation();

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Buy", path: "/properties" },
    { title: "Post Property", path: "/sell" },
    { title: "Contact", path: "/contact" }
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };
  
  // Refactored logout logic
  const performLogout = () => { // <-- NEW FUNCTION FOR ACTUAL LOGOUT
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      setIsLoggedIn(false);
      setUserName(null);
      setShowLogoutConfirm(false); // Close modal
      setIsDropdownOpen(false); // Close dropdown
      // Optional: Redirect to home or refresh state
      if (location.pathname !== '/') {
         // window.location.href = '/'; 
      }
  };

  // Handler to open the confirmation modal
  const handleLogoutConfirmation = () => {
      setIsDropdownOpen(false); // Close dropdown first
      setShowLogoutConfirm(true); // Open modal
  };

  // Local logout helper
  const handleLogout = () => {
      if (isLoggedIn) {
          handleLogoutConfirmation(); // Open confirmation modal
      } else {
          performLogout(); // Should not happen, but cleans up localStorage just in case
      }
  };
  
  // [MODIFIED] Recheck Auth Logic (Fetches name if missing)
  const handleRecheckAuth = async () => {
      const token = localStorage.getItem('authToken');
      let name = localStorage.getItem('userName');
      
      if (token) {
          if (!name) {
              try {
                  const response = await axiosInstance.get('user/me');
                  const fullName = response.data.fullName;

                  if (fullName) {
                      localStorage.setItem('userName', fullName);
                      name = fullName;
                  }
              } catch (error) {
                  console.error("Failed to fetch user details:", error.response?.data || error.message);
                  if (error.response?.status === 401) {
                       performLogout(); // Use performLogout to clean up
                       return; 
                  }
                  name = 'User'; 
              }
          }

          if (name) {
              setIsLoggedIn(true);
              const firstName = name.split(' ')[0];
              setUserName(firstName);
          }
      } else {
          setIsLoggedIn(false);
          setUserName(null);
      }
  };

  // Handler that runs when the modal closes
  const handleModalClose = () => {
      handleRecheckAuth();
      setAuthModalOpen(false);
  };

  // <--- MODIFIED AUTH BUTTON HANDLER --->
  const handleAuthButtonClick = () => {
      if (isLoggedIn) {
          // Toggle the dropdown if logged in
          setIsDropdownOpen(prev => !prev);
      } else {
          // Open Auth Modal if logged out
          setAuthModalOpen(true);
      }
      setIsMenuOpen(false);
  };
  // <--- END MODIFIED AUTH BUTTON HANDLER --->
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);


  useEffect(() => {
    handleRecheckAuth();
    
    window.addEventListener('focus', handleRecheckAuth); 
    return () => window.removeEventListener('focus', handleRecheckAuth);

  }, []);

  const buttonClasses = `navbar-button text-xs px-2 py-1 h-8 w-auto min-w-0 sm:text-base sm:px-4 sm:py-2 sm:h-auto ${
      isLoggedIn ? 'navbar-button-logged-in' : ''
  }`;

  return (
    <>
      <nav className="navbar bg-white shadow-md">
        <div className="navbar-container flex justify-between items-center px-4 sm:px-6 lg:px-8">

          {/* Left Section (Logo and Mobile Hamburger) */}
          <div className="navbar-header flex justify-between items-center sm:justify-start">
            
            <button 
              className="navbar-toggle order-1 sm:order-none sm:hidden" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            <Link to="/" className="navbar-logo order-2 sm:order-none">
              <img ref={logoRef} src="/logo.png" width={80} height={45} alt="Float UI logo" />
            </Link>
          </div>

          {/* Center Section (Navigation Links) */}
          <div className={`navbar-menu ${isMenuOpen ? '' : 'navbar-menu-hidden'} sm:flex sm:items-center`}> 
            <ul className="navbar-list flex space-x-4 lg:space-x-8"> 
              {navigation.map((item, idx) => (
                <li key={idx} className="navbar-item relative"
                  onMouseEnter={() => setHoveredItem(idx)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <AnimatedContent direction="vertical" distance={60} duration={2.6} delay={0.1 + (idx * 0.1)} ease="elastic.out(1, 0.8)" initialOpacity={0} animateOpacity={true} scale={0.8} reverse={true}>
                    <Link 
                      to={item.path} 
                      className={`navbar-link group ${location.pathname === item.path ? 'navbar-link-active' : ''}`}
                      onClick={handleLinkClick} 
                    >
                      {item.title}
                      <span className={`triangle-indicator ${hoveredItem === idx || location.pathname === item.path ? 'triangle-visible' : ''}`}></span>
                    </Link>
                  </AnimatedContent>
                </li>
              ))}

              {/* Phone Section (Hidden on smaller screens, shown on large screens) */}
              <li className="navbar-item hidden lg:block">
                <a href="tel:34567876545" className="navbar-phone-section">
                  <div className="phone-content text-xs">
                    <div className="phone-number">34567876545 / 546576767564</div>
                    <div className="phone-text">Call our experts</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section (Login/Welcome button and Dropdown) */}
          <div className="navbar-button-container order-3 sm:order-none ml-auto sm:ml-0 relative" ref={dropdownRef}> 
            <button
              className={buttonClasses} 
              ref={loginRef}
              onMouseEnter={() => setIsLoginHovered(true)}
              onMouseLeave={() => setIsLoginHovered(false)}
              onClick={handleAuthButtonClick}
            >
              <span className="login-content flex items-center gap-1">
                
                {/* Login/Welcome Text */}
                <span className={`login-text text sm:text-base ${!isLoggedIn ? 'hidden sm:inline' : 'inline'}`}>
                    {isLoggedIn ? `Welcome ${userName}` : 'Login'}
                </span>
                
                {/* Icon (Visible on mobile only when logged out) */}
                {!isLoggedIn && (
                    <User className="h-4 w-4 sm:hidden" />
                )}
                
                {/* Down Arrow for Logged In State */}
                {isLoggedIn && (
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                )}
                
                {/* Arrow/Indicator (Desktop only - Login button) */}
                {!isLoggedIn && (
                    <span className={`login-arrow text-xs ml-1 ${isLoginHovered ? 'login-arrow-visible' : ''} hidden sm:inline`}>
                        → 
                    </span>
                )}
              </span>
            </button>
            
            {/* Dropdown Menu */}
            {isLoggedIn && isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden animate-fade-in-down">
                    <style jsx>{`
                        @keyframes fade-in-down {
                            from { opacity: 0; transform: translateY(-10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                        .animate-fade-in-down {
                            animation: fade-in-down 0.2s ease-out forwards;
                        }
                    `}</style>
                    <div 
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                    >
                        <button
                            onClick={handleLogoutConfirmation}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                            role="menuitem"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            )}
          </div>

        </div>
      </nav>

      {/* Auth Modal (Login/Register) */}
      {authModalOpen && (
        <AuthFlowModal
          isOpen={authModalOpen}
          onClose={handleModalClose}
        />
      )}
      
      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal 
        isOpen={showLogoutConfirm}
        onConfirm={performLogout}
        onCancel={() => setShowLogoutConfirm(false)}
        userName={userName}
      />
    </>
  );
};

export default Navbar;