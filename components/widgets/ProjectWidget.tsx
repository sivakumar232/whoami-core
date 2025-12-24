'use client';

import { ProjectWidgetData } from '@/lib/types';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectWidgetProps {
    data: ProjectWidgetData;
}

/**
 * ProjectWidget - Showcases a project with image, title, description, tags, and links
 */
export default function ProjectWidget({ data }: ProjectWidgetProps) {
    return (
        <div className="flex flex-col h-full space-y-3">
            {/* Project Image */}
            {data.imageUrl && (
                <div className="relative w-full h-32 rounded-lg overflow-hidden bg-white/5">
                    <Image
                        src={data.imageUrl}
                        alt={data.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            {/* Title */}
            <h3 className="text-xl font-bold text-white">
                {data.title}
            </h3>

            {/* Description */}
            <p className="text-white/70 text-sm flex-grow">
                {data.description}
            </p>

            {/* Tags */}
            {data.tags && data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/90 border border-white/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Links */}
            <div className="flex gap-2">
                {data.demoUrl && (
                    <a
                        href={data.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-blue-500/80 hover:bg-blue-600 text-white transition-colors"
                    >
                        <ExternalLink size={14} />
                        Demo
                    </a>
                )}
                {data.githubUrl && (
                    <a
                        href={data.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-gray-700/80 hover:bg-gray-800 text-white transition-colors"
                    >
                        <Github size={14} />
                        Code
                    </a>
                )}
            </div>
        </div>
    );
}
