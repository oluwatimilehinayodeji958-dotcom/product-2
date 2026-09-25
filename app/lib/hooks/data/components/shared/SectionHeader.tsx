"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  showDivider?: boolean;
  dividerColor?: string;
  badge?: string;
  badgeColor?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  showDivider = true,
  dividerColor = "from-eagle-green to-eagle-gold",
  badge,
  badgeColor = "bg-eagle-green/10 text-eagle-green dark:bg-eagle-green/20",
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "flex flex-col gap-4 max-w-3xl",
        alignmentClasses[align],
        className
      )}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase",
            badgeColor
          )}
        >
          {badge}
        </motion.span>
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className={cn(
            "text-sm md:text-base font-medium tracking-wide uppercase text-eagle-green dark:text-eagle-green-light",
            subtitleClassName
          )}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-display font-bold text-eagle-slate dark:text-white leading-tight",
          titleClassName
        )}
      >
        {title}
      </motion.h2>

      {showDivider && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className={cn(
            "h-1 w-24 rounded-full bg-gradient-to-r",
            dividerColor,
            align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""
          )}
        />
      )}

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className={cn(
            "text-base md:text-lg text-eagle-gray-600 dark:text-eagle-gray-400 max-w-2xl leading-relaxed",
            align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : "",
            descriptionClassName
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}