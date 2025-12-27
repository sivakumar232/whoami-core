'use client';

interface SnapGuide {
    type: 'vertical' | 'horizontal';
    position: number;
}

interface SnapGuidesProps {
    guides: SnapGuide[];
}

/**
 * SnapGuides - Shows alignment guides when dragging elements
 */
export function SnapGuides({ guides }: SnapGuidesProps) {
    if (guides.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-30">
            {guides.map((guide, index) => (
                <div
                    key={`${guide.type}-${guide.position}-${index}`}
                    className="absolute bg-red-500"
                    style={
                        guide.type === 'vertical'
                            ? {
                                left: `${guide.position}px`,
                                top: 0,
                                width: '1px',
                                height: '100%',
                            }
                            : {
                                left: 0,
                                top: `${guide.position}px`,
                                width: '100%',
                                height: '1px',
                            }
                    }
                />
            ))}
        </div>
    );
}
