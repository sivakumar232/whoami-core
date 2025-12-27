'use client';

import { ElementData } from '@/lib/builder/types';
import { ColorPicker } from '../controls/ColorPicker';
import { SliderControl } from '../controls/SliderControl';
import { SelectControl } from '../controls/SelectControl';

interface DividerPropertiesProps {
    element: ElementData;
    onUpdate: (updates: Partial<ElementData>) => void;
    onPropUpdate: (key: string, value: any) => void;
}

export function DividerProperties({ element, onUpdate, onPropUpdate }: DividerPropertiesProps) {
    const props = element.props || {};

    return (
        <div className="space-y-6">
            {/* Style */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Style</h3>
                <div className="space-y-3">
                    <SelectControl
                        label="Line Style"
                        value={props.style || 'solid'}
                        onChange={(value) => onPropUpdate('style', value)}
                        options={[
                            { value: 'solid', label: 'Solid' },
                            { value: 'dashed', label: 'Dashed' },
                            { value: 'dotted', label: 'Dotted' },
                        ]}
                    />
                    <SliderControl
                        label="Thickness"
                        value={props.thickness || 2}
                        onChange={(value) => onPropUpdate('thickness', value)}
                        min={1}
                        max={10}
                        unit="px"
                    />
                </div>
            </div>

            {/* Color */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Color</h3>
                <div className="space-y-3">
                    <ColorPicker
                        label="Line Color"
                        value={props.color || '#e5e7eb'}
                        onChange={(value) => onPropUpdate('color', value)}
                    />
                    <SliderControl
                        label="Opacity"
                        value={props.opacity || 100}
                        onChange={(value) => onPropUpdate('opacity', value)}
                        min={0}
                        max={100}
                        unit="%"
                    />
                </div>
            </div>

            {/* Spacing */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Spacing</h3>
                <div className="space-y-3">
                    <SliderControl
                        label="Margin Top"
                        value={props.marginTop || 16}
                        onChange={(value) => onPropUpdate('marginTop', value)}
                        min={0}
                        max={100}
                        unit="px"
                    />
                    <SliderControl
                        label="Margin Bottom"
                        value={props.marginBottom || 16}
                        onChange={(value) => onPropUpdate('marginBottom', value)}
                        min={0}
                        max={100}
                        unit="px"
                    />
                </div>
            </div>
        </div>
    );
}
