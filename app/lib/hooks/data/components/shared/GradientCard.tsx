"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientCardProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
  hoverGradient?: string;
  borderGradient?: string;
  glowOnHover?: boolean;
  animate?: boolean;
  delay?: number;
  onClick?: () => void;
  href?: string;
}

export function GradientCard({
  children,
  className,
  gradient = "from-white to-eagle-cream dark:from-eagle-gray-800 dark:to-eagle-gray-900",
  hoverGradient,
  borderGradient = "from-eagle-green/20 to-eagle-gold/20",
  glowOnHover = false,
  animate = true,
  delay = 0,
  onClick,
  href,
}: GradientCardProps) {
  const Component = href ? motion.a : onClick ? motion.button : motion.div;
  const additionalProps = href ? { href } : onClick ? { onClick } : {};

  return (
    <Component
      initial={animate ? { opacity: 0, y: 20 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={animate ? { once: true, margin: "-50px" } : undefined}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={
        glowOnHover
          ? {
              y: -4,
              boxShadow: "0 20px 40px -10px rgba(11, 107, 58, 0.2)",
            }
          : { y: -2 }
      }
      className={cn(
        "relative group overflow-hidden rounded-2xl bg-gradient-to-br",
        gradient,
        "border border-eagle-gray-200/50 dark:border-eagle-gray-700/50",
        "transition-all duration-300",
        onClick && "cursor-pointer",
        className
      )}
      {...additionalProps}
    >
      {/* Border gradient effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]",
          borderGradient
        )}
      >
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white to-eagle-cream dark:from-eagle-gray-800 dark:to-eagle-gray-900" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Hover gradient overlay */}
      {hoverGradient && (
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
            hoverGradient
          )}
        />
      )}
    </Component>
  );
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "strong";
  animate?: boolean;
  delay?: number;
}

export function GlassCard({
  children,
  className,
  intensity = "medium",
  animate = true,
  delay = 0,
}: GlassCardProps) {
  const intensityClasses = {
    light: "bg-white/40 dark:bg-eagle-slate/40 backdrop-blur-md",
    medium: "bg-white/60 dark:bg-eagle-slate/60 backdrop-blur-xl",
    strong: "bg-white/80 dark:bg-eagle-slate/80 backdrop-blur-2xl",
  };

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={animate ? { once: true, margin: "-50px" } : undefined}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "relative rounded-2xl border border-white/20 dark:border-white/10",
        "shadow-glass",
        intensityClasses[intensity],
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
  delay?: number;
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
  iconClassName,
  delay = 0,
}: FeatureCardProps) {
  return (
    <GradientCard
      className={cn("p-6 md:p-8", className)}
      glowOnHover
      delay={delay}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-xl bg-gradient-to-br from-eagle-green to-eagle-green-dark",
          "flex items-center justify-center text-white mb-4",
          "shadow-glow-green",
          iconClassName
        )}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-eagle-slate dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-eagle-gray-600 dark:text-eagle-gray-400 leading-relaxed">
        {description}
      </p>
    </GradientCard>
  );
}