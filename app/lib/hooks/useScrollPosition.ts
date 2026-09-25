"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { isClient } from "@/lib/utils";

interface ScrollPosition {
  x: number;
  y: number;
  direction: "up" | "down" | "none";
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollProgress: number;
}

export function useScrollPosition(throttleMs: number = 16): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<<ScrollPosition>({
    x: 0,
    y: 0,
    direction: "none",
    isAtTop: true,
    isAtBottom: false,
    scrollProgress: 0,
  });

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScrollPosition = useCallback(() => {
    if (!isClient) return;

    const currentY = window.scrollY;
    const currentX = window.scrollX;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollProgress = docHeight > winHeight ? currentY / (docHeight - winHeight) : 0;

    setScrollPosition({
      x: currentX,
      y: currentY,
      direction: currentY > lastScrollY.current ? "down" : currentY < lastScrollY.current ? "up" : "none",
      isAtTop: currentY < 10,
      isAtBottom: currentY + winHeight >= docHeight - 10,
      scrollProgress: Math.min(1, Math.max(0, scrollProgress)),
    });

    lastScrollY.current = currentY;
    ticking.current = false;
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          updateScrollPosition();
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollPosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateScrollPosition]);

  return scrollPosition;
}

export function useScrollDirection(threshold: number = 10): "up" | "down" | null {
  const [scrollDirection, setScrollDirection] = useState<<"up" | "down" | null>(null);
  const lastScrollY = useRef(0);
  const accumulatedDelta = useRef(0);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (Math.abs(delta) < 2) return;

      accumulatedDelta.current += delta;

      if (Math.abs(accumulatedDelta.current) > threshold) {
        setScrollDirection(accumulatedDelta.current > 0 ? "down" : "up");
        accumulatedDelta.current = 0;
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrollDirection;
}

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(1, Math.max(0, scrollProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}