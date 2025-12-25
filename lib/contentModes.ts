/**
 * Content Mode System for Bento-style Adaptive Widgets
 * Determines content density based on widget size (w × h)
 */

export type ViewMode = 'compact' | 'summary' | 'standard' | 'expanded';

/**
 * Calculate view mode based on tile area (w × h)
 * 
 * Breakpoints:
 * - ≤ 4: compact (icon + title only)
 * - 5-8: summary (icon + title + basic info)
 * - 9-14: standard (title + description + meta)
 * - ≥ 15: expanded (full content + actions)
 */
export function getViewMode(w: number, h: number): ViewMode {
    const area = w * h;

    if (area <= 4) return 'compact';
    if (area <= 8) return 'summary';
    if (area <= 14) return 'standard';
    return 'expanded';
}

/**
 * Widget-specific breakpoints
 * Some widgets may have different thresholds
 */
export const WIDGET_MODE_BREAKPOINTS: Record<string, {
    compact: number;
    summary: number;
    standard: number;
}> = {
    PROJECT: {
        compact: 4,   // 2×2
        summary: 8,   // 3×2 or 2×4
        standard: 14  // 4×3 or 3×4
    },
    SKILLS: {
        compact: 4,   // 2×2
        summary: 6,   // 3×2
        standard: 12  // 4×3
    },
    BIO: {
        compact: 6,   // 3×2
        summary: 12,  // 4×3
        standard: 18  // 6×3
    },
    EXPERIENCE: {
        compact: 4,   // 2×2
        summary: 8,   // 4×2
        standard: 12  // 4×3
    },
    EDUCATION: {
        compact: 4,   // 2×2
        summary: 8,   // 4×2
        standard: 12  // 4×3
    },
    LINK: {
        compact: 4,   // 2×2
        summary: 6,   // 3×2
        standard: 8   // 4×2
    },
    GITHUB: {
        compact: 8,   // 4×2
        summary: 12,  // 4×3
        standard: 16  // 4×4
    },
    IMAGE: {
        compact: 4,   // 2×2
        summary: 9,   // 3×3
        standard: 12  // 4×3
    }
};

/**
 * Get view mode for a specific widget type
 */
export function getWidgetViewMode(widgetType: string, w: number, h: number): ViewMode {
    const breakpoints = WIDGET_MODE_BREAKPOINTS[widgetType];

    if (!breakpoints) {
        // Fallback to default breakpoints
        return getViewMode(w, h);
    }

    const area = w * h;

    if (area <= breakpoints.compact) return 'compact';
    if (area <= breakpoints.summary) return 'summary';
    if (area <= breakpoints.standard) return 'standard';
    return 'expanded';
}

/**
 * Content priority levels for progressive disclosure
 * Lower number = higher priority (shown first)
 */
export const CONTENT_PRIORITY = {
    ICON: 1,
    TITLE: 2,
    STATUS: 3,
    TAGS: 4,
    DESCRIPTION_SHORT: 5,
    DESCRIPTION_FULL: 6,
    METADATA: 7,
    ACTIONS: 8
} as const;
