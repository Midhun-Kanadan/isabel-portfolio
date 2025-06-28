import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Moon, Mail, Download, Github, LinkedinIcon, Instagram, ChevronUp, ChevronDown, ArrowUp, ExternalLink, Award, Languages, BookOpen, Briefcase, GraduationCap, Code, User, Phone, MapPin, Calendar, Cpu, Home, Camera, PenTool, FileText } from "lucide-react";
import { FlipCard } from '@/components/FlipCard';
import { useToast } from "@/hooks/use-toast";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AnimatedCard } from "@/components/AnimatedCard";
import { ScrollTimelineNav } from "@/components/ScrollTimelineNav";

const Index = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showHomeButton, setShowHomeButton] = useState(false);
  const [expandedStory, setExpandedStory] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      setShowHomeButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Instagram widget fallback logic
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.async = true;
    script.src = '//www.instagram.com/embed.js';
    document.body.appendChild(script);

    // Check if Elfsight widget loads properly
    const timer = setTimeout(() => {
      const iframe = document.getElementById("elf-widget") as HTMLIFrameElement;
      const fallback = document.getElementById("fallback-instagram-post") as HTMLElement;
      
      if (iframe && fallback) {
        try {
          // Check if iframe failed to load or has no content
          const iframeHeight = iframe.offsetHeight;
          const iframeDocument = iframe.contentDocument;
          
          if (iframeHeight === 0 || 
              !iframeDocument || 
              iframeDocument.body?.childElementCount === 0) {
            // Remove broken iframe and show fallback
            const container = iframe.closest('#instagram-widget-container') as HTMLElement;
            if (container) {
              container.style.display = 'none';
            }
            fallback.style.display = 'block';
            
            // Process Instagram embeds with a small delay to ensure DOM is ready
            setTimeout(() => {
              if ((window as any).instgrm) {
                (window as any).instgrm.Embeds.process();
              }
            }, 100);
          }
        } catch (error) {
          // Cross-origin error or other issues - show fallback
          const container = iframe.closest('#instagram-widget-container') as HTMLElement;
          if (container) {
            container.style.display = 'none';
          }
          fallback.style.display = 'block';
          
          // Process Instagram embeds with a small delay to ensure DOM is ready
          setTimeout(() => {
            if ((window as any).instgrm) {
              (window as any).instgrm.Embeds.process();
            }
          }, 100);
        }
      }
    }, 4000); // Allow 4 seconds for iframe to load

    return () => {
      clearTimeout(timer);
      // Clean up script if component unmounts
      const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  // const skillCategories = {
  //   "Languages": [
  //     { name: "Python", experience: "5+ years", useCase: "ML/AI development, data analysis" },
  //     { name: "SQL", experience: "3 years", useCase: "Performance-critical applications" },
  //     { name: "Java", experience: "2 years", useCase: "Enterprise applications" },
  //     { name: "MATLAB", experience: "4 years", useCase: "Scientific computing, simulations" }
  //   ],
  //   "AI/ML Tools": [
  //     { name: "PyTorch", experience: "3 years", useCase: "Deep learning research" },
  //     { name: "TensorFlow", experience: "2 years", useCase: "Production ML models" },
  //     { name: "Scikit-learn", experience: "4 years", useCase: "Classical ML algorithms" },
  //     { name: "Keras", experience: "2 years", useCase: "Rapid prototyping" }
  //   ],
  //   "Frameworks": [
  //     { name: "LangChain", experience: "1 year", useCase: "LLM applications" },
  //     { name: "LlamaIndex", experience: "1 year", useCase: "RAG systems" },
  //     { name: "OpenCV", experience: "3 years", useCase: "Computer vision" },
  //     { name: "Pandas", experience: "4 years", useCase: "Data manipulation" }
  //   ],
  //   "Tools": [
  //     { name: "Docker", experience: "2 years", useCase: "Containerization" },
  //     { name: "MySQL", experience: "3 years", useCase: "Database management" },
  //     { name: "Git", experience: "5 years", useCase: "Version control" },
  //     { name: "Excel VBA", experience: "4 years", useCase: "Automation & analysis" }
  //   ],
  //   "Design & Simulation Tools": [
  //     { name: "CADMATIC", experience: "3+ years", useCase: "3D ship modeling & engineering design" },
  //     { name: "AutoCAD", experience: "5+ years", useCase: "2D technical drawings & drafting" },
  //     { name: "Ansys", experience: "2 years", useCase: "FEA & structural analysis" },
  //     { name: "QGIS", experience: "1 year", useCase: "Geospatial analysis & mapping" },
  //     { name: "AnyLogic", experience: "1 year", useCase: "Multi-method modeling & simulation" },
  //     { name: "Siemens NX", experience: "1 year", useCase: "Advanced CAD & product design" }
  //   ],
  //   "Naval Architecture Tools": [
  //     { name: "Maxsurf Modeller", experience: "2 years", useCase: "Hull form design & modeling" },
  //     { name: "Maxsurf Resistance", experience: "2 years", useCase: "Resistance analysis & performance" },
  //     { name: "Rhino", experience: "1 year", useCase: "3D surface modeling & design" },
  //     { name: "NAPA Stability", experience: "1 year", useCase: "Ship stability calculations" }
  //   ]
  // };

  const skillCategories = {
  "Languages": [
    { name: "Java", experience: "2+ years", useCase: "Enterprise backend development" },
    { name: "Python", experience: "1.5 years", useCase: "Scripting and automation" },
    { name: "SQL", experience: "1.5 years", useCase: "Database queries and management" }
  ],
  "Technologies & Frameworks": [
    { name: "Spring Boot", experience: "2 years", useCase: "Java-based backend development" },
    { name: "REST API / Spring REST", experience: "2 years", useCase: "Web services and API design" },
    { name: "Microservices", experience: "1.5 years", useCase: "Scalable backend architecture" },
    { name: "HTML5/CSS/Bootstrap", experience: "1.5 years", useCase: "Frontend development and styling" },
    { name: "XML", experience: "1.5 years", useCase: "Data representation and API communication" }
  ],
  "Tools": [
    { name: "VS Code", experience: "1.5 years", useCase: "Code editing" },
    { name: "IntelliJ IDEA", experience: "2 years", useCase: "Java development" },
    { name: "PyCharm", experience: "1 year", useCase: "Python scripting and debugging" },
    { name: "Postman", experience: "1.5 years", useCase: "API testing" },
    { name: "Swagger", experience: "1 year", useCase: "API documentation" },
    { name: "GitHub", experience: "2 years", useCase: "Version control and collaboration" },
    { name: "Docker", experience: "1 year", useCase: "Containerization and deployment" },
    { name: "Jira", experience: "2 years", useCase: "Agile project management" },
    { name: "Excel / MS Office", experience: "3+ years", useCase: "Data handling and documentation" },
    { name: "Blender", experience: "Basic", useCase: "3D modeling (exploratory)" }
  ],
  "Development Practices": [
    { name: "Agile", experience: "2 years", useCase: "Team collaboration and iterative delivery" },
    { name: "Software Testing", experience: "1 year", useCase: "Ensuring code quality and reliability" }
  ],
    "AI/ML Tools": [
    { name: "PyTorch", experience: "3 years", useCase: "Deep learning research" },
    { name: "TensorFlow", experience: "2 years", useCase: "Production ML models" },
    { name: "Scikit-learn", experience: "4 years", useCase: "Classical ML algorithms" },
    { name: "Keras", experience: "2 years", useCase: "Rapid prototyping" }
  ],
  "NLP & Thesis-related Tools": [
    { name: "BERT, DistilBERT, RoBERTa", experience: "1 year", useCase: "Argument classification & fine-tuning" },
    { name: "LoRA", experience: "1 year", useCase: "Parameter-efficient fine-tuning of LLMs" },
    { name: "Ensemble Learning", experience: "1 year", useCase: "Model combination for improved classification" },
    { name: "LLaMA", experience: "0.5 year", useCase: "Open-source LLM experimentation" },
    { name: "Mistral", experience: "0.5 year", useCase: "Efficient LLM-based reasoning" },
    { name: "GPT-4o", experience: "0.5 year", useCase: "Evaluation and hybrid model analysis" }
  ]

  // "Soft Skills": [
  //   { name: "Problem Solving", experience: "Strong", useCase: "Debugging and analytical thinking" },
  //   { name: "Communication", experience: "Strong", useCase: "Team discussions and documentation" },
  //   { name: "Team Collaboration", experience: "Strong", useCase: "Working in Agile environments" },
  //   { name: "Analytical Skills", experience: "Strong", useCase: "Systematic thinking and logic building" }
  // ]
};

  const softSkills = ["Technical Communication", "Interdisciplinary Collaboration", "Scientific Writing", "Team Leadership", "Problem Solving"];

  const projects = [
    {
    title: "From Schemes to Fallacies: A Deep Dive into Argument Classification",
    description: "A research-driven project focused on classifying argument schemes and detecting fallacies using transformer models and LLMs. It combines fine-tuning, LoRA, prompting, and ensemble learning to improve reasoning detection in persuasive texts.",
    technologies: ["Python", "LoRA", "Ensemble Learning", "BERT", "LLaMA", "Mistral", "GPT-4o"],
    github: "https://github.com/Midhun-Kanadan/Interactive-Argument-Completion-Tool",
    demo: null
    },
    {
      title: "Machine Learning Models for Topology Optimization",
      description: "A machine learning-based approach to optimize structural design using neural networks and the TOP dataset.",
      technologies: ["Machine Learning", "Neural Networks", "Topology Optimization", "Python"],
      github: "https://github.com/Midhun-Kanadan/Machine-Learning-Models-for-Topology-Optimization",
      demo: null
    },
    {
      title: "SentimentBERT-AIWriting",
      description: "Fine-tuned BERT model for sentiment classification in AI-generated argumentative writing — predicts positive, negative, or neutral tone.",
      technologies: ["BERT", "NLP", "Sentiment Analysis", "Hugging Face"],
      github: "https://github.com/Midhun-Kanadan/SentimentBERT-AIWriting",
      huggingface: "https://huggingface.co/MidhunKanadan/SentimentBERT-AIWriting"
    },
    {
      title: "Hybrid LLM-RAG Application for PDF Querying",
      description: "RAG-based system that uses OpenAI and Ollama LLMs for querying PDF documents through vector database and contextual embeddings.",
      technologies: ["RAG", "LLM", "PDF Processing", "Vector Database", "OpenAI"],
      github: "https://github.com/Midhun-Kanadan/Hybrid-LLM-RAG-Application-for-Advanced-PDF-Querying",
      demo: null
    },
    {
      title: "RoBERTa-Large Fine-Tuned Model for Logical Fallacy Classification",
      description: "RoBERTa-large model fine-tuned to identify logical fallacies for educational and research applications.",
      technologies: ["RoBERTa", "NLP", "Classification", "Logical Fallacies"],
      github: "https://github.com/Midhun-Kanadan/RoBERTa-Large-Fine-Tuned-Model-for-Logical-Fallacy-Classification",
      huggingface: "https://huggingface.co/MidhunKanadan/roberta-large-fallacy-classification"
    },
    {
      title: "Parametric 3D Modelling of Chenab Bridge",
      description: "A parametric 3D model of the Chenab Railway Bridge created in Revit, with Dynamo-driven controls, realistic rendering, and 4D construction animation using DesiteMD.",
      technologies: ["Revit", "Dynamo", "BIM", "DesiteMD", "4D Simulation", "Visualization"],
      youtube: "https://youtu.be/eBYkIo1zxZc",
      github: "https://github.com/Midhun-Kanadan/Parametric-3D-Modelling-Of-Chenab-Bridge-India-Using-Revit",
      isFlipCard: true
    }
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground lg:ml-24">
        {/* Scroll Timeline Navigation */}
        <ScrollTimelineNav />
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-bold text-xl hover:text-portfolio-primary transition-colors duration-200 cursor-pointer"
            >
              Isabel Maria Binu
            </button>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
              >
                <Moon className="h-5 w-5" />
              </Button>
              <div className="hidden md:flex space-x-6">
                <a href="#about" className="hover:text-portfolio-primary transition-colors scroll-smooth">About</a>
                <a href="#skills" className="hover:text-portfolio-primary transition-colors scroll-smooth">Skills</a>
                <a href="#projects" className="hover:text-portfolio-primary transition-colors scroll-smooth">Projects</a>
                <a href="#contact" className="hover:text-portfolio-primary transition-colors scroll-smooth">Contact</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <AnimatedSection className="pt-20 pb-16 px-4" animation="fade-up">
          <div className="container mx-auto text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <div className="relative animate-fade-in" style={{animationDelay: '200ms'}}>
                <div className="relative p-1 rounded-full bg-gradient-to-br from-portfolio-primary/20 via-portfolio-secondary/10 to-portfolio-primary/20 shadow-2xl hover-glow">
                  <img 
                    // src="/lovable-uploads/isabel-profile1.png" 
                    src="/lovable-uploads/isabel-profile.jpg" 
                    alt="Isabel Maria Binu" 
                    className="w-56 h-56 rounded-full object-cover border border-white/20 shadow-xl interactive-card hover:shadow-portfolio-primary/30"
                  />
                </div>
              </div>
              <div className="text-center md:text-left animate-slide-right" style={{animationDelay: '400ms'}}>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
                  Isabel Maria Binu
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-2">
                  AI Engineer | Creative Thinker | Problem Solver
                </p>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  Blending technical precision with creative insight to craft impactful digital solutions
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 inline-flex items-center gap-1 mb-6">
                  <GraduationCap className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium tracking-normal">
                    Professional at{" "}
                    <a 
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      Current Organization
                    </a>
                  </span>
                </div>
                <div className="flex justify-center md:justify-start gap-6 mt-6">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a 
                          href="mailto:isabelmariavadakkedathu@gmail.com"
                          className="flex items-center justify-center w-12 h-12 rounded-full bg-muted hover:bg-[#D44638] hover:text-white btn-enhanced hover-glow shadow-sm transition-all duration-300"
                          aria-label="Send email"
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Email me</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a 
                          href="https://github.com/Midhun-Kanadan"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-12 h-12 rounded-full bg-muted hover:bg-[#333333] hover:text-white btn-enhanced hover-glow shadow-sm transition-all duration-300"
                          aria-label="Visit GitHub profile"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View GitHub</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a 
                          href="https://www.linkedin.com/in/isabel-maria-binu/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-12 h-12 rounded-full bg-muted hover:bg-[#0077B5] hover:text-white btn-enhanced hover-glow shadow-sm transition-all duration-300"
                          aria-label="Visit LinkedIn profile"
                        >
                          <LinkedinIcon className="h-5 w-5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Visit LinkedIn</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* About Section */}
        <AnimatedSection id="about" className="py-16 px-4 bg-slate-50 dark:bg-slate-900/50" animation="fade-up">
          <div className="container mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="flex justify-center items-center gap-3 mb-4">
                <User className="h-8 w-8 text-portfolio-primary" />
                <h2 className="text-3xl font-bold">About Me</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <AnimatedCard className="h-fit shadow-md rounded-xl" hoverEffect="glow" delay={200}>
                <CardHeader>
                  <CardTitle>Who I Am</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4">
                    I'm Isabel Maria Binu, a Master's student in Digital Engineering at Bauhaus-Universität Weimar with a passion for bridging academic research and practical software engineering. With nearly 3 years of experience as a backend developer at Infosys, I specialized in building robust Java-based systems using Spring Boot, JUnit, Maven, and more.
                  </p>
                  <p className="text-foreground mb-4">
                    I thrive at the intersection of clean code, system design, and scalable architectures. Whether tackling production systems or leading NLP-based thesis research on argument classification, I enjoy transforming complex challenges into thoughtful, efficient solutions.
                  </p>
                  <Collapsible open={expandedStory} onOpenChange={setExpandedStory}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="p-0 h-auto hover:scale-105 transition-transform duration-200">
                        <span className="text-portfolio-primary">
                          {expandedStory ? "Read less about my journey" : "Read more about my journey"}
                        </span>
                        {expandedStory ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4">
                      <p className="text-foreground mb-4">
                        Starting with a background in civil engineering, I transitioned into digital systems out of a curiosity to build smarter, more adaptive technology. My academic path has been a continuous evolution—guided by interdisciplinary thinking, ethical design, and a drive to understand the systems I create at both technical and human levels.
                      </p>
                      <blockquote className="text-portfolio-primary font-medium italic border-l-4 border-portfolio-primary pl-4">
                        "What I cannot create, I do not understand." – Richard Feynman
                      </blockquote>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </AnimatedCard>
              
              <AnimatedCard className="h-fit shadow-md rounded-xl" hoverEffect="lift" delay={400}>
                <CardHeader>
                  <CardTitle>Quick Facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 hover:text-portfolio-primary transition-colors duration-200">
                    <Briefcase className="h-4 w-4 text-portfolio-primary" />
                    <span>Senior System Engineer at Infosys Limited (Nov 2019 - Sep 2022)</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-portfolio-primary transition-colors duration-200">
                    <BookOpen className="h-4 w-4 text-portfolio-primary" />
                    <span>Bachelor's at Muthoot Institute of Technology and Science (2015 - 2019)</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-portfolio-primary transition-colors duration-200">
                    <MapPin className="h-4 w-4 text-portfolio-primary" />
                    <span>Weimar, Germany</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-portfolio-primary transition-colors duration-200">
                    <Mail className="h-4 w-4 text-portfolio-primary" />
                    <span>isabel.maria.binu@example.com</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-portfolio-primary transition-colors duration-200">
                    <Phone className="h-4 w-4 text-portfolio-primary" />
                    <span>+49-17646111026</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-portfolio-primary transition-colors duration-200">
                    <GraduationCap className="h-4 w-4 text-portfolio-primary" />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">Master's in Digital Engineering + B.Tech</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-sm max-w-xs">
                            <p className="font-medium">Education Details:</p>
                            <p>• Master's in Digital Engineering (Bauhaus-Universität Weimar)</p>
                            <p>• B.Tech in Civil Engineering</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                </CardContent>
              </AnimatedCard>
            </div>
          </div>
        </AnimatedSection>

        {/* Current Role Highlight
        <AnimatedSection className="py-12 px-4" animation="slide-left">
          <div className="container mx-auto">
            <AnimatedCard className="max-w-4xl mx-auto border-l-4 border-l-portfolio-primary bg-gradient-to-r from-portfolio-primary/5 to-transparent shadow-lg rounded-xl" hoverEffect="glow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="bg-portfolio-primary p-3 rounded-full hover:scale-110 transition-transform duration-300 hover:bg-portfolio-primary-dark">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Current Role</p>
                    <h3 className="text-lg font-semibold">
                      Wissenschaftlicher Mitarbeiter (Research Associate)
                    </h3>
                    <span>
                      <a 
                        href="https://www.uni-weimar.de/en/media/chairs/computer-science-department/webis/people/#kanadan" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-portfolio-primary hover:underline inline-flex items-center gap-1 hover:text-portfolio-primary-dark transition-colors duration-200"
                      >
                        Webis Group
                        <ExternalLink className="h-3 w-3 transition-transform duration-200 hover:scale-110" />
                      </a>, Bauhaus-Universität Weimar
                    </span>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </div>
        </AnimatedSection> */}
        {/* Master's Thesis Highlight */}
        <AnimatedSection className="py-12 px-4" animation="slide-left">
          <div className="container mx-auto">
            <AnimatedCard className="max-w-4xl mx-auto border-l-4 border-l-portfolio-primary bg-gradient-to-r from-portfolio-primary/5 to-transparent shadow-lg rounded-xl" hoverEffect="glow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-portfolio-primary p-3 rounded-full hover:scale-110 transition-transform duration-300 hover:bg-portfolio-primary-dark">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Master’s Thesis</p>
                    <h3 className="text-lg font-semibold">
                      From Schemes to Fallacies: A Deep Dive into Argument Classification
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      A research-driven exploration of classifying argument schemes and detecting fallacies in persuasive texts using fine-tuned BERT variants, LLaMA, Mistral, GPT-4o, and ensemble learning. This work bridges NLP, logic, and explainability through hybrid model design and prompting strategies.
                    </p>
                    <span className="inline-block mt-2">
                      <a 
                        href="https://github.com/Midhun-Kanadan/Interactive-Argument-Completion-Tool" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-portfolio-primary hover:underline inline-flex items-center gap-1 hover:text-portfolio-primary-dark transition-colors duration-200"
                      >
                        View Project Repository
                        <ExternalLink className="h-3 w-3 transition-transform duration-200 hover:scale-110" />
                      </a>
                    </span>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </div>
        </AnimatedSection>


        {/* Featured Projects */}
        <AnimatedSection id="projects" className="py-16 px-4 pb-16 md:pb-8 bg-white dark:bg-gray-900" animation="fade-up">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2 animate-fade-in">
              <Code className="h-8 w-8 text-portfolio-primary animate-pulse-soft" />
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              {projects.map((project, index) => {
                // Use FlipCard for projects with isFlipCard property, otherwise use regular AnimatedCard
                if (project.isFlipCard) {
                  return (
                    <FlipCard 
                      key={index} 
                      project={project} 
                      delay={index * 200}
                      className="animate-fade-in"
                    />
                  );
                }
                
                return (
                  <AnimatedCard key={index} className="bg-gradient-to-br from-card to-portfolio-muted-bg/20 shadow-md rounded-xl interactive-card hover-glow" hoverEffect="lift" delay={index * 200}>
                    <CardHeader>
                      <CardTitle className="text-xl hover:text-portfolio-primary transition-colors duration-200">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="hover:bg-portfolio-primary hover:text-white transition-all duration-200 hover:scale-105">{tech}</Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild className="btn-enhanced hover:border-portfolio-primary hover-glow">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            GitHub
                          </a>
                        </Button>
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
                    </CardContent>
                  </AnimatedCard>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection id="skills" className="py-16 px-4 pt-16 md:pt-8 bg-background" animation="slide-right">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in flex items-center justify-center gap-2">
              <Cpu className="h-8 w-8 text-portfolio-primary animate-pulse-soft" />
              Technical Skills
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Object.entries(skillCategories).map(([category, skills], index) => {
                // Define unique colors for each category with better contrast for both light and dark modes
                const categoryStyles = {
                  "Languages": {
                    cardBg: "bg-card border-border",
                    titleColor: "text-foreground hover:text-portfolio-primary",
                    dotColor: "bg-blue-500",
                    tagBg: "bg-blue-50 hover:bg-blue-500 hover:text-white border-blue-200 dark:bg-blue-500/20 dark:hover:bg-blue-500 dark:border-blue-500/30",
                    tagText: "text-blue-700 dark:text-blue-300"
                  },
                  "Technologies & Frameworks": {
                    cardBg: "bg-card border-border",
                    titleColor: "text-foreground hover:text-portfolio-primary", 
                    dotColor: "bg-emerald-500",
                    tagBg: "bg-emerald-50 hover:bg-emerald-500 hover:text-white border-emerald-200 dark:bg-emerald-500/20 dark:hover:bg-emerald-500 dark:border-emerald-500/30",
                    tagText: "text-emerald-700 dark:text-emerald-300"
                  },
                  "Development Practices": {
                    cardBg: "bg-card border-border",
                    titleColor: "text-foreground hover:text-portfolio-primary",
                    dotColor: "bg-indigo-500", 
                    tagBg: "bg-indigo-50 hover:bg-indigo-500 hover:text-white border-indigo-200 dark:bg-indigo-500/20 dark:hover:bg-indigo-500 dark:border-indigo-500/30",
                    tagText: "text-indigo-700 dark:text-indigo-300"
                  },
                  "Tools": {
                    cardBg: "bg-card border-border",
                    titleColor: "text-foreground hover:text-portfolio-primary",
                    dotColor: "bg-amber-500",
                    tagBg: "bg-amber-50 hover:bg-amber-500 hover:text-white border-amber-200 dark:bg-amber-500/20 dark:hover:bg-amber-500 dark:border-amber-500/30", 
                    tagText: "text-amber-700 dark:text-amber-300"
                  },
                  "NLP & Thesis-related Tools": {
                    cardBg: "bg-card border-border",
                    titleColor: "text-foreground hover:text-portfolio-primary",
                    dotColor: "bg-rose-500",
                    tagBg: "bg-rose-50 hover:bg-rose-500 hover:text-white border-rose-200 dark:bg-rose-500/20 dark:hover:bg-rose-500 dark:border-rose-500/30",
                    tagText: "text-rose-700 dark:text-rose-300"
                  },
                  "AI/ML Tools": {
                    cardBg: "bg-card border-border",
                    titleColor: "text-foreground hover:text-portfolio-primary",
                    dotColor: "bg-cyan-500",
                    tagBg: "bg-cyan-50 hover:bg-cyan-500 hover:text-white border-cyan-200 dark:bg-cyan-500/20 dark:hover:bg-cyan-500 dark:border-cyan-500/30",
                    tagText: "text-cyan-700 dark:text-cyan-300"
                  }
                };
                
                const style = categoryStyles[category as keyof typeof categoryStyles];
                
                return (
                  <AnimatedCard key={category} className={`${style.cardBg} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`} hoverEffect="glow" delay={index * 150}>
                    <CardHeader className="pb-3">
                      <CardTitle className={`text-lg ${style.titleColor} flex items-center gap-2 font-semibold transition-colors duration-200`}>
                        <div className={`w-3 h-3 ${style.dotColor} rounded-full animate-pulse-soft shadow-lg`}></div>
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <Tooltip key={skill.name}>
                            <TooltipTrigger asChild>
                              <Badge 
                                variant="secondary" 
                                className={`cursor-help ${style.tagBg} ${style.tagText} rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg border`}
                              >
                                {skill.name}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-sm">
                                <p><strong>Experience:</strong> {skill.experience}</p>
                                <p><strong>Use case:</strong> {skill.useCase}</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </CardContent>
                  </AnimatedCard>
                );
              })}
            </div>
            
            <AnimatedCard className="bg-card border-border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" hoverEffect="subtle" delay={600}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-foreground hover:text-portfolio-primary flex items-center gap-2 font-semibold transition-colors duration-200">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse-soft shadow-lg"></div>
                  Soft Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {softSkills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="bg-purple-50 hover:bg-purple-500 hover:text-white text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:hover:bg-purple-500 dark:text-purple-300 dark:border-purple-500/30 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md border"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </AnimatedCard>
          </div>
        </AnimatedSection>

        {/* Professional Experience */}
        <AnimatedSection id="experience" className="py-16 px-4 bg-background dark:bg-gray-900" animation="fade-up">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2 animate-fade-in">
              <Briefcase className="h-8 w-8 text-portfolio-primary animate-pulse-soft" />
              Professional Experience
            </h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              
              {/* Bauhaus University Research Positions */}
              <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-lg shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-white dark:bg-white p-2 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300">
                      <img 
                        src="/lovable-uploads/c1cf292e-337c-4a7d-98b5-5100d4c905b2.png" 
                        alt="Bauhaus-Universität Weimar logo"
                        className="w-8 h-8 object-contain filter dark:brightness-110 dark:contrast-110"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">Student Research Assistant</h3>
                      <p className="text-portfolio-primary">Bauhaus-Universität Weimar</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-l-2 border-l-portfolio-secondary pl-4">
                      <h4 className="font-medium">Computer Vision  Project</h4>
                      <p className="text-muted-foreground text-sm">Apr 2024 – Feb 2025</p>
                      <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 mt-2">
                        <li>Annotation of Images using Computer Vision Annotation Tool (CVAT)</li>
                      </ul>
                    </div>
                    
                  
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline">Computer Vision</Badge>
                    <Badge variant="outline">CVAT</Badge>
                    <Badge variant="outline">Annotation</Badge>
                  </div>
                </CardContent>
              </Card>


              {/* Infosys Limited */}
              <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-lg shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-white dark:bg-white p-2 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300">
                      <img 
                        src="/lovable-uploads/Infosys_Technologies_logo.svg.png" 
                        alt="Infosys logo"
                        className="w-8 h-8 object-contain filter dark:brightness-110 dark:contrast-110"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">Senior Systems Engineer</h3>
                          <p className="text-portfolio-primary">Infosys Limited</p>
                          <p className="text-muted-foreground">Nov 2019 – Sept 2022 · Chennai, India</p>
                        </div>
                        <Badge variant="outline">2019–2022</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Senior Systems Engineer */}
                  <h4 className="font-medium text-md mt-2">Senior Systems Engineer (Jan 2022 – Sep 2022)</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Enhanced a Java REST-based application for stock market and event validation, improving customer experience.</li>
                    <li>Developed complex SQL queries on Oracle for robust data handling.</li>
                    <li>Followed Scrum methodology to deliver high-quality code in iterative cycles.</li>
                    <li>Proactively resolved critical defects to ensure performance and stability.</li>
                  </ul>

                  {/* Systems Engineer */}
                  <h4 className="font-medium text-md mt-4">Systems Engineer (Apr 2020 – Dec 2021)</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Migrated a legacy COBOL system to Java Spring Boot, improving maintainability and performance.</li>
                    <li>Achieved 60% code refactoring without loss in functionality, using OOP principles.</li>
                    <li>Implemented JSON-based outputs using timestamps for enhanced readability.</li>
                    <li>Built a microservice for trade matching with Neo4j, deployed on AWS cloud.</li>
                    <li>Designed Zeebe workflows for complex business logic using Neo4j and AWS.</li>
                  </ul>

                  {/* Systems Engineer Trainee */}
                  <h4 className="font-medium text-md mt-4">Systems Engineer Trainee (Nov 2019 – Mar 2020)</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Gained proficiency in Python, SQL, and full-stack development with Java and Angular.</li>
                    <li>Developed a full-stack shopping application as part of training program deliverables.</li>
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline">Java</Badge>
                    <Badge variant="outline">Spring Boot</Badge>
                    <Badge variant="outline">SQL</Badge>
                    <Badge variant="outline">Oracle</Badge>
                    <Badge variant="outline">Neo4j</Badge>
                    <Badge variant="outline">Zeebe</Badge>
                    <Badge variant="outline">AWS</Badge>
                    <Badge variant="outline">Angular</Badge>
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">Scrum</Badge>
                  </div>
                </CardContent>
              </Card>


              {/* Internships */}
              <AnimatedCard className="rounded-xl border-0 shadow-lg" hoverEffect="lift">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg hover:text-portfolio-primary transition-colors duration-200">Internships (Short-Term)</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="border-l-2 border-l-portfolio-secondary pl-4 hover:border-l-portfolio-primary transition-colors duration-200">
                      <h4 className="font-medium hover:text-portfolio-primary transition-colors duration-200">DRDO</h4>
                      <p className="text-muted-foreground text-sm">Aug 2014</p>
                      <p className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200">Model testing, CFD, propulsion</p>
                    </div>
                    
                    <div className="border-l-2 border-l-portfolio-secondary pl-4 hover:border-l-portfolio-primary transition-colors duration-200">
                      <h4 className="font-medium hover:text-portfolio-primary transition-colors duration-200">Cochin Shipyard</h4>
                      <p className="text-muted-foreground text-sm">May–Jun 2014</p>
                      <p className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200">Buoy Tender Vessel production</p>
                    </div>
                    
                    <div className="border-l-2 border-l-portfolio-secondary pl-4 hover:border-l-portfolio-primary transition-colors duration-200">
                      <h4 className="font-medium hover:text-portfolio-primary transition-colors duration-200">Conceptia Technologies</h4>
                      <p className="text-muted-foreground text-sm">May–Jun 2013</p>
                      <p className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200">AutoCAD + FREESHIP</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="hover:bg-portfolio-primary hover:text-white transition-all duration-200 hover:scale-105">CFD</Badge>
                    <Badge variant="outline" className="hover:bg-portfolio-primary hover:text-white transition-all duration-200 hover:scale-105">AutoCAD</Badge>
                    <Badge variant="outline" className="hover:bg-portfolio-primary hover:text-white transition-all duration-200 hover:scale-105">Shipyard Operations</Badge>
                  </div>
                </CardContent>
              </AnimatedCard>
              
            </div>
          </div>
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection id="education" className="py-16 px-4 bg-slate-50 dark:bg-slate-900/50" animation="fade-up">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
              <GraduationCap className="h-8 w-8 text-portfolio-primary" />
              Education
            </h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {[
                { degree: "MSc in Digital Engineering", university: "Bauhaus-Universität Weimar", years: "2022–2025", logo: "/lovable-uploads/8ebf8bd4-4ca8-4b63-bbbf-cbf12e8110a4.png" },
                { degree: "B.Tech in Civil Engineering", university: "Muthoot Institute of Technology and Science", years: "2015–2019", logo: "/lovable-uploads/MITS-LOGO-NEW.jpeg" }
              ].map((edu, index) => (
                <Card key={index} className="bg-slate-50 dark:bg-slate-800/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-white dark:bg-white p-2 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300">
                        <img 
                          src={edu.logo} 
                          alt={`${edu.university} logo`}
                          className="w-12 h-12 object-contain filter dark:brightness-110 dark:contrast-110"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground">{edu.degree}</h3>
                        <p className="text-portfolio-primary font-medium">{edu.university}</p>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {edu.years}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Certifications */}
        <AnimatedSection id="certifications" className="py-16 px-4 bg-white dark:bg-gray-900" animation="slide-left">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
              <BookOpen className="h-8 w-8 text-portfolio-primary" />
              Certifications
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "IBM Data Science Professional Certificate", org: "IBM", date: "2022" },
                { title: "Data Science Masters Program", org: "Simplilearn", date: "2024" },
                { title: "Machine Learning Specialization", org: "DeepLearning.AI", date: "2023" },
                { title: "Deep Learning Specialization", org: "DeepLearning.AI", date: "2022" },
                { title: "Generative AI with LLMs", org: "DeepLearning.AI", date: "2024" }
              ].map((cert, index) => (
                <Card key={index} className="hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-lg shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Badge className="bg-portfolio-primary">
                        <BookOpen className="h-3 w-3 mr-1" />
                        Cert
                      </Badge>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm leading-tight">{cert.title}</h3>
                        <p className="text-portfolio-primary text-sm">{cert.org}</p>
                        <p className="text-muted-foreground text-xs flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {cert.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Awards & Recognition */}
        <AnimatedSection className="py-16 px-4 bg-slate-50 dark:bg-slate-900/50" animation="fade-up">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
              <Award className="h-8 w-8 text-portfolio-accent" />
              Awards & Recognition
            </h2>
            <Card className="max-w-2xl mx-auto hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              <CardContent className="pt-6 relative z-10">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-portfolio-accent to-portfolio-accent/80 p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-xl text-portfolio-accent">Second Prize</h3>
                      <Badge className="bg-portfolio-accent/10 text-portfolio-accent border-portfolio-accent/20">
                        International Award
                      </Badge>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      International Student Design Competition for a Safe and Affordable Ferry
                    </h4>
                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                      <Award className="h-4 w-4" />
                      <span>Worldwide Ferry Safety Association</span>
                      <span>•</span>
                      <span>Feb 2020</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Recognized for innovative design solutions prioritizing safety and affordability in maritime transportation.
                    </p>
                    <a 
                      href="https://www.ferrysafety.org" 
                      className="text-portfolio-primary hover:text-portfolio-accent transition-colors text-sm inline-flex items-center gap-1 hover:underline"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Organization <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Language Skills */}
        <AnimatedSection className="py-16 px-4 bg-white dark:bg-gray-900" animation="slide-right">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
              <Languages className="h-8 w-8 text-portfolio-primary" />
              Language Skills
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { lang: "English", level: "C1", desc: "Full Professional Proficiency", link: null },
                { lang: "German", level: "A2", desc: "Elementary proficiency ", link: null },
                { lang: "Malayalam", level: "Native", desc: "Native", link: null },
                { lang: "Hindi", level: "B1", desc: "Intermediate", link: null },
                { lang: "Tamil", level: "B1", desc: "Intermediate", link: null }
              ].map((item) => (
                <Card key={item.lang} className="text-center hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-lg shadow-md">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg">{item.lang}</h3>
                    {item.link ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                              <Badge className="bg-portfolio-primary hover:bg-portfolio-primary-dark cursor-pointer transition-colors">
                                {item.level} <ExternalLink className="h-3 w-3 ml-1" />
                              </Badge>
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View B2 Certificate</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Badge className="bg-portfolio-primary">{item.level}</Badge>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Publications & Blog */}
        <AnimatedSection className="py-16 px-4 bg-slate-50 dark:bg-slate-900/50" animation="fade-up">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-3 mb-4">
                <PenTool className="h-8 w-8 text-portfolio-primary" />
                <h2 className="text-3xl font-bold">Publications & Blog</h2>
              </div>
            </div>
            <AnimatedCard className="max-w-2xl mx-auto shadow-lg rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300" hoverEffect="lift">
              <CardHeader>
                <CardTitle>Latest Articles</CardTitle>
                <CardDescription>Insights on AI, Machine Learning, and Engineering</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-l-4 border-portfolio-primary pl-4 bg-gradient-to-r from-portfolio-primary/5 to-transparent p-4 rounded-r-lg hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-portfolio-primary p-2 rounded-full">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-portfolio-primary mb-2">📝 Mastering the Art of LLM Inference</h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          How to Fine-Tune Parameters for Perfect AI Responses
                        </p>
                        <a 
                          href="https://medium.com/@midhun.kunhikannan/mastering-the-art-of-llm-inference-how-to-fine-tune-parameters-for-perfect-ai-responses-2792c72eaaef" 
                          className="text-portfolio-primary hover:underline hover:text-portfolio-primary-dark text-sm inline-flex items-center gap-1 transition-all duration-200 hover:scale-105 font-medium"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Read Article on Medium <ExternalLink className="h-3 w-3 transition-transform duration-200 hover:scale-110" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="border-l-4 border-portfolio-secondary pl-4">
                    <h3 className="font-semibold">Latest Research Updates</h3>
                    <p className="text-muted-foreground text-sm">
                      Follow my latest research insights and technical articles on Medium
                    </p>
                    <a 
                      href="https://medium.com/@midhun.kunhikannan" 
                      className="text-portfolio-primary hover:underline hover:text-portfolio-primary-dark text-sm inline-flex items-center gap-1 transition-all duration-200 hover:scale-105"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Read on Medium <ExternalLink className="h-3 w-3 transition-transform duration-200 hover:scale-110" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </div>
        </AnimatedSection>

        {/* Photography & Visual Stories Section */}
        <AnimatedSection id="photography-section" className="py-16 px-4 bg-white dark:bg-gray-900" animation="fade-up">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
              <Camera className="h-8 w-8 text-portfolio-primary" />
              Photography & Visual Stories
            </h2>
            <div className="text-center mb-12">
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Beyond engineering and AI, I enjoy telling stories through photography — capturing moments from daily life, travel, and architecture.
              </p>
            </div>
            
            {/* Instagram Widget with Fallback */}
            <div className="w-full flex justify-center mb-8">
              <div className="w-full max-w-4xl">
                {/* Elfsight Instagram Widget */}
                <div id="instagram-widget-container" className="rounded-xl overflow-hidden shadow-lg bg-card border border-border/50 transition-all duration-500">
                  <iframe 
                    id="elf-widget"
                    src="https://0033ad868bb34156944a850693ce2432.elf.site" 
                    width="100%" 
                    height="600" 
                    frameBorder="0"
                    className="border-none rounded-xl"
                    style={{ border: 'none', overflow: 'hidden' }}
                    allowFullScreen
                    title="Instagram Feed - Isabel's Photography"
                  />
                </div>
                
                {/* Fallback Instagram Post */}
                <div 
                  id="fallback-instagram-post" 
                  style={{ display: 'none' }} 
                  className="w-full animate-fade-in"
                >
                  <div 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      marginTop: '2rem', 
                      marginBottom: '2rem',
                      padding: '0 1rem'
                    }}
                  >
                    <blockquote 
                      className="instagram-media" 
                      data-instgrm-permalink="https://www.instagram.com/p/CxSX4NWoNxA/?utm_source=ig_embed&utm_campaign=loading" 
                      data-instgrm-version="14" 
                      style={{ 
                        background: '#FFF', 
                        border: '0', 
                        borderRadius: '3px', 
                        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)', 
                        margin: '1px', 
                        maxWidth: '540px', 
                        minWidth: '326px', 
                        padding: '0', 
                        width: '100%'
                      } as React.CSSProperties}
                    >
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-4 bg-white dark:bg-gray-900">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="shadow-lg rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>I'd love to hear from you!</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                    <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="What is this message about?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="research">Research collaboration</SelectItem>
                        <SelectItem value="job">Job opportunity</SelectItem>
                        <SelectItem value="general">General inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea
                      placeholder="Your Message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                    />
                    <Button type="submit" className="w-full bg-portfolio-primary hover:bg-portfolio-primary-dark">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="shadow-lg rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-portfolio-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:isabelmariavadakkedathu@gmail.com" className="text-muted-foreground hover:text-portfolio-primary">
                        isabelmariavadakkedathu@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-portfolio-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+49-17646111026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-portfolio-primary" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">Weimar, Germany</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                      <a href="https://github.com/Midhun-Kanadan" target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
                      <a href="https://www.linkedin.com/in/isabel-maria-binu/" target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon className="h-5 w-5 hover:text-blue-600 transition-colors" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href="https://medium.com/@midhun.kunhikannan" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-background dark:bg-gray-900 text-foreground py-8 px-4 border-t border-border">
          <div className="container mx-auto text-center">
            <p className="mb-4">&copy; {new Date().getFullYear()} Isabel Maria Binu. All rights reserved.</p>
            <div className="flex justify-center gap-4">
              <a href="https://github.com/Midhun-Kanadan" className="hover:text-portfolio-accent transition-colors">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/isabel-maria-binu/" className="hover:text-portfolio-accent transition-colors">
                LinkedIn
              </a>
              <a href="https://medium.com/@midhun.kunhikannan" className="hover:text-portfolio-accent transition-colors">
                Medium
              </a>
            </div>
          </div>
        </footer>

        {/* Home/Back to Top Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={scrollToTop}
              className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-portfolio-primary hover:bg-portfolio-primary-dark text-white shadow-lg transition-all duration-300 ${
                showHomeButton 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10 pointer-events-none'
              }`}
              size="icon"
            >
              <Home className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Back to Top</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default Index;