'use client';

import { ElementData } from '@/lib/builder/types';
import { ColorPicker } from '../controls/ColorPicker';
import { SliderControl } from '../controls/SliderControl';
import { SelectControl } from '../controls/SelectControl';
import { NumberInput } from '../controls/NumberInput';

interface ContainerPropertiesProps {
    element: ElementData;
    onUpdate: (updates: Partial<ElementData>) => void;
    onPropUpdate: (key: string, value: any) => void;
}

export function ContainerProperties({ element, onUpdate, onPropUpdate }: ContainerPropertiesProps) {
    const props = element.props || {};

    return (
        <div className="space-y-6">
            {/* Layout */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Layout</h3>
                <div className="space-y-3">
                    <SelectControl
                        label="Display"
                        value={props.display || 'flex'}
                        onChange={(value) => onPropUpdate('display', value)}
                        options={[
                            { value: 'flex', label: 'Flex' },
                            { value: 'grid', label: 'Grid' },
                            { value: 'block', label: 'Block' },
                        ]}
                    />
                    {props.display === 'flex' && (
                        <>
                            <SelectControl
                                label="Direction"
                                value={props.flexDirection || 'row'}
                                onChange={(value) => onPropUpdate('flexDirection', value)}
                                options={[
                                    { value: 'row', label: 'Row' },
                                    { value: 'column', label: 'Column' },
                                ]}
                            />
                            <SelectControl
                                label="Justify Content"
                                value={props.justifyContent || 'flex-start'}
                                onChange={(value) => onPropUpdate('justifyContent', value)}
                                options={[
                                    { value: 'flex-start', label: 'Start' },
                                    { value: 'center', label: 'Center' },
                                    { value: 'flex-end', label: 'End' },
                                    { value: 'space-between', label: 'Space Between' },
                                    { value: 'space-around', label: 'Space Around' },
                                ]}
                            />
                            <SelectControl
                                label="Align Items"
                                value={props.alignItems || 'flex-start'}
                                onChange={(value) => onPropUpdate('alignItems', value)}
                                options={[
                                    { value: 'flex-start', label: 'Start' },
                                    { value: 'center', label: 'Center' },
                                    { value: 'flex-end', label: 'End' },
                                    { value: 'stretch', label: 'Stretch' },
                                ]}
                            />
                        </>
                    )}
                    <SliderControl
                        label="Gap"
                        value={props.gap || 16}
                        onChange={(value) => onPropUpdate('gap', value)}
                        min={0}
                        max={48}
                        unit="px"
                    />
                </div>
            </div>

            {/* Spacing */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Spacing</h3>
                <div className="space-y-3">
                    <SliderControl
                        label="Padding"
                        value={props.padding || 16}
                        onChange={(value) => onPropUpdate('padding', value)}
                        min={0}
                        max={64}
                        unit="px"
                    />
                </div>
            </div>

            {/* Background */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Background</h3>
                <div className="space-y-3">
                    <ColorPicker
                        label="Background Color"
                        value={props.backgroundColor || '#ffffff'}
                        onChange={(value) => onPropUpdate('backgroundColor', value)}
                    />
                    <SliderControl
                        label="Border Radius"
                        value={props.borderRadius || 0}
                        onChange={(value) => onPropUpdate('borderRadius', value)}
                        min={0}
                        max={50}
                        unit="px"
                    />
                </div>
            </div>

            {/* Border */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Border</h3>
                <div className="space-y-3">
                    <SliderControl
                        label="Border Width"
                        value={props.borderWidth || 0}
                        onChange={(value) => onPropUpdate('borderWidth', value)}
                        min={0}
                        max={10}
                        unit="px"
                    />
                    <ColorPicker
                        label="Border Color"
                        value={props.borderColor || '#e5e7eb'}
                        onChange={(value) => onPropUpdate('borderColor', value)}
                    />
                </div>
            </div>
        </div>
    );
}
