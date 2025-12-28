import React from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '../constants';
import { GraduationCap } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <section id="education">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xl font-bold text-primary mb-8">education</h2>

        <div className="flex flex-col gap-6">
          {EDUCATION.map((edu, index) => (
            <div 
              key={edu.id} 
              className="group flex items-start justify-between gap-4 p-2 -mx-2 rounded-xl hover:bg-surface transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface border border-border flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
                </div>
                
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-primary group-hover:text-accent transition-colors">
                    {edu.institution.toLowerCase()}
                  </h3>
                  <span className="text-xs md:text-sm text-secondary">
                    {edu.degree.toLowerCase()}
                  </span>
                   {edu.description && (
                    <p className="text-xs text-secondary mt-1 max-w-md hidden md:block">
                      {edu.description.toLowerCase()}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-xs md:text-sm text-secondary font-mono text-right shrink-0 mt-1">
                {edu.period.toLowerCase()}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Education;