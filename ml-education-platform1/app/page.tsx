"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Brain, Code, Database, Network, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroBackground } from "@/components/hero-background"

export default function HomePage() {
  const featuresRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen">
      {/* Floating Navigation Indicator */}
      <div
        className={`fixed bottom-8 right-8 z-50 transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-0"}`}
      >
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          variant="glow"
          size="icon"
          className="rounded-full shadow-lg"
        >
          <ChevronDown className="h-5 w-5 rotate-180" />
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-20 md:py-32 min-h-screen overflow-hidden">
        <HeroBackground />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary cyberpunk-glow"
            >
              Welcome to ML Explorer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
            >
              Learn Machine Learning through
              <span className="text-primary cyberpunk-glow ml-2">Interactive Exploration</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl"
            >
              Master machine learning concepts with hands-on coding and real-time visualizations. Our gamified platform
              makes learning ML engaging and effective.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mt-6"
            >
              <Button asChild size="lg" variant="glow" className="animate-pulse-glow text-lg">
                <Link href="/lessons">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg" onClick={scrollToFeatures}>
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ChevronDown className="h-6 w-6 text-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-muted/50 relative overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <motion.div style={{ y }} className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-2"
            >
              Features
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Interactive Learning Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-[700px] text-muted-foreground md:text-xl"
            >
              Our platform combines theory with practice through interactive visualizations and coding exercises.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FeatureCard
                icon={<Code className="h-10 w-10 text-primary" />}
                title="Interactive Code Editor"
                description="Write and execute Python code directly in your browser with real-time feedback and syntax highlighting."
                link="/playground"
                linkText="Try the Playground"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FeatureCard
                icon={<Network className="h-10 w-10 text-primary" />}
                title="3D Visualizations"
                description="See your algorithms come to life with interactive 3D visualizations that help you understand complex concepts."
                link="/lessons"
                linkText="Explore Visualizations"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FeatureCard
                icon={<Brain className="h-10 w-10 text-primary" />}
                title="Guided Learning Path"
                description="Follow a structured curriculum that takes you from basics to advanced ML concepts with hands-on projects."
                link="/lessons"
                linkText="View Curriculum"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <FeatureCard
                icon={<Database className="h-10 w-10 text-primary" />}
                title="Real-world Datasets"
                description="Practice with curated datasets that simulate real-world machine learning challenges and applications."
                link="/lessons"
                linkText="Browse Datasets"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="md:col-span-2"
            >
              <FeatureCard
                className="md:col-span-2 h-full"
                icon={
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground cyberpunk-glow">
                    <span className="font-bold">ML</span>
                  </div>
                }
                title="Gamified Learning Experience"
                description="Earn badges, track your progress, and compete with others on the leaderboard as you master machine learning concepts."
                link="/dashboard"
                linkText="View Your Dashboard"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-2"
            >
              Learning Path
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Your Journey to ML Mastery
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-[700px] text-muted-foreground md:text-xl"
            >
              Follow our structured learning path to build your machine learning skills from the ground up.
            </motion.p>
          </div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded-full"></div>

            <div className="space-y-12">
              <TimelineItem
                number="01"
                title="Introduction to ML"
                description="Learn the fundamentals of machine learning, including key concepts, terminology, and applications."
                delay={0.1}
              />

              <TimelineItem
                number="02"
                title="Data Preparation"
                description="Master the techniques for collecting, cleaning, and preparing data for machine learning models."
                delay={0.2}
              />

              <TimelineItem
                number="03"
                title="Supervised Learning"
                description="Explore regression, classification, and other supervised learning algorithms with hands-on projects."
                delay={0.3}
              />

              <TimelineItem
                number="04"
                title="Neural Networks"
                description="Dive into the world of neural networks and deep learning with interactive visualizations."
                delay={0.4}
              />

              <TimelineItem
                number="05"
                title="Advanced Topics"
                description="Explore cutting-edge ML topics like reinforcement learning, GANs, and natural language processing."
                delay={0.5}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center mt-12"
          >
            <Button asChild size="lg" variant="glow">
              <Link href="/lessons">Start Your Journey</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Ready to Start Your ML Journey?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-[700px] md:text-xl"
            >
              Join thousands of learners who are mastering machine learning through our interactive platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary mt-4 text-lg"
              >
                <Link href="/lessons">Get Started Now</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  link,
  linkText,
  className,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
  linkText: string
  className?: string
}) {
  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-md hover:shadow-primary/20 group h-full ${className}`}
    >
      <CardHeader>
        <div className="mb-2 transition-transform duration-300 group-hover:scale-110">{icon}</div>
        <CardTitle className="group-hover:text-primary transition-colors">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="gap-1 group-hover:text-primary transition-colors">
          <Link href={link}>
            {linkText} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function TimelineItem({
  number,
  title,
  description,
  delay,
}: {
  number: string
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative"
    >
      <div className="flex items-center justify-center">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary cyberpunk-glow flex items-center justify-center z-10">
          <span className="font-bold text-primary-foreground">{number}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-16">
        <div className="md:text-right">
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <div>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

