'use client';

import { Layers, Settings, ZoomIn, ZoomOut, Maximize2, RotateCcw, RotateCw, Eye } from 'lucide-react';

interface TopToolbarProps {
    onToggleElementLibrary: () => void;
    onToggleProperties: () => void;
    elementLibraryOpen: boolean;
    propertiesOpen: boolean;
}

export function TopToolbar({
    onToggleElementLibrary,
    onToggleProperties,
    elementLibraryOpen,
    propertiesOpen,
}: TopToolbarProps) {
    return (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-50 flex items-center justify-between px-4">
            {/* Left: Panel Toggles */}
            <div className="flex items-center gap-2">
                <button
                    onClick={onToggleElementLibrary}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${elementLibraryOpen
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    title="Toggle Element Library"
                >
                    <Layers size={18} />
                    <span className="text-sm font-medium">Elements</span>
                </button>

                <button
                    onClick={onToggleProperties}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${propertiesOpen
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    title="Toggle Properties Panel"
                >
                    <Settings size={18} />
                    <span className="text-sm font-medium">Properties</span>
                </button>
            </div>

            {/* Center: Title */}
            <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-gray-900">Portfolio Builder</h1>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                <button
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    title="Zoom Out"
                >
                    <ZoomOut size={18} className="text-gray-600" />
                </button>

                <span className="text-sm font-medium text-gray-600 min-w-[50px] text-center">
                    100%
                </span>

                <button
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    title="Zoom In"
                >
                    <ZoomIn size={18} className="text-gray-600" />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-2"></div>

                <button
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    title="Fit to Screen"
                >
                    <Maximize2 size={18} className="text-gray-600" />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-2"></div>

                <button
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                    title="Preview Mode"
                >
                    <Eye size={18} />
                    <span className="text-sm font-medium">Preview</span>
                </button>
            </div>
        </div>
    );
}
