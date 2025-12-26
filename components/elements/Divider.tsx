'use client';

interface DividerProps {
    style?: 'solid' | 'dashed' | 'dotted';
    color?: string;
    thickness?: number;
}

export function Divider({
    style = 'solid',
    color = '#e5e7eb',
    thickness = 2,
}: DividerProps) {
    return (
        <hr
            className="w-full"
            style={{
                borderStyle: style,
                borderColor: color,
                borderWidth: `${thickness}px 0 0 0`,
            }}
        />
    );
}
