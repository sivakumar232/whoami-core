import { create } from 'zustand';
import { Widget, CreateWidgetInput, UpdateWidgetInput } from './types';

/**
 * Widget Store Interface
 * Defines the shape of our Zustand store
 */
interface WidgetStore {
    // State
    widgets: Widget[];
    isLoading: boolean;
    error: string | null;

    // Actions
    setWidgets: (widgets: Widget[]) => void;
    addWidget: (widget: CreateWidgetInput) => Promise<void>;
    updateWidget: (id: string, updates: UpdateWidgetInput) => Promise<void>;
    deleteWidget: (id: string) => Promise<void>;
    moveWidget: (id: string, x: number, y: number) => Promise<void>;
    resizeWidget: (id: string, w: number, h: number) => Promise<void>;
    clearWidgets: () => void;
    fetchWidgets: (userId: string) => Promise<void>;
}

/**
 * Zustand Store for Widget Management
 * 
 * This store manages all widget state and provides actions for CRUD operations.
 * It integrates with the API layer to persist changes to the database.
 * 
 * Usage:
 * ```tsx
 * const { widgets, addWidget, updateWidget } = useWidgetStore();
 * ```
 */
export const useWidgetStore = create<WidgetStore>((set, get) => ({
    // Initial state
    widgets: [],
    isLoading: false,
    error: null,

    /**
     * Set widgets directly (used for initial load)
     */
    setWidgets: (widgets) => set({ widgets, error: null }),

    /**
     * Fetch widgets from the API
     */
    fetchWidgets: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`/api/widgets?userId=${userId}`);
            if (!response.ok) throw new Error('Failed to fetch widgets');

            const data = await response.json();
            set({ widgets: data.widgets, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Unknown error',
                isLoading: false
            });
        }
    },

    /**
     * Add a new widget
     * Optimistically updates UI, then syncs with server
     */
    addWidget: async (widget: CreateWidgetInput) => {
        // Create temporary ID for optimistic update
        const tempId = `temp-${Date.now()}`;
        const optimisticWidget: Widget = {
            ...widget,
            id: tempId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Optimistic update
        set((state) => ({
            widgets: [...state.widgets, optimisticWidget],
        }));

        try {
            const response = await fetch('/api/widgets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(widget),
            });

            if (!response.ok) throw new Error('Failed to add widget');

            const data = await response.json();

            // Replace temporary widget with real one from server
            set((state) => ({
                widgets: state.widgets.map((w) =>
                    w.id === tempId ? data.widget : w
                ),
                error: null,
            }));
        } catch (error) {
            // Rollback on error
            set((state) => ({
                widgets: state.widgets.filter((w) => w.id !== tempId),
                error: error instanceof Error ? error.message : 'Unknown error',
            }));
            throw error;
        }
    },

    /**
     * Update an existing widget
     * Optimistically updates UI, then syncs with server
     */
    updateWidget: async (id: string, updates: UpdateWidgetInput) => {
        // Store previous state for rollback
        const previousWidgets = get().widgets;

        // Optimistic update
        set((state) => ({
            widgets: state.widgets.map((w) =>
                w.id === id ? { ...w, ...updates, updatedAt: new Date() } : w
            ),
        }));

        try {
            const response = await fetch('/api/widgets', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...updates }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                console.error('Widget update failed:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorData,
                });
                throw new Error(`Failed to update widget: ${errorData.error || response.statusText}`);
            }

            const data = await response.json();

            // Update with server response
            set((state) => ({
                widgets: state.widgets.map((w) =>
                    w.id === id ? data.widget : w
                ),
                error: null,
            }));
        } catch (error) {
            console.error('Failed to update widget:', error);
            // Rollback on error
            set({
                widgets: previousWidgets,
                error: error instanceof Error ? error.message : 'Unknown error',
            });
            // Don't throw - just log the error to avoid breaking the UI
            console.warn('Widget update failed, changes reverted');
        }
    },

    /**
     * Delete a widget
     * Optimistically removes from UI, then syncs with server
     */
    deleteWidget: async (id: string) => {
        // Store previous state for rollback
        const previousWidgets = get().widgets;

        // Optimistic update
        set((state) => ({
            widgets: state.widgets.filter((w) => w.id !== id),
        }));

        try {
            const response = await fetch(`/api/widgets?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete widget');

            set({ error: null });
        } catch (error) {
            // Rollback on error
            set({
                widgets: previousWidgets,
                error: error instanceof Error ? error.message : 'Unknown error',
            });
            throw error;
        }
    },

    /**
     * Move a widget to a new position
     * Convenience method that calls updateWidget
     */
    moveWidget: async (id: string, x: number, y: number) => {
        try {
            return await get().updateWidget(id, { x, y });
        } catch (error) {
            // Error already handled in updateWidget, just log it
            console.error('Failed to move widget:', error);
        }
    },

    /**
     * Resize a widget
     * Convenience method that calls updateWidget
     */
    resizeWidget: async (id: string, w: number, h: number) => {
        try {
            return await get().updateWidget(id, { w, h });
        } catch (error) {
            // Error already handled in updateWidget, just log it
            console.error('Failed to resize widget:', error);
        }
    },

    /**
     * Clear all widgets from the store
     * Used when logging out or switching users
     */
    clearWidgets: () => set({ widgets: [], error: null }),
}));
