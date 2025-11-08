import React, { useRef, useEffect } from "react";
import Video from "./Video/video";
import FilterComponent from "../UIComponents/FilterComponent";
import FilterSearchPage from "./FilterSearchPage/filterSearchPage";
import LocationSection from "./LocationCards/LocationCard";
import Footer from "../Footer/Footer";
import PropertyListingBanner from "./SellPropertyBanner/PropertyListingBanner";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Reusable component for scroll-based animation
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
      duration, // Animation duration
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
      // Clean up ScrollTrigger instances associated with this element
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
      gsap.killTweensOf(el);
    };
  }, [distance, direction, reverse, duration, ease, initialOpacity, animateOpacity, scale, threshold, delay, onComplete]);

  return <div ref={ref}>{children}</div>;
};


const HomePage = () => {
  return (
    // ✅ Removed overflow-hidden so the page stays visible when popup opens
    <div className="min-h-screen flex flex-col relative overflow-visible">

      <div className="relative z-10">
        {/* Video Section */}
        <div className="relative z-20">
          <Video />

          {/* Search Filter Card */}
          <div className="mx-[150px] mb-20 -mt-20 z-30 relative rounded-2xl ring-5 ring-inset ring-gray-200 bg-white">
            <FilterSearchPage />
          </div>
        </div>

        {/* Location Cards */}
        {/* CHANGE: duration increased from 1 to 2 for a slower animation */}
        <AnimatedContent distance={80} duration={2} delay={0.2}>
          <LocationSection />
        </AnimatedContent>

        {/* Sell Property Banner */}
        {/* CHANGE: duration increased from 1 to 2 for a slower animation */}
        <AnimatedContent distance={80} duration={2} delay={0.4}>
          <PropertyListingBanner />
        </AnimatedContent>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;