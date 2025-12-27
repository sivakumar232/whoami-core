'use client';

import { ElementData } from '@/lib/builder/types';
import { ColorPicker } from '../controls/ColorPicker';
import { SelectControl } from '../controls/SelectControl';
import { TextInput } from '../controls/TextInput';

interface SkillTagPropertiesProps {
    element: ElementData;
    onUpdate: (updates: Partial<ElementData>) => void;
    onPropUpdate: (key: string, value: any) => void;
}

export function SkillTagProperties({ element, onUpdate, onPropUpdate }: SkillTagPropertiesProps) {
    const props = element.props || {};

    return (
        <div className="space-y-6">
            {/* Content */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Content</h3>
                <div className="space-y-3">
                    <TextInput
                        label="Skill Name"
                        value={props.name || 'Skill'}
                        onChange={(value) => onPropUpdate('name', value)}
                    />
                    <SelectControl
                        label="Level"
                        value={props.level || 'intermediate'}
                        onChange={(value) => onPropUpdate('level', value)}
                        options={[
                            { value: 'beginner', label: 'Beginner' },
                            { value: 'intermediate', label: 'Intermediate' },
                            { value: 'advanced', label: 'Advanced' },
                            { value: 'expert', label: 'Expert' },
                        ]}
                    />
                </div>
            </div>

            {/* Style */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Style</h3>
                <div className="space-y-3">
                    <SelectControl
                        label="Variant"
                        value={props.variant || 'filled'}
                        onChange={(value) => onPropUpdate('variant', value)}
                        options={[
                            { value: 'filled', label: 'Filled' },
                            { value: 'outlined', label: 'Outlined' },
                            { value: 'ghost', label: 'Ghost' },
                        ]}
                    />
                    <SelectControl
                        label="Size"
                        value={props.size || 'md'}
                        onChange={(value) => onPropUpdate('size', value)}
                        options={[
                            { value: 'sm', label: 'Small' },
                            { value: 'md', label: 'Medium' },
                            { value: 'lg', label: 'Large' },
                        ]}
                    />
                </div>
            </div>

            {/* Colors */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Colors</h3>
                <div className="space-y-3">
                    <ColorPicker
                        label="Background Color"
                        value={props.backgroundColor || '#3b82f6'}
                        onChange={(value) => onPropUpdate('backgroundColor', value)}
                    />
                    <ColorPicker
                        label="Text Color"
                        value={props.textColor || '#ffffff'}
                        onChange={(value) => onPropUpdate('textColor', value)}
                    />
                </div>
            </div>
        </div>
    );
}
