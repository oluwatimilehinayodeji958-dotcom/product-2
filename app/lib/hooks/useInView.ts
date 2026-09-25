"use client";

import { useState, useEffect, useRef, useCallback, RefObject } from "react";
import { isClient } from "@/lib/utils";

interface UseInViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  root?: Element | null;
}

interface UseInViewReturn {
  ref: RefObject<<HTMLDivElement | null>;
  isInView: boolean;
  hasBeenInView: boolean;
  entry: IntersectionObserverEntry | null;
}

export function useInView({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
  root = null,
}: UseInViewOptions = {}): UseInViewReturn {
  const ref = useRef<<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [entry, setEntry] = useState<<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (!isClient) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        const inView = entry.isIntersecting;
        setIsInView(inView);

        if (inView && triggerOnce) {
          setHasBeenInView(true);
          observer.unobserve(element);
        } else if (!triggerOnce) {
          setHasBeenInView(inView);
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, root]);

  return { ref, isInView, hasBeenInView, entry };
}

export function useMultipleInView(
  count: number,
  options: UseInViewOptions = {}
): UseInViewReturn[] {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [states, setStates] = useState<boolean[]>(Array(count).fill(false));
  const [entries, setEntries] = useState<(IntersectionObserverEntry | null)[]>(
    Array(count).fill(null)
  );

  useEffect(() => {
    if (!isClient) return;

    const observers: IntersectionObserver[] = [];

    refs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setEntries((prev) => {
            const newEntries = [...prev];
            newEntries[index] = entry;
            return newEntries;
          });

          if (entry.isIntersecting) {
            setStates((prev) => {
              const newStates = [...prev];
              newStates[index] = true;
              return newStates;
            });

            if (options.triggerOnce !== false) {
              observer.unobserve(element);
            }
          } else if (options.triggerOnce === false) {
            setStates((prev) => {
              const newStates = [...prev];
              newStates[index] = false;
              return newStates;
            });
          }
        },
        {
          threshold: options.threshold ?? 0.1,
          rootMargin: options.rootMargin ?? "0px",
          root: options.root ?? null,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [count, options.threshold, options.rootMargin, options.triggerOnce, options.root]);

  return Array.from({ length: count }, (_, index) => ({
    ref: {
      current: refs.current[index],
    } as RefObject<<HTMLDivElement | null>,
    isInView: states[index],
    hasBeenInView: states[index],
    entry: entries[index],
  }));
}

export function useParallax(speed: number = 0.5): RefObject<<HTMLDivElement | null> {
  const ref = useRef<<HTMLDivElement>(null);

  useEffect(() => {
    if (!isClient) return;

    const element = ref.current;
    if (!element) return;

    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const relativeScroll = scrollY - elementTop + window.innerHeight;
        const translateY = relativeScroll * speed * 0.1;

        element.style.transform = `translateY(${translateY}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return ref;
}

export function useCountUp(
  end: number,
  duration: number = 2000,
  startOnView: boolean = true
): [number, RefObject<<HTMLDivElement | null>, () => void] {
  const [count, setCount] = useState(0);
  const ref = useRef<<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  const startCounting = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutExpo
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutExpo);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  useEffect(() => {
    if (!startOnView) {
      startCounting();
      return;
    }

    if (!isClient) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounting();
          observer.unobserve(element);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [startOnView, startCounting]);

  return [count, ref, startCounting];
}