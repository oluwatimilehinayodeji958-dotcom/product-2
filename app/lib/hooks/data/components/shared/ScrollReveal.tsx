"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  scale?: number;
  once?: boolean;
  threshold?: number;
  stagger?: number;
  as?: "div" | "section" | "article" | "span";
}

const directionVariants: Record<string, (distance: number) => Variants> = {
  up: (distance) => ({
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0 },
  }),
  down: (distance) => ({
    hidden: { opacity: 0, y: -distance },
    visible: { opacity: 1, y: 0 },
  }),
  left: (distance) => ({
    hidden: { opacity: 0, x: -distance },
    visible: { opacity: 1, x: 0 },
  }),
  right: (distance) => ({
    hidden: { opacity: 0, x: distance },
    visible: { opacity: 1, x: 0 },
  }),
  none: () => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }),
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 30,
  scale,
  once = true,
  threshold = 0.1,
  as: Component = "div",
  stagger,
}: ScrollRevealProps) {
  const variants = directionVariants[direction](distance);

  const MotionComponent = motion[Component] as typeof motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
        ...(stagger && { staggerChildren: stagger }),
      }}
      className={cn(className)}
      {...(scale && {
        whileInView: { ...variants.visible, scale: 1 },
        variants: {
          hidden: { ...variants.hidden, scale: scale < 1 ? scale : 0.95 },
          visible: { ...variants.visible, scale: 1 },
        },
      })}
    >
      {children}
    </MotionComponent>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  threshold?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0,
  once = true,
  threshold = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  distance = 20,
}: StaggerItemProps) {
  const variants = directionVariants[direction](distance);

  return (
    <motion.div
      variants={variants}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}