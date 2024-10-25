'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Battery } from 'lucide-react';
import { useState } from 'react';

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, energyLevel: 1 | 2 | 3) => void;
}

export const TaskDialog = ({ isOpen, onClose, onSubmit }: TaskDialogProps) => {
  const [title, setTitle] = useState('');
  const [energyLevel, setEnergyLevel] = useState<1 | 2 | 3>(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title, energyLevel);
      setTitle('');
      setEnergyLevel(2);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Create New Task</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-primary"
                placeholder="Enter task title"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Energy Level Required
              </label>
              <div className="flex gap-3">
                {[1, 2, 3].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setEnergyLevel(level as 1 | 2 | 3)}
                    className={`flex-1 p-3 rounded-lg border transition-colors flex items-center justify-center gap-2
                      ${energyLevel === level 
                        ? 'border-blue-200 bg-blue-50 text-blue-600' 
                        : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <Battery className={`w-4 h-4 ${level === 1 ? 'rotate-90' : ''}`} />
                    <span className="text-sm">{level === 1 ? 'Low' : level === 2 ? 'Medium' : 'High'}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Task
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
