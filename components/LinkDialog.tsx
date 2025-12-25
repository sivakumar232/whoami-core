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
                className="neo-modal-backdrop"
                onClick={onClose}
            />

            {/* Simple URL Input - positioned above bottom nav */}
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
                <form onSubmit={handleSubmit} className="neo-card neo-card-volt p-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter URL..."
                            className="neo-input flex-1"
                            autoFocus
                            required
                        />
                        <button
                            type="submit"
                            className="neo-btn-primary p-3"
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
