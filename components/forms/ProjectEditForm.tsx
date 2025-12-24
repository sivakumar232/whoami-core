'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import FormField from './FormField';

interface ProjectEditFormProps {
    data: any;
    onChange: (data: any) => void;
}

export default function ProjectEditForm({ data, onChange }: ProjectEditFormProps) {
    const [newTag, setNewTag] = useState('');

    const handleChange = (field: string, value: any) => {
        onChange({ ...data, [field]: value });
    };

    const addTag = () => {
        if (newTag.trim() && !data?.tags?.includes(newTag.trim())) {
            handleChange('tags', [...(data?.tags || []), newTag.trim()]);
            setNewTag('');
        }
    };

    const removeTag = (tag: string) => {
        handleChange('tags', data?.tags?.filter((t: string) => t !== tag) || []);
    };

    return (
        <div className="space-y-4">
            <FormField label="Project Title" required>
                <input
                    type="text"
                    value={data?.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Portfolio Builder"
                />
            </FormField>

            <FormField label="Description" required>
                <textarea
                    value={data?.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Describe your project..."
                />
            </FormField>

            <FormField label="Image URL">
                <input
                    type="url"
                    value={data?.imageUrl || ''}
                    onChange={(e) => handleChange('imageUrl', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/project.jpg"
                />
            </FormField>

            <FormField label="GitHub URL">
                <input
                    type="url"
                    value={data?.githubUrl || ''}
                    onChange={(e) => handleChange('githubUrl', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://github.com/username/repo"
                />
            </FormField>

            <FormField label="Demo URL">
                <input
                    type="url"
                    value={data?.demoUrl || ''}
                    onChange={(e) => handleChange('demoUrl', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://demo.example.com"
                />
            </FormField>

            <FormField label="Technologies">
                <div className="space-y-2">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                            className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add a technology..."
                        />
                        <button
                            onClick={addTag}
                            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {data?.tags?.map((tag: string) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm flex items-center gap-2"
                            >
                                {tag}
                                <button
                                    onClick={() => removeTag(tag)}
                                    className="hover:text-red-400 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            </FormField>
        </div>
    );
}
