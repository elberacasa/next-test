'use client';

import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { MoodEntry } from '@/store/useStore';

const moodColors = {
  1: 'bg-red-100 hover:bg-red-200 text-red-600',
  2: 'bg-orange-100 hover:bg-orange-200 text-orange-600',
  3: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-600',
  4: 'bg-blue-100 hover:bg-blue-200 text-blue-600',
  5: 'bg-green-100 hover:bg-green-200 text-green-600',
};

const MoodTracker = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const moodEntries = useStore<MoodEntry[]>((state) => state.moodEntries);
  const addMoodEntry = useStore<(mood: number, note: string) => void>((state) => state.addMoodEntry);

  const moodEmojis = ['😢', '😕', '😐', '🙂', '😄'];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMoodSelect = (index: number) => {
    setSelectedMood(index);
    addMoodEntry(index + 1, '');
    
    // Reset selection after animation
    setTimeout(() => setSelectedMood(null), 500);
  };

  if (!mounted) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full hover-card">
      <h2 className="text-lg font-semibold mb-6">How are you feeling?</h2>
      <div className="grid grid-cols-5 gap-4 mb-8">
        {moodEmojis.map((emoji, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`aspect-square flex items-center justify-center text-2xl sm:text-3xl rounded-lg transition-all duration-300
              ${selectedMood === index ? moodColors[index + 1 as keyof typeof moodColors] : 'hover:bg-gray-50'}`}
            onClick={() => handleMoodSelect(index)}
          >
            <motion.span
              animate={selectedMood === index ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {emoji}
            </motion.span>
          </motion.button>
        ))}
      </div>
      
      <AnimatePresence>
        {moodEntries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-medium text-gray-500">Recent Moods</h3>
            <div className="flex space-x-3">
              {moodEntries.slice(-5).map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                    moodColors[entry.mood as keyof typeof moodColors]
                  }`}
                >
                  {moodEmojis[entry.mood - 1]}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoodTracker;
