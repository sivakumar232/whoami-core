'use client';

import { SkillsWidgetData } from '@/lib/types';

interface SkillsWidgetProps {
    data: SkillsWidgetData;
    w?: number;
    h?: number;
}

/**
 * SkillsWidget - Neo-Brutalism styled skills display
 * Bold typography with progress bars and proper spacing
 */
export default function SkillsWidget({ data, w, h }: SkillsWidgetProps) {
    return (
        <div className="flex flex-col h-full p-6">
            {/* Title */}
            <h3 className="text-2xl font-black text-gray-900 mb-4">
                {data.title}
            </h3>

            {/* Skills list */}
            <div className="space-y-4 overflow-auto">
                {data.skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-900 text-base font-bold">
                                {skill.name}
                            </span>
                            {skill.level !== undefined && (
                                <span className="text-gray-600 text-sm font-bold px-2 py-1 bg-gray-100 rounded-lg border-2 border-black">
                                    {skill.level}%
                                </span>
                            )}
                        </div>

                        {/* Progress bar - Neo-Brutalism style */}
                        {skill.level !== undefined && (
                            <div className="w-full h-4 bg-gray-100 rounded-lg overflow-hidden border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <div
                                    className="h-full bg-neo-volt transition-all duration-500 border-r-2 border-black"
                                    style={{ width: `${skill.level}%` }}
                                />
                            </div>
                        )}

                        {/* Category tag */}
                        {skill.category && (
                            <span className="inline-block text-xs font-bold text-gray-600 px-2 py-1 bg-gray-50 rounded border border-gray-300">
                                {skill.category}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
