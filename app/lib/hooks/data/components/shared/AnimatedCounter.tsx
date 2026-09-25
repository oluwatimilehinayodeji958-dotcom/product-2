"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  label?: string;
  labelClassName?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  formatter?: (value: number) => string;
}

export function AnimatedCounter({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  label,
  labelClassName,
  icon,
  iconClassName,
  formatter,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) => {
    if (formatter) {
      return formatter(current);
    }
    return current.toFixed(decimals);
  });

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, spring, value]);

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [display]);

  return (
    <div className="flex flex-col items-center gap-2">
      {icon && (
        <div className={cn("text-eagle-green dark:text-eagle-green-light", iconClassName)}>
          {icon}
        </div>
      )}
      <motion.span
        ref={ref}
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-bold font-display text-eagle-slate dark:text-white tabular-nums",
          className
        )}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {prefix}
        {displayValue}
        {suffix}
      </motion.span>
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={cn(
            "text-sm md:text-base text-eagle-gray-600 dark:text-eagle-gray-400 font-medium",
            labelClassName
          )}
        >
          {label}
        </motion.p>
      )}
    </div>
  );
}

interface StatsGridProps {
  stats: {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export function StatsGrid({ stats, className, columns = 4 }: StatsGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-8 md:gap-12", gridCols[columns], className)}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <AnimatedCounter
            value={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
            icon={stat.icon}
            label={stat.label}
          />
        </motion.div>
      ))}
    </div>
  );
}