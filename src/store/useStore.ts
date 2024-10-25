import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface JournalEntry {
  id: string;
  content: string;
  timestamp: Date;
  mood?: number;
  tags?: string[];
}

export interface MoodEntry {
  id: string;
  timestamp: Date;
  mood: 1 | 2 | 3 | 4 | 5;
  note: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  energyLevel: 1 | 2 | 3;
  dueDate?: Date;
}

export interface StoreState {
  moodEntries: MoodEntry[];
  tasks: Task[];
  journalEntries: JournalEntry[];
  addMoodEntry: (mood: number, note: string) => void;
  addTask: (title: string, energyLevel: 1 | 2 | 3, dueDate?: Date) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addJournalEntry: (content: string) => void;
  deleteJournalEntry: (id: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      moodEntries: [],
      tasks: [],
      journalEntries: [],
      addMoodEntry: (mood: number, note: string) =>
        set((state: StoreState) => ({
          moodEntries: [
            ...state.moodEntries,
            {
              id: crypto.randomUUID(),
              timestamp: new Date(),
              mood: mood as 1 | 2 | 3 | 4 | 5,
              note,
            },
          ],
        })),
      addTask: (title: string, energyLevel: 1 | 2 | 3, dueDate?: Date) =>
        set((state: StoreState) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title,
              completed: false,
              energyLevel,
              dueDate,
            },
          ],
        })),
      toggleTask: (id: string) =>
        set((state: StoreState) => ({
          tasks: state.tasks.map((task: Task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      deleteTask: (id: string) =>
        set((state: StoreState) => ({
          tasks: state.tasks.filter(task => task.id !== id)
        })),
      addJournalEntry: (content: string) =>
        set((state: StoreState) => ({
          journalEntries: [
            ...state.journalEntries,
            {
              id: crypto.randomUUID(),
              content,
              timestamp: new Date(),
            },
          ],
        })),
      deleteJournalEntry: (id: string) =>
        set((state: StoreState) => ({
          journalEntries: state.journalEntries.filter(entry => entry.id !== id)
        })),
    }),
    {
      name: 'mindflow-storage',
      partialize: (state) => ({
        moodEntries: state.moodEntries,
        tasks: state.tasks,
        journalEntries: state.journalEntries,
      }),
    }
  )
);
