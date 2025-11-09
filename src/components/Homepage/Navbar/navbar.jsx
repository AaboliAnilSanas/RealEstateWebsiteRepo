import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AuthFlowModal from '../../Authentication/AuthFlowModal';
gsap.registerPlugin(ScrollTrigger);

// Utility component for GSAP animations
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
      // Clean up GSAP and ScrollTrigger instances on unmount
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf(el);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const logoRef = useRef(null);
  const loginRef = useRef(null);
  const location = useLocation();

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Buy", path: "/properties" },
    { title: "Post Property", path: "/sell" },
    { title: "Contact", path: "/contact" }
  ];

  // Function to handle link click and close menu on mobile
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar bg-white shadow-md">
        <div className="navbar-container flex justify-between items-center px-4 sm:px-6 lg:px-8">

          {/* Left Section (Logo and Mobile Hamburger) */}
          <div className="navbar-header flex justify-between items-center sm:justify-start">
            
            {/* 🍔 Hamburger/Close Toggle Button (Mobile Only) */}
            <button 
              className="navbar-toggle order-1 sm:order-none sm:hidden" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  // Close Icon (X) when menu is open
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Menu Icon (3 Lines) when menu is closed
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            {/* Logo (Stays on the left) */}
            <Link to="/" className="navbar-logo order-2 sm:order-none">
              <img ref={logoRef} src="/logo.png" width={80} height={45} alt="Float UI logo" />
            </Link>
          </div>

          {/* Center Section (Navigation Links) */}
          {/* Menu is hidden using CSS class 'navbar-menu-hidden' on mobile */}
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
                      onClick={handleLinkClick} // Closes the menu on link click
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

          {/* Right Section (Login button - Icon on Mobile, Text on Desktop) */}
          <div className="navbar-button-container order-3 sm:order-none ml-auto sm:ml-0"> 
            <button
              // Ensure compact sizing on mobile
              className="navbar-button text-xs px-2 py-1 h-8 w-auto min-w-0 sm:text-base sm:px-4 sm:py-2 sm:h-auto" 
              ref={loginRef}
              onMouseEnter={() => setIsLoginHovered(true)}
              onMouseLeave={() => setIsLoginHovered(false)}
              onClick={() => setAuthModalOpen(true)}
            >
              <span className="login-content flex items-center">
                
                {/* 👤 Login Icon: Visible only on mobile (sm:hidden) */}
                <svg className="h-4 w-4 sm:hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                
                {/* Text & Arrow: Hidden on mobile, visible on desktop (hidden sm:inline) */}
                <span className="login-text text-xs sm:text-base hidden sm:inline">Login</span>
                <span className={`login-arrow text-xs ml-1 ${isLoginHovered ? 'login-arrow-visible' : ''} hidden sm:inline`}>→</span>
              </span>
            </button>
          </div>

        </div>
      </nav>

      {/* Modal */}
      {authModalOpen && (
        <AuthFlowModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
