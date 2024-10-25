'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, Pause } from 'lucide-react';

const meditations = [
  {
    id: 1,
    title: 'Quick Mindfulness',
    duration: '5 min',
    description: 'A brief mindfulness practice to center yourself',
  },
  {
    id: 2,
    title: 'Body Scan',
    duration: '10 min',
    description: 'Progressive relaxation through body awareness',
  },
  {
    id: 3,
    title: 'Loving Kindness',
    duration: '15 min',
    description: 'Cultivate compassion for yourself and others',
  },
];

export default function MeditationGuide() {
  const [selectedMeditation, setSelectedMeditation] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Meditation Guide</h2>
      </div>

      <div className="space-y-4">
        {meditations.map((meditation) => (
          <motion.div
            key={meditation.id}
            className={`p-4 rounded-lg border transition-colors cursor-pointer
              ${selectedMeditation === meditation.id 
                ? 'border-blue-200 bg-blue-50' 
                : 'border-gray-100 hover:bg-gray-50'}`}
            onClick={() => setSelectedMeditation(meditation.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{meditation.title}</h3>
              <span className="text-sm text-gray-500">{meditation.duration}</span>
            </div>
            <p className="text-sm text-gray-600">{meditation.description}</p>
            
            {selectedMeditation === meditation.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-gray-100"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full justify-center"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Start Meditation</span>
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
