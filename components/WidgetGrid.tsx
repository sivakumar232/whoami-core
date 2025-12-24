'use client';

import { useEffect, useMemo } from 'react';
import GridLayout from 'react-grid-layout';
import { useWidgetStore } from '@/lib/useWidgetStore';
import WidgetWrapper from './WidgetWrapper';
import WidgetRenderer from './widgets/WidgetRenderer';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface WidgetGridProps {
    userId: string;
    isEditable: boolean;
}

/**
 * WidgetGrid - Main grid container with drag-and-drop support
 * 
 * Features:
 * - Responsive grid layout (12 columns)
 * - Drag and drop in edit mode
 * - Auto-saves position changes
 * - Breakpoints for mobile, tablet, desktop
 */
export default function WidgetGrid({ userId, isEditable }: WidgetGridProps) {
    const { widgets, fetchWidgets, moveWidget, resizeWidget, deleteWidget } = useWidgetStore();

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
            maxW: 12,
        }));
    }, [widgets]);

    // Handle layout change (drag/resize)
    const handleLayoutChange = (newLayout: any[]) => {
        if (!isEditable) return;

        newLayout.forEach((item) => {
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
    };

    // Handle widget deletion
    const handleDelete = (widgetId: string) => {
        if (confirm('Are you sure you want to delete this widget?')) {
            deleteWidget(widgetId);
        }
    };

    // Enhanced empty state
    if (widgets.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4 max-w-md">
                    <div className="text-6xl mb-4">
                        {isEditable ? '🎨' : '📭'}
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                        {isEditable ? 'Start Building Your Portfolio' : 'No Widgets Yet'}
                    </h3>
                    <p className="text-white/60">
                        {isEditable ? (
                            <>
                                Click the <span className="text-blue-400 font-semibold">+ button</span> in the bottom-right corner to add your first widget
                            </>
                        ) : (
                            'This portfolio is empty. Check back later!'
                        )}
                    </p>
                    {isEditable && (
                        <div className="pt-4 space-y-2 text-sm text-white/50">
                            <p>💡 Tip: You can add Bio, Projects, Skills, and more</p>
                            <p>🎯 Drag widgets to rearrange them</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <GridLayout
                className="layout"
                layout={layout}
                cols={12}
                rowHeight={100}
                width={1200}
                isDraggable={isEditable}
                isResizable={isEditable}
                onLayoutChange={handleLayoutChange}
                draggableHandle=".widget-wrapper"
                margin={[16, 16]}
                containerPadding={[0, 0]}
                compactType={null}
            >
                {widgets.map((widget) => (
                    <div key={widget.id}>
                        <WidgetWrapper
                            widget={widget}
                            isEditable={isEditable}
                            onDelete={() => handleDelete(widget.id)}
                        >
                            <WidgetRenderer widget={widget} />
                        </WidgetWrapper>
                    </div>
                ))}
            </GridLayout>
        </div>
    );
}
