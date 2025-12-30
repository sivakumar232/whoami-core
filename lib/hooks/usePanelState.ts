'use client';

import { useState, useEffect } from 'react';

interface PanelPosition {
    x: number;
    y: number;
}

interface PanelState {
    isOpen: boolean;
    position: PanelPosition;
}

interface PanelsState {
    elementLibrary: PanelState;
    properties: PanelState;
}

const STORAGE_KEY = 'portfolio-panels';

const DEFAULT_STATE: PanelsState = {
    elementLibrary: {
        isOpen: true,
        position: { x: 20, y: 80 },
    },
    properties: {
        isOpen: true,
        position: { x: typeof window !== 'undefined' ? window.innerWidth - 320 : 1600, y: 80 },
    },
};

export function usePanelState() {
    const [panels, setPanels] = useState<PanelsState>(DEFAULT_STATE);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setPanels(parsed);
            }
        } catch (error) {
            console.warn('Failed to load panel state:', error);
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(panels));
        } catch (error) {
            console.warn('Failed to save panel state:', error);
        }
    }, [panels]);

    const togglePanel = (panel: keyof PanelsState) => {
        setPanels((prev) => ({
            ...prev,
            [panel]: {
                ...prev[panel],
                isOpen: !prev[panel].isOpen,
            },
        }));
    };

    const updatePosition = (panel: keyof PanelsState, position: PanelPosition) => {
        setPanels((prev) => ({
            ...prev,
            [panel]: {
                ...prev[panel],
                position,
            },
        }));
    };

    const resetPanels = () => {
        setPanels(DEFAULT_STATE);
    };

    return {
        panels,
        togglePanel,
        updatePosition,
        resetPanels,
    };
}
