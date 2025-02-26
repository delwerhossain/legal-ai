"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useEffect, useState } from 'react';

interface LanguageState {
  language: 'en' | 'bn';
  setLanguage: (language: 'en' | 'bn') => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useLanguage = () => {
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage } = useLanguageStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    language: mounted ? language : 'en',
    setLanguage: mounted ? setLanguage : () => {},
  };
};