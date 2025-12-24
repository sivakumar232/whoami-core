'use client';

import { SocialWidgetData } from '@/lib/types';
import { Github, Twitter, Linkedin, Instagram, Youtube, ExternalLink } from 'lucide-react';

interface SocialWidgetProps {
    data: SocialWidgetData;
}

/**
 * SocialWidget - Displays social media link with platform icon
 */
export default function SocialWidget({ data }: SocialWidgetProps) {
    // Get icon based on platform
    const getIcon = () => {
        switch (data.platform) {
            case 'github':
                return <Github size={32} />;
            case 'twitter':
                return <Twitter size={32} />;
            case 'linkedin':
                return <Linkedin size={32} />;
            case 'instagram':
                return <Instagram size={32} />;
            case 'youtube':
                return <Youtube size={32} />;
            default:
                return <ExternalLink size={32} />;
        }
    };

    // Get platform color
    const getPlatformColor = () => {
        switch (data.platform) {
            case 'github':
                return 'hover:bg-gray-800';
            case 'twitter':
                return 'hover:bg-blue-500';
            case 'linkedin':
                return 'hover:bg-blue-700';
            case 'instagram':
                return 'hover:bg-pink-600';
            case 'youtube':
                return 'hover:bg-red-600';
            default:
                return 'hover:bg-white/20';
        }
    };

    return (
        <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center justify-center h-full space-y-3 rounded-lg transition-all duration-300 ${getPlatformColor()}`}
        >
            <div className="text-white">
                {getIcon()}
            </div>
            <div className="text-center">
                <p className="text-white/60 text-xs uppercase tracking-wide">
                    {data.platform}
                </p>
                <p className="text-white font-semibold">
                    @{data.username}
                </p>
            </div>
        </a>
    );
}
