import React from 'react';
import { motion } from 'framer-motion';
import { Achievements } from '../components/Achievements/Achievements';
import { Brain, BookOpen, Code } from 'lucide-react';

const statsData = [
  {
    label: 'Completed Lessons',
    value: '12',
    icon: <BookOpen className="h-4 w-4" />,
    change: '+2 this week',
  },
  {
    label: 'Models Created',
    value: '5',
    icon: <Brain className="h-4 w-4" />,
    change: '+1 today',
  },
  {
    label: 'Code Exercises',
    value: '24',
    icon: <Code className="h-4 w-4" />,
    change: '+3 this week',
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your learning progress.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  {stat.icon}
                </div>
              </div>
              <p className="mt-2 text-sm text-green-500">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        <Achievements />
      </motion.div>
    </div>
  );
};

export default Dashboard; 