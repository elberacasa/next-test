import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useKeyboardShortcuts = () => {
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if no input/textarea is focused
      if (['input', 'textarea'].includes((e.target as HTMLElement).tagName.toLowerCase())) {
        return;
      }

      // Command/Ctrl + key shortcuts
      if (e.metaKey || e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'j':
            e.preventDefault();
            router.push('/journal?new=true');
            break;
          case 't':
            e.preventDefault();
            router.push('/tasks');
            break;
          case 'w':
            e.preventDefault();
            router.push('/wellness');
            break;
          case 'd':
            e.preventDefault();
            router.push('/');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [router]);
};
