'use client';

import { Github, Linkedin, Twitter, Mail, Globe } from 'lucide-react';

interface SocialLinksProps {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    website?: string;
    size?: 'sm' | 'md' | 'lg';
    layout?: 'horizontal' | 'vertical';
}

export function SocialLinks({
    github,
    linkedin,
    twitter,
    email,
    website,
    size = 'md',
    layout = 'horizontal',
}: SocialLinksProps) {
    const sizeMap = {
        sm: 18,
        md: 24,
        lg: 32,
    };

    const iconSize = sizeMap[size];

    const links = [
        { icon: Github, url: github, label: 'GitHub' },
        { icon: Linkedin, url: linkedin, label: 'LinkedIn' },
        { icon: Twitter, url: twitter, label: 'Twitter' },
        { icon: Mail, url: email ? `mailto:${email}` : undefined, label: 'Email' },
        { icon: Globe, url: website, label: 'Website' },
    ].filter((link) => link.url);

    return (
        <div className={`flex ${layout === 'vertical' ? 'flex-col' : 'flex-row'} gap-4 items-center`}>
            {links.map(({ icon: Icon, url, label }) => (
                <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    title={label}
                >
                    <Icon size={iconSize} />
                </a>
            ))}
        </div>
    );
}
