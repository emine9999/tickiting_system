'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
  // Animation variants for the logo components
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Checkmark icon */}
      <motion.div className="mr-2 relative">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.circle
            cx="16" 
            cy="16" 
            r="14"
            stroke="#272666"
            strokeWidth="2.5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { delay: 0.3, duration: 0.5 }
            }}
            fill="none"
          />
          <motion.path
            d="M9 16L14 21L23 12"
            stroke="#272666"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={checkmarkVariants}
            initial="hidden"
            animate="visible"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Text logo */}
      <div className="flex">
        {/* TICK part */}
        <div className="flex">
          {['T', 'I', 'C', 'K'].map((letter, i) => (
            <motion.span
              key={`tick-${i}`}
              variants={letterVariants}
              className="font-bold text-xl text-[#272666]"
            >
              {letter}
            </motion.span>
          ))}
        </div>
        
        {/* Dash */}
        <motion.span
          variants={letterVariants}
          className="mx-0.5 font-bold text-xl text-[#272666]"
        >
          -
        </motion.span>
        
        {/* HUB part */}
        <div className="flex">
          {['h', 'u', 'b'].map((letter, i) => (
            <motion.span
              key={`hub-${i}`}
              variants={letterVariants}
              className="font-bold text-xl text-[#272666]"
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Logo;