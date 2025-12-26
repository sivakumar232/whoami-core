'use client';

import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
    title?: string;
    description?: string;
    imageUrl?: string;
    tags?: string[];
    githubUrl?: string;
    liveUrl?: string;
    isEditable?: boolean;
    onChange?: (key: string, value: any) => void;
}

export function ProjectCard({
    title = 'Project Title',
    description = 'Project description goes here...',
    imageUrl = 'https://via.placeholder.com/400x200',
    tags = ['React', 'TypeScript'],
    githubUrl = '',
    liveUrl = '',
    isEditable = false,
    onChange,
}: ProjectCardProps) {
    return (
        <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            {/* Project Image */}
            <div className="w-full h-2/5 bg-gray-200 overflow-hidden">
                <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
                <h3
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                    onBlur={(e) => onChange?.('title', e.currentTarget.textContent)}
                    className="text-lg font-bold text-gray-900 outline-none mb-2"
                >
                    {title}
                </h3>

                <p
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                    onBlur={(e) => onChange?.('description', e.currentTarget.textContent)}
                    className="text-sm text-gray-600 outline-none flex-1 mb-3"
                >
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                    {githubUrl && (
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                            <Github size={18} />
                        </a>
                    )}
                    {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
