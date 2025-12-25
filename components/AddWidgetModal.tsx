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
                className="neo-modal-backdrop"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="neo-modal">
                <div className="neo-modal-content w-full max-w-4xl">
                    {/* Header */}
                    <div className="neo-modal-header">
                        <div>
                            <h2 className="neo-text-title text-neo-volt">
                                Add Widget
                            </h2>
                            <p className="neo-text-body text-white/60 text-sm mt-1">
                                Choose a widget type to add to your portfolio
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="neo-btn-icon"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Widget Grid */}
                    <div className="neo-modal-body neo-grid neo-grid-3">
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
        </>
    );
}
