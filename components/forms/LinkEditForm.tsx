'use client';

import FormField from './FormField';

interface LinkEditFormProps {
    data: any;
    onChange: (data: any) => void;
}

export default function LinkEditForm({ data, onChange }: LinkEditFormProps) {
    const handleChange = (field: string, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-4">
            <FormField label="Title" required>
                <input
                    type="text"
                    value={data?.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., My Website"
                />
            </FormField>

            <FormField label="URL" required>
                <input
                    type="url"
                    value={data?.url || ''}
                    onChange={(e) => handleChange('url', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com"
                />
            </FormField>

            <FormField label="Description">
                <textarea
                    value={data?.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Brief description..."
                />
            </FormField>

            <FormField label="Icon (Emoji)">
                <input
                    type="text"
                    value={data?.icon || ''}
                    onChange={(e) => handleChange('icon', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="🔗"
                    maxLength={2}
                />
            </FormField>
        </div>
    );
}
