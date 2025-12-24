'use client';

import FormField from './FormField';

interface ContactEditFormProps {
    data: any;
    onChange: (data: any) => void;
}

export default function ContactEditForm({ data, onChange }: ContactEditFormProps) {
    const handleChange = (field: string, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-4">
            <FormField label="Email" required>
                <input
                    type="email"
                    value={data?.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                />
            </FormField>

            <FormField label="Phone">
                <input
                    type="tel"
                    value={data?.phone || ''}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
                />
            </FormField>

            <FormField label="Location">
                <input
                    type="text"
                    value={data?.location || ''}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="City, Country"
                />
            </FormField>

            <FormField label="Availability">
                <input
                    type="text"
                    value={data?.availability || ''}
                    onChange={(e) => handleChange('availability', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Available for opportunities"
                />
            </FormField>
        </div>
    );
}
