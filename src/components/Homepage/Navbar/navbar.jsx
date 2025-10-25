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
    { title: "Home", path: "/" },
    { title: "Buy", path: "/properties" },
    { title: "Post Property", path: "/sell" },
    { title: "Contact US", path: "/contact" },
    { 
      title: (
        <span className="flex items-center gap-2 text-white">
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent py-2 ">
      <div className="max-w-[96vw] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link 
            to="/"
            className="flex items-center transition-transform duration-300 hover:scale-105"
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
          >
            <img
              ref={logoRef}
              src="/logo.png" 
              width={80} 
              height={45}
              alt="Float UI logo"
              className="rounded-lg"
            />
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden ml-4 p-2 text-white hover:text-gray-200 transition-colors"
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
        
        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <ul className="flex items-center space-x-8">
            {navigation.map((item, idx) => (
              <li key={idx} className="relative">
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
                      className="text-white hover:text-gray-200 transition-colors duration-300 px-4 py-2 rounded-full flex items-center gap-2"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link 
                      to={item.path} 
                      className={`text-white hover:text-gray-200 transition-colors duration-300 px-4 py-2 rounded-full ${
                        location.pathname === item.path ? 'bg-[#d2a63f] bg-opacity-30 text-[#d2a63f]' : ''
                      }`}
                    >
                      {item.title}
                    </Link>
                  )}
                </AnimatedContent>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Login Button - Desktop */}
        <div className="hidden md:block">
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
              className="bg-gradient-to-br from-[#f3b524] to-[#e0a10cb5] text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Login
            </Link>
          </AnimatedContent>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-transparent transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          <div className="bg-transparent py-4">
            <ul className="flex flex-col items-center space-y-4">
              {navigation.map((item, idx) => (
                <li key={idx} className="w-full text-center">
                  {item.path.startsWith('tel:') ? (
                    <a 
                      href={item.path} 
                      className="block text-white hover:text-gray-200 transition-colors duration-300 py-3 text-lg"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link 
                      to={item.path} 
                      className={`block text-white hover:text-gray-200 transition-colors duration-300 py-3 text-lg ${
                        location.pathname === item.path ? 'text-[#d2a63f]' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
              <li className="w-full text-center pt-4">
                <Link 
                  to="/login" 
                  className="bg-gradient-to-br from-[#d2a63f] to-[#d2a63fb5] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg inline-block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}