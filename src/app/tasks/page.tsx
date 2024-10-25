'use client';

import { useState, useEffect } from 'react';
import { Plus, Battery, Calendar, Filter } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import type { Task, StoreState } from '@/store/useStore';

const energyLevels = [
  { level: 1, label: 'Low Energy', color: 'text-red-500 bg-red-50' },
  { level: 2, label: 'Medium Energy', color: 'text-yellow-500 bg-yellow-50' },
  { level: 3, label: 'High Energy', color: 'text-green-500 bg-green-50' },
] as const;

export default function TasksPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null);
  const tasks = useStore<Task[]>((state) => state.tasks);
  const addTask = useStore<(title: string, energyLevel: 1 | 2 | 3, dueDate?: Date) => void>((state) => state.addTask);
  const toggleTask = useStore<(id: string) => void>((state) => state.toggleTask);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredTasks = selectedEnergy 
    ? tasks.filter((task: Task) => task.energyLevel === selectedEnergy)
    : tasks;

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-sm text-gray-500">Organize your tasks based on energy levels</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const title = window.prompt('Enter task title:');
            if (title) addTask(title, 2);
          }}
          className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span>New Task</span>
        </motion.button>
      </header>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Filters */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => setSelectedEnergy(null)}
                className={`w-full p-3 rounded-lg transition-colors text-left
                  ${!selectedEnergy ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
              >
                All Tasks
              </button>
              {energyLevels.map(({ level, label, color }) => (
                <button
                  key={level}
                  onClick={() => setSelectedEnergy(level)}
                  className={`w-full p-3 rounded-lg transition-colors text-left flex items-center space-x-2
                    ${selectedEnergy === level ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  <Battery className={`w-4 h-4 ${level === 1 ? 'rotate-90' : ''}`} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="md:col-span-3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold">Task List</h2>
              </div>
              <span className="text-sm text-gray-500">
                {filteredTasks.length} tasks
              </span>
            </div>
            
            {filteredTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                <p className="text-gray-500">No tasks found</p>
                <p className="text-sm text-gray-400">Create a new task to get started</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {filteredTasks.map((task) => (
                  <motion.li
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className={task.completed ? 'line-through text-gray-400' : ''}>
                      {task.title}
                    </span>
                    <span className={`ml-auto px-3 py-1 rounded-full text-xs ${energyLevels[task.energyLevel - 1].color}`}>
                      {energyLevels[task.energyLevel - 1].label}
                    </span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
