'use client';

import { ReactNode } from 'react';

interface ContainerProps {
    children?: ReactNode;
    backgroundColor?: string;
    padding?: number;
    borderRadius?: number;
    border?: boolean;
}

export function Container({
    children,
    backgroundColor = '#ffffff',
    padding = 16,
    borderRadius = 8,
    border = true,
}: ContainerProps) {
    return (
        <div
            className="w-full h-full"
            style={{
                backgroundColor,
                padding: `${padding}px`,
                borderRadius: `${borderRadius}px`,
                border: border ? '1px solid #e5e7eb' : 'none',
            }}
        >
            {children || (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Container - Drop elements here
                </div>
            )}
        </div>
    );
}
