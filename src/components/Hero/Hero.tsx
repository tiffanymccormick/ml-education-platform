import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ParticleBackground } from '../3d/ParticleBackground';
import { Brain, Code, Zap, ChevronDown, Cpu, Database, LineChart, Network, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef);
  const controls = useAnimation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  // Parallax scrolling effect with enhanced depth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);
  
  const scrollToContent = () => {
    featuresRef.current?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }
    }
  };
  
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: [
        "0 0 20px rgba(123, 97, 255, 0.8)",
        "0 0 35px rgba(123, 97, 255, 0.6)",
        "0 0 50px rgba(123, 97, 255, 0.4)"
      ],
      transition: { 
        duration: 0.3,
        boxShadow: {
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    },
    tap: { scale: 0.95 }
  };

  const featureItems = [
    {
      icon: Brain,
      title: "Neural Networks",
      description: "Visualize and interact with neural networks in real-time to understand how they learn and make predictions.",
      color: "neon-purple",
      offset: { x: -20, y: -10 },
      rotation: -5
    },
    {
      icon: Code,
      title: "Interactive Code",
      description: "Write and execute machine learning code directly in your browser with instant visual feedback.",
      color: "neon-blue",
      offset: { x: 20, y: 20 },
      rotation: 3
    },
    {
      icon: LineChart,
      title: "Data Visualization",
      description: "See your data and model performance through dynamic, interactive visualizations.",
      color: "neon-cyan",
      offset: { x: -15, y: 15 },
      rotation: -3
    },
    {
      icon: Cpu,
      title: "AI Concepts",
      description: "Master complex AI concepts through hands-on exercises and intuitive explanations.",
      color: "neon-green",
      offset: { x: 10, y: -20 },
      rotation: 4
    }
  ];

  return (
    <div className="relative">
      {/* Add Raad-style grid background only on the home page */}
      <div className="raad-grid-background"></div>
      
      {/* Rest of the component with existing structure */}
      <motion.div
        ref={heroRef}
        className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden bg-background"
        style={{
          perspective: "1000px"
        }}
      >
        {/* 3D Particle Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            opacity,
            scale,
            rotateX,
            rotateY
          }}
        >
          <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
            <ParticleBackground 
              count={2500} 
              mouse={mousePosition} 
              color="hsl(var(--neon-purple))" 
              speed={0.15}
              depth={120}
            />
          </Canvas>
        </motion.div>
        
        {/* Grid Background with enhanced depth */}
        <motion.div 
          className="absolute inset-0 z-0 grid-background opacity-20"
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
            rotateX,
            rotateY
          }}
        />
        
        {/* Animated gradient overlay with depth */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background"
          style={{
            rotateX,
            rotateY
          }}
        />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="container px-4 md:px-6"
          >
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="relative">
                <motion.h1 
                  className="font-display text-4xl font-bold tracking-wider sm:text-5xl md:text-6xl lg:text-7xl uppercase"
                  style={{
                    rotateX,
                    rotateY
                  }}
                >
                  <motion.span 
                    className="gradient-text-cyber text-glow-lg glitch-text"
                    data-text="Master Machine Learning"
                    animate={{
                      textShadow: [
                        "0 0 20px currentColor",
                        "0 0 40px currentColor",
                        "0 0 60px currentColor"
                      ]
                    }}
                    transition={{
                      textShadow: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }
                    }}
                  >
                    Master Machine Learning
                  </motion.span>
                  <motion.div 
                    className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          delay: 0.5,
                          duration: 0.8
                        }
                      }
                    }}
                  >
                    <span className="text-foreground/90 font-display tracking-wide">
                      Through Interactive Learning
                    </span>
                  </motion.div>
                </motion.h1>
                
                {/* Enhanced glow effect */}
                <motion.div 
                  className="absolute -z-10 top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2"
                  animate={{ 
                    background: [
                      "radial-gradient(circle at center, rgba(123, 97, 255, 0.2) 0%, transparent 70%)",
                      "radial-gradient(circle at center, rgba(123, 97, 255, 0.3) 0%, transparent 70%)",
                      "radial-gradient(circle at center, rgba(123, 97, 255, 0.2) 0%, transparent 70%)"
                    ],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    rotateX,
                    rotateY
                  }}
                />
              </motion.div>
              
              <motion.p
                variants={itemVariants}
                className="mx-auto max-w-[700px] text-lg text-foreground/80 sm:text-xl"
              >
                Dive into the future of AI with hands-on tutorials, interactive visualizations,
                and real-world projects. Start your journey into artificial intelligence today.
              </motion.p>
              
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-6"
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to="/lessons"
                    className="group inline-flex h-14 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 neon-border relative overflow-hidden"
                  >
                    <motion.span 
                      className="relative z-10 mr-2"
                      animate={{
                        textShadow: [
                          "0 0 8px currentColor",
                          "0 0 16px currentColor",
                          "0 0 8px currentColor"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      Start Learning
                    </motion.span>
                    <Brain size={18} className="relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary to-primary/50"
                      animate={{
                        x: ["-100%", "100%"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        opacity: 0.5
                      }}
                    />
                  </Link>
                </motion.div>
                
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to="/playground"
                    className="group inline-flex h-14 items-center justify-center rounded-md border border-primary/50 bg-background px-8 text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative overflow-hidden"
                  >
                    <motion.span 
                      className="relative z-10 mr-2"
                      animate={{
                        textShadow: [
                          "0 0 8px currentColor",
                          "0 0 16px currentColor",
                          "0 0 8px currentColor"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      Try Playground
                    </motion.span>
                    <Code size={18} className="relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                      animate={{
                        x: ["-100%", "100%"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </Link>
                </motion.div>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="mt-12 flex flex-wrap justify-center gap-8"
              >
                {[
                  { icon: Brain, text: "Neural Networks", color: "neon-purple" },
                  { icon: Code, text: "Interactive Code", color: "neon-blue" },
                  { icon: Zap, text: "Real-time Feedback", color: "neon-cyan" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center"
                    whileHover={{ y: -5, scale: 1.1, transition: { duration: 0.2 } }}
                  >
                    <motion.div 
                      className={`rounded-full p-3 bg-${item.color}/20 text-${item.color} mb-2`}
                      animate={{
                        boxShadow: [
                          `0 0 15px hsl(var(--${item.color}))`,
                          `0 0 30px hsl(var(--${item.color}))`,
                          `0 0 15px hsl(var(--${item.color}))`
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <item.icon size={24} className="text-shadow-neon" />
                    </motion.div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <button 
              onClick={scrollToContent}
              className="flex flex-col items-center text-foreground/60 hover:text-foreground transition-colors group"
            >
              <span className="text-sm mb-2 group-hover:text-glow">Explore More</span>
              <ChevronDown size={24} className="group-hover:text-glow" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section with asymmetric layout */}
      <div 
        ref={featuresRef} 
        className="py-20 bg-background relative z-10 overflow-hidden"
      >
        <motion.div 
          className="container px-4 md:px-6 mx-auto"
          style={{ y }}
        >
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold gradient-text-cyber text-glow mb-4"
            >
              EXPLORE THE PLATFORM
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-foreground/80 max-w-2xl mx-auto"
            >
              Our platform offers a comprehensive suite of tools and resources to help you master machine learning concepts through interactive experiences.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {featureItems.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  y: 30, 
                  x: feature.offset.x,
                  rotate: feature.rotation
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  x: 0,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.1
                  }
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  rotate: feature.rotation / 2,
                  transition: { duration: 0.3 }
                }}
                className="bg-background/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6 hover:border-primary/50 transition-all duration-300 card-glow transform"
              >
                <motion.div 
                  className={`rounded-full p-4 bg-${feature.color}/20 text-${feature.color} mb-4 inline-block`}
                  animate={{
                    boxShadow: [
                      `0 0 15px hsl(var(--${feature.color}))`,
                      `0 0 30px hsl(var(--${feature.color}))`,
                      `0 0 15px hsl(var(--${feature.color}))`
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <feature.icon size={28} className="text-shadow-neon" />
                </motion.div>
                <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Link
              to="/dashboard"
              className="inline-flex h-14 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 neon-border group relative overflow-hidden"
            >
              <motion.span 
                className="relative z-10 mr-2"
                animate={{
                  textShadow: [
                    "0 0 8px currentColor",
                    "0 0 16px currentColor",
                    "0 0 8px currentColor"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Explore Dashboard
              </motion.span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary to-primary/50"
                animate={{
                  x: ["-100%", "100%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  opacity: 0.5
                }}
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 