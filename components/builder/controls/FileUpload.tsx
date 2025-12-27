'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
    label: string;
    value?: string; // Current image URL
    onChange: (url: string) => void;
    accept?: string;
}

export function FileUpload({
    label,
    value,
    onChange,
    accept = 'image/*'
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value || '');

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        try {
            // Convert to base64 for preview and storage
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreview(base64String);
                onChange(base64String);
                setUploading(false);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview('');
        onChange('');
    };

    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-gray-700">{label}</label>

            {preview ? (
                <div className="relative">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded border border-gray-300"
                    />
                    <button
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500 hover:bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="text-xs text-gray-500">
                            {uploading ? 'Uploading...' : 'Click to upload image'}
                        </p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        accept={accept}
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </label>
            )}
        </div>
    );
}
