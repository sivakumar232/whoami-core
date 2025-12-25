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
            title: 'Your Title',
            description: 'Tell visitors about yourself...',
            avatar: 'https://i.pravatar.cc/150',
        },
    },

    [WidgetType.PROJECT]: {
        type: WidgetType.PROJECT,
        w: 4,  // Standard size
        h: 3,
        data: {
            title: 'Project Name',
            description: 'Describe your amazing project...',
            tags: ['React', 'TypeScript'],
            githubUrl: '',
            demoUrl: '',
        },
    },

    [WidgetType.GITHUB]: {
        type: WidgetType.GITHUB,
        w: 6,  // Hero size
        h: 4,
        data: {
            username: 'yourusername',
            showStats: true,
            showRepos: false,
        },
    },

    [WidgetType.IMAGE]: {
        type: WidgetType.IMAGE,
        w: 4,  // Standard size
        h: 3,
        data: {
            url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500',
            alt: 'Placeholder image',
            caption: 'Add a caption...',
        },
    },

    [WidgetType.LINK]: {
        type: WidgetType.LINK,
        w: 2,  // Mini size
        h: 2,
        data: {
            title: 'Useful Link',
            url: 'https://example.com',
            description: 'Link description...',
            icon: '🔗',
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
            title: 'Skills',
            skills: [
                { name: 'React', level: 90, category: 'Frontend' },
                { name: 'Node.js', level: 85, category: 'Backend' },
                { name: 'TypeScript', level: 88, category: 'Language' },
            ],
        },
    },

    [WidgetType.EXPERIENCE]: {
        type: WidgetType.EXPERIENCE,
        w: 4,  // Standard size
        h: 3,
        data: {
            company: 'Company Name',
            position: 'Your Position',
            startDate: new Date().toISOString(),
            description: 'Describe your role and achievements...',
            technologies: ['React', 'Node.js'],
        },
    },

    [WidgetType.EDUCATION]: {
        type: WidgetType.EDUCATION,
        w: 4,  // Standard size
        h: 3,
        data: {
            institution: 'University Name',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            startDate: '2020-09-01',
            endDate: '2024-05-01',
            description: 'Additional details...',
        },
    },

    [WidgetType.CONTACT]: {
        type: WidgetType.CONTACT,
        w: 4,  // Standard size
        h: 2,
        data: {
            email: 'your.email@example.com',
            phone: '+1 (555) 123-4567',
            location: 'City, Country',
            availability: 'Available for opportunities',
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
