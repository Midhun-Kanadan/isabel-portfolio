import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds: string[], threshold = 0.3) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers = new Map();
    const intersectingElements = new Set();

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        console.log(`Section ${entry.target.id}: ${entry.isIntersecting ? 'entering' : 'leaving'}, intersectionRatio: ${entry.intersectionRatio}`);
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          intersectingElements.add(entry.target.id);
        } else {
          intersectingElements.delete(entry.target.id);
        }
      });

      console.log('Currently intersecting:', Array.from(intersectingElements));
      
      // Find the section closest to the top of the viewport (most visible)
      if (intersectingElements.size > 0) {
        const intersectingIds = Array.from(intersectingElements) as string[];
        const sectionPositions = intersectingIds.map(id => {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            return { id, top: rect.top };
          }
          return null;
        }).filter(Boolean) as { id: string; top: number }[];
        
        // Sort by distance from top of viewport (closest to top = most visible)
        sectionPositions.sort((a, b) => Math.abs(a.top) - Math.abs(b.top));
        
        if (sectionPositions.length > 0) {
          const mostVisibleSection = sectionPositions[0].id;
          console.log('Setting active section to:', mostVisibleSection);
          console.log('Active section:', mostVisibleSection);
          setActiveSection(mostVisibleSection);
        }
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -40% 0px', // Activate when section heading is near top
      threshold: 0.6, // Ensure majority of section is visible
    };

    // Create observers for each section
    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        observer.observe(element);
        observers.set(sectionId, observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
      intersectingElements.clear();
    };
  }, [sectionIds, threshold]);

  return activeSection;
};