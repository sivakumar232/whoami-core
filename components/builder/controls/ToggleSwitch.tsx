'use client';

interface ToggleSwitchProps {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
    description?: string;
}

export function ToggleSwitch({ label, value, onChange, description }: ToggleSwitchProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex-1">
                <label className="text-xs font-medium text-gray-700">{label}</label>
                {description && (
                    <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                )}
            </div>
            <button
                onClick={() => onChange(!value)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    );
}
