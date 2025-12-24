'use client';

import FormField from './FormField';

interface EducationEditFormProps {
    data: any;
    onChange: (data: any) => void;
}

export default function EducationEditForm({ data, onChange }: EducationEditFormProps) {
    const handleChange = (field: string, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-4">
            <FormField label="Institution" required>
                <input
                    type="text"
                    value={data?.institution || ''}
                    onChange={(e) => handleChange('institution', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="University Name"
                />
            </FormField>

            <FormField label="Degree" required>
                <input
                    type="text"
                    value={data?.degree || ''}
                    onChange={(e) => handleChange('degree', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Bachelor of Science"
                />
            </FormField>

            <FormField label="Field of Study" required>
                <input
                    type="text"
                    value={data?.field || ''}
                    onChange={(e) => handleChange('field', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Computer Science"
                />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
                <FormField label="Start Date" required>
                    <input
                        type="date"
                        value={data?.startDate || ''}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </FormField>

                <FormField label="End Date" required>
                    <input
                        type="date"
                        value={data?.endDate || ''}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </FormField>
            </div>

            <FormField label="Description">
                <textarea
                    value={data?.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Additional details..."
                />
            </FormField>
        </div>
    );
}
