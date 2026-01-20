import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../constants';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="about">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={itemVariants} className="text-xl font-bold text-primary mb-8">about</motion.h2>
        
        <div className="space-y-4 text-secondary text-sm md:text-base leading-relaxed">
           {PROFILE.bio.split('\n').map((paragraph, index) => (
             <motion.p key={index} variants={itemVariants}>
               {paragraph}
             </motion.p>
           ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;