import { create } from 'zustand';

const useAppStore = create((set) => ({
    user: null,
    isAuthenticated: !!localStorage.getItem('token'),
    setUser: (user) => set({ user, isAuthenticated: true }),
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false });
    },
    theme: 'dark',
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

export default useAppStore;
