'use client';

import { useState } from 'react';

interface ButtonElementProps {
    text?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'gradient';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    url?: string;
    target?: '_self' | '_blank';
    fullWidth?: boolean;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: string;
    textTransform?: string;
    borderWidth?: number;
    borderRadius?: number;
    hoverEffect?: string;
    shadowIntensity?: number;
    disabled?: boolean;
    isEditable?: boolean;
    onChange?: (text: string) => void;
}

export function ButtonElement({
    text = 'Button',
    variant = 'primary',
    size = 'md',
    url = '#',
    target = '_self',
    fullWidth = false,
    backgroundColor,
    textColor,
    borderColor,
    fontFamily = 'system',
    fontSize = 16,
    fontWeight = '500',
    textTransform = 'none',
    borderWidth = 2,
    borderRadius = 6,
    hoverEffect = 'none',
    shadowIntensity = 0,
    disabled = false,
    isEditable = false,
    onChange,
}: ButtonElementProps) {
    const [buttonText, setButtonText] = useState(text);

    const handleBlur = () => {
        if (onChange && buttonText !== text) {
            onChange(buttonText);
        }
    };

    // Default variant styles (can be overridden by custom colors)
    const variantStyles = {
        primary: {
            bg: backgroundColor || '#3b82f6',
            text: textColor || '#ffffff',
            border: borderColor || '#3b82f6',
        },
        secondary: {
            bg: backgroundColor || '#6b7280',
            text: textColor || '#ffffff',
            border: borderColor || '#6b7280',
        },
        outline: {
            bg: backgroundColor || 'transparent',
            text: textColor || '#3b82f6',
            border: borderColor || '#3b82f6',
        },
        ghost: {
            bg: backgroundColor || 'transparent',
            text: textColor || '#3b82f6',
            border: borderColor || 'transparent',
        },
        link: {
            bg: backgroundColor || 'transparent',
            text: textColor || '#3b82f6',
            border: borderColor || 'transparent',
        },
        gradient: {
            bg: backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            text: textColor || '#ffffff',
            border: borderColor || 'transparent',
        },
    };

    const sizeStyles = {
        xs: { padding: '0.375rem 0.75rem', fontSize: '0.75rem' },
        sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
        md: { padding: '0.625rem 1.25rem', fontSize: '1rem' },
        lg: { padding: '0.75rem 1.5rem', fontSize: '1.125rem' },
        xl: { padding: '1rem 2rem', fontSize: '1.25rem' },
    };

    const fontFamilies = {
        system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        inter: '"Inter", sans-serif',
        roboto: '"Roboto", sans-serif',
        poppins: '"Poppins", sans-serif',
    };

    const hoverEffects = {
        none: '',
        lift: 'hover:translate-y-[-2px]',
        scale: 'hover:scale-105',
        glow: 'hover:shadow-lg',
        pulse: 'hover:animate-pulse',
    };

    const currentVariant = variantStyles[variant];
    const currentSize = sizeStyles[size];
    const currentFont = fontFamilies[fontFamily as keyof typeof fontFamilies] || fontFamilies.system;
    const currentHover = hoverEffects[hoverEffect as keyof typeof hoverEffects] || '';

    const buttonStyle = {
        backgroundColor: variant === 'gradient' ? 'transparent' : currentVariant.bg,
        backgroundImage: variant === 'gradient' ? currentVariant.bg : 'none',
        color: currentVariant.text,
        borderColor: currentVariant.border,
        borderWidth: `${borderWidth}px`,
        borderStyle: 'solid',
        borderRadius: `${borderRadius}px`,
        padding: currentSize.padding,
        fontSize: `${fontSize}px`,
        fontFamily: currentFont,
        fontWeight,
        textTransform: textTransform as any,
        boxShadow: shadowIntensity > 0 ? `0 ${shadowIntensity}px ${shadowIntensity * 2}px rgba(0,0,0,0.1)` : 'none',
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : (isEditable ? 'text' : 'pointer'),
    };

    return (
        <button
            style={buttonStyle}
            className={`
                font-semibold transition-all duration-200
                ${currentHover}
                ${disabled ? 'pointer-events-none' : ''}
            `}
            onClick={(e) => {
                if (!isEditable && !disabled && url) {
                    if (target === '_blank') {
                        window.open(url, '_blank');
                    } else {
                        window.location.href = url;
                    }
                }
                e.stopPropagation();
            }}
            disabled={disabled}
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
