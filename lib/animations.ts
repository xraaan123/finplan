// lib/animations.ts
import { Variants } from 'framer-motion';

// Basic animations
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const slideUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

export const slideDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3 },
  },
};

export const slideLeft: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.3 },
  },
};

export const slideRight: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.3 },
  },
};

// Scale animations
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export const scaleUp: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: 1.02,
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
};

// Container animations for staggered children
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Card hover animations
export const cardHover: Variants = {
  initial: { scale: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.12)' },
  hover: {
    scale: 1.02,
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
  tap: { scale: 0.98 },
};

// Progress bar animation
export const progressBar: Variants = {
  initial: { scaleX: 0, originX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
  },
};

// Modal/Dialog animations
export const modalBackdrop: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
};

// Navigation animations
export const navItem: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  hover: {
    x: 5,
    transition: { duration: 0.2 },
  },
};

// Button animations
export const buttonPress: Variants = {
  initial: { scale: 1 },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

export const buttonHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
  tap: { scale: 0.95 },
};

// Number animation (for counters)
export const numberCount: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Page transitions
export const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

export const pageVariants: Variants = {
  initial: { opacity: 0, x: '-100vw' },
  animate: {
    opacity: 1,
    x: 0,
    transition: pageTransition,
  },
  exit: {
    opacity: 0,
    x: '100vw',
    transition: pageTransition,
  },
};

// Notification animations
export const notificationSlide: Variants = {
  initial: { opacity: 0, x: 300, scale: 0.3 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: 300,
    scale: 0.5,
    transition: { duration: 0.2 },
  },
};

// Loading animations
export const spin: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
