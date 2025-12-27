'use client';

import { ElementData } from '@/lib/builder/types';
import { ColorPicker } from '../controls/ColorPicker';
import { SliderControl } from '../controls/SliderControl';
import { SelectControl } from '../controls/SelectControl';
import { ToggleSwitch } from '../controls/ToggleSwitch';
import { TextInput } from '../controls/TextInput';
import { Link2 } from 'lucide-react';

interface ButtonPropertiesProps {
    element: ElementData;
    onUpdate: (updates: Partial<ElementData>) => void;
    onPropUpdate: (key: string, value: any) => void;
}

export function ButtonProperties({ element, onUpdate, onPropUpdate }: ButtonPropertiesProps) {
    const props = element.props || {};

    return (
        <div className="space-y-6">
            {/* Content Section */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Content</h3>
                <div className="space-y-3">
                    <TextInput
                        label="Button Text"
                        value={props.text || 'Button'}
                        onChange={(value) => onPropUpdate('text', value)}
                        placeholder="Click me"
                    />
                    <TextInput
                        label="Link URL"
                        value={props.url || ''}
                        onChange={(value) => onPropUpdate('url', value)}
                        placeholder="https://example.com"
                        type="url"
                        icon={<Link2 size={16} />}
                    />
                    <SelectControl
                        label="Link Target"
                        value={props.target || '_self'}
                        onChange={(value) => onPropUpdate('target', value)}
                        options={[
                            { value: '_self', label: 'Same Tab' },
                            { value: '_blank', label: 'New Tab' },
                        ]}
                    />
                </div>
            </div>

            {/* Style Section */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Style</h3>
                <div className="space-y-3">
                    <SelectControl
                        label="Variant"
                        value={props.variant || 'primary'}
                        onChange={(value) => onPropUpdate('variant', value)}
                        options={[
                            { value: 'primary', label: 'Primary' },
                            { value: 'secondary', label: 'Secondary' },
                            { value: 'outline', label: 'Outline' },
                            { value: 'ghost', label: 'Ghost' },
                            { value: 'link', label: 'Link' },
                            { value: 'gradient', label: 'Gradient' },
                        ]}
                    />
                    <SelectControl
                        label="Size"
                        value={props.size || 'md'}
                        onChange={(value) => onPropUpdate('size', value)}
                        options={[
                            { value: 'xs', label: 'Extra Small' },
                            { value: 'sm', label: 'Small' },
                            { value: 'md', label: 'Medium' },
                            { value: 'lg', label: 'Large' },
                            { value: 'xl', label: 'Extra Large' },
                        ]}
                    />
                    <ToggleSwitch
                        label="Full Width"
                        value={props.fullWidth || false}
                        onChange={(value) => onPropUpdate('fullWidth', value)}
                    />
                </div>
            </div>

            {/* Colors Section */}
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
                    <ColorPicker
                        label="Border Color"
                        value={props.borderColor || '#3b82f6'}
                        onChange={(value) => onPropUpdate('borderColor', value)}
                    />
                </div>
            </div>

            {/* Typography Section */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Typography</h3>
                <div className="space-y-3">
                    <SelectControl
                        label="Font Family"
                        value={props.fontFamily || 'system'}
                        onChange={(value) => onPropUpdate('fontFamily', value)}
                        options={[
                            { value: 'system', label: 'System' },
                            { value: 'inter', label: 'Inter' },
                            { value: 'roboto', label: 'Roboto' },
                            { value: 'poppins', label: 'Poppins' },
                        ]}
                    />
                    <SliderControl
                        label="Font Size"
                        value={props.fontSize || 16}
                        onChange={(value) => onPropUpdate('fontSize', value)}
                        min={12}
                        max={24}
                        unit="px"
                    />
                    <SelectControl
                        label="Font Weight"
                        value={props.fontWeight || '500'}
                        onChange={(value) => onPropUpdate('fontWeight', value)}
                        options={[
                            { value: '400', label: 'Normal' },
                            { value: '500', label: 'Medium' },
                            { value: '600', label: 'Semibold' },
                            { value: '700', label: 'Bold' },
                        ]}
                    />
                    <SelectControl
                        label="Text Transform"
                        value={props.textTransform || 'none'}
                        onChange={(value) => onPropUpdate('textTransform', value)}
                        options={[
                            { value: 'none', label: 'None' },
                            { value: 'uppercase', label: 'Uppercase' },
                            { value: 'lowercase', label: 'Lowercase' },
                            { value: 'capitalize', label: 'Capitalize' },
                        ]}
                    />
                </div>
            </div>

            {/* Border & Radius Section */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Border & Radius</h3>
                <div className="space-y-3">
                    <SliderControl
                        label="Border Width"
                        value={props.borderWidth || 2}
                        onChange={(value) => onPropUpdate('borderWidth', value)}
                        min={0}
                        max={10}
                        unit="px"
                    />
                    <SliderControl
                        label="Border Radius"
                        value={props.borderRadius || 6}
                        onChange={(value) => onPropUpdate('borderRadius', value)}
                        min={0}
                        max={50}
                        unit="px"
                    />
                </div>
            </div>

            {/* Effects Section */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Effects</h3>
                <div className="space-y-3">
                    <SelectControl
                        label="Hover Effect"
                        value={props.hoverEffect || 'none'}
                        onChange={(value) => onPropUpdate('hoverEffect', value)}
                        options={[
                            { value: 'none', label: 'None' },
                            { value: 'lift', label: 'Lift' },
                            { value: 'scale', label: 'Scale' },
                            { value: 'glow', label: 'Glow' },
                            { value: 'pulse', label: 'Pulse' },
                        ]}
                    />
                    <SliderControl
                        label="Shadow Intensity"
                        value={props.shadowIntensity || 0}
                        onChange={(value) => onPropUpdate('shadowIntensity', value)}
                        min={0}
                        max={10}
                    />
                </div>
            </div>

            {/* States Section */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">States</h3>
                <div className="space-y-3">
                    <ToggleSwitch
                        label="Disabled"
                        value={props.disabled || false}
                        onChange={(value) => onPropUpdate('disabled', value)}
                        description="Make button non-interactive"
                    />
                </div>
            </div>
        </div>
    );
}
