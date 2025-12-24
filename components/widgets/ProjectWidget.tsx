'use client';

import { ProjectWidgetData } from '@/lib/types';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ProjectWidgetProps {
    data: ProjectWidgetData;
    isEditable?: boolean;
}

export default function ProjectWidget({ data, isEditable }: ProjectWidgetProps) {
    return (
        <div className="space-y-4">
            {/* Project Image */}
            {data.imageUrl && (
                <div className="w-full h-40 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                        src={data.imageUrl}
                        alt={data.title}
                        width={400}
                        height={160}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Title - editable with cursor */}
            <h3
                className={`text-xl font-bold text-gray-900 ${isEditable ? 'cursor-text hover:bg-gray-50 rounded px-2 -mx-2' : ''
                    }`}
                style={{ outline: 'none', border: 'none' }}
                contentEditable={isEditable}
                suppressContentEditableWarning
                data-field="title"
            >
                {data.title}
            </h3>

            {/* Description - editable with cursor */}
            <p
                className={`text-gray-600 text-sm leading-relaxed ${isEditable ? 'cursor-text hover:bg-gray-50 rounded px-2 -mx-2' : ''
                    }`}
                style={{ outline: 'none', border: 'none' }}
                contentEditable={isEditable}
                suppressContentEditableWarning
                data-field="description"
            >
                {data.description}
            </p>

            {/* Tags */}
            {data.tags && data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Links */}
            <div className="flex gap-3">
                {data.githubUrl && (
                    <a
                        href={data.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <Github size={16} />
                        <span>Code</span>
                    </a>
                )}
                {data.demoUrl && (
                    <a
                        href={data.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        <ExternalLink size={16} />
                        <span>Demo</span>
                    </a>
                )}
            </div>

            {isEditable && (
                <p className="text-xs text-gray-400">
                    💡 Click text to edit
                </p>
            )}
        </div>
    );
}
