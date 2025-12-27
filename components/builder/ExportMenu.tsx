'use client';

import { Download } from 'lucide-react';
import { useElementStore } from '@/lib/builder/useElementStore';

interface ExportMenuProps {
    userId: string;
}

/**
 * ExportMenu - Export canvas to JSON or HTML
 */
export function ExportMenu({ userId }: ExportMenuProps) {
    const { elements } = useElementStore();

    const exportToJSON = () => {
        const data = {
            version: '1.0',
            userId,
            elements: elements.map(el => ({
                type: el.type,
                x: el.x,
                y: el.y,
                width: el.width,
                height: el.height,
                zIndex: el.zIndex,
                props: el.props,
            })),
            exportedAt: new Date().toISOString(),
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-${userId}-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const exportToHTML = () => {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .canvas { position: relative; width: 100%; min-height: 100vh; background: #f9fafb; }
        .element { position: absolute; }
    </style>
</head>
<body>
    <div class="canvas">
        ${elements.map(el => {
            const style = `left: ${el.x}px; top: ${el.y}px; width: ${el.width}px; height: ${el.height}px; z-index: ${el.zIndex};`;

            switch (el.type) {
                case 'heading':
                    return `<h${el.props.level || 1} class="element" style="${style} color: ${el.props.color || '#000'}; text-align: ${el.props.align || 'left'};">${el.props.text || 'Heading'}</h${el.props.level || 1}>`;
                case 'text_block':
                    return `<p class="element" style="${style} color: ${el.props.color || '#000'}; font-size: ${el.props.fontSize || 16}px; text-align: ${el.props.align || 'left'};">${el.props.content || 'Text'}</p>`;
                case 'button':
                    return `<button class="element" style="${style}">${el.props.text || 'Button'}</button>`;
                case 'image':
                    return `<img class="element" src="${el.props.url || ''}" alt="${el.props.alt || 'Image'}" style="${style} object-fit: ${el.props.fit || 'cover'};">`;
                default:
                    return `<div class="element" style="${style}"></div>`;
            }
        }).join('\n        ')}
    </div>
</body>
</html>`;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-${userId}-${Date.now()}.html`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={exportToJSON}
                className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:border-blue-500 flex items-center gap-2 text-sm"
                title="Export as JSON"
            >
                <Download size={14} />
                JSON
            </button>
            <button
                onClick={exportToHTML}
                className="px-3 py-1.5 bg-white border border-gray-300 rounded hover:border-blue-500 flex items-center gap-2 text-sm"
                title="Export as HTML"
            >
                <Download size={14} />
                HTML
            </button>
        </div>
    );
}
