'use client';

import { Widget, WidgetType } from '@/lib/types';
import BioWidget from './BioWidget';
import ProjectWidget from './ProjectWidget';
import GithubWidget from './GithubWidget';
import ImageWidget from './ImageWidget';
import LinkWidget from './LinkWidget';
import SocialWidget from './SocialWidget';
import SkillsWidget from './SkillsWidget';
import ExperienceWidget from './ExperienceWidget';
import EducationWidget from './EducationWidget';
import ContactWidget from './ContactWidget';

interface WidgetRendererProps {
    widget: Widget;
    isEditable?: boolean;
    w?: number;  // Width in grid units
    h?: number;  // Height in grid units
}

/**
 * WidgetRenderer - Factory component that renders the correct widget type
 * Passes w and h props for content-aware rendering
 */
export default function WidgetRenderer({ widget, isEditable, w, h }: WidgetRendererProps) {
    // Use widget's w and h if not provided via props
    const width = w ?? widget.w;
    const height = h ?? widget.h;

    switch (widget.type) {
        case WidgetType.BIO:
            return <BioWidget data={widget.data as any} isEditable={isEditable} w={width} h={height} />;

        case WidgetType.PROJECT:
            return <ProjectWidget data={widget.data as any} isEditable={isEditable} w={width} h={height} />;

        case WidgetType.GITHUB:
            return <GithubWidget data={widget.data as any} w={width} h={height} />;

        case WidgetType.IMAGE:
            return <ImageWidget data={widget.data as any} isEditable={isEditable} widgetId={widget.id} w={width} h={height} />;

        case WidgetType.LINK:
            return <LinkWidget data={widget.data as any} isEditable={isEditable} widgetId={widget.id} w={width} h={height} />;

        case WidgetType.SOCIAL:
            return <SocialWidget data={widget.data as any} w={width} h={height} />;

        case WidgetType.SKILLS:
            return <SkillsWidget data={widget.data as any} w={width} h={height} />;

        case WidgetType.EXPERIENCE:
            return <ExperienceWidget data={widget.data as any} w={width} h={height} />;

        case WidgetType.EDUCATION:
            return <EducationWidget data={widget.data as any} w={width} h={height} />;

        case WidgetType.CONTACT:
            return <ContactWidget data={widget.data as any} w={width} h={height} />;

        default:
            return (
                <div className="flex items-center justify-center h-full text-gray-500">
                    <p>Unknown widget type: {widget.type}</p>
                </div>
            );
    }
}
