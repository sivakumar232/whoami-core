'use client';

interface SkillTagProps {
    skill?: string;
    level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    color?: string;
    isEditable?: boolean;
    onChange?: (skill: string) => void;
}

export function SkillTag({
    skill = 'React',
    level = 'intermediate',
    color,
    isEditable = false,
    onChange,
}: SkillTagProps) {
    const levelColors = {
        beginner: 'bg-green-100 text-green-700 border-green-300',
        intermediate: 'bg-blue-100 text-blue-700 border-blue-300',
        advanced: 'bg-purple-100 text-purple-700 border-purple-300',
        expert: 'bg-orange-100 text-orange-700 border-orange-300',
    };

    return (
        <div className={`inline-flex items-center px-3 py-1.5 rounded-full border-2 font-medium ${levelColors[level]}`}>
            <span
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={(e) => onChange?.(e.currentTarget.textContent || '')}
                className="outline-none"
            >
                {skill}
            </span>
        </div>
    );
}
