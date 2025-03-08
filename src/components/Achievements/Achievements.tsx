import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Zap, Brain, Code, Lightbulb, Trophy, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number; // 0-100
  category: 'beginner' | 'intermediate' | 'advanced';
  date?: Date;
};

type AchievementsProps = {
  achievements?: Achievement[];
  onAchievementClick?: (achievement: Achievement) => void;
};

const defaultAchievements: Achievement[] = [
  {
    id: 'first_network',
    title: 'First Network',
    description: 'Create your first neural network',
    icon: <Brain size={24} />,
    unlocked: true,
    category: 'beginner',
    date: new Date('2023-10-15')
  },
  {
    id: 'code_master',
    title: 'Code Master',
    description: 'Write 10 different neural network architectures',
    icon: <Code size={24} />,
    unlocked: false,
    progress: 30,
    category: 'intermediate'
  },
  {
    id: 'deep_learning',
    title: 'Deep Learning',
    description: 'Create a network with at least 5 layers',
    icon: <Zap size={24} />,
    unlocked: false,
    progress: 0,
    category: 'intermediate'
  },
  {
    id: 'innovator',
    title: 'Innovator',
    description: 'Create a custom activation function',
    icon: <Lightbulb size={24} />,
    unlocked: false,
    progress: 0,
    category: 'advanced'
  },
  {
    id: 'master',
    title: 'Neural Master',
    description: 'Complete all learning modules',
    icon: <Trophy size={24} />,
    unlocked: false,
    progress: 15,
    category: 'advanced'
  }
];

export function Achievements({ 
  achievements = defaultAchievements,
  onAchievementClick
}: AchievementsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [showNewAchievement, setShowNewAchievement] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  // Filter achievements by category
  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  // Sort achievements: unlocked first, then by progress
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    return (b.progress || 0) - (a.progress || 0);
  });

  // Demo function to simulate unlocking an achievement
  const unlockRandomAchievement = () => {
    const lockedAchievements = achievements.filter(a => !a.unlocked);
    if (lockedAchievements.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * lockedAchievements.length);
    const achievementToUnlock = { 
      ...lockedAchievements[randomIndex], 
      unlocked: true, 
      date: new Date() 
    };
    
    setNewAchievement(achievementToUnlock);
    setShowNewAchievement(true);
    
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowNewAchievement(false);
    }, 5000);
  };

  const handleAchievementClick = (achievement: Achievement) => {
    if (onAchievementClick) {
      onAchievementClick(achievement);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border/40 p-4">
        <div>
          <h2 className="text-lg font-semibold text-primary">Achievements</h2>
          <p className="text-sm text-muted-foreground">
            Track your progress and earn badges
          </p>
        </div>
        <button
          onClick={unlockRandomAchievement}
          className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90"
        >
          Demo: Unlock Random
        </button>
      </div>
      
      <div className="border-b border-border/40 bg-card/50 p-2">
        <div className="flex items-center space-x-2">
          {['all', 'beginner', 'intermediate', 'advanced'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as any)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedAchievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleAchievementClick(achievement)}
              className={`cursor-pointer rounded-lg border p-4 transition-all ${
                achievement.unlocked
                  ? 'border-primary/50 bg-primary/5'
                  : 'border-border bg-card/50'
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`rounded-full p-2 ${
                    achievement.unlocked
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </div>
                {achievement.unlocked && (
                  <CheckCircle2 size={16} className="text-primary" />
                )}
              </div>
              
              {achievement.progress !== undefined && !achievement.unlocked && (
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium">{achievement.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${achievement.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              )}
              
              {achievement.date && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Unlocked: {achievement.date.toLocaleDateString()}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* New achievement notification */}
      <AnimatePresence>
        {showNewAchievement && newAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-50 flex items-center space-x-4 rounded-lg border border-primary/20 bg-card p-4 shadow-lg"
          >
            <div className="rounded-full bg-primary/20 p-3 text-primary">
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Achievement Unlocked!</h3>
              <p className="text-sm text-primary">{newAchievement.title}</p>
              <p className="text-xs text-muted-foreground">{newAchievement.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 