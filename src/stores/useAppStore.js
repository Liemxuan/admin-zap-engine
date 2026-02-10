import { create } from 'zustand';
import { STORAGE_KEYS } from '../utils/const';

const useAppStore = create((set) => ({
    user: null,
    isAuthenticated: !!localStorage.getItem(STORAGE_KEYS.TOKEN),
    setUser: (user) => set({ user, isAuthenticated: true }),
    logout: () => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        set({ user: null, isAuthenticated: false });
    },
    theme: 'dark',
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

export default useAppStore;
