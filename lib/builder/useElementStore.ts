import { create } from 'zustand';
import { ElementData, CreateElementInput, UpdateElementInput } from './types';
import '../builder/flushOnUnload'; // Flush pending saves on page unload

interface HistoryEntry {
    type: 'add' | 'delete' | 'update';
    elementId: string;
    before?: ElementData;
    after?: ElementData;
}

interface ElementStore {
    elements: ElementData[];
    selectedId: string | null;
    isLoading: boolean;
    error: string | null;

    // History
    history: HistoryEntry[];
    historyIndex: number;

    // Clipboard
    clipboard: ElementData | null;

    setElements: (elements: ElementData[]) => void;
    setSelectedId: (id: string | null) => void;
    fetchElements: (userId: string) => Promise<void>;
    addElement: (element: CreateElementInput) => Promise<void>;
    updateElement: (id: string, updates: UpdateElementInput) => Promise<void>;
    deleteElement: (id: string) => Promise<void>;

    // History actions
    addToHistory: (entry: HistoryEntry) => void;
    undo: () => void;
    redo: () => void;
    canUndo: () => boolean;
    canRedo: () => boolean;

    // Clipboard actions
    copyElement: (id: string) => void;
    pasteElement: (userId: string) => Promise<void>;
    duplicateElement: (id: string, userId: string) => Promise<void>;
}

const MAX_HISTORY = 50;

export const useElementStore = create<ElementStore>((set, get) => ({
    elements: [],
    selectedId: null,
    isLoading: false,
    error: null,
    history: [],
    historyIndex: -1,
    clipboard: null,

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
        // Check if element exists first
        const elementExists = get().elements.find(el => el.id === id);
        if (!elementExists) {
            console.error('Element not found:', id);
            return;
        }

        // 1. OPTIMISTIC UPDATE - Update UI instantly
        const previousElements = get().elements;
        set((state) => ({
            elements: state.elements.map((el) =>
                el.id === id ? { ...el, ...updates } : el
            ),
        }));

        // 2. DEBOUNCED SAVE - Batch updates and save after 300ms
        const saveKey = `save_${id}`;

        // Clear existing timer for this element
        if ((globalThis as any)[saveKey]) {
            clearTimeout((globalThis as any)[saveKey]);
        }

        // Merge with pending updates
        const pendingKey = `pending_${id}`;
        const existingPending = (globalThis as any)[pendingKey] || {};
        const mergedUpdates = { ...existingPending, ...updates };
        (globalThis as any)[pendingKey] = mergedUpdates;

        // Set new debounced timer (300ms)
        (globalThis as any)[saveKey] = setTimeout(async () => {
            const finalUpdates = (globalThis as any)[pendingKey];

            try {
                const response = await fetch('/api/elements', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, ...finalUpdates }),
                });

                if (!response.ok) {
                    let errorData;
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        errorData = await response.json().catch(() => ({}));
                    } else {
                        const text = await response.text();
                        console.error('Update failed (non-JSON):', response.status, text);
                        throw new Error(`Update failed: ${response.status}`);
                    }
                    console.error('Update failed:', errorData);
                    throw new Error(errorData.error || 'Failed to update element');
                }

                // Clear pending updates on success
                delete (globalThis as any)[pendingKey];
                delete (globalThis as any)[saveKey];

                console.log(`✅ Saved element ${id} with updates:`, finalUpdates);
            } catch (error) {
                // Revert on error
                set({ elements: previousElements });
                console.error('Error updating element:', error);
                delete (globalThis as any)[pendingKey];
                delete (globalThis as any)[saveKey];
            }
        }, 300); // 300ms debounce delay
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

    // History management
    addToHistory: (entry: HistoryEntry) => {
        const { history, historyIndex } = get();
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(entry);

        // Limit history size
        if (newHistory.length > MAX_HISTORY) {
            newHistory.shift();
        }

        set({
            history: newHistory,
            historyIndex: newHistory.length - 1,
        });
    },

    undo: () => {
        const { history, historyIndex, elements } = get();
        if (historyIndex < 0) return;

        const entry = history[historyIndex];
        let newElements = [...elements];

        switch (entry.type) {
            case 'add':
                // Remove the added element
                newElements = newElements.filter(el => el.id !== entry.elementId);
                break;
            case 'delete':
                // Restore the deleted element
                if (entry.before) {
                    newElements.push(entry.before);
                }
                break;
            case 'update':
                // Revert to before state
                if (entry.before) {
                    newElements = newElements.map(el =>
                        el.id === entry.elementId ? entry.before! : el
                    );
                }
                break;
        }

        set({
            elements: newElements,
            historyIndex: historyIndex - 1,
        });
    },

    redo: () => {
        const { history, historyIndex, elements } = get();
        if (historyIndex >= history.length - 1) return;

        const entry = history[historyIndex + 1];
        let newElements = [...elements];

        switch (entry.type) {
            case 'add':
                // Re-add the element
                if (entry.after) {
                    newElements.push(entry.after);
                }
                break;
            case 'delete':
                // Re-delete the element
                newElements = newElements.filter(el => el.id !== entry.elementId);
                break;
            case 'update':
                // Apply the after state
                if (entry.after) {
                    newElements = newElements.map(el =>
                        el.id === entry.elementId ? entry.after! : el
                    );
                }
                break;
        }

        set({
            elements: newElements,
            historyIndex: historyIndex + 1,
        });
    },

    canUndo: () => get().historyIndex >= 0,
    canRedo: () => get().historyIndex < get().history.length - 1,

    // Clipboard actions
    copyElement: (id: string) => {
        const element = get().elements.find(el => el.id === id);
        if (element) {
            set({ clipboard: element });
        }
    },

    pasteElement: async (userId: string) => {
        const { clipboard, elements } = get();
        if (!clipboard) return;

        // Create new element with offset position
        const newElement: CreateElementInput = {
            userId,
            type: clipboard.type,
            x: clipboard.x + 20,
            y: clipboard.y + 20,
            width: clipboard.width,
            height: clipboard.height,
            zIndex: elements.length,
            props: { ...clipboard.props },
        };

        await get().addElement(newElement);
    },

    duplicateElement: async (id: string, userId: string) => {
        get().copyElement(id);
        await get().pasteElement(userId);
    },
}));
