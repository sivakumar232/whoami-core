'use client';

import { ElementData } from '@/lib/builder/types';
import { ColorPicker } from '../controls/ColorPicker';
import { SliderControl } from '../controls/SliderControl';
import { SelectControl } from '../controls/SelectControl';
import { ToggleSwitch } from '../controls/ToggleSwitch';
import { TextInput } from '../controls/TextInput';
import { useState, useEffect } from 'react';

interface HeadingPropertiesProps {
    element: ElementData;
    onUpdate: (updates: Partial<ElementData>) => void;
    onPropUpdate: (key: string, value: any) => void;
}

export function HeadingProperties({ element, onUpdate, onPropUpdate }: HeadingPropertiesProps) {
    const props = element.props || {};

    // Local state for text to prevent conflicts
    const [localText, setLocalText] = useState(props.text || 'Heading');

    // Update local state when element changes (but not when typing)
    useEffect(() => {
        if (props.text !== localText) {
            setLocalText(props.text || 'Heading');
        }
    }, [element.id]); // Only when element ID changes

    return (
        <div className="space-y-6">
            {/* Content */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Content</h3>
                <div className="space-y-3">
                    <div>
                        <label className="text-xs font-medium text-gray-700">Text</label>
                        <input
                            type="text"
                            value={localText}
                            onChange={(e) => setLocalText(e.target.value)}
                            onBlur={() => onPropUpdate('text', localText)}
                            className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <SelectControl
                        label="Level"
                        value={props.level?.toString() || '1'}
                        onChange={(value) => onPropUpdate('level', Number(value))}
                        options={[
                            { value: '1', label: 'H1 - Main Title' },
                            { value: '2', label: 'H2 - Section' },
                            { value: '3', label: 'H3 - Subsection' },
                            { value: '4', label: 'H4 - Minor Heading' },
                        ]}
                    />
                </div>
            </div>

            {/* Typography */}
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
                            { value: 'playfair', label: 'Playfair Display' },
                        ]}
                    />
                    <SliderControl
                        label="Font Size"
                        value={props.fontSize || 32}
                        onChange={(value) => onPropUpdate('fontSize', value)}
                        min={16}
                        max={96}
                        unit="px"
                    />
                    <SelectControl
                        label="Font Weight"
                        value={props.fontWeight || '700'}
                        onChange={(value) => onPropUpdate('fontWeight', value)}
                        options={[
                            { value: '300', label: 'Light' },
                            { value: '400', label: 'Normal' },
                            { value: '500', label: 'Medium' },
                            { value: '600', label: 'Semibold' },
                            { value: '700', label: 'Bold' },
                            { value: '800', label: 'Extra Bold' },
                        ]}
                    />
                    <SliderControl
                        label="Line Height"
                        value={props.lineHeight || 1.2}
                        onChange={(value) => onPropUpdate('lineHeight', value)}
                        min={0.8}
                        max={2}
                        step={0.1}
                    />
                    <SliderControl
                        label="Letter Spacing"
                        value={props.letterSpacing || 0}
                        onChange={(value) => onPropUpdate('letterSpacing', value)}
                        min={-2}
                        max={10}
                        unit="px"
                    />
                </div>
            </div>

            {/* Color & Style */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Color & Style</h3>
                <div className="space-y-3">
                    <ColorPicker
                        label="Text Color"
                        value={props.color || '#000000'}
                        onChange={(value) => onPropUpdate('color', value)}
                    />
                    <SelectControl
                        label="Text Align"
                        value={props.align || 'left'}
                        onChange={(value) => onPropUpdate('align', value)}
                        options={[
                            { value: 'left', label: 'Left' },
                            { value: 'center', label: 'Center' },
                            { value: 'right', label: 'Right' },
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
        </div>
    );
}
