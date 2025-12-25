/**
 * Hook for calculating content mode based on widget size
 * Recalculates when w or h changes (during resize)
 */

import { useMemo } from 'react';
import { getWidgetViewMode, ViewMode } from '@/lib/contentModes';

export function useContentMode(widgetType: string, w: number, h: number): ViewMode {
    return useMemo(() => {
        return getWidgetViewMode(widgetType, w, h);
    }, [widgetType, w, h]);
}
