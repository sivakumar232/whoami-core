// Type definitions for visual builder elements

export interface ElementData {
    id: string;
    userId: string;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    props: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateElementInput = Omit<ElementData, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateElementInput = Partial<Omit<ElementData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>;
