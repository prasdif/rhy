import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Home, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { PROFILE } from '../constants';

export const Dock: React.FC = () => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-16 items-end gap-4 rounded-2xl bg-surface/80 border border-border px-4 pb-3 backdrop-blur-md shadow-2xl"
      >
        <DockIcon mouseX={mouseX} icon={<Home className="w-full h-full" />} href="#hero" label="Home" />
        <div className="w-[1px] h-10 bg-border mx-1 self-center" />
        <DockIcon mouseX={mouseX} icon={<Github className="w-full h-full" />} href={PROFILE.social.github} label="GitHub" external />
        <DockIcon mouseX={mouseX} icon={<Linkedin className="w-full h-full" />} href={PROFILE.social.linkedin} label="LinkedIn" external />
        <DockIcon mouseX={mouseX} icon={<Twitter className="w-full h-full" />} href={PROFILE.social.twitter} label="X" external />
        <DockIcon mouseX={mouseX} icon={<Mail className="w-full h-full" />} href="#contact" label="Contact" />
      </motion.div>
    </div>
  );
};

function DockIcon({
  mouseX,
  icon,
  href,
  label,
  external
}: {
  mouseX: MotionValue;
  icon: React.ReactNode;
  href: string;
  label: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = React.useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <motion.a
        ref={ref}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        style={{ width, height: width }}
        className="aspect-square flex items-center justify-center rounded-full bg-surface border border-border text-secondary hover:text-primary hover:bg-border/20 transition-colors"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="p-3 w-full h-full flex items-center justify-center">
          {icon}
        </div>
      </motion.a>
      
      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute -top-10 px-2 py-1 bg-surface border border-border rounded text-xs text-primary whitespace-nowrap pointer-events-none shadow-md"
        >
          {label}
        </motion.div>
      )}
    </div>
  );
}