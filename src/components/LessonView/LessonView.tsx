import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Clock, ArrowRight, Brain, Network, BarChart } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  icon: React.ReactNode;
  tags: string[];
}

const lessons: Lesson[] = [
  {
    id: 'intro-neural-networks',
    title: 'Introduction to Neural Networks',
    description: 'Learn the fundamentals of neural networks and how they mimic the human brain to solve complex problems.',
    duration: '30 min',
    level: 'Beginner',
    completed: true,
    icon: <Brain className="h-6 w-6" />,
    tags: ['Neural Networks', 'AI Basics']
  },
  {
    id: 'deep-learning-basics',
    title: 'Deep Learning Fundamentals',
    description: 'Explore the core concepts of deep learning and how to build your first deep neural network.',
    duration: '45 min',
    level: 'Beginner',
    completed: false,
    icon: <Network className="h-6 w-6" />,
    tags: ['Deep Learning', 'Neural Networks']
  },
  {
    id: 'data-preprocessing',
    title: 'Data Preprocessing for ML',
    description: 'Master the essential techniques for preparing and cleaning data before feeding it to your machine learning models.',
    duration: '40 min',
    level: 'Intermediate',
    completed: false,
    icon: <BarChart className="h-6 w-6" />,
    tags: ['Data Science', 'Preprocessing']
  }
];

const LessonView: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleBackToLessons = () => {
    setSelectedLesson(null);
  };

  return (
    <div className="container mx-auto p-6">
      {selectedLesson ? (
        <LessonDetail lesson={selectedLesson} onBack={handleBackToLessons} />
      ) : (
        <LessonList lessons={lessons} onSelectLesson={handleSelectLesson} />
      )}
    </div>
  );
};

interface LessonListProps {
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
}

const LessonList: React.FC<LessonListProps> = ({ lessons, onSelectLesson }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Machine Learning Lessons</h1>
        <p className="text-muted-foreground">
          Explore our curated lessons to master machine learning concepts and techniques.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <motion.div
            key={lesson.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer"
            onClick={() => onSelectLesson(lesson)}
          >
            <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md">
              <div className="absolute right-2 top-2 z-10">
                {lesson.completed && (
                  <div className="rounded-full bg-primary/20 p-1 text-primary">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    {lesson.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{lesson.title}</h3>
                    <p className="text-sm text-muted-foreground">{lesson.level}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">{lesson.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {lesson.duration}
                  </div>
                  <div className="flex items-center text-sm font-medium text-primary group-hover:underline">
                    Start Lesson
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 border-t p-3">
                {lesson.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

interface LessonDetailProps {
  lesson: Lesson;
  onBack: () => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowRight className="mr-1 h-4 w-4 rotate-180" />
        Back to Lessons
      </button>

      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            {lesson.icon}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{lesson.title}</h1>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {lesson.duration}
          </div>
          <div>{lesson.level}</div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold">Lesson Overview</h2>
        <p className="mb-6 text-muted-foreground">{lesson.description}</p>
        
        <h3 className="mb-2 text-lg font-semibold">What You'll Learn</h3>
        <ul className="mb-6 space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <CheckCircle className="mr-2 h-5 w-5 text-primary" />
            <span>Understand the core principles of {lesson.title.toLowerCase()}</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="mr-2 h-5 w-5 text-primary" />
            <span>Apply theoretical concepts to practical examples</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="mr-2 h-5 w-5 text-primary" />
            <span>Build and train your own models in the interactive playground</span>
          </li>
        </ul>

        <div className="rounded-lg bg-muted p-4">
          <h3 className="mb-2 text-lg font-semibold">Lesson Content</h3>
          <p className="text-muted-foreground">
            This is a placeholder for the actual lesson content. In a real application, this would contain
            interactive elements, videos, code examples, and quizzes.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LessonView; 