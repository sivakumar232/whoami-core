'use client';

import { useState } from 'react';
import { Edit3, Eye, Palette } from 'lucide-react';
import { useEditMode } from '@/lib/useEditMode';
import WidgetGrid from './WidgetGrid';
import ProfileHeader from './ProfileHeader';
import WidgetBottomNav from './WidgetBottomNav';

interface UserPortfolioProps {
    profileOwner: {
        id: string;
        username: string;
        email: string;
    };
    isOwner: boolean;
}

/**
 * UserPortfolio - Main client component for user portfolio page
 * Redesigned with fixed header, inline editing, and bottom nav
 */
export default function UserPortfolio({ profileOwner, isOwner }: UserPortfolioProps) {
    const { isEditMode, toggleEditMode, canEdit } = useEditMode(isOwner);
    const [bgColor, setBgColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#000000');
    const [widgetBgColor, setWidgetBgColor] = useState('#ffffff');
    const [showThemePanel, setShowThemePanel] = useState(false);

    // Preset color options
    const bgPresets = [
        { name: 'White', color: '#ffffff' },
        { name: 'Light Gray', color: '#f3f4f6' },
        { name: 'Dark', color: '#1f2937' },
        { name: 'Blue', color: '#dbeafe' },
        { name: 'Purple', color: '#f3e8ff' },
        { name: 'Pink', color: '#fce7f3' },
    ];

    const textPresets = [
        { name: 'Black', color: '#000000' },
        { name: 'Dark Gray', color: '#374151' },
        { name: 'White', color: '#ffffff' },
        { name: 'Blue', color: '#1e40af' },
        { name: 'Purple', color: '#7c3aed' },
    ];

    const widgetBgPresets = [
        { name: 'White', color: '#ffffff' },
        { name: 'Light', color: '#f9fafb' },
        { name: 'Gray', color: '#e5e7eb' },
        { name: 'Blue', color: '#eff6ff' },
        { name: 'Purple', color: '#faf5ff' },
        { name: 'Dark', color: '#111827' },
    ];

    return (
        <div className="min-h-screen pb-20" style={{ backgroundColor: bgColor, color: textColor }}>
            {/* Theme Customizer - Top Left */}
            {canEdit && isEditMode && (
                <div className="fixed top-4 left-4 z-30">
                    <button
                        onClick={() => setShowThemePanel(!showThemePanel)}
                        className="px-4 py-2 bg-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-gray-300"
                    >
                        <Palette size={16} />
                        <span className="hidden sm:inline">Theme</span>
                    </button>

                    {/* Theme Panel */}
                    {showThemePanel && (
                        <div className="absolute top-14 left-0 bg-white rounded-lg shadow-2xl border-2 border-gray-200 p-4 w-80 max-h-[80vh] overflow-y-auto">
                            <h3 className="text-lg font-bold mb-4 text-gray-900">Customize Theme</h3>

                            {/* Background Color */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    Background Color
                                </label>
                                <div className="flex items-center gap-2 mb-3">
                                    <input
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="w-12 h-12 rounded cursor-pointer border-2 border-gray-300"
                                    />
                                    <input
                                        type="text"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="flex-1 px-3 py-2 border-2 border-gray-300 rounded font-mono text-sm"
                                        placeholder="#ffffff"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {bgPresets.map((preset) => (
                                        <button
                                            key={preset.name}
                                            onClick={() => setBgColor(preset.color)}
                                            className="px-3 py-2 rounded border-2 border-gray-300 hover:border-blue-400 transition-colors text-xs font-medium text-gray-700"
                                            style={{ backgroundColor: preset.color }}
                                        >
                                            {preset.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Text Color */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    Text Color
                                </label>
                                <div className="flex items-center gap-2 mb-3">
                                    <input
                                        type="color"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        className="w-12 h-12 rounded cursor-pointer border-2 border-gray-300"
                                    />
                                    <input
                                        type="text"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        className="flex-1 px-3 py-2 border-2 border-gray-300 rounded font-mono text-sm"
                                        placeholder="#000000"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {textPresets.map((preset) => (
                                        <button
                                            key={preset.name}
                                            onClick={() => setTextColor(preset.color)}
                                            className="px-3 py-2 rounded border-2 border-gray-300 hover:border-blue-400 transition-colors text-xs font-medium"
                                            style={{ backgroundColor: preset.color, color: preset.color === '#ffffff' ? '#000' : '#fff' }}
                                        >
                                            {preset.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Widget Background Color */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2 text-gray-700">
                                    Widget Background
                                </label>
                                <div className="flex items-center gap-2 mb-3">
                                    <input
                                        type="color"
                                        value={widgetBgColor}
                                        onChange={(e) => setWidgetBgColor(e.target.value)}
                                        className="w-12 h-12 rounded cursor-pointer border-2 border-gray-300"
                                    />
                                    <input
                                        type="text"
                                        value={widgetBgColor}
                                        onChange={(e) => setWidgetBgColor(e.target.value)}
                                        className="flex-1 px-3 py-2 border-2 border-gray-300 rounded font-mono text-sm"
                                        placeholder="#ffffff"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {widgetBgPresets.map((preset) => (
                                        <button
                                            key={preset.name}
                                            onClick={() => setWidgetBgColor(preset.color)}
                                            className="px-3 py-2 rounded border-2 border-gray-300 hover:border-blue-400 transition-colors text-xs font-medium text-gray-700"
                                            style={{ backgroundColor: preset.color }}
                                        >
                                            {preset.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="mt-4 p-4 rounded-lg border-2 border-gray-300" style={{ backgroundColor: bgColor, color: textColor }}>
                                <p className="text-sm font-semibold mb-2">Preview</p>
                                <div className="p-3 rounded-lg" style={{ backgroundColor: widgetBgColor, color: textColor }}>
                                    <p className="text-xs font-semibold">Widget Example</p>
                                    <p className="text-xs opacity-75">This is how widgets will look</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Minimal Top Bar - Only Edit Toggle */}
            {canEdit && (
                <div className="fixed top-4 right-4 z-30 flex items-center gap-3">
                    <span className="text-gray-600 text-sm hidden md:block">
                        Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs border border-gray-300">Ctrl+E</kbd>
                    </span>
                    <button
                        onClick={toggleEditMode}
                        className={`
              px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg
              ${isEditMode
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                            }
            `}
                    >
                        {isEditMode ? (
                            <>
                                <Eye size={16} />
                                <span className="hidden sm:inline">View</span>
                            </>
                        ) : (
                            <>
                                <Edit3 size={16} />
                                <span className="hidden sm:inline">Edit</span>
                            </>
                        )}
                    </button>
                </div>
            )}

            <div
                className="container mx-auto px-4 py-8 max-w-5xl"
                style={{
                    '--theme-text-color': textColor,
                    '--theme-widget-bg': widgetBgColor,
                } as React.CSSProperties}
            >
                {/* Fixed Profile Header */}
                <ProfileHeader
                    profileOwner={profileOwner}
                    isEditable={isEditMode}
                />

                {/* Widget Grid */}
                <div className="mt-8">
                    <WidgetGrid userId={profileOwner.id} isEditable={isEditMode} />
                </div>
            </div>

            {/* Bottom Navigation for Adding Widgets */}
            <WidgetBottomNav userId={profileOwner.id} isVisible={isEditMode} />
        </div>
    );
}

