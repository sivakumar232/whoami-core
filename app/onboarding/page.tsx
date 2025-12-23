'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function OnboardingPage() {
    const { user } = useUser()
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        // Check if user already has a username
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
                    // User already has a username, redirect to their profile
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
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
                <div className="text-white text-xl">Loading...</div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 p-4">
            <div className="w-full max-w-md">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome! 👋</h1>
                    <p className="text-gray-300 mb-6">Choose your unique username to get started</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    @
                                </span>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                    placeholder="johndoe"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            {username && (
                                <p className="mt-2 text-sm text-gray-400">
                                    Your profile will be at: <span className="text-purple-300">localhost:3000/{username.toLowerCase()}</span>
                                </p>
                            )}
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !username}
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating...' : 'Create My Portfolio'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
