'use client';

import { ExperienceWidgetData } from '@/lib/types';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceWidgetProps {
    data: ExperienceWidgetData;
}

/**
 * ExperienceWidget - Displays work experience with timeline
 */
export default function ExperienceWidget({ data }: ExperienceWidgetProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
        });
    };

    const isCurrent = !data.endDate;

    return (
        <div className="flex flex-col h-full space-y-3">
            {/* Company and Position */}
            <div>
                <div className="flex items-start gap-2">
                    <Briefcase className="text-blue-400 mt-1" size={18} />
                    <div className="flex-grow">
                        <h3 className="text-lg font-bold text-white">
                            {data.position}
                        </h3>
                        <p className="text-white/70 text-sm">
                            {data.company}
                        </p>
                    </div>
                </div>
            </div>

            {/* Date range */}
            <div className="flex items-center gap-2 text-white/60 text-xs">
                <Calendar size={14} />
                <span>
                    {formatDate(data.startDate)} - {isCurrent ? 'Present' : formatDate(data.endDate!)}
                </span>
                {isCurrent && (
                    <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
                        Current
                    </span>
                )}
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm flex-grow">
                {data.description}
            </p>

            {/* Technologies */}
            {data.technologies && data.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {data.technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-2 py-0.5 text-xs rounded bg-white/10 text-white/80 border border-white/20"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
