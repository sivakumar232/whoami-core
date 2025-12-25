/**
 * Bento Grid Engine
 * Core logic for collision detection, gravity, and auto-placement
 */

import { GRID_CONFIG } from './gridConstants';

export interface GridComponent {
    id: string;
    x: number;  // column index (0-based)
    y: number;  // row index (0-based)
    w: number;  // width in columns
    h: number;  // height in rows
}

/**
 * Collision Detection using AABB (Axis-Aligned Bounding Box)
 */
export function collides(a: GridComponent, b: GridComponent): boolean {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

/**
 * Check if a component fits at given position without collisions
 */
export function fits(
    x: number,
    y: number,
    w: number,
    h: number,
    components: GridComponent[],
    excludeId?: string
): boolean {
    // Check bounds
    if (x < 0 || y < 0) return false;
    if (x + w > GRID_CONFIG.TOTAL_COLUMNS) return false;

    // Check collisions with other components
    const testRect: GridComponent = { id: 'test', x, y, w, h };
    return !components.some(comp =>
        comp.id !== excludeId && collides(testRect, comp)
    );
}

/**
 * Find next available position using top-left gravity packing
 */
export function findNextPosition(
    w: number,
    h: number,
    components: GridComponent[]
): { x: number; y: number } {
    // Try to place as high and left as possible
    for (let y = 0; y < 1000; y++) { // Practical limit
        for (let x = 0; x <= GRID_CONFIG.TOTAL_COLUMNS - w; x++) {
            if (fits(x, y, w, h, components)) {
                return { x, y };
            }
        }
    }

    // Fallback to bottom
    return { x: 0, y: 0 };
}

/**
 * Check if component can move down one row
 */
export function canMoveDown(
    comp: GridComponent,
    others: GridComponent[]
): boolean {
    if (comp.y === 0) return false;

    const testPos: GridComponent = { ...comp, y: comp.y - 1 };
    return !others.some(other =>
        other.id !== comp.id && collides(testPos, other)
    );
}

/**
 * Apply gravity - move all components down to eliminate vertical gaps
 */
export function applyGravity(components: GridComponent[]): GridComponent[] {
    if (!GRID_CONFIG.ENABLE_GRAVITY) return components;

    let changed = true;
    const result = components.map(c => ({ ...c })); // Deep copy

    // Sort by y position (top to bottom) to apply gravity correctly
    result.sort((a, b) => a.y - b.y);

    while (changed) {
        changed = false;

        for (const comp of result) {
            // Try to move down as far as possible
            while (canMoveDown(comp, result)) {
                comp.y -= 1;
                changed = true;
            }
        }
    }

    return result;
}

/**
 * Find all components that collide with given component
 */
export function findCollisions(
    comp: GridComponent,
    others: GridComponent[]
): GridComponent[] {
    return others.filter(other =>
        other.id !== comp.id && collides(comp, other)
    );
}

/**
 * Push colliding components down
 */
export function pushDown(
    components: GridComponent[],
    colliding: GridComponent[]
): void {
    for (const comp of colliding) {
        comp.y += 1;

        // Recursively push down any new collisions
        const newCollisions = findCollisions(comp, components);
        if (newCollisions.length > 0) {
            pushDown(components, newCollisions);
        }
    }
}

/**
 * Clamp component to grid bounds
 */
export function clampToGrid(comp: GridComponent): GridComponent {
    return {
        ...comp,
        x: Math.max(0, Math.min(comp.x, GRID_CONFIG.TOTAL_COLUMNS - comp.w)),
        y: Math.max(0, comp.y),
        w: Math.max(GRID_CONFIG.MIN_COMPONENT_WIDTH, Math.min(comp.w, GRID_CONFIG.MAX_COMPONENT_WIDTH)),
        h: Math.max(GRID_CONFIG.MIN_COMPONENT_HEIGHT, Math.min(comp.h, GRID_CONFIG.MAX_COMPONENT_HEIGHT))
    };
}

/**
 * Compact layout by applying gravity to all components
 */
export function compactLayout(components: GridComponent[]): GridComponent[] {
    return applyGravity(components);
}

/**
 * Remap layout when grid columns change (responsive)
 */
export function remapLayout(
    components: GridComponent[],
    oldCols: number,
    newCols: number
): GridComponent[] {
    const scale = newCols / oldCols;

    return components.map(comp => {
        const newComp = {
            ...comp,
            x: Math.floor(comp.x * scale),
            w: Math.ceil(comp.w * scale)
        };

        // Ensure component fits in new grid
        newComp.x = Math.min(newComp.x, newCols - newComp.w);
        newComp.w = Math.min(newComp.w, newCols);

        return newComp;
    });
}
