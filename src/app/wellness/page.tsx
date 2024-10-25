'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Pause, Play, RefreshCw, Wind } from 'lucide-react';
import MeditationGuide from '@/components/wellness/MeditationGuide';

type TimerMode = 'focus' | 'break';
type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'rest';

export default function WellnessPage() {
  const [mounted, setMounted] = useState(false);
  const [timerMode, setTimerMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<BreathingPhase>('inhale');
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTimeLeft(timerMode === 'focus' ? 25 * 60 : 5 * 60);
    setIsRunning(false);
  };

  const switchMode = () => {
    setTimerMode(timerMode === 'focus' ? 'break' : 'focus');
    resetTimer();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          setIsRunning(false);
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleBreathingCycle = useCallback(() => {
    if (!isBreathingActive) return;

    const phases: { [key in BreathingPhase]: { next: BreathingPhase; duration: number } } = {
      inhale: { next: 'hold', duration: 4000 },
      hold: { next: 'exhale', duration: 7000 },
      exhale: { next: 'rest', duration: 8000 },
      rest: { next: 'inhale', duration: 1000 },
    };

    const { next, duration } = phases[breathingPhase];
    const timeout = setTimeout(() => {
      setBreathingPhase(next);
    }, duration);

    return () => clearTimeout(timeout);
  }, [breathingPhase, isBreathingActive]);

  useEffect(() => {
    return handleBreathingCycle();
  }, [breathingPhase, isBreathingActive, handleBreathingCycle]);

  if (!mounted) return null;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Wellness</h1>
        <p className="text-sm text-gray-500">Focus timer and mindfulness exercises</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Focus Timer */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <Timer className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Focus Timer</h2>
          </div>
          
          <div className="flex flex-col items-center space-y-6">
            <div className="text-6xl font-bold text-gray-900">
              {formatTime(timeLeft)}
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTimer}
                className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetTimer}
                className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-6 h-6" />
              </motion.button>
            </div>

            <button
              onClick={switchMode}
              className={`px-4 py-2 rounded-lg text-sm transition-colors
                ${timerMode === 'focus' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'bg-green-50 text-green-600'}`}
            >
              {timerMode === 'focus' ? 'Switch to Break' : 'Switch to Focus'}
            </button>
          </div>
        </div>

        {/* Breathing Exercise */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 mb-6">
            <Wind className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Breathing Exercise</h2>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={breathingPhase}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-2xl font-medium text-gray-900"
              >
                {breathingPhase.charAt(0).toUpperCase() + breathingPhase.slice(1)}
              </motion.div>
            </AnimatePresence>

            <motion.div
              animate={{
                scale: breathingPhase === 'inhale' ? 1.5 : 
                       breathingPhase === 'hold' ? 1.5 : 1,
                opacity: breathingPhase === 'rest' ? 0.5 : 1,
              }}
              transition={{ duration: 
                breathingPhase === 'inhale' ? 4 : 
                breathingPhase === 'exhale' ? 8 : 0.5 
              }}
              className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center"
            >
              <div className="w-24 h-24 bg-blue-200 rounded-full" />
            </motion.div>

            <button
              onClick={() => setIsBreathingActive(!isBreathingActive)}
              className={`px-6 py-3 rounded-lg transition-colors
                ${isBreathingActive 
                  ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
            >
              {isBreathingActive ? 'Stop Exercise' : 'Start Exercise'}
            </button>
          </div>
        </div>
      </div>

      {/* Meditation Guide */}
      <MeditationGuide />
    </div>
  );
}
