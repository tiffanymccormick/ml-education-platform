import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Menu, X, ArrowRight, Plus, AlertTriangle, Shield, Terminal, Cpu, Lock } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { ParticleBackground } from '../3d/ParticleBackground';

// Define the lesson type
type Lesson = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  emotionMode?: 'happiness' | 'anger' | 'sadness' | 'jealousy' | 'fear' | 'disgust';
  progress?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  securityLevel?: 'A' | 'B' | 'C' | 'S';
  moduleCode?: string;
};

// Sample lesson data
const lessons: Lesson[] = [
  {
    id: 'neural-networks',
    title: 'Neural Networks',
    subtitle: 'Foundations',
    description: 'Learn the fundamental concepts behind neural networks and how they mimic human brain function.',
    image: '/images/lessons/neural-networks.jpg',
    color: '#00C3FF', // Interface blue
    emotionMode: 'sadness',
    progress: 75,
    difficulty: 'beginner',
    securityLevel: 'C',
    moduleCode: 'NN-001'
  },
  {
    id: 'data-visualization',
    title: 'Data Visualization',
    subtitle: 'Interactive Techniques',
    description: 'Master the art of visualizing complex datasets with interactive and dynamic techniques.',
    image: '/images/lessons/data-viz.jpg',
    color: '#FF5E00', // Alert orange
    emotionMode: 'disgust',
    progress: 30,
    difficulty: 'intermediate',
    securityLevel: 'B',
    moduleCode: 'DV-042'
  },
  {
    id: 'reinforcement-learning',
    title: 'Reinforcement Learning',
    subtitle: 'Advanced Concepts',
    description: 'Explore how AI agents learn through interaction with their environment.',
    image: '/images/lessons/reinforcement.jpg',
    color: '#007F00', // Terminal green
    emotionMode: 'jealousy',
    progress: 10,
    difficulty: 'advanced',
    securityLevel: 'A',
    moduleCode: 'RL-117'
  },
  {
    id: 'generative-ai',
    title: 'Generative AI',
    subtitle: 'Creative Applications',
    description: 'Discover how AI can create new content, from images to music to text.',
    image: '/images/lessons/generative.jpg',
    color: '#5900B3', // NERV purple
    emotionMode: 'fear',
    progress: 0,
    difficulty: 'intermediate',
    securityLevel: 'B',
    moduleCode: 'GA-023'
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    subtitle: 'Seeing the World',
    description: 'Learn how machines interpret and understand visual information from the world.',
    image: '/images/lessons/vision.jpg',
    color: '#FFC700', // Caution yellow
    emotionMode: 'happiness',
    progress: 50,
    difficulty: 'beginner',
    securityLevel: 'C',
    moduleCode: 'CV-056'
  }
];

const LessonGallery: React.FC = () => {
  const [activeLesson, setActiveLesson] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  // Handle mouse movement for particle effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Setup intersection observer to detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setActiveLesson(index);
              // Update body background color based on lesson
              document.body.style.backgroundColor = '#0c1419';
            }
          }
        });
      },
      { threshold: 0.6 } // Trigger when 60% of the section is visible
    );
    
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      document.body.style.backgroundColor = '';
    };
  }, []);
  
  // Scroll to a specific lesson section
  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: 'smooth'
    });
    setMenuOpen(false);
  };
  
  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  const getDifficultyLabel = (difficulty?: string) => {
    switch(difficulty) {
      case 'beginner':
        return 'LEVEL 1';
      case 'intermediate':
        return 'LEVEL 2';
      case 'advanced':
        return 'LEVEL 3';
      default:
        return '';
    }
  };

  const getDifficultyIcon = (difficulty?: string) => {
    switch(difficulty) {
      case 'beginner':
        return <Terminal size={14} />;
      case 'intermediate':
        return <Cpu size={14} />;
      case 'advanced':
        return <Lock size={14} />;
      default:
        return null;
    }
  };
  
  return (
    <div ref={containerRef} className="relative min-h-screen bg-background overflow-hidden">
      {/* Scanline effect */}
      <div className="scanline"></div>
      
      {/* Fixed navigation in top-right */}
      <div className="fixed top-8 right-8 z-50 flex items-center gap-6">
        <div className="text-foreground/70 text-sm font-mono tracking-tight flex items-center">
          <span className="opacity-70 mr-2">MODULE</span>
          <span className="mecha-label">{lessons[activeLesson].moduleCode}</span>
        </div>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-12 h-12 flex items-center justify-center border border-foreground/20 hover:border-foreground/60 transition-all duration-300 mecha-button"
          style={{ 
            color: lessons[activeLesson].color,
            borderColor: menuOpen ? lessons[activeLesson].color : undefined
          }}
        >
          {menuOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>
      </div>
      
      {/* Full-screen menu overlay */}
      <motion.div 
        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md flex items-center justify-center"
        initial="closed"
        animate={menuOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <motion.div className="container-swiss">
          <div className="grid-swiss">
            <div className="col-span-12 md:col-span-3 mb-12 md:mb-0">
              <div className="mecha-panel">
                <div className="mecha-panel-header">
                  <h2 className="mecha-panel-title">System Access</h2>
                  <AlertTriangle size={16} className="text-[#FF0012]" />
                </div>
                <p className="text-foreground/50 text-sm mb-4 font-mono">
                  Select a training module to continue your neural interface calibration.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-foreground/40">
                  <Shield size={12} />
                  <span>SECURITY CLEARANCE REQUIRED</span>
                </div>
              </div>
            </div>
            
            <div className="col-span-12 md:col-span-9">
              <ul className="space-y-6">
                {lessons.map((lesson, index) => (
                  <motion.li 
                    key={lesson.id}
                    variants={menuItemVariants}
                    className={`cursor-pointer group card-mecha p-4 ${activeLesson === index ? 'border-[1px] border-current' : ''} hover:border-current transition-all duration-300`}
                    onClick={() => scrollToSection(index)}
                    style={{ 
                      borderColor: activeLesson === index ? lesson.color : 'rgba(255,255,255,0.1)'
                    }}
                  >
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-1">
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-mono text-foreground/40 block">{(index + 1).toString().padStart(2, '0')}</span>
                          <div className="h-full w-[1px] bg-foreground/10 my-2"></div>
                          <span 
                            className="text-xs font-mono px-1 py-0.5 border border-current"
                            style={{ color: lesson.color }}
                          >
                            {lesson.securityLevel}
                          </span>
                        </div>
                      </div>
                      
                      <div className="col-span-9">
                        <div className="flex items-center gap-2 mb-1">
                          <span 
                            className="text-xs font-mono"
                            style={{ color: lesson.color }}
                          >
                            {lesson.moduleCode}
                          </span>
                          <div className="divider-v h-3"></div>
                          <div className="flex items-center gap-1 text-xs font-mono text-foreground/50">
                            {getDifficultyIcon(lesson.difficulty)}
                            <span>{getDifficultyLabel(lesson.difficulty)}</span>
                          </div>
                        </div>
                        
                        <h3 
                          className="text-2xl md:text-3xl font-display font-bold tracking-tight"
                          style={{ color: lesson.color }}
                        >
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-foreground/70 mt-1 max-w-2xl">{lesson.description}</p>
                      </div>
                      
                      <div className="col-span-2 flex items-center justify-end">
                        <div 
                          className="w-10 h-10 flex items-center justify-center border group-hover:border-current transition-all duration-300"
                          style={{ 
                            color: activeLesson === index ? lesson.color : undefined,
                            borderColor: activeLesson === index ? lesson.color : 'rgba(255,255,255,0.2)'
                          }}
                        >
                          <Plus 
                            size={16} 
                            className="transform group-hover:rotate-45 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {lesson.progress !== undefined && (
                      <div className="grid grid-cols-12 gap-4 mt-4">
                        <div className="col-span-1"></div>
                        <div className="col-span-11">
                          <div className="flex items-center gap-3">
                            <div className="h-[2px] bg-foreground/10 flex-grow">
                              <motion.div 
                                className="h-full"
                                style={{ 
                                  backgroundColor: lesson.color,
                                  width: `${lesson.progress}%` 
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${lesson.progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            </div>
                            <span className="text-xs font-mono text-foreground/50 w-12 text-right">
                              {lesson.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Main content - full-screen sections */}
      <div className="snap-y snap-mandatory h-screen overflow-y-auto">
        {lessons.map((lesson, index) => (
          <section 
            key={lesson.id}
            ref={el => sectionRefs.current[index] = el}
            className="snap-start h-screen w-full relative grid grid-cols-1 md:grid-cols-12"
            style={{ 
              backgroundColor: '#0c1419',
            }}
          >
            {/* Left side - Image/Visual */}
            <div className="relative h-[60vh] md:h-screen md:col-span-7 overflow-hidden">
              {/* Background particles */}
              <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
                  <ParticleBackground 
                    count={2000} 
                    mouse={mousePosition} 
                    color={lesson.color}
                    emotionMode={lesson.emotionMode}
                    depth={100}
                  />
                </Canvas>
              </div>
              
              {/* Grid overlay */}
              <div className="absolute inset-0 z-5 grid-background opacity-30"></div>
              
              {/* Image overlay with gradient */}
              <div 
                className="absolute inset-0 z-10 opacity-40 bg-center bg-cover"
                style={{ 
                  backgroundImage: `url(${lesson.image})`,
                  backgroundBlendMode: 'multiply',
                  mixBlendMode: 'overlay'
                }}
              />
              
              {/* Gradient overlay */}
              <div 
                className="absolute inset-0 z-20"
                style={{ 
                  background: `linear-gradient(to right, rgba(12,20,25,0.7), rgba(12,20,25,0.3)), 
                               linear-gradient(to bottom, rgba(12,20,25,0.4), transparent, rgba(12,20,25,0.8))`
                }}
              />
              
              {/* Technical details overlay */}
              <div className="absolute top-[5%] left-[5%] z-30 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: lesson.color }}></div>
                  <span className="font-mono text-xs text-foreground/70">SYSTEM ACTIVE</span>
                </div>
                <div className="mecha-label mb-2">
                  MODULE {lesson.moduleCode}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-foreground/50">SECURITY LEVEL</span>
                  <span 
                    className="font-mono text-xs px-1 py-0.5 border border-current"
                    style={{ color: lesson.color }}
                  >
                    {lesson.securityLevel}
                  </span>
                </div>
              </div>
              
              {/* Large lesson number */}
              <div className="absolute bottom-[5%] left-[5%] z-30">
                <span 
                  className="font-display text-[20vw] md:text-[25vh] font-bold opacity-10 leading-none tracking-tighter"
                  style={{ color: lesson.color }}
                >
                  {(index + 1).toString().padStart(2, '0')}
                </span>
              </div>
              
              {/* Technical details bottom-right */}
              <div className="absolute bottom-[5%] right-[5%] z-30 flex flex-col items-end">
                <div className="font-mono text-xs text-foreground/50 mb-1">NEURAL INTERFACE v2.5</div>
                <div className="font-mono text-xs text-foreground/50">TIMESTAMP: {new Date().toISOString().split('T')[0]}</div>
              </div>
            </div>
            
            {/* Right side - Content */}
            <div className="relative h-[40vh] md:h-screen md:col-span-5 flex items-center p-8 md:p-16">
              <div className="mecha-panel w-full max-w-xl">
                <div className="mecha-panel-header">
                  <div className="flex items-center gap-2">
                    <span className="mecha-panel-title">{lesson.title}</span>
                    <div className="divider-v h-6"></div>
                    <span className="text-xs font-mono text-foreground/50">{getDifficultyLabel(lesson.difficulty)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-xs font-mono px-1 py-0.5 border border-current"
                      style={{ color: lesson.color }}
                    >
                      {lesson.securityLevel}
                    </span>
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: false }}
                  className="mb-8"
                >
                  <p 
                    className="text-xl md:text-2xl text-foreground/70 font-display tracking-tight mb-4"
                    style={{ color: lesson.color }}
                  >
                    {lesson.subtitle}
                  </p>
                  
                  <p className="text-foreground/60 mb-6 font-mono text-sm">
                    {lesson.description}
                  </p>
                  
                  <div className="divider-h mb-6"></div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-xs font-mono text-foreground/50 mb-1">MODULE ID</div>
                      <div className="text-sm font-mono" style={{ color: lesson.color }}>{lesson.moduleCode}</div>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-foreground/50 mb-1">DIFFICULTY</div>
                      <div className="text-sm font-mono flex items-center gap-1">
                        {getDifficultyIcon(lesson.difficulty)}
                        <span>{getDifficultyLabel(lesson.difficulty)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: false }}
                  className="flex flex-col gap-8"
                >
                  <Link 
                    to={`/lessons/${lesson.id}`}
                    className="mecha-button group inline-flex items-center gap-4 relative w-full"
                    style={{ color: lesson.color, borderColor: lesson.color }}
                  >
                    <span className="text-lg font-display uppercase tracking-tight">
                      {lesson.progress && lesson.progress > 0 ? 'Continue Training' : 'Initialize Training'}
                    </span>
                    <ArrowRight 
                      size={20} 
                      className="ml-auto transition-all duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                  
                  {lesson.progress !== undefined && lesson.progress > 0 && (
                    <div className="flex items-center gap-4">
                      <div className="h-[2px] bg-foreground/10 flex-grow">
                        <motion.div 
                          className="h-full"
                          style={{ 
                            backgroundColor: lesson.color,
                            width: `${lesson.progress}%` 
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${lesson.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-sm font-mono" style={{ color: lesson.color }}>
                        {lesson.progress}%
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default LessonGallery; 