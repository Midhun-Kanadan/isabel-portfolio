import { ReactNode, HTMLAttributes } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';
  delay?: number;
  threshold?: number;
}

export const AnimatedSection = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  ...props
}: AnimatedSectionProps) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold });

  return (
    <section
      ref={elementRef}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? `animate-${animation}` : 'opacity-0',
        className
      )}
      style={{
        animationDelay: isVisible ? `${delay}ms` : '0ms'
      }}
      {...props}
    >
      {children}
    </section>
  );
};