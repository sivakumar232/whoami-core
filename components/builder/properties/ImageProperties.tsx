'use client';

import { ElementData } from '@/lib/builder/types';
import { ColorPicker } from '../controls/ColorPicker';
import { SliderControl } from '../controls/SliderControl';
import { SelectControl } from '../controls/SelectControl';
import { ToggleSwitch } from '../controls/ToggleSwitch';
import { TextInput } from '../controls/TextInput';
import { Image as ImageIcon } from 'lucide-react';

interface ImagePropertiesProps {
    element: ElementData;
    onUpdate: (updates: Partial<ElementData>) => void;
    onPropUpdate: (key: string, value: any) => void;
}

export function ImageProperties({ element, onUpdate, onPropUpdate }: ImagePropertiesProps) {
    const props = element.props || {};

    return (
        <div className="space-y-6">
            {/* Source */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Source</h3>
                <div className="space-y-3">
                    <TextInput
                        label="Image URL"
                        value={props.url || ''}
                        onChange={(value) => onPropUpdate('url', value)}
                        placeholder="https://example.com/image.jpg"
                        type="url"
                        icon={<ImageIcon size={16} />}
                    />
                    <TextInput
                        label="Alt Text"
                        value={props.alt || ''}
                        onChange={(value) => onPropUpdate('alt', value)}
                        placeholder="Image description"
                    />
                </div>
            </div>

            {/* Display */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Display</h3>
                <div className="space-y-3">
                    <SelectControl
                        label="Object Fit"
                        value={props.fit || 'cover'}
                        onChange={(value) => onPropUpdate('fit', value)}
                        options={[
                            { value: 'cover', label: 'Cover' },
                            { value: 'contain', label: 'Contain' },
                            { value: 'fill', label: 'Fill' },
                            { value: 'none', label: 'None' },
                        ]}
                    />
                </div>
            </div>

            {/* Border & Radius */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Border & Radius</h3>
                <div className="space-y-3">
                    <SliderControl
                        label="Border Radius"
                        value={props.borderRadius || 0}
                        onChange={(value) => onPropUpdate('borderRadius', value)}
                        min={0}
                        max={50}
                        unit="px"
                    />
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
                        value={props.borderColor || '#000000'}
                        onChange={(value) => onPropUpdate('borderColor', value)}
                    />
                </div>
            </div>

            {/* Effects */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Effects</h3>
                <div className="space-y-3">
                    <SliderControl
                        label="Opacity"
                        value={props.opacity || 100}
                        onChange={(value) => onPropUpdate('opacity', value)}
                        min={0}
                        max={100}
                        unit="%"
                    />
                    <SliderControl
                        label="Brightness"
                        value={props.brightness || 100}
                        onChange={(value) => onPropUpdate('brightness', value)}
                        min={0}
                        max={200}
                        unit="%"
                    />
                    <SliderControl
                        label="Grayscale"
                        value={props.grayscale || 0}
                        onChange={(value) => onPropUpdate('grayscale', value)}
                        min={0}
                        max={100}
                        unit="%"
                    />
                </div>
            </div>

            {/* Hover */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Hover</h3>
                <div className="space-y-3">
                    <ToggleSwitch
                        label="Zoom on Hover"
                        value={props.hoverZoom || false}
                        onChange={(value) => onPropUpdate('hoverZoom', value)}
                    />
                </div>
            </div>
        </div>
    );
}
