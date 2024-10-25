'use client';

import { format } from 'date-fns';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MoodTracker from '@/components/dashboard/MoodTracker';
import TaskOverview from '@/components/dashboard/TaskOverview';
import DailyInsight from '@/components/dashboard/DailyInsight';
import InsightEngine from '@/components/dashboard/InsightEngine';

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setMounted(true);
    setCurrentDate(format(new Date(), 'EEEE, MMMM do'));
  }, []);

  const handleNewEntry = () => {
    router.push('/journal?new=true');
  };

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-500">{currentDate}</p>
        </div>
        <button
          onClick={handleNewEntry}
          className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          <span>New Entry</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mounted && (
          <>
            <div className="md:col-span-2 lg:col-span-1">
              <MoodTracker />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <TaskOverview />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <DailyInsight />
            </div>
          </>
        )}
      </div>

      {mounted && (
        <div className="col-span-full">
          <InsightEngine />
        </div>
      )}
    </div>
  );
}
