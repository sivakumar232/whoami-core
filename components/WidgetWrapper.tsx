'use client';

import { Widget } from '@/lib/types';
import { Trash2, SquareIcon, RectangleHorizontal, RectangleVertical, LayoutGrid, Maximize2 } from 'lucide-react';
import { useRef, useState, cloneElement, ReactElement } from 'react';
import { useWidgetStore } from '@/lib/useWidgetStore';
import { getWidgetSize, getWidgetSizeClass } from '@/lib/widgetSizeUtils';

interface WidgetWrapperProps {
    widget: Widget;
    isEditable: boolean;
    onDelete?: () => void;
    children: React.ReactNode;
}

// Bento.me preset sizes
const PRESET_SIZES = [
    { name: 'Small', icon: SquareIcon, w: 1, h: 1 },
    { name: 'Wide', icon: RectangleHorizontal, w: 2, h: 1 },
    { name: 'Tall', icon: RectangleVertical, w: 1, h: 2 },
    { name: 'Large', icon: LayoutGrid, w: 2, h: 2 },
    { name: 'Banner', icon: Maximize2, w: 4, h: 2 },
];

/**
 * WidgetWrapper - Simple bento.me-style widget with preset resizing
 */
export default function WidgetWrapper({
    widget,
    isEditable,
    onDelete,
    children,
}: WidgetWrapperProps) {
    const { updateWidget, resizeWidget } = useWidgetStore();
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

    const handleResize = async (w: number, h: number) => {
        await resizeWidget(widget.id, w, h);
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
    });

    return (
        <div
            className={`widget-wrapper h-full w-full relative group transition-all duration-300 ${isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
        >
            {/* Preset resize buttons toolbar */}
            {isEditable && (
                <div className="absolute -top-11 left-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex items-center gap-0.5 bg-black rounded-lg p-1">
                        {/* Resize buttons */}
                        {PRESET_SIZES.map(({ name, icon: Icon, w, h }) => (
                            <button
                                key={name}
                                onClick={() => handleResize(w, h)}
                                className="p-2 text-white hover:bg-white/10 rounded transition-colors"
                                title={name}
                            >
                                <Icon size={16} strokeWidth={2} />
                            </button>
                        ))}

                        {/* Divider */}
                        <div className="w-px h-6 bg-white/20 mx-1" />

                        {/* Delete button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete();
                            }}
                            className="p-2 text-white hover:bg-red-500/20 rounded transition-colors"
                            title="Delete"
                        >
                            <Trash2 size={16} strokeWidth={2} />
                        </button>
                    </div>
                </div>
            )}

            {/* Widget card */}
            <div
                className={`h-full w-full rounded-[32px] bg-white border overflow-hidden transition-all duration-200 ${isEditable
                    ? 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                    : 'border-gray-200 hover:shadow-md'
                    }`}
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
