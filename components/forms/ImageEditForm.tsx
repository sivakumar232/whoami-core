'use client';

import FormField from './FormField';

interface ImageEditFormProps {
    data: any;
    onChange: (data: any) => void;
}

export default function ImageEditForm({ data, onChange }: ImageEditFormProps) {
    const handleChange = (field: string, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-4">
            <FormField label="Image URL" required>
                <input
                    type="url"
                    value={data?.url || ''}
                    onChange={(e) => handleChange('url', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                />
            </FormField>

            <FormField label="Alt Text" required>
                <input
                    type="text"
                    value={data?.alt || ''}
                    onChange={(e) => handleChange('alt', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the image..."
                />
            </FormField>

            <FormField label="Caption">
                <input
                    type="text"
                    value={data?.caption || ''}
                    onChange={(e) => handleChange('caption', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Optional caption..."
                />
            </FormField>

            {data?.url && (
                <div className="mt-4">
                    <p className="text-sm text-white/60 mb-2">Preview:</p>
                    <img
                        src={data.url}
                        alt={data.alt || 'Preview'}
                        className="w-full rounded-lg border-2 border-white/20"
                    />
                </div>
            )}
        </div>
    );
}
