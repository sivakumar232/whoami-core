'use client';

import { X, Trash2, Copy, ArrowUp, ArrowDown } from 'lucide-react';
import { useElementStore } from '@/lib/builder/useElementStore';
import { ElementData } from '@/lib/builder/types';
import { ButtonProperties } from './properties/ButtonProperties';
import { HeadingProperties } from './properties/HeadingProperties';
import { TextBlockProperties } from './properties/TextBlockProperties';
import { ImageProperties } from './properties/ImageProperties';
import { DividerProperties } from './properties/DividerProperties';
import { ProjectCardProperties } from './properties/ProjectCardProperties';
import { SkillTagProperties } from './properties/SkillTagProperties';
import { SocialLinksProperties } from './properties/SocialLinksProperties';
import { ContainerProperties } from './properties/ContainerProperties';
import { NumberInput } from './controls/NumberInput';

interface PropertiesPanelProps {
    element: ElementData | null;
    isVisible: boolean;
    onClose: () => void;
}

/**
 * PropertiesPanel - Right sidebar with component-specific properties
 */
export function PropertiesPanel({ element, isVisible, onClose }: PropertiesPanelProps) {
    const { updateElement, deleteElement, elements, duplicateElement } = useElementStore();

    if (!isVisible || !element) return null;

    const handleUpdate = (updates: Partial<ElementData>) => {
        updateElement(element.id, updates);
    };

    const handlePropUpdate = (key: string, value: any) => {
        updateElement(element.id, {
            props: { ...element.props, [key]: value },
        });
    };

    const handleDuplicate = () => {
        duplicateElement(element.id, element.userId);
    };

    const handleBringForward = () => {
        const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);
        const currentIndex = sortedElements.findIndex(el => el.id === element.id);

        if (currentIndex < sortedElements.length - 1) {
            const nextElement = sortedElements[currentIndex + 1];
            updateElement(element.id, { zIndex: nextElement.zIndex });
            updateElement(nextElement.id, { zIndex: element.zIndex });
        }
    };

    const handleSendBackward = () => {
        const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);
        const currentIndex = sortedElements.findIndex(el => el.id === element.id);

        if (currentIndex > 0) {
            const prevElement = sortedElements[currentIndex - 1];
            updateElement(element.id, { zIndex: prevElement.zIndex });
            updateElement(prevElement.id, { zIndex: element.zIndex });
        }
    };

    // Render component-specific properties
    const renderComponentProperties = () => {
        switch (element.type) {
            case 'button':
                return <ButtonProperties element={element} onUpdate={handleUpdate} onPropUpdate={handlePropUpdate} />;
            case 'heading':
                return <HeadingProperties element={element} onUpdate={handleUpdate} onPropUpdate={handlePropUpdate} />;
            case 'text_block':
                return <TextBlockProperties element={element} onUpdate={handleUpdate} onPropUpdate={handlePropUpdate} />;
            case 'image':
                return <ImageProperties element={element} onUpdate={handleUpdate} onPropUpdate={handlePropUpdate} />;
            case 'divider':
                return <DividerProperties element={element} onUpdate={handleUpdate} onPropUpdate={handlePropUpdate} />;
            case 'project_card':
                return <ProjectCardProperties element={element} onUpdate={handleUpdate} onPropUpdate={handlePropUpdate} />;
            case 'skill_tag':
                return <SkillTagProperties element={element} onUpdate={handleUpdate} onPropUpdate={handlePropUpdate} />;
            case 'social_links':
                return <SocialLinksProperties element={element} onUpdate={handleUpdate} onPropUpdate={handlePropUpdate} />;
            case 'container':
                return <ContainerProperties element={element} onUpdate={handleUpdate} onPropUpdate={handlePropUpdate} />;
            default:
                return <div className="text-sm text-gray-500">No properties available</div>;
        }
    };

    return (
        <div key={element.id} className="p-4 space-y-6">
            {/* Element Type */}
            <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Type</label>
                <p className="text-sm text-gray-900 mt-1 capitalize">{element.type.replace('_', ' ')}</p>
            </div>

            {/* Position & Size */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Position & Size</h3>
                <div className="grid grid-cols-2 gap-2">
                    <NumberInput
                        label="X"
                        value={Math.round(element.x)}
                        onChange={(value) => handleUpdate({ x: value })}
                        unit="px"
                    />
                    <NumberInput
                        label="Y"
                        value={Math.round(element.y)}
                        onChange={(value) => handleUpdate({ y: value })}
                        unit="px"
                    />
                    <NumberInput
                        label="Width"
                        value={Math.round(element.width)}
                        onChange={(value) => handleUpdate({ width: value })}
                        unit="px"
                    />
                    <NumberInput
                        label="Height"
                        value={Math.round(element.height)}
                        onChange={(value) => handleUpdate({ height: value })}
                        unit="px"
                    />
                </div>
            </div>

            {/* Component-Specific Properties */}
            {renderComponentProperties()}

            {/* Layer Controls */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Layer</h3>
                <div className="flex gap-2">
                    <button
                        onClick={handleBringForward}
                        className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded hover:border-blue-500 flex items-center justify-center gap-2"
                    >
                        <ArrowUp size={14} />
                        Forward
                    </button>
                    <button
                        onClick={handleSendBackward}
                        className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded hover:border-blue-500 flex items-center justify-center gap-2"
                    >
                        <ArrowDown size={14} />
                        Backward
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Z-index: {element.zIndex}</p>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
                <button
                    onClick={handleDuplicate}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                    <Copy size={16} />
                    Duplicate
                </button>
                <button
                    onClick={() => deleteElement(element.id)}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center justify-center gap-2"
                >
                    <Trash2 size={16} />
                    Delete
                </button>
            </div>
        </div>
    );
}
