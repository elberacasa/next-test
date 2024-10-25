import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import RootLayout from '@/components/shared/Layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MindFlow - Personal Wellness & Productivity',
  description: 'AI-powered journaling, mood tracking, and task management for better mental wellness',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayout>
          {children}
          <Analytics />
        </RootLayout>
      </body>
    </html>
  );
}
