'use client';

import { ElementData } from '@/lib/builder/types';
import { SelectControl } from '../controls/SelectControl';
import { TextInput } from '../controls/TextInput';
import { ToggleSwitch } from '../controls/ToggleSwitch';
import { SliderControl } from '../controls/SliderControl';

interface SocialLinksPropertiesProps {
    element: ElementData;
    onUpdate: (updates: Partial<ElementData>) => void;
    onPropUpdate: (key: string, value: any) => void;
}

export function SocialLinksProperties({ element, onUpdate, onPropUpdate }: SocialLinksPropertiesProps) {
    const props = element.props || {};

    return (
        <div className="space-y-6">
            {/* Platform URLs */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Platform URLs</h3>
                <div className="space-y-3">
                    <TextInput
                        label="GitHub"
                        value={props.github || ''}
                        onChange={(value) => onPropUpdate('github', value)}
                        type="url"
                        placeholder="https://github.com/username"
                    />
                    <TextInput
                        label="LinkedIn"
                        value={props.linkedin || ''}
                        onChange={(value) => onPropUpdate('linkedin', value)}
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                    />
                    <TextInput
                        label="Twitter"
                        value={props.twitter || ''}
                        onChange={(value) => onPropUpdate('twitter', value)}
                        type="url"
                        placeholder="https://twitter.com/username"
                    />
                    <TextInput
                        label="Email"
                        value={props.email || ''}
                        onChange={(value) => onPropUpdate('email', value)}
                        type="email"
                        placeholder="email@example.com"
                    />
                    <TextInput
                        label="Website"
                        value={props.website || ''}
                        onChange={(value) => onPropUpdate('website', value)}
                        type="url"
                        placeholder="https://example.com"
                    />
                </div>
            </div>

            {/* Style */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Style</h3>
                <div className="space-y-3">
                    <SelectControl
                        label="Size"
                        value={props.size || 'md'}
                        onChange={(value) => onPropUpdate('size', value)}
                        options={[
                            { value: 'sm', label: 'Small' },
                            { value: 'md', label: 'Medium' },
                            { value: 'lg', label: 'Large' },
                            { value: 'xl', label: 'Extra Large' },
                        ]}
                    />
                    <SelectControl
                        label="Layout"
                        value={props.layout || 'horizontal'}
                        onChange={(value) => onPropUpdate('layout', value)}
                        options={[
                            { value: 'horizontal', label: 'Horizontal' },
                            { value: 'vertical', label: 'Vertical' },
                        ]}
                    />
                    <SliderControl
                        label="Spacing"
                        value={props.spacing || 12}
                        onChange={(value) => onPropUpdate('spacing', value)}
                        min={4}
                        max={32}
                        unit="px"
                    />
                </div>
            </div>

            {/* Options */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Options</h3>
                <div className="space-y-3">
                    <ToggleSwitch
                        label="Use Brand Colors"
                        value={props.useBrandColors !== false}
                        onChange={(value) => onPropUpdate('useBrandColors', value)}
                        description="Use platform-specific colors"
                    />
                </div>
            </div>
        </div>
    );
}
