import { create } from 'zustand';
import { ElementData, CreateElementInput, UpdateElementInput } from './types';

interface ElementStore {
    elements: ElementData[];
    selectedId: string | null;
    isLoading: boolean;
    error: string | null;

    setElements: (elements: ElementData[]) => void;
    setSelectedId: (id: string | null) => void;
    fetchElements: (userId: string) => Promise<void>;
    addElement: (element: CreateElementInput) => Promise<void>;
    updateElement: (id: string, updates: UpdateElementInput) => Promise<void>;
    deleteElement: (id: string) => Promise<void>;
}

export const useElementStore = create<ElementStore>((set, get) => ({
    elements: [],
    selectedId: null,
    isLoading: false,
    error: null,

    setElements: (elements) => set({ elements }),
    setSelectedId: (id) => set({ selectedId: id }),

    fetchElements: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`/api/elements?userId=${userId}`);
            if (!response.ok) throw new Error('Failed to fetch elements');

            const { elements } = await response.json();
            set({ elements: elements || [], isLoading: false });
        } catch (error) {
            console.error('Error fetching elements:', error);
            set({ error: 'Failed to fetch elements', isLoading: false, elements: [] });
        }
    },

    addElement: async (element: CreateElementInput) => {
        try {
            const response = await fetch('/api/elements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(element),
            });

            if (!response.ok) throw new Error('Failed to add element');

            const { element: newElement } = await response.json();
            set((state) => ({
                elements: [...state.elements, newElement],
                selectedId: newElement.id,
            }));
        } catch (error) {
            console.error('Error adding element:', error);
            set({ error: 'Failed to add element' });
            throw error;
        }
    },

    updateElement: async (id: string, updates: UpdateElementInput) => {
        // Optimistic update
        const previousElements = get().elements;
        set((state) => ({
            elements: state.elements.map((el) =>
                el.id === id ? { ...el, ...updates } : el
            ),
        }));

        try {
            const response = await fetch('/api/elements', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...updates }),
            });

            if (!response.ok) throw new Error('Failed to update element');
        } catch (error) {
            // Revert on error
            set({ elements: previousElements });
            console.error('Error updating element:', error);
            set({ error: 'Failed to update element' });
            throw error;
        }
    },

    deleteElement: async (id: string) => {
        // Optimistic delete
        const previousElements = get().elements;
        set((state) => ({
            elements: state.elements.filter((el) => el.id !== id),
            selectedId: state.selectedId === id ? null : state.selectedId,
        }));

        try {
            const response = await fetch(`/api/elements?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete element');
        } catch (error) {
            // Revert on error
            set({ elements: previousElements });
            console.error('Error deleting element:', error);
            set({ error: 'Failed to delete element' });
            throw error;
        }
    },
}));
