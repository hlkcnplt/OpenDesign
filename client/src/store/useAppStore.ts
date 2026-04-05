import { create } from 'zustand';
import type { AppStore } from '../types';

export const useAppStore = create<AppStore>((set) => ({
  isSidebarOpen: true,
  isSettingsOpen: false,
  activeTool: 'select',
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setSettingsOpen: (isOpen) => set({ isSettingsOpen: isOpen }),
  setActiveTool: (tool) => set({ activeTool: tool }),
}));

