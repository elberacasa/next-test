'use client';

import { useStore } from '@/store/useStore';
import { CheckCircle, Circle, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Task } from '@/store/useStore';
import { TaskDialog } from '@/components/shared/TaskDialog';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useState } from 'react';

const TaskOverview = () => {
  const tasks = useStore<Task[]>((state) => state.tasks);
  const toggleTask = useStore<(id: string) => void>((state) => state.toggleTask);
  const addTask = useStore<(title: string, energyLevel: 1 | 2 | 3, dueDate?: Date) => void>((state) => state.addTask);
  const deleteTask = useStore<(id: string) => void>((state) => state.deleteTask);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const incompleteTasks = tasks.filter((task) => !task.completed).slice(0, 3);

  const handleAddTask = () => {
    setShowTaskDialog(true);
  };

  const handleDeleteTask = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    setTaskToDelete(taskId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      setTaskToDelete(null);
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full hover-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Today&apos;s Tasks</h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddTask}
            className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        <AnimatePresence mode="popLayout">
          {incompleteTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-8 text-center space-y-3"
            >
              <p className="text-gray-500">No pending tasks</p>
              <p className="text-sm text-gray-400">Click the plus icon to add a task</p>
            </motion.div>
          ) : (
            <ul className="space-y-4">
              {incompleteTasks.map((task, index) => (
                <motion.li
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleTask(task.id)}
                    className="text-gray-400 group-hover:text-blue-600 transition-colors"
                  >
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </motion.button>
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleDeleteTask(e, task.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          )}
        </AnimatePresence>
      </div>

      <TaskDialog
        isOpen={showTaskDialog}
        onClose={() => setShowTaskDialog(false)}
        onSubmit={(title, energyLevel) => addTask(title, energyLevel)}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setTaskToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </>
  );
};

export default TaskOverview;
