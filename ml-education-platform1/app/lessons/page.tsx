"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { MainSidebar } from "@/components/main-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Brain, ChevronRight, Cpu, Database, Filter, LineChart, Network, Search, Star } from "lucide-react"

export default function LessonsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const contentRef = useRef<HTMLDivElement>(null)

  const modules = [
    {
      id: "introduction-to-ml",
      title: "Introduction to ML",
      description: "Learn the fundamentals of machine learning and its applications.",
      icon: Brain,
      progress: 100,
      level: "Beginner",
      estimatedTime: "2 hours",
      lessons: 3,
      completed: true,
    },
    {
      id: "data-preparation",
      title: "Data Preparation",
      description: "Master the techniques for cleaning and preparing data for ML models.",
      icon: Database,
      progress: 75,
      level: "Beginner",
      estimatedTime: "3 hours",
      lessons: 3,
      completed: false,
    },
    {
      id: "supervised-learning",
      title: "Supervised Learning",
      description: "Explore regression, classification, and other supervised learning algorithms.",
      icon: Cpu,
      progress: 30,
      level: "Intermediate",
      estimatedTime: "5 hours",
      lessons: 4,
      completed: false,
    },
    {
      id: "neural-networks",
      title: "Neural Networks",
      description: "Dive into the world of neural networks and deep learning.",
      icon: Network,
      progress: 0,
      level: "Advanced",
      estimatedTime: "8 hours",
      lessons: 3,
      completed: false,
    },
    {
      id: "unsupervised-learning",
      title: "Unsupervised Learning",
      description: "Discover clustering, dimensionality reduction, and other unsupervised techniques.",
      icon: LineChart,
      progress: 0,
      level: "Intermediate",
      estimatedTime: "4 hours",
      lessons: 2,
      completed: false,
    },
    {
      id: "reinforcement-learning",
      title: "Reinforcement Learning",
      description: "Learn how agents can make decisions through rewards and punishments.",
      icon: Star,
      progress: 0,
      level: "Advanced",
      estimatedTime: "6 hours",
      lessons: 3,
      completed: false,
    },
  ]

  const handleFilterChange = (value: string) => {
    setActiveFilter(value)
    // Scroll to top of content when filter changes
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const filteredModules = modules.filter((module) => {
    // First apply search filter
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Then apply tab filter
    if (!matchesSearch) return false

    switch (activeFilter) {
      case "in-progress":
        return module.progress > 0 && module.progress < 100
      case "completed":
        return module.progress === 100
      case "not-started":
        return module.progress === 0
      default:
        return true
    }
  })

  return (
    <div className="flex flex-1">
      <MainSidebar />
      <div className="flex-1 p-6 overflow-auto" ref={contentRef}>
        <div className="flex flex-col gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold"
            >
              Lessons
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search modules..."
                  className="w-full md:w-[250px] pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Tabs defaultValue="all" onValueChange={handleFilterChange}>
              <TabsList className="w-full md:w-auto grid grid-cols-4 mb-6">
                <TabsTrigger value="all">All Modules</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="not-started">Not Started</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredModules.length > 0 ? (
                    filteredModules.map((module, index) => <ModuleCard key={module.id} module={module} index={index} />)
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">No modules found matching your search criteria.</p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSearchQuery("")
                          setActiveFilter("all")
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="in-progress" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredModules.length > 0 ? (
                    filteredModules.map((module, index) => <ModuleCard key={module.id} module={module} index={index} />)
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">No modules in progress.</p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSearchQuery("")
                          setActiveFilter("all")
                        }}
                      >
                        View all modules
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredModules.length > 0 ? (
                    filteredModules.map((module, index) => <ModuleCard key={module.id} module={module} index={index} />)
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">No completed modules yet.</p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSearchQuery("")
                          setActiveFilter("all")
                        }}
                      >
                        View all modules
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="not-started" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredModules.length > 0 ? (
                    filteredModules.map((module, index) => <ModuleCard key={module.id} module={module} index={index} />)
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">No modules to start.</p>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSearchQuery("")
                          setActiveFilter("all")
                        }}
                      >
                        View all modules
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function ModuleCard({ module, index }: { module: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <Card className="overflow-hidden h-full transition-all hover:shadow-md hover:shadow-primary/20 group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <module.icon className="h-5 w-5 text-primary" />
            </div>
            {module.completed && (
              <div className="flex items-center justify-center rounded-full bg-primary/10 p-1 cyberpunk-glow">
                <Award className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
          <CardTitle className="mt-2 group-hover:text-primary transition-colors">{module.title}</CardTitle>
          <CardDescription>{module.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{module.progress}%</span>
              </div>
              <div className="h-2 relative rounded-full overflow-hidden bg-secondary">
                <div
                  className="h-full bg-primary transition-all duration-1000 ease-in-out"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Level:</span>
                <span
                  className={`${
                    module.level === "Beginner"
                      ? "text-green-500"
                      : module.level === "Intermediate"
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                >
                  {module.level}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Time:</span>
                <span>{module.estimatedTime}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full gap-1 justify-between group-hover:bg-primary/90 transition-colors">
            <Link href={`/lessons/${module.id}`}>
              <span>{module.progress > 0 ? "Continue" : "Start"} Learning</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

