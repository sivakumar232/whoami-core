import { ElementData } from '@/lib/builder/types';
import { TextBlock } from '../elements/TextBlock';
import { Heading } from '../elements/Heading';
import { ButtonElement } from '../elements/ButtonElement';
import { ImageElement } from '../elements/ImageElement';

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

        default:
            return (
                <div className="w-full h-full bg-gray-100 border border-gray-300 rounded p-4 flex items-center justify-center">
                    <p className="text-gray-600">Unknown element: {element.type}</p>
                </div>
            );
    }
}
