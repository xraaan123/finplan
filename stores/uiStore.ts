import { create } from 'zustand';

interface UIState {
  loading: boolean;
  message: string;
  showLoader: (message?: string) => void;
  hideLoader: () => void;

  drawerOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
}

export const useLoaderStore = create<UIState>((set) => ({
  // Loader
  loading: false,
  message: '',
  showLoader: (msg = 'Loading...') => set({ loading: true, message: msg }),
  hideLoader: () => set({ loading: false, message: '' }),

  // Drawer
  drawerOpen: false,
  toggleDrawer: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
  closeDrawer: () => set({ drawerOpen: false }),
}));
