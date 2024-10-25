'use client';

import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const actions = [
  { label: 'New Journal Entry', href: '/journal?new=true', color: 'bg-blue-600' },
  { label: 'Quick Task', href: '/tasks?new=true', color: 'bg-green-600' },
  { label: 'Track Mood', href: '/', color: 'bg-purple-600' },
];

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="fixed bottom-24 right-6 md:bottom-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 mb-4 space-y-2"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className={`${action.color} text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 whitespace-nowrap`}
                onClick={() => {
                  setIsOpen(false);
                  router.push(action.href);
                }}
              >
                <span>{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg ${
          isOpen ? 'bg-red-600' : 'bg-blue-600'
        } text-white`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};
