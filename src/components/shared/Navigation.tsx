'use client';

import { Home, BookOpen, ListTodo, Activity } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Dashboard' },
    { href: '/journal', icon: BookOpen, label: 'Journal' },
    { href: '/tasks', icon: ListTodo, label: 'Tasks' },
    { href: '/wellness', icon: Activity, label: 'Wellness' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:top-0 md:bottom-auto md:w-72 md:h-screen md:border-r md:border-t-0 transition-all duration-300">
      <div className="h-16 md:h-20 flex items-center justify-center md:border-b border-gray-200">
        <span className="hidden md:block text-xl font-semibold text-blue-600">MindFlow</span>
      </div>
      <div className="flex justify-around md:flex-col md:p-4 md:space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-center md:justify-start p-3 md:p-4 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'text-blue-600 bg-blue-50 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }
                w-full md:w-full`}
            >
              <Icon className="w-6 h-6 flex-shrink-0" />
              <span className="hidden md:block ml-3 text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
