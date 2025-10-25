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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoRef = useRef(null);
  const location = useLocation();

  const navigation = [
    // { title: "Properties", path: "/properties" },
    { title: "Buy", path: "/sell" },
    { title: "Post Property", path: "/properties" },
    { title: "Contact US", path: "/contact" },
    { 
      title: (
        <span className="navbar-phone">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
            />
          </svg>
          508-228-2266
        </span>
      ), 
      path: "tel:5082282266" 
    }
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
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
              <li key={idx} className="navbar-item">
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
                  {item.path.startsWith('tel:') ? (
                    <a 
                      href={item.path} 
                      className="navbar-link"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link 
                      to={item.path} 
                      className={`navbar-link ${location.pathname === item.path ? 'navbar-link-active' : ''}`}
                    >
                      {item.title}
                    </Link>
                  )}
                </AnimatedContent>
              </li>
            ))}
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
            >
              Login
            </Link>
          </AnimatedContent>
        </div>
      </div>
    </nav>
  );
}