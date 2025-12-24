'use client';

import FormField from './FormField';

interface GithubEditFormProps {
    data: any;
    onChange: (data: any) => void;
}

export default function GithubEditForm({ data, onChange }: GithubEditFormProps) {
    const handleChange = (field: string, value: any) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-4">
            <FormField label="GitHub Username" required>
                <input
                    type="text"
                    value={data?.username || ''}
                    onChange={(e) => handleChange('username', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., octocat"
                />
            </FormField>

            <FormField label="Show Stats">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={data?.showStats !== false}
                        onChange={(e) => handleChange('showStats', e.target.checked)}
                        className="w-5 h-5 rounded bg-white/10 border-white/20"
                    />
                    <span className="text-white">Display GitHub statistics</span>
                </label>
            </FormField>

            <FormField label="Show Repositories">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={data?.showRepos || false}
                        onChange={(e) => handleChange('showRepos', e.target.checked)}
                        className="w-5 h-5 rounded bg-white/10 border-white/20"
                    />
                    <span className="text-white">Display repository list</span>
                </label>
            </FormField>
        </div>
    );
}
