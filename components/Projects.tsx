import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, FolderCode } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.a 
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-border rounded-xl overflow-hidden hover:border-secondary transition-colors bg-surface"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-border shrink-0 bg-background flex items-center justify-center">
              {imgError ? (
                <FolderCode className="w-5 h-5 text-secondary" />
              ) : (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              )}
            </div>

            <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
              {project.title.toLowerCase()}
            </h3>
          </div>
          
          <div className="flex gap-2">
            <span className="p-2 bg-background rounded-full text-secondary group-hover:text-primary transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
        
        <p className="text-sm text-secondary mb-6 line-clamp-2">
          {project.description.toLowerCase()}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map(tag => (
            <span key={tag} className="text-xs text-secondary bg-background border border-border px-2 py-1 rounded-md">
              {tag.toLowerCase()}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

const Projects: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h2 variants={titleVariants} className="text-xl font-bold text-primary mb-8">projects</motion.h2>

        <div className="grid grid-cols-1 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;