import { WidgetType, CreateWidgetInput } from './types';
import { WIDGET_TYPE_SIZES } from './widgetSizes';
import { findNextPosition as gridFindNextPosition } from './gridEngine';

/**
 * Default data and configuration for each widget type
 * Using 12-column grid sizes
 */

export const widgetDefaults: Record<WidgetType, Partial<CreateWidgetInput>> = {
    [WidgetType.BIO]: {
        type: WidgetType.BIO,
        w: 6,  // Hero size in 12-column grid
        h: 4,
        data: {
            title: 'Full-Stack Developer',
            description: 'I build modern web applications with React, Node.js, and cloud technologies. Passionate about creating intuitive user experiences and scalable systems.',
            avatar: 'https://i.pravatar.cc/150?img=33',
        },
    },

    [WidgetType.PROJECT]: {
        type: WidgetType.PROJECT,
        w: 4,  // Standard size
        h: 3,
        data: {
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce platform built with React, Node.js, and Stripe. Features include product management, cart functionality, and secure payments.',
            tags: ['React', 'Node.js', 'Stripe', 'PostgreSQL'],
            githubUrl: 'https://github.com/yourusername/ecommerce',
            demoUrl: 'https://demo.example.com',
            imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
        },
    },

    [WidgetType.GITHUB]: {
        type: WidgetType.GITHUB,
        w: 6,  // Hero size
        h: 4,
        data: {
            username: 'yourusername',
            showStats: true,
            showRepos: true,
            repoCount: 5,
        },
    },

    [WidgetType.IMAGE]: {
        type: WidgetType.IMAGE,
        w: 4,  // Standard size
        h: 3,
        data: {
            url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
            alt: 'Workspace setup with laptop and coffee',
            caption: 'My daily workspace',
        },
    },

    [WidgetType.LINK]: {
        type: WidgetType.LINK,
        w: 2,  // Mini size
        h: 2,
        data: {
            title: 'Portfolio',
            url: 'https://yourportfolio.com',
            description: 'Check out my full portfolio',
            icon: '🌐',
        },
    },

    [WidgetType.SOCIAL]: {
        type: WidgetType.SOCIAL,
        w: 2,  // Mini size
        h: 2,
        data: {
            platform: 'github',
            username: 'yourusername',
            url: 'https://github.com/yourusername',
        },
    },

    [WidgetType.SKILLS]: {
        type: WidgetType.SKILLS,
        w: 3,  // Compact size
        h: 2,
        data: {
            title: 'Technical Skills',
            skills: [
                { name: 'React', level: 90, category: 'Frontend' },
                { name: 'TypeScript', level: 85, category: 'Language' },
                { name: 'Node.js', level: 88, category: 'Backend' },
                { name: 'PostgreSQL', level: 75, category: 'Database' },
                { name: 'AWS', level: 70, category: 'Cloud' },
                { name: 'Docker', level: 80, category: 'DevOps' },
            ],
        },
    },

    [WidgetType.EXPERIENCE]: {
        type: WidgetType.EXPERIENCE,
        w: 4,  // Standard size
        h: 3,
        data: {
            company: 'Tech Startup Inc.',
            position: 'Senior Full-Stack Developer',
            startDate: '2022-01-01',
            endDate: null, // Current job
            description: 'Led development of core platform features, mentored junior developers, and improved system performance by 40%. Built scalable microservices architecture.',
            technologies: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
        },
    },

    [WidgetType.EDUCATION]: {
        type: WidgetType.EDUCATION,
        w: 4,  // Standard size
        h: 3,
        data: {
            institution: 'University of Technology',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            startDate: '2018-09-01',
            endDate: '2022-05-01',
            description: 'Graduated with honors. Focus on software engineering, algorithms, and distributed systems.',
        },
    },

    [WidgetType.CONTACT]: {
        type: WidgetType.CONTACT,
        w: 4,  // Standard size
        h: 2,
        data: {
            email: 'hello@example.com',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
            availability: 'Open to new opportunities',
        },
    },
};

/**
 * Widget type metadata for display in the Add Widget modal
 */
export const widgetMetadata: Record<WidgetType, { icon: string; name: string; description: string }> = {
    [WidgetType.BIO]: {
        icon: '👤',
        name: 'Bio',
        description: 'Personal bio with avatar and description',
    },
    [WidgetType.PROJECT]: {
        icon: '🚀',
        name: 'Project',
        description: 'Showcase your projects with images and links',
    },
    [WidgetType.GITHUB]: {
        icon: '🐙',
        name: 'GitHub',
        description: 'Display your GitHub profile and stats',
    },
    [WidgetType.IMAGE]: {
        icon: '🖼️',
        name: 'Image',
        description: 'Add images with optional captions',
    },
    [WidgetType.LINK]: {
        icon: '🔗',
        name: 'Link',
        description: 'Create clickable link cards',
    },
    [WidgetType.SOCIAL]: {
        icon: '📱',
        name: 'Social',
        description: 'Link to your social media profiles',
    },
    [WidgetType.SKILLS]: {
        icon: '⚡',
        name: 'Skills',
        description: 'Display your skills with progress bars',
    },
    [WidgetType.EXPERIENCE]: {
        icon: '💼',
        name: 'Experience',
        description: 'Show your work experience timeline',
    },
    [WidgetType.EDUCATION]: {
        icon: '🎓',
        name: 'Education',
        description: 'Display your education history',
    },
    [WidgetType.CONTACT]: {
        icon: '📧',
        name: 'Contact',
        description: 'Share your contact information',
    },
};

/**
 * Find the next available position for a new widget using grid engine
 */
export function findNextPosition(existingWidgets: any[], defaultWidth: number, defaultHeight: number = 3): { x: number; y: number } {
    if (existingWidgets.length === 0) {
        return { x: 0, y: 0 };
    }

    // Use grid engine's smart placement algorithm
    const components = existingWidgets.map(w => ({
        id: w.id,
        x: w.x,
        y: w.y,
        w: w.w,
        h: w.h
    }));

    return gridFindNextPosition(defaultWidth, defaultHeight, components);
}
