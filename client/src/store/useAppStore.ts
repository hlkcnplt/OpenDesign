import { create } from 'zustand';

interface AppState {
  aiProvider: 'GEMINI' | 'OPENAI' | 'LOCAL';
  setAiProvider: (provider: 'GEMINI' | 'OPENAI' | 'LOCAL') => void;
}

export const useAppStore = create<AppState>((set) => ({
  aiProvider: 'LOCAL',
  setAiProvider: (provider) => set({ aiProvider: provider }),
}));
