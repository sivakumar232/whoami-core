'use client';

import { useState } from 'react';

interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    showAlpha?: boolean;
}

export function ColorPicker({ label, value, onChange, showAlpha = false }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">{label}</label>
            <div className="flex gap-2 items-center">
                <input
                    type="color"
                    value={value || '#000000'}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                    type="text"
                    value={value || '#000000'}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="#000000"
                />
            </div>
        </div>
    );
}
