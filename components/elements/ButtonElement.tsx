'use client';

import { useState } from 'react';

interface ButtonElementProps {
    text?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    url?: string;
    isEditable?: boolean;
    onChange?: (text: string) => void;
}

export function ButtonElement({
    text = 'Button',
    variant = 'primary',
    size = 'md',
    url = '#',
    isEditable = false,
    onChange,
}: ButtonElementProps) {
    const [buttonText, setButtonText] = useState(text);

    const handleBlur = () => {
        if (onChange && buttonText !== text) {
            onChange(buttonText);
        }
    };

    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            className={`
        rounded-lg font-semibold transition-colors
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${isEditable ? 'cursor-text' : 'cursor-pointer'}
      `}
            onClick={(e) => {
                if (!isEditable && url) {
                    window.open(url, '_blank');
                }
                e.stopPropagation();
            }}
        >
            <span
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={handleBlur}
                onInput={(e) => setButtonText(e.currentTarget.textContent || '')}
                className="outline-none"
            >
                {text}
            </span>
        </button>
    );
}
