'use client';

import { GithubWidgetData } from '@/lib/types';
import { Github, Star, GitFork } from 'lucide-react';

interface GithubWidgetProps {
    data: GithubWidgetData;
}

/**
 * GithubWidget - Displays GitHub username and placeholder for stats
 * (Will integrate with GitHub API in Step 7)
 */
export default function GithubWidget({ data }: GithubWidgetProps) {
    return (
        <div className="flex flex-col h-full space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2">
                <Github className="text-white" size={24} />
                <h3 className="text-xl font-bold text-white">
                    @{data.username}
                </h3>
            </div>

            {/* Placeholder stats - will be real in Step 7 */}
            {data.showStats && (
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                            <Star size={12} />
                            <span>Stars</span>
                        </div>
                        <div className="text-2xl font-bold text-white">--</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                            <GitFork size={12} />
                            <span>Repos</span>
                        </div>
                        <div className="text-2xl font-bold text-white">--</div>
                    </div>
                </div>
            )}

            {/* Link to GitHub profile */}
            <a
                href={`https://github.com/${data.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto px-4 py-2 text-sm rounded-lg bg-gray-800/80 hover:bg-gray-900 text-white transition-colors text-center"
            >
                View Profile
            </a>
        </div>
    );
}
