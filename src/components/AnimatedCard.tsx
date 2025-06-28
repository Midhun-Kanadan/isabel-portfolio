import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'subtle';
  delay?: number;
}

export const AnimatedCard = ({
  children,
  className,
  hoverEffect = 'lift',
  delay = 0
}: AnimatedCardProps) => {
  const hoverEffects = {
    lift: 'hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]',
    scale: 'hover:scale-105 hover:shadow-xl',
    glow: 'hover:shadow-2xl hover:shadow-portfolio-primary/20 hover:-translate-y-1',
    subtle: 'hover:shadow-lg hover:-translate-y-1'
  };

  return (
    <Card
      className={cn(
        'transition-all duration-300 ease-out cursor-pointer',
        'transform-gpu will-change-transform',
        'hover:ring-1 hover:ring-portfolio-primary/20',
        hoverEffects[hoverEffect],
        className
      )}
      style={{
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </Card>
  );
};