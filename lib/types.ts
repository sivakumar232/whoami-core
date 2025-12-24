// Type definitions for the widget system

/**
 * Enum defining all available widget types
 * Each type represents a different kind of content block
 */
export enum WidgetType {
    BIO = 'BIO',           // Personal bio/about section
    PROJECT = 'PROJECT',   // Project showcase
    GITHUB = 'GITHUB',     // GitHub stats/repos
    IMAGE = 'IMAGE',       // Image display
    LINK = 'LINK',         // External link
    SOCIAL = 'SOCIAL',     // Social media links
    SKILLS = 'SKILLS',     // Skills list
    EXPERIENCE = 'EXPERIENCE', // Work experience
    EDUCATION = 'EDUCATION',   // Education history
    CONTACT = 'CONTACT',   // Contact information
}

/**
 * Base widget interface matching Prisma schema
 */
export interface Widget {
    id: string;
    userId: string;
    type: WidgetType;
    x: number;        // Grid column position (0-based)
    y: number;        // Grid row position (0-based)
    w: number;        // Width in grid units
    h: number;        // Height in grid units
    data: WidgetData; // Type-specific content
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Widget data types for different widget kinds
 * This is stored as JSON in the database
 */
export type WidgetData =
    | BioWidgetData
    | ProjectWidgetData
    | GithubWidgetData
    | ImageWidgetData
    | LinkWidgetData
    | SocialWidgetData
    | SkillsWidgetData
    | ExperienceWidgetData
    | EducationWidgetData
    | ContactWidgetData;

// Individual widget data structures

export interface BioWidgetData {
    title: string;
    description: string;
    avatar?: string;
}

export interface ProjectWidgetData {
    title: string;
    description: string;
    imageUrl?: string;
    demoUrl?: string;
    githubUrl?: string;
    tags?: string[];
}

export interface GithubWidgetData {
    username: string;
    showStats?: boolean;
    showRepos?: boolean;
    repoCount?: number;
}

export interface ImageWidgetData {
    url: string;
    alt: string;
    caption?: string;
}

export interface LinkWidgetData {
    title: string;
    url: string;
    description?: string;
    icon?: string;
}

export interface SocialWidgetData {
    platform: 'github' | 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'other';
    username: string;
    url: string;
}

export interface SkillsWidgetData {
    title: string;
    skills: Array<{
        name: string;
        level?: number; // 0-100
        category?: string;
    }>;
}

export interface ExperienceWidgetData {
    company: string;
    position: string;
    startDate: string;
    endDate?: string; // null if current
    description: string;
    technologies?: string[];
}

export interface EducationWidgetData {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    description?: string;
}

export interface ContactWidgetData {
    email?: string;
    phone?: string;
    location?: string;
    availability?: string;
}

/**
 * Type for creating a new widget (without id and timestamps)
 */
export type CreateWidgetInput = Omit<Widget, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Type for updating a widget (partial updates allowed)
 */
export type UpdateWidgetInput = Partial<Omit<Widget, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>;
