'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { WidgetType } from '@/lib/types';
import { useWidgetStore } from '@/lib/useWidgetStore';
import { widgetDefaults, findNextPosition } from '@/lib/widgetDefaults';
import WidgetTypeCard from './WidgetTypeCard';

interface AddWidgetModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
}

/**
 * AddWidgetModal - Modal for selecting and adding new widgets
 */
export default function AddWidgetModal({ isOpen, onClose, userId }: AddWidgetModalProps) {
    const { widgets, addWidget } = useWidgetStore();

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleAddWidget = async (type: WidgetType) => {
        const defaults = widgetDefaults[type];
        const position = findNextPosition(widgets, defaults.w || 4);

        try {
            await addWidget({
                userId,
                type,
                x: position.x,
                y: position.y,
                w: defaults.w || 4,
                h: defaults.h || 3,
                data: defaults.data || {},
            });

            onClose();
        } catch (error) {
            console.error('Failed to add widget:', error);
            alert('Failed to add widget. Please try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-gradient-to-br from-indigo-950/95 via-purple-900/95 to-violet-950/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl animate-scaleIn">
                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 border-b border-white/20 p-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                Add Widget
                            </h2>
                            <p className="text-white/60 text-sm mt-1">
                                Choose a widget type to add to your portfolio
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <X className="text-white" size={24} />
                        </button>
                    </div>

                    {/* Widget Grid */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.values(WidgetType).map((type) => (
                            <WidgetTypeCard
                                key={type}
                                type={type}
                                onClick={() => handleAddWidget(type)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 200ms ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 200ms ease-out;
        }
      `}</style>
        </>
    );
}
