import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  User, 
  Briefcase, 
  Cpu, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Camera, 
  Mail,
  Menu,
  X,
  FolderOpen
} from 'lucide-react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigationItems = [
  { id: 'about', label: 'About Me', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'certifications', label: 'Certifications', icon: BookOpen },
  { id: 'photography-section', label: 'Photography', icon: Camera },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const sectionIds = navigationItems.map(item => item.id);

export const ScrollTimelineNav = () => {
  const activeSection = useActiveSection(sectionIds);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      setIsMobileMenuOpen(false);
    }
  };

  const renderNavItem = (item: typeof navigationItems[0], isMobile = false) => {
    const Icon = item.icon;
    
    return (
      <TooltipProvider key={item.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => scrollToSection(item.id)}
              variant="ghost"
              className={`
                ${isMobile ? 'w-full justify-start gap-3 p-4' : 'w-10 h-10 p-0'}
                relative transition-all duration-300 group
                hover:bg-portfolio-primary/10 hover:text-portfolio-primary
                ${!isMobile && 'rounded-full border-2 border-transparent'}
              `}
            >
              <Icon className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'} transition-all duration-300`} />
              {isMobile && (
                <span className="font-medium">{item.label}</span>
              )}
            </Button>
          </TooltipTrigger>
          {!isMobile && (
            <TooltipContent side="right" className="ml-2">
              <p>{item.label}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col gap-3 bg-background/95 backdrop-blur-sm border border-border rounded-2xl p-3 shadow-lg">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-3 bottom-3 w-px bg-border transform -translate-x-1/2" />
          
          {navigationItems.map((item) => renderNavItem(item))}
        </div>
      </div>

      {/* Mobile Navigation - Completely hidden on small screens */}
      <div className="hidden fixed left-2 top-1/2 transform -translate-y-1/2 z-40">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="default"
              className="w-12 h-12 rounded-full bg-portfolio-primary hover:bg-portfolio-primary/90 text-white shadow-lg"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground">Navigation</h2>
              </div>
              
              <div className="space-y-2">
                {navigationItems.map((item) => renderNavItem(item, true))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};