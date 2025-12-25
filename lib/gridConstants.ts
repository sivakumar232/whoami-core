/**
 * Bento Grid System - Core Constants
 * Defines the fundamental grid configuration
 */

export const GRID_CONFIG = {
    // Grid dimensions
    TOTAL_COLUMNS: 12,
    ROW_HEIGHT: 32,          // pixels
    CONTAINER_WIDTH: 1200,   // pixels

    // Component constraints
    MIN_COMPONENT_WIDTH: 2,
    MIN_COMPONENT_HEIGHT: 2,
    MAX_COMPONENT_WIDTH: 12,
    MAX_COMPONENT_HEIGHT: 8,

    // Layout behavior
    ENABLE_GRAVITY: true,
    PREVENT_COLLISION: true,
    COMPACT_TYPE: 'vertical' as const
} as const;

/**
 * Calculate column width in pixels
 */
export function getColumnWidth(containerWidth: number = GRID_CONFIG.CONTAINER_WIDTH): number {
    return containerWidth / GRID_CONFIG.TOTAL_COLUMNS;
}

/**
 * Convert mouse coordinates to grid coordinates
 */
export function mouseToGrid(
    mouseX: number,
    mouseY: number,
    containerWidth: number = GRID_CONFIG.CONTAINER_WIDTH
): { x: number; y: number } {
    const colWidth = getColumnWidth(containerWidth);
    return {
        x: Math.round(mouseX / colWidth),
        y: Math.round(mouseY / GRID_CONFIG.ROW_HEIGHT)
    };
}

/**
 * Convert grid coordinates to pixel coordinates
 */
export function gridToPixels(
    x: number,
    y: number,
    containerWidth: number = GRID_CONFIG.CONTAINER_WIDTH
): { left: number; top: number } {
    const colWidth = getColumnWidth(containerWidth);
    return {
        left: x * colWidth,
        top: y * GRID_CONFIG.ROW_HEIGHT
    };
}
