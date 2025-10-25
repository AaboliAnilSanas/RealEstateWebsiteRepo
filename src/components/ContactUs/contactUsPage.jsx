import React from "react";
import ContactForm from "./contactForm";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Svg from '../UIComponents/Svg'
const ContactUsPage = () => {
  const itemVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const headerContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.5 } },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.5, delayChildren: 0.6 } },
  };

  return (
    <div
      className="relative overflow-hidden min-h-screen "
      style={{
        padding: "var(--padding-y) var(--padding-x)",
        paddingLeft:"10rem",
        paddingRight:"10rem",
      }}
    >
     <Svg></Svg>

      {/* --- Contact Content --- */}
      <motion.div
        variants={headerContainerVariants}
        initial="hidden"
        animate="visible"
        style={{ marginBottom: "var(--spacing-xl)", textAlign: "center" }}
      >
        <motion.h1
          className="font-extrabold bg-gradient-to-r from-[var(--tertiary-color)] via-[var(--primary-color)] to-[var(--tertiary-color)] bg-clip-text text-transparent drop-shadow-lg [text-stroke:1px_white]"
          style={{ fontSize: "var(--heading-0)" }}
          variants={itemVariants}
        >
          Get In Touch
        </motion.h1>
      </motion.div>

      {/* Main Section */}
      <motion.div
        className="flex flex-col lg:flex-row"
        style={{ textAlign: "left", }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left */}
        <motion.div
          style={{ flex: 2, display: "flex", flexDirection: "column", gap: "var(--gap)" }}
          variants={itemVariants}
        >
          <motion.p
            className="text-gray-700"
            style={{ fontSize: "var(--body-text)" }}
            variants={itemVariants}
          >
            <span className="font-bold" style={{ fontSize: "var(--heading-3)" }}>
              Have questions about buying, selling, or leasing a property?
            </span>
            <br />
            <span className='italic' style={{ display: "block", marginTop: "var(--spacing-sm)" }}>
              Tell us what you need, and our team will get back to you quickly and professionally.
            </span>
          </motion.p>

          {[
            {
              icon: (
                <MessageCircle
                  className="text-white rounded-2xl w-12 h-12 p-2"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--primary-color-light), var(--tertiary-color))",
                  }}
                />
              ),
              title: "Chat with us",
              desc1: "Speak to Suniel Kapoor via chat",
              desc2: (
                <span className="text-[var(--primary-color)] font-bold underline cursor-pointer">
                  Start a chat
                </span>
              ),
            },
            {
              icon: (
                <Mail
                  className="text-white rounded-2xl w-12 h-12 p-2"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--primary-color-light), var(--tertiary-color))",
                  }}
                />
              ),
              title: "Email Support",
              desc1: "Email us and we'll get back to you",
              desc2: (
                <span className="text-[var(--primary-color)] font-bold underline cursor-pointer">
                  emailid@gmail.com
                </span>
              ),
            },
            {
              icon: (
                <Phone
                  className="text-white rounded-2xl w-12 h-12 p-2"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--primary-color-light), var(--tertiary-color))",
                  }}
                />
              ),
              title: "Call us",
              desc1: "Speak to Suniel Kapoor via call",
              desc2: (
                <span className="text-[var(--primary-color)] font-bold underline cursor-pointer">
                  +91 9990979879
                </span>
              ),
            },
            {
              icon: (
                <MapPin
                  className="text-white rounded-2xl w-12 h-12 p-2"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--primary-color-light), var(--tertiary-color))",
                  }}
                />
              ),
              title: "Visit Us",
              desc1: "Chat to us in person at our Mumbai Office",
              desc2: (
                <span className="text-[var(--primary-color)] font-bold underline cursor-pointer">
                  Shop No.1, Sophia Zuber Road, Mumbai Central, Mumbai 400008
                </span>
              ),
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="flex items-center"
              style={{ gap: "var(--spacing-md)" }}
              variants={itemVariants}
            >
              <div>{item.icon}</div>
              <div>
                <p className="font-bold mb-1" style={{ fontSize: "var(--heading-3)" }}>
                  {item.title}
                </p>
                <p className="text-gray-700" style={{ fontSize: "var(--body-text)" }}>
                  {item.desc1}
                </p>
                <p style={{ fontSize: "var(--body-text)", marginTop: "var(--spacing-xs)" }}>
                  {item.desc2}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right */}
        <motion.div style={{ flex: 1}} className="lg:mt-0" variants={itemVariants}>
          <ContactForm />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUsPage;