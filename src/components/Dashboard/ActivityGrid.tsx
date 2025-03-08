import React from 'react';
import { motion } from 'framer-motion';

type Activity = {
  date: string;
  count: number;
}

const generateMockData = (): Activity[] => {
  const data: Activity[] = [];
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.unshift({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5),
    });
  }
  return data;
};

const getActivityColor = (count: number) => {
  if (count === 0) return 'bg-muted hover:bg-muted/80';
  if (count === 1) return 'bg-primary/30 hover:bg-primary/40';
  if (count === 2) return 'bg-primary/50 hover:bg-primary/60';
  if (count === 3) return 'bg-primary/70 hover:bg-primary/80';
  return 'bg-primary hover:bg-primary/90';
};

export const ActivityGrid: React.FC = () => {
  const activities = generateMockData();

  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold">Learning Activity</h3>
      <div className="flex flex-wrap gap-1">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.date}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.001 }}
            className={`h-3 w-3 rounded-sm ${getActivityColor(activity.count)} transition-colors`}
            title={`${activity.count} activities on ${activity.date}`}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="h-3 w-3 rounded-sm bg-muted" />
          <div className="h-3 w-3 rounded-sm bg-primary/30" />
          <div className="h-3 w-3 rounded-sm bg-primary/50" />
          <div className="h-3 w-3 rounded-sm bg-primary/70" />
          <div className="h-3 w-3 rounded-sm bg-primary" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}; 