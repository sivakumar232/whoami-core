import { Widget } from './types';

/**
 * Determine widget size category based on bento.me dimensions
 */
export function getWidgetSize(widget: Widget): 'small' | 'wide' | 'tall' | 'large' | 'banner' {
    const { w, h } = widget;

    // Exact bento.me sizes
    if (w === 1 && h === 1) return 'small';   // 1×1 square
    if (w === 2 && h === 1) return 'wide';    // 2×1 wide rectangle
    if (w === 1 && h === 2) return 'tall';    // 1×2 tall rectangle
    if (w === 2 && h === 2) return 'large';   // 2×2 large square
    if (w === 4 && h === 2) return 'banner';  // 4×2 banner

    // Fallback logic
    if (w === h) return w === 1 ? 'small' : 'large';
    if (w > h) return w >= 4 ? 'banner' : 'wide';
    return 'tall'; // h > w
}

/**
 * Get CSS class for widget size
 */
export function getWidgetSizeClass(widget: Widget): string {
    const size = getWidgetSize(widget);
    return `widget-size-${size}`;
}
