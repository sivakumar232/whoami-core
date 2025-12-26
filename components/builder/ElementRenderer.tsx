import { ElementData } from '@/lib/builder/types';
import { TextBlock } from '../elements/TextBlock';
import { Heading } from '../elements/Heading';
import { ButtonElement } from '../elements/ButtonElement';
import { ImageElement } from '../elements/ImageElement';
import { ProjectCard } from '../elements/ProjectCard';
import { SkillTag } from '../elements/SkillTag';
import { SocialLinks } from '../elements/SocialLinks';
import { Divider } from '../elements/Divider';
import { Container } from '../elements/Container';

interface ElementRendererProps {
    element: ElementData;
    isEditable?: boolean;
    onPropsChange?: (newProps: Record<string, any>) => void;
}

/**
 * ElementRenderer - Maps element types to their components
 */
export function ElementRenderer({ element, isEditable = false, onPropsChange }: ElementRendererProps) {
    const handleChange = (key: string, value: any) => {
        if (onPropsChange) {
            onPropsChange({ ...element.props, [key]: value });
        }
    };

    switch (element.type) {
        case 'text_block':
            return (
                <TextBlock
                    content={element.props.content || 'Click to edit text...'}
                    fontSize={element.props.fontSize || 16}
                    color={element.props.color || '#000000'}
                    align={element.props.align || 'left'}
                    isEditable={isEditable}
                    onChange={(content) => handleChange('content', content)}
                />
            );

        case 'heading':
            return (
                <Heading
                    text={element.props.text || 'Heading'}
                    level={element.props.level || 1}
                    color={element.props.color || '#000000'}
                    align={element.props.align || 'left'}
                    isEditable={isEditable}
                    onChange={(text) => handleChange('text', text)}
                />
            );

        case 'button':
            return (
                <ButtonElement
                    text={element.props.text || 'Button'}
                    variant={element.props.variant || 'primary'}
                    size={element.props.size || 'md'}
                    url={element.props.url || '#'}
                    isEditable={isEditable}
                    onChange={(text) => handleChange('text', text)}
                />
            );

        case 'image':
            return (
                <ImageElement
                    url={element.props.url}
                    alt={element.props.alt || 'Image'}
                    fit={element.props.fit || 'cover'}
                />
            );

        case 'project_card':
            return (
                <ProjectCard
                    title={element.props.title}
                    description={element.props.description}
                    imageUrl={element.props.imageUrl}
                    tags={element.props.tags}
                    githubUrl={element.props.githubUrl}
                    liveUrl={element.props.liveUrl}
                    isEditable={isEditable}
                    onChange={handleChange}
                />
            );

        case 'skill_tag':
            return (
                <SkillTag
                    skill={element.props.skill || 'React'}
                    level={element.props.level || 'intermediate'}
                    isEditable={isEditable}
                    onChange={(skill) => handleChange('skill', skill)}
                />
            );

        case 'social_links':
            return (
                <SocialLinks
                    github={element.props.github}
                    linkedin={element.props.linkedin}
                    twitter={element.props.twitter}
                    email={element.props.email}
                    website={element.props.website}
                    size={element.props.size || 'md'}
                    layout={element.props.layout || 'horizontal'}
                />
            );

        case 'divider':
            return (
                <Divider
                    style={element.props.style || 'solid'}
                    color={element.props.color || '#e5e7eb'}
                    thickness={element.props.thickness || 2}
                />
            );

        case 'container':
            return (
                <Container
                    backgroundColor={element.props.backgroundColor}
                    padding={element.props.padding}
                    borderRadius={element.props.borderRadius}
                    border={element.props.border}
                />
            );

        default:
            return (
                <div className="w-full h-full bg-gray-100 border border-gray-300 rounded p-4 flex items-center justify-center">
                    <p className="text-gray-600">Unknown element: {element.type}</p>
                </div>
            );
    }
}
