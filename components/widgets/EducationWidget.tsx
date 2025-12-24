'use client';

import { EducationWidgetData } from '@/lib/types';
import { GraduationCap, Calendar } from 'lucide-react';

interface EducationWidgetProps {
    data: EducationWidgetData;
}

/**
 * EducationWidget - Displays education history
 */
export default function EducationWidget({ data }: EducationWidgetProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
        });
    };

    const isCurrent = !data.endDate;

    return (
        <div className="flex flex-col h-full space-y-3">
            {/* Institution and Degree */}
            <div>
                <div className="flex items-start gap-2">
                    <GraduationCap className="text-purple-400 mt-1" size={18} />
                    <div className="flex-grow">
                        <h3 className="text-lg font-bold text-white">
                            {data.degree}
                        </h3>
                        <p className="text-white/70 text-sm">
                            {data.field}
                        </p>
                        <p className="text-white/60 text-sm">
                            {data.institution}
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
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                        Current
                    </span>
                )}
            </div>

            {/* Description */}
            {data.description && (
                <p className="text-white/70 text-sm">
                    {data.description}
                </p>
            )}
        </div>
    );
}
