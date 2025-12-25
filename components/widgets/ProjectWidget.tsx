'use client';

import { ProjectWidgetData } from '@/lib/types';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface ProjectWidgetProps {
    data: ProjectWidgetData;
    isEditable?: boolean;
    size?: 'square' | 'rectangle' | 'vertical' | 'hero';
    w?: number;
    h?: number;
}

/**
 * ProjectWidget - Neo-Brutalism styled project display
 * Properly spaced with bold typography and theme colors
 */
export default function ProjectWidget({ data, isEditable, size = 'rectangle', w, h }: ProjectWidgetProps) {
    // Size-specific rendering
    const isSquare = size === 'square';
    const isRectangle = size === 'rectangle';
    const isVertical = size === 'vertical';
    const isHero = size === 'hero';

    return (
        <div className="h-full w-full flex flex-col p-6">
            {/* Image - only in vertical and hero */}
            {(isVertical || isHero) && data.imageUrl && (
                <div className={`w-full ${isHero ? 'h-48' : 'h-32'} rounded-xl overflow-hidden bg-gray-100 mb-4 flex-shrink-0 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
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
                    className={`font-black text-gray-900 leading-tight ${isSquare ? 'text-lg line-clamp-2' :
                            isRectangle ? 'text-xl line-clamp-1' :
                                'text-2xl line-clamp-2'
                        } ${isEditable ? 'cursor-text hover:bg-neo-volt/20 rounded-lg px-3 py-1 -mx-3 -my-1 transition-colors' : ''}`}
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
                        className={`text-gray-700 mt-3 leading-relaxed font-medium ${isRectangle ? 'text-sm line-clamp-2' :
                                isVertical ? 'text-sm line-clamp-3' :
                                    'text-base line-clamp-4'
                            } ${isEditable ? 'cursor-text hover:bg-neo-volt/20 rounded-lg px-3 py-1 -mx-3 -my-1 transition-colors' : ''}`}
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
                    <div className="flex flex-wrap gap-2 mt-4">
                        {data.tags.slice(0, isHero ? 6 : 4).map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 bg-neo-volt text-black text-xs font-bold rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Links - only in rectangle, vertical, and hero */}
                {!isSquare && (
                    <div className="flex gap-3 mt-auto pt-4">
                        {data.githubUrl && (
                            <a
                                href={data.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold rounded-lg border-2 border-black hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
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
                                className="flex items-center gap-2 px-4 py-2 bg-neo-volt text-black text-sm font-bold rounded-lg border-2 border-black hover:bg-yellow-300 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
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
