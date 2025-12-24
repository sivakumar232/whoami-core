'use client';

import FormField from './FormField';

interface SocialEditFormProps {
    data: any;
    onChange: (data: any) => void;
}

const platforms = ['github', 'twitter', 'linkedin', 'instagram', 'youtube', 'other'];

export default function SocialEditForm({ data, onChange }: SocialEditFormProps) {
    const handleChange = (field: string, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-4">
            <FormField label="Platform" required>
                <select
                    value={data?.platform || 'github'}
                    onChange={(e) => handleChange('platform', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {platforms.map((platform) => (
                        <option key={platform} value={platform} className="bg-gray-900">
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </option>
                    ))}
                </select>
            </FormField>

            <FormField label="Username" required>
                <input
                    type="text"
                    value={data?.username || ''}
                    onChange={(e) => handleChange('username', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="@username"
                />
            </FormField>

            <FormField label="Profile URL" required>
                <input
                    type="url"
                    value={data?.url || ''}
                    onChange={(e) => handleChange('url', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                />
            </FormField>
        </div>
    );
}
