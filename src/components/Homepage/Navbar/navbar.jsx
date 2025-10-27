import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedContent = ({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  onComplete
}) => {
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
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf(el);
    };
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    onComplete
  ]);

  return <div ref={ref}>{children}</div>;
};

const  Navbar=() =>{
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const logoRef = useRef(null);
  const loginRef = useRef(null);
  const location = useLocation();

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Buy", path: "/properties" },
    { title: "Post Property", path: "/sell" },
    { title: "Contact", path: "/contact" }
  ];

  const handleLogoMouseEnter = () => {
    gsap.to(logoRef.current, {
      rotationY: 360,
      duration: 0.8,
      ease: "power2.out",
      transformOrigin: "center center"
    });
  };

  const handleLogoMouseLeave = () => {
    gsap.set(logoRef.current, {
      rotationY: 0
    });
  };

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleLoginMouseEnter = () => {
    setIsLoginHovered(true);
    if (loginRef.current) {
      gsap.to(loginRef.current, {
        scale: 1.05,
        y: -2,
        boxShadow: "0 8px 20px rgba(94, 43, 109, 0.3)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleLoginMouseLeave = () => {
    setIsLoginHovered(false);
    if (loginRef.current) {
      gsap.to(loginRef.current, {
        scale: 1,
        y: 0,
        boxShadow: "0 4px 12px rgba(94, 43, 109, 0.2)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleLoginClick = () => {
    if (loginRef.current) {
      gsap.to(loginRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="navbar bg-white shadow-md">
      <div className="navbar-container">
        <div className="navbar-header">
          <Link 
            to="/"
            className="navbar-logo"
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
          >
            <img
              ref={logoRef}
              src="/logo.png" 
              width={80} 
              height={45}
              alt="Float UI logo"
            />
          </Link>
          
          <button 
            className="navbar-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
        
        <div className={`navbar-menu ${isMenuOpen ? '' : 'navbar-menu-hidden'}`}>
          <ul className="navbar-list">
            {navigation.map((item, idx) => (
              <li 
                key={idx} 
                className="navbar-item relative"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                <AnimatedContent
                  direction="vertical"
                  distance={60}
                  duration={2.6}
                  delay={0.1 + (idx * 0.1)}
                  ease="elastic.out(1, 0.8)"
                  initialOpacity={0}
                  animateOpacity={true}
                  scale={0.8}
                  reverse={true}
                >
                  <Link 
                    to={item.path} 
                    className={`navbar-link group ${location.pathname === item.path ? 'navbar-link-active' : ''}`}
                  >
                    {item.title}
                    {/* Triangle indicator */}
                    <span className={`triangle-indicator ${hoveredItem === idx || location.pathname === item.path ? 'triangle-visible' : ''}`}></span>
                  </Link>
                </AnimatedContent>
              </li>
            ))}
            
            {/* Phone Section */}
            <li className="navbar-item">
              <AnimatedContent
                direction="vertical"
                distance={60}
                duration={2.6}
                delay={0.5}
                ease="elastic.out(1, 0.8)"
                initialOpacity={0}
                animateOpacity={true}
                scale={0.8}
                reverse={true}
              >
                <a href="tel:34567876545" className="navbar-phone-section">
                  <div className="phone-icon-container">
                    <div className="phone-circle">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        className="phone-icon"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="phone-content">
                    <div className="phone-number">
                      34567876545 / 546576767564
                    </div>
                    <div className="phone-text">
                      Call our experts
                    </div>
                  </div>
                </a>
              </AnimatedContent>
            </li>
          </ul>
        </div>
        
        <div className="navbar-button-container">
          <AnimatedContent
            direction="horizontal"
            distance={80}
            reverse={true}
            duration={2.6}
            delay={0.6}
            ease="bounce.out"
          >
            <Link 
              to="/login" 
              className="navbar-button"
              ref={loginRef}
              onMouseEnter={handleLoginMouseEnter}
              onMouseLeave={handleLoginMouseLeave}
              onClick={handleLoginClick}
            >
              <span className="login-content">
                <span className="login-text">Login</span>
                <span className={`login-arrow ${isLoginHovered ? 'login-arrow-visible' : ''}`}>→</span>
              </span>
            </Link>
          </AnimatedContent>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;