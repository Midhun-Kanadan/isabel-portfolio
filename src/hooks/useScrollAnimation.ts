import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (
  options: UseScrollAnimationOptions = {}
) => {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { elementRef, isVisible };
};

// Enhanced hook for staggered animations
export const useStaggeredAnimation = (
  childrenCount: number,
  options: UseScrollAnimationOptions = {}
) => {
  const { elementRef, isVisible } = useScrollAnimation(options);
  const [visibleChildren, setVisibleChildren] = useState<number[]>([]);

  useEffect(() => {
    if (isVisible) {
      const delays = Array.from({ length: childrenCount }, (_, i) => i * 100);
      delays.forEach((delay, index) => {
        setTimeout(() => {
          setVisibleChildren(prev => [...prev, index]);
        }, delay);
      });
    } else {
      setVisibleChildren([]);
    }
  }, [isVisible, childrenCount]);

  return { elementRef, isVisible, visibleChildren };
};