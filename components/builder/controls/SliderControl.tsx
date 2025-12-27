'use client';

import { useState, useEffect } from 'react';

interface SliderControlProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    unit?: string;
}

export function SliderControl({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    unit = ''
}: SliderControlProps) {
    // Local state for immediate UI feedback
    const [localValue, setLocalValue] = useState(value);

    // Sync with external value changes
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    // Debounce the onChange call
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (localValue !== value) {
                onChange(localValue);
            }
        }, 150); // 150ms debounce

        return () => clearTimeout(timeout);
    }, [localValue, value, onChange]);

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-gray-700">{label}</label>
                <span className="text-xs text-gray-500">
                    {localValue}{unit}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={localValue}
                onChange={(e) => setLocalValue(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
        </div>
    );
}
