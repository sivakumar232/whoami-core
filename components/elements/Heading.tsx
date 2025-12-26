'use client';

import { useState } from 'react';

interface HeadingProps {
    text?: string;
    level?: 1 | 2 | 3 | 4;
    color?: string;
    align?: 'left' | 'center' | 'right';
    isEditable?: boolean;
    onChange?: (text: string) => void;
}

export function Heading({
    text = 'Heading',
    level = 1,
    color = '#000000',
    align = 'left',
    isEditable = false,
    onChange,
}: HeadingProps) {
    const [content, setContent] = useState(text);

    const handleBlur = () => {
        if (onChange && content !== text) {
            onChange(content);
        }
    };

    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const fontSize = { 1: 32, 2: 28, 3: 24, 4: 20 }[level];

    return (
        <Tag
            contentEditable={isEditable}
            suppressContentEditableWarning
            onBlur={handleBlur}
            onInput={(e) => setContent(e.currentTarget.textContent || '')}
            className="w-full h-full outline-none p-2 font-bold"
            style={{
                fontSize: `${fontSize}px`,
                color,
                textAlign: align,
            }}
        >
            {text}
        </Tag>
    );
}
