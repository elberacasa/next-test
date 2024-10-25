'use client';

import { motion } from 'framer-motion';

export const LoadingSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-8 w-48 bg-gray-200 rounded-lg"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className="h-4 w-32 bg-gray-200 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64"
          >
            <div className="h-4 w-32 bg-gray-200 rounded-lg mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded-lg" />
              <div className="h-4 w-3/4 bg-gray-200 rounded-lg" />
              <div className="h-4 w-5/6 bg-gray-200 rounded-lg" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
