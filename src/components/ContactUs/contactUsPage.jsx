import React, { useState } from "react";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "./contactForm"; // Import the contact form component

const ContactUsPage = () => {
  const [activeMethod, setActiveMethod] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Chat with us",
      desc2: "Start a chat",
    },
    {
      icon: Mail,
      title: "Email Support",
      desc2: "emailid@gmail.com",
    },
    {
      icon: Phone,
      title: "Call us",
      desc2: "+91 9990979879",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      desc2: "Shop No.1, Sophia Zuber Road, Mumbai Central, Mumbai 400008",
    }
  ];

  return (
    <div
      className={`relative h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 transition-all duration-700 ${
        isLoaded ? "animate-pageLoad" : "opacity-0 translate-y-5"
      }`}
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-yellow-400/30 to-yellow-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-blue-300/20 to-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Premium Gradient Overlay Top */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Premium Gradient Overlay Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-20">
        <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                className="fill-blue-600"></path>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 pointer-events-none opacity-20">
        <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                className="fill-yellow-500"></path>
        </svg>
      </div>

      <div className="relative z-10 h-full flex flex-col max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Compact Header */}
        <div className={`text-center mb-6 transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`}>
          <div className="inline-block">
            <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-600 to-yellow-600 bg-clip-text text-transparent mb-2">
              Get In Touch
            </h1>
            <div className="h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent rounded-full"></div>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent rounded-full mt-0.5"></div>
          </div>
        </div>

        {/* Main Content - Flex Grow */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
          {/* Left Section - Timeline with Scroll */}
          <div className={`flex flex-col min-h-0 transition-all duration-700 delay-200 ${
            isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            {/* Premium Intro Card */}
            <div className="relative bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-blue-200/50 overflow-hidden mb-4 flex-shrink-0">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full text-white text-xs font-semibold mb-2">
                  We're Here to Help
                </div>
                <p className="text-base font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-2">
                  Have questions about buying, selling, or leasing a property?
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Tell us what you need, and our team will get back to you quickly.
                </p>
              </div>
            </div>

            {/* Contact Methods Timeline with Scroll */}
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent">
              <div className="relative pl-8">
                {/* Gradient Timeline Line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-yellow-500 to-blue-600 rounded-full shadow-lg"></div>

                {contactMethods.map((method, idx) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveMethod(idx)}
                      onMouseLeave={() => setActiveMethod(null)}
                      className="relative mb-4 last:mb-0"
                    >
                      {/* Timeline Dot */}
                      <div className={`absolute -left-8 top-5 transition-all duration-300 ${
                        activeMethod === idx ? 'scale-110' : 'scale-100'
                      }`}>
                        <div className={`w-4 h-4 rounded-full border-3 border-white shadow-lg ${
                          activeMethod === idx 
                            ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
                            : 'bg-gradient-to-br from-blue-500 to-blue-700'
                        }`}>
                          {activeMethod === idx && (
                            <div className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-75"></div>
                          )}
                        </div>
                      </div>

                      {/* Contact Card */}
                      <div className={`relative bg-gradient-to-br from-white to-blue-50/50 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border-2 overflow-hidden ${
                        activeMethod === idx 
                          ? 'border-yellow-400 scale-[1.02] shadow-yellow-200/50' 
                          : 'border-transparent hover:border-blue-200'
                      }`}>
                        {/* Shimmer Effect */}
                        {activeMethod === idx && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                        )}
                        
                        <div className="relative flex items-start gap-3">
                          {/* Icon Container */}
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br shadow-md flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            activeMethod === idx
                              ? 'from-yellow-500 to-yellow-600 shadow-yellow-500/50 scale-110'
                              : 'from-blue-600 to-blue-800 shadow-blue-500/50'
                          }`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-base mb-1 bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                              {method.title}
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed font-medium break-words">
                              {method.desc2}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className={`lg:pl-4 flex flex-col min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent transition-all duration-700 delay-300 ${
            isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* ✨ Page Load Animation Keyframes */}
      <style>{`
        @keyframes pageLoad {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-pageLoad {
          animation: pageLoad 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ContactUsPage;
