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
}

/**
 * WidgetRenderer - Factory component that renders the correct widget type
 */
export default function WidgetRenderer({ widget, isEditable }: WidgetRendererProps) {
    switch (widget.type) {
        case WidgetType.BIO:
            return <BioWidget data={widget.data as any} isEditable={isEditable} />;

        case WidgetType.PROJECT:
            return <ProjectWidget data={widget.data as any} isEditable={isEditable} />;

        case WidgetType.GITHUB:
            return <GithubWidget data={widget.data as any} />;

        case WidgetType.IMAGE:
            return <ImageWidget data={widget.data as any} isEditable={isEditable} widgetId={widget.id} />;

        case WidgetType.LINK:
            return <LinkWidget data={widget.data as any} isEditable={isEditable} widgetId={widget.id} />;

        case WidgetType.SOCIAL:
            return <SocialWidget data={widget.data as any} />;

        case WidgetType.SKILLS:
            return <SkillsWidget data={widget.data as any} />;

        case WidgetType.EXPERIENCE:
            return <ExperienceWidget data={widget.data as any} />;

        case WidgetType.EDUCATION:
            return <EducationWidget data={widget.data as any} />;

        case WidgetType.CONTACT:
            return <ContactWidget data={widget.data as any} />;

        default:
            return (
                <div className="flex items-center justify-center h-full text-gray-500">
                    <p>Unknown widget type: {widget.type}</p>
                </div>
            );
    }
}
