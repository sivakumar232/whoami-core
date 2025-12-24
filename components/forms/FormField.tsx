'use client';

import { ReactNode } from 'react';

interface FormFieldProps {
    label: string;
    children: ReactNode;
    error?: string;
    required?: boolean;
}

/**
 * Reusable form field component with consistent styling
 */
export default function FormField({ label, children, error, required }: FormFieldProps) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-2">
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
            </label>
            {children}
            {error && (
                <p className="mt-1 text-sm text-red-400">{error}</p>
            )}
        </div>
    );
}
