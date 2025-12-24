'use client';

import FormField from './FormField';

interface BioEditFormProps {
    data: any;
    onChange: (data: any) => void;
}

export default function BioEditForm({ data, onChange }: BioEditFormProps) {
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
                    placeholder="e.g., Full Stack Developer"
                />
            </FormField>

            <FormField label="Description" required>
                <textarea
                    value={data?.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Tell visitors about yourself..."
                />
            </FormField>

            <FormField label="Avatar URL">
                <input
                    type="url"
                    value={data?.avatar || ''}
                    onChange={(e) => handleChange('avatar', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/avatar.jpg"
                />
            </FormField>

            {data?.avatar && (
                <div className="mt-4">
                    <p className="text-sm text-white/60 mb-2">Preview:</p>
                    <img
                        src={data.avatar}
                        alt="Avatar preview"
                        className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
                    />
                </div>
            )}
        </div>
    );
}
