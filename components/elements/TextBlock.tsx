'use client';

import { useState } from 'react';

interface TextBlockProps {
    content?: string;
    fontSize?: number;
    color?: string;
    align?: 'left' | 'center' | 'right';
    isEditable?: boolean;
    onChange?: (content: string) => void;
}

export function TextBlock({
    content = 'Click to edit text...',
    fontSize = 16,
    color = '#000000',
    align = 'left',
    isEditable = false,
    onChange,
}: TextBlockProps) {
    const [text, setText] = useState(content);

    const handleBlur = () => {
        if (onChange && text !== content) {
            onChange(text);
        }
    };

    return (
        <div
            contentEditable={isEditable}
            suppressContentEditableWarning
            onBlur={handleBlur}
            onInput={(e) => setText(e.currentTarget.textContent || '')}
            className="w-full h-full outline-none p-2"
            style={{
                fontSize: `${fontSize}px`,
                color,
                textAlign: align,
            }}
        >
            {content}
        </div>
    );
}
