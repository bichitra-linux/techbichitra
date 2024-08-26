import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface AnimationWrapperProps extends MotionProps {
  keyValue: string;
  className: string;
  children: React.ReactNode;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  keyValue,
  initial,
  animate,
  transition,
  className,
  children
}) => {
  return (
    <motion.div
      key={keyValue}
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;