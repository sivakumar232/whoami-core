'use client';

import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
    onClick: () => void;
    isVisible: boolean;
}

/**
 * FloatingActionButton - FAB for adding widgets
 * Only visible in edit mode
 */
export default function FloatingActionButton({ onClick, isVisible }: FloatingActionButtonProps) {
    if (!isVisible) return null;

    return (
        <button
            onClick={onClick}
            className="fixed bottom-8 right-8 z-30 group"
            title="Add Widget (or press Ctrl+A)"
        >
            {/* Button */}
            <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-blue-500/50">
                    <Plus className="text-white" size={28} strokeWidth={3} />
                </div>

                {/* Pulse animation */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-ping opacity-20"></div>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                    Add Widget
                    <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
            </div>
        </button>
    );
}
