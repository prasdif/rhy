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
    <section id="hero" className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 min-h-[40vh] justify-center">
      <motion.div 
        className="flex-1 text-center md:text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold tracking-tight text-primary mb-2"
        >
          hi, I'm {PROFILE.name.split(' ')[0].toLowerCase()}
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-sm md:text-base text-secondary font-mono"
        >
          been here for {age} years
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
        className="w-32 h-32 md:w-40 md:h-40 relative group"
      >
        <div className="absolute inset-0 bg-black rounded-full overflow-hidden border-2 border-neutral-800 group-hover:border-neutral-600 transition-colors">
          <img 
            src="https://res.cloudinary.com/dztmp3saa/image/upload/v1764411799/05fa065bfe2361a83fc8e7891088bb35_serlz6.jpg" 
            alt="Profile"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;