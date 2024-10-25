'use client';

import { useStore } from '@/store/useStore';
import { Brain, TrendingUp, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import type { MoodEntry, Task } from '@/store/useStore';
import { useMemo } from 'react';

const InsightEngine = () => {
  const moodEntries = useStore<MoodEntry[]>((state) => state.moodEntries);
  const tasks = useStore<Task[]>((state) => state.tasks);

  const insights = useMemo(() => {
    // Calculate productivity patterns
    const morningMoods = moodEntries.filter(entry => {
      const hour = new Date(entry.timestamp).getHours();
      return hour >= 5 && hour < 12;
    });

    const averageMorningMood = morningMoods.reduce((acc, entry) => acc + entry.mood, 0) / morningMoods.length;

    // Calculate task completion rate
    const completedTasks = tasks.filter(task => task.completed).length;
    const completionRate = tasks.length ? (completedTasks / tasks.length) * 100 : 0;

    // Generate personalized insights
    return {
      productivePeriod: averageMorningMood > 3 ? 'morning' : 'afternoon',
      completionRate,
      moodTrend: calculateMoodTrend(moodEntries),
      suggestedBreaks: calculateOptimalBreaks(moodEntries, tasks),
    };
  }, [moodEntries, tasks]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold">AI Insights</h2>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              {insights.productivePeriod === 'morning' ? (
                <Sun className="w-4 h-4 text-purple-600" />
              ) : (
                <Moon className="w-4 h-4 text-purple-600" />
              )}
              <h3 className="font-medium text-purple-900">Peak Productivity</h3>
            </div>
            <p className="text-sm text-purple-800">
              You're most productive during the {insights.productivePeriod}. Consider scheduling important tasks then.
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <h3 className="font-medium text-blue-900">Task Completion</h3>
            </div>
            <p className="text-sm text-blue-800">
              {completionRateMessage(insights.completionRate)}
            </p>
          </div>
        </motion.div>

        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Personalized Suggestion</h3>
          <p className="text-sm text-gray-800">
            {generatePersonalizedSuggestion(insights)}
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const calculateMoodTrend = (entries: MoodEntry[]) => {
  if (entries.length < 2) return 'neutral';
  const recent = entries.slice(-5);
  const trend = recent.reduce((acc, entry, i) => {
    if (i === 0) return 0;
    return acc + (entry.mood - recent[i - 1].mood);
  }, 0);
  return trend > 0 ? 'improving' : trend < 0 ? 'declining' : 'stable';
};

const calculateOptimalBreaks = (moods: MoodEntry[], tasks: any[]) => {
  const lowMoodPeriods = moods.filter(entry => entry.mood <= 2).length;
  const incompleteTasks = tasks.filter(task => !task.completed).length;
  return Math.max(2, Math.min(6, lowMoodPeriods + Math.floor(incompleteTasks / 3)));
};

const completionRateMessage = (rate: number) => {
  if (rate >= 80) return `Great job! You've completed ${rate.toFixed(0)}% of your tasks.`;
  if (rate >= 50) return `You're making progress with ${rate.toFixed(0)}% task completion.`;
  return `You've completed ${rate.toFixed(0)}% of tasks. Let's break them into smaller steps!`;
};

const generatePersonalizedSuggestion = (insights: any) => {
  if (insights.moodTrend === 'declining' && insights.completionRate < 50) {
    return "Consider taking more frequent breaks and breaking tasks into smaller, manageable pieces.";
  }
  if (insights.moodTrend === 'improving' && insights.completionRate >= 70) {
    return "You're in a great flow! This might be an ideal time to tackle challenging tasks.";
  }
  return `Try taking ${insights.suggestedBreaks} short breaks throughout your day to maintain energy levels.`;
};

export default InsightEngine;
