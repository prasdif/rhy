
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../constants';

const Hero: React.FC = () => {
  const [age, setAge] = useState<string>('0');
  
  useEffect(() => {
    const birthDate = new Date("2003-08-25"); // Approx birth date based on age
    const interval = setInterval(() => {
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - birthDate.getTime());
      const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25); 
      setAge(diffYears.toFixed(9));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="hero" className="flex flex-col items-center justify-center min-h-[30vh] py-12 text-center">
      <motion.div 
        className="flex-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-4"
        >
          hi, I'm {PROFILE.name.split(' ')[0].toLowerCase()}
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-sm md:text-lg text-secondary font-mono"
        >
          been here for {age} years
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
