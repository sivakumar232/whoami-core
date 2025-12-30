'use client';

import { Link2 } from 'lucide-react';

interface TextInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: 'text' | 'url' | 'email';
    icon?: React.ReactNode;
}

export function TextInput({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    icon
}: TextInputProps) {
    return (
        <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">{label}</label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onPaste={(e) => {
                        // Explicitly allow paste
                        const pastedText = e.clipboardData.getData('text');
                        if (pastedText) {
                            onChange(pastedText);
                        }
                    }}
                    placeholder={placeholder}
                    className={`w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${icon ? 'pl-10' : ''
                        }`}
                />
            </div>
        </div>
    );
}
