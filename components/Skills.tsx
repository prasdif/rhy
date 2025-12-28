import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="skills">
       <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl font-bold text-primary mb-6"
        >
          stack
        </motion.h2>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border rounded-lg text-sm text-secondary hover:text-primary hover:border-secondary transition-colors cursor-default"
                whileHover={{ scale: 1.05 }}
              >
                <Icon size={14} />
                {skill.name.toLowerCase()}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;