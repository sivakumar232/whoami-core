'use client';

import { useEffect, useState } from 'react';
import { X, Save } from 'lucide-react';
import { useEditSidebar } from '@/lib/useEditSidebar';
import { useWidgetStore } from '@/lib/useWidgetStore';
import { WidgetType } from '@/lib/types';
import BioEditForm from './forms/BioEditForm';
import ProjectEditForm from './forms/ProjectEditForm';
import SkillsEditForm from './forms/SkillsEditForm';
import GithubEditForm from './forms/GithubEditForm';
import ImageEditForm from './forms/ImageEditForm';
import LinkEditForm from './forms/LinkEditForm';
import SocialEditForm from './forms/SocialEditForm';
import ExperienceEditForm from './forms/ExperienceEditForm';
import EducationEditForm from './forms/EducationEditForm';
import ContactEditForm from './forms/ContactEditForm';

/**
 * EditSidebar - Slide-in sidebar for editing widget content
 */
export default function EditSidebar() {
    const { isOpen, selectedWidget, closeSidebar } = useEditSidebar();
    const { updateWidget } = useWidgetStore();
    const [formData, setFormData] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Update form data when widget changes
    useEffect(() => {
        if (selectedWidget) {
            setFormData(selectedWidget.data);
        }
    }, [selectedWidget]);

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeSidebar();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, closeSidebar]);

    const handleSave = async () => {
        if (!selectedWidget || !formData) return;

        setIsSaving(true);
        try {
            await updateWidget(selectedWidget.id, { data: formData });
            closeSidebar();
        } catch (error) {
            console.error('Failed to save widget:', error);
            alert('Failed to save changes. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        closeSidebar();
    };

    if (!isOpen || !selectedWidget) return null;

    // Render appropriate form based on widget type
    const renderForm = () => {
        const commonProps = {
            data: formData,
            onChange: setFormData,
        };

        switch (selectedWidget.type) {
            case WidgetType.BIO:
                return <BioEditForm {...commonProps} />;
            case WidgetType.PROJECT:
                return <ProjectEditForm {...commonProps} />;
            case WidgetType.SKILLS:
                return <SkillsEditForm {...commonProps} />;
            case WidgetType.GITHUB:
                return <GithubEditForm {...commonProps} />;
            case WidgetType.IMAGE:
                return <ImageEditForm {...commonProps} />;
            case WidgetType.LINK:
                return <LinkEditForm {...commonProps} />;
            case WidgetType.SOCIAL:
                return <SocialEditForm {...commonProps} />;
            case WidgetType.EXPERIENCE:
                return <ExperienceEditForm {...commonProps} />;
            case WidgetType.EDUCATION:
                return <EducationEditForm {...commonProps} />;
            case WidgetType.CONTACT:
                return <ContactEditForm {...commonProps} />;
            default:
                return <div className="text-white">Unknown widget type</div>;
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
                onClick={handleCancel}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 bottom-0 w-full md:w-[500px] bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 border-l border-white/20 shadow-2xl z-50 overflow-y-auto animate-slideInRight">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 border-b border-white/20 p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Edit Widget</h2>
                        <p className="text-white/60 text-sm mt-1">
                            Make changes to your {selectedWidget.type.toLowerCase()} widget
                        </p>
                    </div>
                    <button
                        onClick={handleCancel}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <X className="text-white" size={24} />
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-6">
                    {renderForm()}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 border-t border-white/20 p-6 flex gap-3">
                    <button
                        onClick={handleCancel}
                        className="flex-1 px-6 py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
                        disabled={isSaving}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg flex items-center justify-center gap-2 transition-all"
                        disabled={isSaving}
                    >
                        {isSaving ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>

            <style jsx global>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slideInRight {
          animation: slideInRight 300ms ease-out;
        }
      `}</style>
        </>
    );
}
