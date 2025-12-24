'use client';

import { ContactWidgetData } from '@/lib/types';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

interface ContactWidgetProps {
    data: ContactWidgetData;
}

/**
 * ContactWidget - Displays contact information with icons
 */
export default function ContactWidget({ data }: ContactWidgetProps) {
    return (
        <div className="flex flex-col h-full justify-center space-y-4">
            <h3 className="text-xl font-bold text-white mb-2">
                Contact
            </h3>

            <div className="space-y-3">
                {/* Email */}
                {data.email && (
                    <a
                        href={`mailto:${data.email}`}
                        className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
                    >
                        <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                            <Mail size={18} />
                        </div>
                        <span className="text-sm">{data.email}</span>
                    </a>
                )}

                {/* Phone */}
                {data.phone && (
                    <a
                        href={`tel:${data.phone}`}
                        className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
                    >
                        <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                            <Phone size={18} />
                        </div>
                        <span className="text-sm">{data.phone}</span>
                    </a>
                )}

                {/* Location */}
                {data.location && (
                    <div className="flex items-center gap-3 text-white/80">
                        <div className="p-2 rounded-lg bg-white/10">
                            <MapPin size={18} />
                        </div>
                        <span className="text-sm">{data.location}</span>
                    </div>
                )}

                {/* Availability */}
                {data.availability && (
                    <div className="flex items-center gap-3 text-white/80">
                        <div className="p-2 rounded-lg bg-white/10">
                            <Clock size={18} />
                        </div>
                        <span className="text-sm">{data.availability}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
