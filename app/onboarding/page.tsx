'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

export default function OnboardingPage() {
    const { user } = useUser()
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [checking, setChecking] = useState(true)

    // Check if user already has a username
    useEffect(() => {
        const checkExistingUser = async () => {
            if (!user) return

            try {
                const response = await fetch('/api/user/check', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ clerkId: user.id }),
                })

                const data = await response.json()

                if (data.exists && data.username) {
                    // User already has username, redirect to profile
                    router.push(`/${data.username}`)
                } else {
                    setChecking(false)
                }
            } catch (err) {
                console.error('Error checking user:', err)
                setChecking(false)
            }
        }

        checkExistingUser()
    }, [user, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Validate username
        if (username.length < 3) {
            setError('Username must be at least 3 characters long')
            setLoading(false)
            return
        }

        if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
            setError('Username can only contain letters, numbers, hyphens, and underscores')
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clerkId: user?.id,
                    username: username.toLowerCase(),
                    email: user?.primaryEmailAddress?.emailAddress,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Failed to create user')
                setLoading(false)
                return
            }

            // Success! Redirect to their new profile
            router.push(`/${username.toLowerCase()}`)
        } catch (err) {
            setError('An error occurred. Please try again.')
            setLoading(false)
        }
    }

    if (checking) {
        return (
            <div className="flex min-h-screen items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
                <div className="text-2xl font-black uppercase" style={{ fontFamily: 'var(--font-bangers)', color: 'var(--text-primary)' }}>
                    Loading...
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--bg-primary)' }}>
            <div className="w-full max-w-lg">
                {/* Neo-Brutalism Card */}
                <div className="bg-neo-volt border-[6px] border-black p-10 neo-animate-scaleIn"
                    style={{ boxShadow: '16px 16px 0 0 #000' }}>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-6xl font-black text-black mb-3 uppercase"
                            style={{ fontFamily: 'var(--font-bangers)' }}>
                            WELCOME!
                        </h1>
                        <p className="text-xl font-bold text-black">
                            Claim your username and start building 🚀
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="neo-label">
                                YOUR USERNAME
                            </label>
                            <div className="relative mt-2">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black font-bold text-xl">
                                    @
                                </span>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="neo-input pl-12 text-lg"
                                    placeholder="yourname"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            {username && (
                                <p className="mt-3 text-sm font-bold text-black bg-white border-[3px] border-black p-3 inline-block">
                                    Your link: <span className="text-neo-pink">whoami.com/{username.toLowerCase()}</span>
                                </p>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-neo-pink border-[4px] border-black p-4"
                                style={{ boxShadow: '6px 6px 0 0 #000' }}>
                                <p className="text-white font-black text-lg uppercase">
                                    ⚠️ {error}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !username}
                            className="neo-btn neo-btn-primary w-full text-xl py-5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Sparkles size={24} />
                            {loading ? 'CREATING...' : 'CREATE MY PORTFOLIO'}
                        </button>
                    </form>

                    {/* Info Box */}
                    <div className="mt-8 bg-black text-neo-volt border-[4px] border-black p-4"
                        style={{ boxShadow: '6px 6px 0 0 rgba(0,0,0,0.3)' }}>
                        <p className="font-bold text-sm">
                            💡 TIP: Choose wisely! Your username will be your permanent portfolio URL.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
