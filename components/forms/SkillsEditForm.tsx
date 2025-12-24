'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import FormField from './FormField';

interface SkillsEditFormProps {
    data: any;
    onChange: (data: any) => void;
}

export default function SkillsEditForm({ data, onChange }: SkillsEditFormProps) {
    const [newSkill, setNewSkill] = useState({ name: '', level: 50, category: '' });

    const handleChange = (field: string, value: any) => {
        onChange({ ...data, [field]: value });
    };

    const addSkill = () => {
        if (newSkill.name.trim()) {
            const skills = [...(data?.skills || []), newSkill];
            handleChange('skills', skills);
            setNewSkill({ name: '', level: 50, category: '' });
        }
    };

    const removeSkill = (index: number) => {
        const skills = data?.skills?.filter((_: any, i: number) => i !== index) || [];
        handleChange('skills', skills);
    };

    const updateSkill = (index: number, field: string, value: any) => {
        const skills = [...(data?.skills || [])];
        skills[index] = { ...skills[index], [field]: value };
        handleChange('skills', skills);
    };

    return (
        <div className="space-y-4">
            <FormField label="Title">
                <input
                    type="text"
                    value={data?.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Technical Skills"
                />
            </FormField>

            <FormField label="Skills">
                <div className="space-y-4">
                    {/* Add new skill */}
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
                        <input
                            type="text"
                            value={newSkill.name}
                            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Skill name..."
                        />
                        <input
                            type="text"
                            value={newSkill.category}
                            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Category (e.g., Frontend)"
                        />
                        <div>
                            <label className="text-sm text-white/60 mb-2 block">
                                Level: {newSkill.level}%
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={newSkill.level}
                                onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                                className="w-full"
                            />
                        </div>
                        <button
                            onClick={addSkill}
                            className="w-full px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus size={18} />
                            Add Skill
                        </button>
                    </div>

                    {/* Existing skills */}
                    <div className="space-y-3">
                        {data?.skills?.map((skill: any, index: number) => (
                            <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 space-y-2">
                                        <input
                                            type="text"
                                            value={skill.name}
                                            onChange={(e) => updateSkill(index, 'name', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <input
                                            type="text"
                                            value={skill.category || ''}
                                            onChange={(e) => updateSkill(index, 'category', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Category"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeSkill(index)}
                                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <div>
                                    <label className="text-sm text-white/60 mb-1 block">
                                        Level: {skill.level || 0}%
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={skill.level || 0}
                                        onChange={(e) => updateSkill(index, 'level', parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </FormField>
        </div>
    );
}
