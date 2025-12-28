import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const Contact: React.FC = () => {
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
    <section id="contact" className="pb-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2 variants={itemVariants} className="text-xl font-bold text-primary mb-6">get in touch</motion.h2>
        <motion.p variants={itemVariants} className="text-secondary text-sm md:text-base mb-8">
          i'm currently open for new opportunities. if you have a question or just want to say hi, feel free to book a call.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <a 
            href="https://cal.com/digital-dev/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background font-medium rounded-full hover:bg-secondary transition-colors text-sm"
          >
            <Calendar className="w-4 h-4" />
            book a call
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;