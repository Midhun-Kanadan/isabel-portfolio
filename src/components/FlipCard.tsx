import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Play, RotateCcw, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlipCardProps {
  project: {
    title: string;
    subtitle?: string;
    description: string;
    technologies: string[];
    github?: string;
    youtube?: string;
    huggingface?: string;
  };
  className?: string;
  delay?: number;
}

export const FlipCard = ({ project, className, delay = 0 }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('youtu.be/')[1] || url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`;
  };

  return (
    <>
      {/* Mobile Version - Keep flip functionality */}
      <div 
        className={cn(
          "flip-card group perspective-1000 w-full mb-8 md:hidden",
          "bg-gradient-to-br from-card to-portfolio-muted-bg/20 shadow-md rounded-xl border border-border/50 interactive-card hover-glow",
          className
        )}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className={cn(
          "flip-card-inner relative w-full min-h-[380px] transition-transform duration-700 transform-style-preserve-3d",
          isFlipped && "rotate-y-180"
        )}>
          {/* Mobile Front Side */}
          <div className={cn(
            "flip-card-front absolute inset-0 w-full h-full backface-hidden",
            "p-6 flex flex-col justify-between"
          )}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold hover:text-portfolio-primary transition-colors duration-200">
                {project.title}
              </h3>
              <Play 
                className="h-5 w-5 text-portfolio-primary opacity-70 group-hover:opacity-100 transition-opacity cursor-pointer flex-shrink-0" 
                onClick={handleFlip}
              />
            </div>
            
            <div className="flex-1">
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>
            </div>
            
            <div className="mt-auto space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="secondary" 
                    className="hover:bg-portfolio-primary hover:text-white transition-all duration-200 hover:scale-105"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                {project.github && (
                  <Button variant="outline" size="sm" asChild className="btn-enhanced hover:border-portfolio-primary hover-glow">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}
                {project.huggingface && (
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white btn-enhanced hover-glow" 
                    asChild
                  >
                    <a href={project.huggingface} target="_blank" rel="noopener noreferrer">
                      🤗 Hugging Face
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Back Side */}
          <div className={cn(
            "flip-card-back absolute inset-0 w-full h-full backface-hidden rotate-y-180",
            "p-6 flex flex-col"
          )}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-portfolio-primary">{project.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFlip}
                className="hover:bg-portfolio-primary/10"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            
            {project.youtube && (
              <div className="relative w-full flex-1 h-[240px] rounded-lg overflow-hidden bg-black">
                <iframe
                  src={getYouTubeEmbedUrl(project.youtube)}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={project.title}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Version - No flip, simple card with YouTube button */}
      <div 
        className={cn(
          "hidden md:block w-full mb-6",
          "bg-gradient-to-br from-card to-portfolio-muted-bg/20 shadow-md rounded-xl border border-border/50 interactive-card hover-glow",
          className
        )}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="p-6 flex flex-col justify-between h-full">
          <div className="mb-3">
            <h3 className="text-xl font-semibold hover:text-portfolio-primary transition-colors duration-200">
              {project.title}
            </h3>
          </div>
          
          <div className="flex-1">
            <p className="text-muted-foreground mb-4">
              {project.description}
            </p>
          </div>
          
          <div className="mt-auto space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className="hover:bg-portfolio-primary hover:text-white transition-all duration-200 hover:scale-105"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              {project.github && (
                <Button variant="outline" size="sm" asChild className="btn-enhanced hover:border-portfolio-primary hover-glow">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              )}
              {project.youtube && (
                <Button variant="outline" size="sm" asChild className="btn-enhanced hover:border-portfolio-primary hover-glow">
                  <a href={project.youtube} target="_blank" rel="noopener noreferrer">
                    <Youtube className="h-4 w-4 mr-2" />
                    YouTube
                  </a>
                </Button>
              )}
              {project.huggingface && (
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white btn-enhanced hover-glow" 
                  asChild
                >
                  <a href={project.huggingface} target="_blank" rel="noopener noreferrer">
                    🤗 Hugging Face
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
