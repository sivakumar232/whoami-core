'use client'

import { useTheme } from '@/lib/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="font-black text-lg px-4 py-3 border-[4px] uppercase tracking-tight hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform"
            style={{
                background: 'var(--button-bg)',
                color: 'var(--button-text)',
                borderColor: 'var(--border-color)',
                boxShadow: '6px 6px 0 0 var(--border-color)'
            }}
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Moon size={20} />
            ) : (
                <Sun size={20} />
            )}
        </button>
    )
}
