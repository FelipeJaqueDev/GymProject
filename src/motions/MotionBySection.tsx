import { motion } from "framer-motion";
import React from "react";

interface MotionSectionProps {
  children: React.ReactNode;
  delay?: number;
}

const MotionBySection: React.FC<MotionSectionProps> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default MotionBySection;