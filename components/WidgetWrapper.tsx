'use client';

import { Widget } from '@/lib/types';
import { X } from 'lucide-react';

interface WidgetWrapperProps {
    widget: Widget;
    isEditable: boolean;
    onDelete?: () => void;
    children: React.ReactNode;
}

/**
 * WidgetWrapper - Reusable wrapper for all widget types
 * 
 * Provides:
 * - Glassmorphism styling
 * - Edit controls (delete button)
 * - Hover effects
 * - Consistent padding and layout
 */
export default function WidgetWrapper({
    widget,
    isEditable,
    onDelete,
    children,
}: WidgetWrapperProps) {
    return (
        <div className="widget-wrapper h-full w-full relative group">
            {/* Glassmorphism card */}
            <div className="h-full w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl overflow-hidden transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl">

                {/* Edit controls - only visible in edit mode */}
                {isEditable && (
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            onClick={onDelete}
                            className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110"
                            title="Delete widget"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* Widget content */}
                <div className="h-full w-full p-4 overflow-auto">
                    {children}
                </div>
            </div>

            {/* Drag handle indicator - only visible in edit mode */}
            {isEditable && (
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-50 transition-opacity duration-200 pointer-events-none">
                    <div className="flex gap-0.5">
                        <div className="w-1 h-1 rounded-full bg-white"></div>
                        <div className="w-1 h-1 rounded-full bg-white"></div>
                        <div className="w-1 h-1 rounded-full bg-white"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
