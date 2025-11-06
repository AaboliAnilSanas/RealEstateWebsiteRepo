import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AuthFlowModal from '../../Authentication/AuthFlowModal';
gsap.registerPlugin(ScrollTrigger);

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
  const [authModalOpen, setAuthModalOpen] = useState(false); // ✅ added

  const logoRef = useRef(null);
  const loginRef = useRef(null);
  const location = useLocation();

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Buy", path: "/properties" },
    { title: "Post Property", path: "/sell" },
    { title: "Contact", path: "/contact" }
  ];

  return (
    <>
      <nav className="navbar bg-white shadow-md">
        <div className="navbar-container">

          <div className="navbar-header">
            <Link to="/" className="navbar-logo">
              <img ref={logoRef} src="/logo.png" width={80} height={45} alt="Float UI logo" />
            </Link>

            <button 
              className="navbar-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </div>

          <div className={`navbar-menu ${isMenuOpen ? '' : 'navbar-menu-hidden'}`}>
            <ul className="navbar-list">
              {navigation.map((item, idx) => (
                <li key={idx} className="navbar-item relative"
                  onMouseEnter={() => setHoveredItem(idx)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <AnimatedContent direction="vertical" distance={60} duration={2.6} delay={0.1 + (idx * 0.1)} ease="elastic.out(1, 0.8)" initialOpacity={0} animateOpacity={true} scale={0.8} reverse={true}>
                    <Link to={item.path} className={`navbar-link group ${location.pathname === item.path ? 'navbar-link-active' : ''}`}>
                      {item.title}
                      <span className={`triangle-indicator ${hoveredItem === idx || location.pathname === item.path ? 'triangle-visible' : ''}`}></span>
                    </Link>
                  </AnimatedContent>
                </li>
              ))}

              <li className="navbar-item">
                <a href="tel:34567876545" className="navbar-phone-section">
                  <div className="phone-content">
                    <div className="phone-number">34567876545 / 546576767564</div>
                    <div className="phone-text">Call our experts</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* ✅ Login button now opens modal but UI stays same */}
          <div className="navbar-button-container">
            <button
              className="navbar-button"
              ref={loginRef}
              onMouseEnter={() => setIsLoginHovered(true)}
              onMouseLeave={() => setIsLoginHovered(false)}
              onClick={() => setAuthModalOpen(true)} // ✅ open modal
            >
              <span className="login-content">
                <span className="login-text">Login</span>
                <span className={`login-arrow ${isLoginHovered ? 'login-arrow-visible' : ''}`}>→</span>
              </span>
            </button>
          </div>

        </div>
      </nav>

      {/* ✅ Modal */}
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
