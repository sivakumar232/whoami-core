'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface LinkDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (url: string) => void;
}

/**
 * LinkDialog - Simple URL input dialog
 */
export default function LinkDialog({ isOpen, onClose, onSubmit }: LinkDialogProps) {
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
            onSubmit(url.trim());
            setUrl('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 z-40"
                onClick={onClose}
            />

            {/* Simple URL Input - positioned above bottom nav */}
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter URL..."
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            autoFocus
                            required
                        />
                        <button
                            type="submit"
                            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg hover:scale-105 transition-all"
                            title="Add Link"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
