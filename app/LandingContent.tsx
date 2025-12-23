'use client'

import { SignInButton, SignUpButton } from '@clerk/nextjs'

export default function LandingContent() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
            <main className="flex flex-col items-center gap-8 text-center px-8">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-12 shadow-2xl max-w-2xl">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Build Your Dynamic Portfolio
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">
                        Create a stunning, customizable portfolio with drag-and-drop widgets.
                        Showcase your projects, GitHub activity, and more.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <SignUpButton mode="modal">
                            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition shadow-lg">
                                Get Started
                            </button>
                        </SignUpButton>

                        <SignInButton mode="modal">
                            <button className="px-8 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition">
                                Sign In
                            </button>
                        </SignInButton>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="text-4xl mb-3">🎨</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Customizable Widgets</h3>
                        <p className="text-gray-400 text-sm">Add bio, projects, GitHub stats, and more</p>
                    </div>

                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="text-4xl mb-3">⚡</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Real-time Editing</h3>
                        <p className="text-gray-400 text-sm">Changes save automatically as you build</p>
                    </div>

                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="text-4xl mb-3">🔗</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Unique URL</h3>
                        <p className="text-gray-400 text-sm">Get your own portfolio.com/username</p>
                    </div>
                </div>
            </main>
        </div>
    )
}
