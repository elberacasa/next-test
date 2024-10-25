'use client';

import { PenLine, Book, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import type { JournalEntry } from '@/store/useStore';

export default function JournalPage() {
  const searchParams = useSearchParams();
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const [entryContent, setEntryContent] = useState('');
  const journalEntries = useStore<JournalEntry[]>((state) => state.journalEntries);
  const addJournalEntry = useStore<(content: string) => void>((state) => state.addJournalEntry);

  useEffect(() => {
    if (searchParams.get('new') === 'true') {
      setShowNewEntryForm(true);
    }
  }, [searchParams]);

  const handleNewEntry = () => {
    setShowNewEntryForm(true);
  };

  const handleSaveEntry = () => {
    if (entryContent.trim()) {
      addJournalEntry(entryContent);
      setEntryContent('');
      setShowNewEntryForm(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Journal</h1>
          <p className="text-sm text-gray-500">Record your thoughts and track your emotional journey</p>
        </div>
        <button
          onClick={handleNewEntry}
          className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <PenLine className="w-4 h-4 mr-2" />
          <span>New Entry</span>
        </button>
      </header>

      {showNewEntryForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">New Journal Entry</h2>
            <button
              onClick={() => setShowNewEntryForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              Cancel
            </button>
          </div>
          <textarea
            className="w-full h-48 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What's on your mind?"
            value={entryContent}
            onChange={(e) => setEntryContent(e.target.value)}
            autoFocus
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSaveEntry}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Entry
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-full lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-6">
                <Book className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold">Recent Entries</h2>
              </div>
              {journalEntries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                  <p className="text-gray-500">No journal entries yet</p>
                  <p className="text-sm text-gray-400">Start writing your first entry</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {journalEntries.slice().reverse().map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {format(new Date(entry.timestamp), 'MMMM d, yyyy - h:mm a')}
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="col-span-full lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Writing Prompts</h2>
              <ul className="space-y-4">
                <li className="p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  What are you grateful for today?
                </li>
                <li className="p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  What&apos;s one thing you&apos;d like to improve?
                </li>
                <li className="p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  Describe your ideal day.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
