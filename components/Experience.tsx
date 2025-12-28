import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '../constants';
import { Building2 } from 'lucide-react';

const Experience: React.FC = () => {
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
    <section id="experience">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 variants={itemVariants} className="text-xl font-bold text-primary mb-8">cool places i worked at</motion.h2>

        <div className="flex flex-col gap-6">
          {EXPERIENCES.map((exp) => (
            <motion.div 
              key={exp.id} 
              variants={itemVariants}
              className="group flex items-center justify-between gap-4 p-2 -mx-2 rounded-xl hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface border border-border flex items-center justify-center shrink-0 text-primary">
                  <Building2 className="w-5 h-5" />
                </div>
                
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-primary group-hover:text-accent transition-colors">
                    {exp.company.toLowerCase()}
                  </h3>
                  <span className="text-xs md:text-sm text-secondary">
                    {exp.role.toLowerCase()}
                    <span className="hidden md:inline"> | fulltime</span>
                  </span>
                </div>
              </div>

              <div className="text-xs md:text-sm text-secondary font-mono text-right shrink-0">
                {exp.period.toLowerCase()}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;