'use client';

import { Sparkles, Sun } from 'lucide-react';

const DailyInsight = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex items-center space-x-2 mb-6">
        <Sun className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Daily Insight</h2>
      </div>
      
      <div className="space-y-6">
        <div className="text-gray-600">
          <p className="leading-relaxed">
            Based on your mood patterns, you tend to be most productive in the morning.
            Consider scheduling important tasks during this time.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg space-y-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3 className="font-medium text-blue-900">Today&apos;s Suggestion</h3>
          </div>
          <p className="text-blue-800 text-sm leading-relaxed">
            Take a short break every 90 minutes to maintain your energy levels throughout the day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyInsight;
