'use client';

import { SkillsWidgetData } from '@/lib/types';

interface SkillsWidgetProps {
    data: SkillsWidgetData;
}

/**
 * SkillsWidget - Displays skills with progress bars
 */
export default function SkillsWidget({ data }: SkillsWidgetProps) {
    return (
        <div className="flex flex-col h-full space-y-4">
            {/* Title */}
            <h3 className="text-xl font-bold text-white">
                {data.title}
            </h3>

            {/* Skills list */}
            <div className="space-y-3 overflow-auto">
                {data.skills.map((skill, index) => (
                    <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                            <span className="text-white/90 text-sm font-medium">
                                {skill.name}
                            </span>
                            {skill.level !== undefined && (
                                <span className="text-white/60 text-xs">
                                    {skill.level}%
                                </span>
                            )}
                        </div>

                        {/* Progress bar */}
                        {skill.level !== undefined && (
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                                    style={{ width: `${skill.level}%` }}
                                />
                            </div>
                        )}

                        {/* Category tag */}
                        {skill.category && (
                            <span className="inline-block text-xs text-white/50">
                                {skill.category}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
