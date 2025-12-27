'use client';

import { ElementData } from '@/lib/builder/types';
import { ColorPicker } from '../controls/ColorPicker';
import { SliderControl } from '../controls/SliderControl';
import { SelectControl } from '../controls/SelectControl';
import { NumberInput } from '../controls/NumberInput';
import { useState, useEffect } from 'react';

interface TextBlockPropertiesProps {
    element: ElementData;
    onUpdate: (updates: Partial<ElementData>) => void;
    onPropUpdate: (key: string, value: any) => void;
}

export function TextBlockProperties({ element, onUpdate, onPropUpdate }: TextBlockPropertiesProps) {
    const props = element.props || {};

    // Local state for content to prevent conflicts
    const [localContent, setLocalContent] = useState(props.content || 'Your text here...');

    // Update local state when element changes
    useEffect(() => {
        setLocalContent(props.content || 'Your text here...');
    }, [element.id]);

    return (
        <div className="space-y-6">
            {/* Content */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Content</h3>
                <div className="space-y-3">
                    <div>
                        <label className="text-xs font-medium text-gray-700">Text</label>
                        <textarea
                            value={localContent}
                            onChange={(e) => setLocalContent(e.target.value)}
                            onBlur={() => onPropUpdate('content', localContent)}
                            rows={4}
                            className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
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
                        ]}
                    />
                    <SliderControl
                        label="Font Size"
                        value={props.fontSize || 16}
                        onChange={(value) => onPropUpdate('fontSize', value)}
                        min={12}
                        max={32}
                        unit="px"
                    />
                    <SelectControl
                        label="Font Weight"
                        value={props.fontWeight || '400'}
                        onChange={(value) => onPropUpdate('fontWeight', value)}
                        options={[
                            { value: '300', label: 'Light' },
                            { value: '400', label: 'Normal' },
                            { value: '500', label: 'Medium' },
                            { value: '600', label: 'Semibold' },
                        ]}
                    />
                    <SliderControl
                        label="Line Height"
                        value={props.lineHeight || 1.6}
                        onChange={(value) => onPropUpdate('lineHeight', value)}
                        min={1}
                        max={3}
                        step={0.1}
                    />
                </div>
            </div>

            {/* Color & Alignment */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Color & Alignment</h3>
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
                            { value: 'justify', label: 'Justify' },
                        ]}
                    />
                </div>
            </div>

            {/* Advanced */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Advanced</h3>
                <div className="space-y-3">
                    <NumberInput
                        label="Max Width"
                        value={props.maxWidth || 600}
                        onChange={(value) => onPropUpdate('maxWidth', value)}
                        min={200}
                        max={1200}
                        unit="px"
                    />
                </div>
            </div>
        </div>
    );
}
