'use client';

import { ElementData } from '@/lib/builder/types';
import { ColorPicker } from '../controls/ColorPicker';
import { SelectControl } from '../controls/SelectControl';
import { TextInput } from '../controls/TextInput';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardPropertiesProps {
    element: ElementData;
    onUpdate: (updates: Partial<ElementData>) => void;
    onPropUpdate: (key: string, value: any) => void;
}

export function ProjectCardProperties({ element, onUpdate, onPropUpdate }: ProjectCardPropertiesProps) {
    const props = element.props || {};

    return (
        <div className="space-y-6">
            {/* Content */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Content</h3>
                <div className="space-y-3">
                    <TextInput
                        label="Title"
                        value={props.title || 'Project Title'}
                        onChange={(value) => onPropUpdate('title', value)}
                    />
                    <div>
                        <label className="text-xs font-medium text-gray-700">Description</label>
                        <textarea
                            value={props.description || 'Project description...'}
                            onChange={(e) => onPropUpdate('description', e.target.value)}
                            rows={3}
                            className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <TextInput
                        label="Image URL"
                        value={props.image || ''}
                        onChange={(value) => onPropUpdate('image', value)}
                        type="url"
                    />
                </div>
            </div>

            {/* Links */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Links</h3>
                <div className="space-y-3">
                    <TextInput
                        label="GitHub URL"
                        value={props.githubUrl || ''}
                        onChange={(value) => onPropUpdate('githubUrl', value)}
                        type="url"
                        icon={<Github size={16} />}
                    />
                    <TextInput
                        label="Live URL"
                        value={props.liveUrl || ''}
                        onChange={(value) => onPropUpdate('liveUrl', value)}
                        type="url"
                        icon={<ExternalLink size={16} />}
                    />
                </div>
            </div>

            {/* Style */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Style</h3>
                <div className="space-y-3">
                    <SelectControl
                        label="Variant"
                        value={props.variant || 'default'}
                        onChange={(value) => onPropUpdate('variant', value)}
                        options={[
                            { value: 'default', label: 'Default' },
                            { value: 'minimal', label: 'Minimal' },
                            { value: 'bold', label: 'Bold' },
                        ]}
                    />
                    <ColorPicker
                        label="Background Color"
                        value={props.backgroundColor || '#ffffff'}
                        onChange={(value) => onPropUpdate('backgroundColor', value)}
                    />
                </div>
            </div>
        </div>
    );
}
