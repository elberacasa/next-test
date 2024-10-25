'use client';

import Navigation from './Navigation';
import { FloatingActionButton } from './FloatingActionButton';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

interface LayoutProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: 20,
  },
};

const RootLayout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pb-20 md:pb-0 md:pl-72 transition-all duration-300">
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-8"
        >
          {children}
        </motion.div>
      </main>
      <FloatingActionButton />
    </div>
  );
};

export default RootLayout;
