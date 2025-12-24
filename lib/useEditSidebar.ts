'use client';

import { create } from 'zustand';
import { Widget } from './types';

interface EditSidebarStore {
    isOpen: boolean;
    selectedWidget: Widget | null;
    openSidebar: (widget: Widget) => void;
    closeSidebar: () => void;
}

/**
 * Hook to manage edit sidebar state
 * Handles which widget is being edited and sidebar open/close
 */
export const useEditSidebar = create<EditSidebarStore>((set) => ({
    isOpen: false,
    selectedWidget: null,

    openSidebar: (widget: Widget) => {
        set({ isOpen: true, selectedWidget: widget });
    },

    closeSidebar: () => {
        set({ isOpen: false, selectedWidget: null });
    },
}));
