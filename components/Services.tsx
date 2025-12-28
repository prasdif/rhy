import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
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
    <section id="services">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={itemVariants} className="text-xl font-bold text-primary mb-6">services</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="p-4 rounded-xl border border-border bg-surface hover:bg-surface/80 transition-colors"
              whileHover={{ y: -2 }}
            >
              <h3 className="text-sm font-bold text-primary mb-2">{service.title.toLowerCase()}</h3>
              <p className="text-xs text-secondary leading-relaxed">
                {service.description.toLowerCase()}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;