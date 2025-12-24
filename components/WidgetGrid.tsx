'use client';

import { useEffect, useMemo, useRef } from 'react';
import GridLayout from 'react-grid-layout';
import { useWidgetStore } from '@/lib/useWidgetStore';
import WidgetWrapper from './WidgetWrapper';
import WidgetRenderer from './widgets/WidgetRenderer';
import { Palette, Package } from 'lucide-react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface WidgetGridProps {
    userId: string;
    isEditable: boolean;
}

/**
 * WidgetGrid - Bento.me-style grid with drag-and-drop
 * 
 * Features:
 * - 4-column bento.me grid layout
 * - Locked-ratio resizing (preset sizes only)
 * - Drag and drop in edit mode
 * - Auto-saves position changes
 * - Vertical compaction (top-gravity)
 */
export default function WidgetGrid({ userId, isEditable }: WidgetGridProps) {
    const { widgets, fetchWidgets, moveWidget, resizeWidget, deleteWidget } = useWidgetStore();
    const isInternalUpdate = useRef(false);

    // Fetch widgets on mount
    useEffect(() => {
        fetchWidgets(userId);
    }, [userId, fetchWidgets]);

    // Convert widgets to react-grid-layout format
    const layout = useMemo(() => {
        return widgets.map((widget) => ({
            i: widget.id,
            x: widget.x,
            y: widget.y,
            w: widget.w,
            h: widget.h,
            minW: 1,
            minH: 1,
            maxW: 4, // 4-column grid
        }));
    }, [widgets]);

    // Handle layout change (drag/resize)
    const handleLayoutChange = (newLayout: any) => {
        if (!isEditable || !Array.isArray(newLayout) || isInternalUpdate.current) return;

        // Check if there are actual changes
        let hasChanges = false;

        newLayout.forEach((item: any) => {
            const widget = widgets.find((w) => w.id === item.i);
            if (widget && (widget.x !== item.x || widget.y !== item.y || widget.w !== item.w || widget.h !== item.h)) {
                hasChanges = true;
            }
        });

        if (!hasChanges) return;

        // Mark as internal update to prevent loop
        isInternalUpdate.current = true;

        newLayout.forEach((item: any) => {
            const widget = widgets.find((w) => w.id === item.i);
            if (widget && (widget.x !== item.x || widget.y !== item.y || widget.w !== item.w || widget.h !== item.h)) {
                // Update position and size
                if (widget.x !== item.x || widget.y !== item.y) {
                    moveWidget(widget.id, item.x, item.y);
                }
                if (widget.w !== item.w || widget.h !== item.h) {
                    resizeWidget(widget.id, item.w, item.h);
                }
            }
        });

        // Reset flag after updates
        setTimeout(() => {
            isInternalUpdate.current = false;
        }, 100);
    };

    // Handle widget deletion
    const handleDelete = (widgetId: string) => {
        deleteWidget(widgetId);
    };

    // Enhanced empty state
    if (widgets.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4 max-w-md">
                    <div className="flex justify-center mb-4">
                        {isEditable ? (
                            <Palette className="w-16 h-16 text-gray-400" />
                        ) : (
                            <Package className="w-16 h-16 text-gray-400" />
                        )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                        {isEditable ? 'Start Building Your Portfolio' : 'No Widgets Yet'}
                    </h3>
                    <p className="text-gray-600">
                        {isEditable ? (
                            <>
                                Use the bottom navigation to add your first widget
                            </>
                        ) : (
                            'This portfolio is empty. Check back later!'
                        )}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[800px] mx-auto">
            {/* @ts-ignore - react-grid-layout types are incomplete */}
            <GridLayout
                className="layout"
                layout={layout}
                cols={4}
                rowHeight={188}
                width={800}
                isDraggable={isEditable}
                isResizable={false}
                onLayoutChange={handleLayoutChange}
                draggableHandle=".widget-wrapper"
                margin={[16, 16]}
                containerPadding={[0, 0]}
                compactType="vertical"
                preventCollision={false}
            >
                {widgets.map((widget) => (
                    <div key={widget.id}>
                        <WidgetWrapper
                            widget={widget}
                            isEditable={isEditable}
                            onDelete={() => handleDelete(widget.id)}
                        >
                            <WidgetRenderer widget={widget} isEditable={isEditable} />
                        </WidgetWrapper>
                    </div>
                ))}
            </GridLayout>
        </div>
    );
}
