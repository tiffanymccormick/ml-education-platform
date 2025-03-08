import React from 'react';
import { motion } from 'framer-motion';
import { ActivityGrid } from './ActivityGrid';
import { 
  BookOpen, 
  Code, 
  Brain, 
  Trophy,
  ChevronRight,
  BarChart
} from 'lucide-react';

const modules = [
  {
    title: 'Introduction to ML',
    progress: 100,
    icon: BookOpen,
    lessons: 5,
    completed: 5
  },
  {
    title: 'Neural Networks',
    progress: 60,
    icon: Brain,
    lessons: 8,
    completed: 5
  },
  {
    title: 'Python for ML',
    progress: 40,
    icon: Code,
    lessons: 10,
    completed: 4
  },
  {
    title: 'Advanced Topics',
    progress: 0,
    icon: Trophy,
    lessons: 6,
    completed: 0
  }
];

export const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Track your learning progress</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-2"
        >
          <ActivityGrid />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-lg border bg-card p-6"
        >
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <BarChart className="h-5 w-5" />
            Current Streak
          </h3>
          <div className="text-center">
            <span className="text-4xl font-bold text-primary">7</span>
            <span className="ml-2 text-muted-foreground">days</span>
          </div>
        </motion.div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Learning Modules</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-lg border bg-card p-6 transition-colors hover:bg-accent/50"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <module.icon className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">{module.title}</h3>
                </div>
                <ChevronRight className="h-5 w-5 transform transition-transform group-hover:translate-x-1" />
              </div>
              <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                <span>{module.completed}/{module.lessons} lessons</span>
                <span>{module.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}; 