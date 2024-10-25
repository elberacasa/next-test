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

  // Rest of the component stays the same