'use client';

import { ProjectWidgetData } from '@/lib/types';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ProjectWidgetProps {
    data: ProjectWidgetData;
    isEditable?: boolean;
    size?: 'square' | 'rectangle' | 'vertical' | 'hero';
}

/**
 * ProjectWidget - Size-aware project display
 */
export default function ProjectWidget({ data, isEditable, size = 'rectangle' }: ProjectWidgetProps) {
    // Size-specific rendering
    const isSquare = size === 'square';
    const isRectangle = size === 'rectangle';
    const isVertical = size === 'vertical';
    const isHero = size === 'hero';

    return (
        <div className="h-full w-full flex flex-col">
            {/* Image - only in vertical and hero */}
            {(isVertical || isHero) && data.imageUrl && (
                <div className={`w-full ${isHero ? 'h-48' : 'h-32'} rounded-lg overflow-hidden bg-gray-100 mb-4 flex-shrink-0`}>
                    <Image
                        src={data.imageUrl}
                        alt={data.title}
                        width={400}
                        height={isHero ? 192 : 128}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Content */}
            <div className="flex-1 min-h-0 flex flex-col">
                {/* Title */}
                <h3
                    className={`font-bold text-gray-900 ${isSquare ? 'text-sm line-clamp-2' :
                            isRectangle ? 'text-base line-clamp-1' :
                                'text-xl line-clamp-2'
                        } ${isEditable ? 'cursor-text hover:bg-gray-50 rounded px-2 -mx-2' : ''}`}
                    style={{ outline: 'none', border: 'none' }}
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                    data-field="title"
                >
                    {data.title}
                </h3>

                {/* Description - hide in square */}
                {!isSquare && (
                    <p
                        className={`text-gray-600 mt-2 ${isRectangle ? 'text-sm line-clamp-2' :
                                isVertical ? 'text-sm line-clamp-3' :
                                    'text-sm line-clamp-4'
                            } ${isEditable ? 'cursor-text hover:bg-gray-50 rounded px-2 -mx-2' : ''}`}
                        style={{ outline: 'none', border: 'none' }}
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                        data-field="description"
                    >
                        {data.description}
                    </p>
                )}

                {/* Tags - only in vertical and hero */}
                {(isVertical || isHero) && data.tags && data.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {data.tags.slice(0, isHero ? 6 : 4).map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Links - only in rectangle, vertical, and hero */}
                {!isSquare && (
                    <div className="flex gap-3 mt-auto pt-3">
                        {data.githubUrl && (
                            <a
                                href={data.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <Github size={16} />
                                {!isRectangle && <span>Code</span>}
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
                                {!isRectangle && <span>Demo</span>}
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
