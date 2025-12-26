'use client';

import { Widget } from '@/lib/types';
import { Trash2 } from 'lucide-react';
import { useRef, useState, cloneElement, ReactElement } from 'react';
import { useWidgetStore } from '@/lib/useWidgetStore';
import { getWidgetSize, getWidgetSizeClass } from '@/lib/widgetSizeUtils';

interface WidgetWrapperProps {
    widget: Widget;
    isEditable: boolean;
    onDelete?: () => void;
    children: React.ReactNode;
}

/**
 * WidgetWrapper - Widget container with drag-to-resize functionality
 */
export default function WidgetWrapper({
    widget,
    isEditable,
    onDelete,
    children,
}: WidgetWrapperProps) {
    const { updateWidget } = useWidgetStore();
    const contentRef = useRef<HTMLDivElement>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const widgetSize = getWidgetSize(widget);
    const sizeClass = getWidgetSizeClass(widget);

    // Auto-save on blur
    const handleBlur = async () => {
        if (!isEditable || !contentRef.current) return;

        const textElements = contentRef.current.querySelectorAll('[contenteditable="true"]');
        const updatedData = { ...widget.data };

        textElements.forEach((el) => {
            const field = el.getAttribute('data-field');
            if (field) {
                (updatedData as any)[field] = el.textContent || '';
            }
        });

        try {
            await updateWidget(widget.id, { data: updatedData });
        } catch (error) {
            console.error('Failed to save:', error);
        }
    };

    const handleDelete = () => {
        setIsDeleting(true);
        setTimeout(() => {
            onDelete?.();
        }, 300);
    };

    // Map internal size to widget-expected size prop
    const sizeMap: Record<string, 'square' | 'rectangle' | 'vertical' | 'hero'> = {
        'small': 'square',
        'wide': 'rectangle',
        'tall': 'vertical',
        'large': 'hero',
        'banner': 'hero',
    };
    const sizeProp = sizeMap[widgetSize] || 'square';

    // Clone children and pass w, h props for content-aware rendering
    const childrenWithProps = cloneElement(children as ReactElement, {
        w: widget.w,
        h: widget.h,
        size: sizeProp, // Keep for backward compatibility
    } as any);

    return (
        <div
            className={`widget-wrapper h-full w-full relative group transition-all duration-300 ${isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
        >
            {/* Delete button - Simple top-right position */}
            {isEditable && (
                <div className="absolute -top-3 -right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                        className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                        title="Delete Widget"
                    >
                        <Trash2 size={16} strokeWidth={2} />
                    </button>
                </div>
            )}

            {/* Widget card */}
            <div
                className={`h-full w-full rounded-[32px] border-2 overflow-hidden transition-all duration-200 ${isEditable
                        ? 'border-gray-200 hover:border-blue-400 hover:shadow-lg'
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                style={{
                    backgroundColor: 'var(--theme-widget-bg, #ffffff)',
                    color: 'var(--theme-text-color, #000000)',
                }}
            >
                {/* Widget content */}
                <div
                    ref={contentRef}
                    className={`h-full w-full overflow-hidden ${sizeClass}`}
                    onBlur={handleBlur}
                >
                    {childrenWithProps}
                </div>
            </div>
        </div>
    );
}
