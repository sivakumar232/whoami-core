'use client';

import FormField from './FormField';

interface ExperienceEditFormProps {
    data: any;
    onChange: (data: any) => void;
}

export default function ExperienceEditForm({ data, onChange }: ExperienceEditFormProps) {
    const handleChange = (field: string, value: any) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-4">
            <FormField label="Company" required>
                <input
                    type="text"
                    value={data?.company || ''}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Company Name"
                />
            </FormField>

            <FormField label="Position" required>
                <input
                    type="text"
                    value={data?.position || ''}
                    onChange={(e) => handleChange('position', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Job Title"
                />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
                <FormField label="Start Date" required>
                    <input
                        type="date"
                        value={data?.startDate?.split('T')[0] || ''}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </FormField>

                <FormField label="End Date">
                    <input
                        type="date"
                        value={data?.endDate?.split('T')[0] || ''}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={data?.current}
                    />
                </FormField>
            </div>

            <FormField label="Current Position">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={data?.current || false}
                        onChange={(e) => handleChange('current', e.target.checked)}
                        className="w-5 h-5 rounded bg-white/10 border-white/20"
                    />
                    <span className="text-white">I currently work here</span>
                </label>
            </FormField>

            <FormField label="Description">
                <textarea
                    value={data?.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Describe your role and achievements..."
                />
            </FormField>
        </div>
    );
}
