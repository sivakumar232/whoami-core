/**
 * Widget Size Definitions for 12-Column Bento Grid
 * Maps widget types to their default sizes and constraints
 */

import { GRID_CONFIG } from './gridConstants';

/**
 * Preset widget sizes in 12-column grid
 */
export const WIDGET_SIZES = {
    // Hero widgets (large presence)
    HERO: { w: 6, h: 4 },

    // Standard widgets (medium interaction)
    STANDARD: { w: 4, h: 3 },

    // Compact widgets (read-only)
    COMPACT: { w: 3, h: 2 },

    // Mini widgets (dense stats)
    MINI: { w: 2, h: 2 },

    // Banner widgets (full-width)
    BANNER: { w: 12, h: 2 }
} as const;

/**
 * Default sizes for each widget type
 */
export const WIDGET_TYPE_SIZES: Record<string, { w: number; h: number }> = {
    BIO: { w: 6, h: 4 },        // Hero
    PROJECT: { w: 4, h: 3 },    // Standard
    SKILLS: { w: 3, h: 2 },     // Compact
    LINK: { w: 2, h: 2 },       // Mini
    EXPERIENCE: { w: 4, h: 3 }, // Standard
    EDUCATION: { w: 4, h: 3 },  // Standard
    GITHUB: { w: 6, h: 4 },     // Hero
    IMAGE: { w: 4, h: 3 },      // Standard
    SOCIAL: { w: 2, h: 2 },     // Mini
    CONTACT: { w: 4, h: 2 }     // Compact
};

/**
 * Size constraints for each widget type
 * Updated for flexible custom resizing
 */
export const WIDGET_CONSTRAINTS: Record<string, {
    minW: number;
    minH: number;
    maxW: number;
    maxH: number;
}> = {
    BIO: {
        minW: 3,  // Reduced from 4
        minH: 2,  // Reduced from 3
        maxW: 12, // Increased from 8 - full grid width
        maxH: 12  // Increased from 6
    },
    PROJECT: {
        minW: 2,  // Reduced from 3
        minH: 2,
        maxW: 12, // Increased from 6
        maxH: 12  // Increased from 6
    },
    SKILLS: {
        minW: 2,
        minH: 2,
        maxW: 8,  // Increased from 4
        maxH: 8   // Increased from 4
    },
    LINK: {
        minW: 2,
        minH: 2,
        maxW: 6,  // Increased from 3
        maxH: 6   // Increased from 3
    },
    EXPERIENCE: {
        minW: 2,  // Reduced from 3
        minH: 2,
        maxW: 12, // Increased from 6
        maxH: 12  // Increased from 6
    },
    EDUCATION: {
        minW: 2,  // Reduced from 3
        minH: 2,
        maxW: 12, // Increased from 6
        maxH: 12  // Increased from 6
    },
    GITHUB: {
        minW: 3,  // Reduced from 4
        minH: 2,  // Reduced from 3
        maxW: 12, // Increased from 8
        maxH: 12  // Increased from 6
    },
    IMAGE: {
        minW: 2,
        minH: 2,
        maxW: 12, // Increased from 6
        maxH: 12  // Increased from 6
    },
    SOCIAL: {
        minW: 2,
        minH: 2,
        maxW: 6,  // Increased from 3
        maxH: 6   // Increased from 3
    },
    CONTACT: {
        minW: 2,  // Reduced from 3
        minH: 2,
        maxW: 12, // Increased from 6
        maxH: 8   // Increased from 4
    }
};

/**
 * Get default size for a widget type
 */
export function getDefaultSize(widgetType: string): { w: number; h: number } {
    return WIDGET_TYPE_SIZES[widgetType] || WIDGET_SIZES.STANDARD;
}

/**
 * Get constraints for a widget type
 */
export function getConstraints(widgetType: string) {
    return WIDGET_CONSTRAINTS[widgetType] || {
        minW: GRID_CONFIG.MIN_COMPONENT_WIDTH,
        minH: GRID_CONFIG.MIN_COMPONENT_HEIGHT,
        maxW: GRID_CONFIG.MAX_COMPONENT_WIDTH,
        maxH: GRID_CONFIG.MAX_COMPONENT_HEIGHT
    };
}

/**
 * Validate widget size against constraints
 */
export function validateSize(
    widgetType: string,
    w: number,
    h: number
): { w: number; h: number } {
    const constraints = getConstraints(widgetType);

    return {
        w: Math.max(constraints.minW, Math.min(w, constraints.maxW)),
        h: Math.max(constraints.minH, Math.min(h, constraints.maxH))
    };
}
