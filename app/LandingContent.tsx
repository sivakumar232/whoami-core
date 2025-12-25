'use client'

import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import { Code2, Globe, MousePointer2, Zap } from 'lucide-react'

export default function LandingContent() {
    const { isSignedIn } = useUser()

    return (
        <div className="min-h-screen bg-white text-black">
            {/* NAVBAR */}
            <nav className="bg-white sticky top-0 z-50 border-b-[5px] border-black">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-4xl font-black uppercase">WHOAMI</h1>

                    <div>
                        {isSignedIn ? (
                            <UserButton afterSignOutUrl="/" />
                        ) : (
                            <SignInButton mode="modal">
                                <button className="bg-black text-neo-volt font-black text-lg px-8 py-3 border-[4px] border-black uppercase hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform"
                                    style={{ boxShadow: '8px 8px 0 0 #000' }}>
                                    LOGIN
                                </button>
                            </SignInButton>
                        )}
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
                {/* LEFT - TEXT */}
                <div className="space-y-8">
                    <div className="inline-block bg-neo-pink border-[4px] border-black px-4 py-2"
                        style={{ boxShadow: '4px 4px 0 0 #000' }}>
                        <p className="font-mono font-black text-sm text-white">
                            10,000+ PORTFOLIOS CREATED
                        </p>
                    </div>

                    <h2 className="text-7xl md:text-8xl font-black uppercase leading-none">
                        BUILD YOUR
                        <span className="block text-neo-pink">PORTFOLIO.</span>
                        <span className="block">NO CODE.</span>
                        <span className="block">JUST DRAG.</span>
                    </h2>

                    <div className="bg-white border-[5px] border-black p-6"
                        style={{ boxShadow: '6px 6px 0 0 #000' }}>
                        <p className="font-mono font-bold text-lg leading-relaxed">
                            Create a stunning portfolio in minutes. <span className="bg-neo-volt px-2">Drag and drop</span> widgets.
                            Add bio, projects, GitHub stats. Share your unique link.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {isSignedIn ? (
                            <a href="/onboarding">
                                <button className="bg-neo-pink text-white font-black text-xl px-10 py-5 border-[5px] border-black uppercase hover:translate-x-[-6px] hover:translate-y-[-6px] transition-transform flex items-center gap-3"
                                    style={{ boxShadow: '12px 12px 0 0 #000' }}>
                                    <Zap size={28} />
                                    DASHBOARD
                                </button>
                            </a>
                        ) : (
                            <SignUpButton mode="modal">
                                <button className="bg-neo-pink text-white font-black text-xl px-10 py-5 border-[5px] border-black uppercase hover:translate-x-[-6px] hover:translate-y-[-6px] transition-transform flex items-center gap-3"
                                    style={{ boxShadow: '12px 12px 0 0 #000' }}>
                                    <Code2 size={28} />
                                    GET STARTED
                                </button>
                            </SignUpButton>
                        )}
                    </div>
                </div>

                {/* RIGHT - MOCKUP */}
                <div className="relative">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 border-[6px] border-black p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300"
                        style={{ boxShadow: '16px 16px 0 0 #000' }}>
                        <div className="space-y-4">
                            <div className="bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-lg p-4">
                                <div className="h-3 w-24 bg-white/60 rounded mb-2"></div>
                                <div className="h-2 w-full bg-white/40 rounded"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-neo-volt border-2 border-black p-3 h-24"></div>
                                <div className="bg-neo-pink border-2 border-black p-3 h-24"></div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-lg p-4 h-20"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h3 className="text-5xl font-black uppercase mb-12 text-center">
                        WHAT YOU GET
                    </h3>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-neo-pink border-[5px] border-black p-8 hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform"
                            style={{ boxShadow: '10px 10px 0 0 #000' }}>
                            <Code2 size={48} className="text-black mb-4" />
                            <h4 className="text-3xl font-black text-black mb-3 uppercase">
                                Widget System
                            </h4>
                            <p className="text-black font-bold text-lg">
                                Bio, projects, skills, GitHub stats. Mix and match to tell your story.
                            </p>
                        </div>

                        <div className="bg-yellow-400 border-[5px] border-black p-8 hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform"
                            style={{ boxShadow: '10px 10px 0 0 #000' }}>
                            <Globe size={48} className="text-black mb-4" />
                            <h4 className="text-3xl font-black text-black mb-3 uppercase">
                                Your Link
                            </h4>
                            <p className="text-black font-bold text-lg">
                                Get <span className="text-neo-pink">whoami.com/yourname</span>. Your permanent digital home.
                            </p>
                        </div>

                        <div className="bg-neo-volt border-[5px] border-black p-8 hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform"
                            style={{ boxShadow: '10px 10px 0 0 #000' }}>
                            <MousePointer2 size={48} className="text-black mb-4" />
                            <h4 className="text-3xl font-black text-black mb-3 uppercase">
                                Drag & Drop
                            </h4>
                            <p className="text-black font-bold text-lg">
                                Arrange widgets however you want. No code required.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* STEPS */}
            <section className="max-w-4xl mx-auto px-6 py-20">
                <h3 className="text-5xl font-black uppercase mb-16 text-center">
                    HOW IT WORKS
                </h3>

                <div className="space-y-8">
                    {[
                        { num: '01', title: 'SIGN UP', desc: 'Create your account and claim your username. Takes 30 seconds.' },
                        { num: '02', title: 'ADD WIDGETS', desc: 'Choose from bio, projects, skills, GitHub stats. Drag them into your grid.' },
                        { num: '03', title: 'SHARE', desc: 'Your portfolio is live instantly. Share on LinkedIn, Twitter, GitHub.' }
                    ].map((step) => (
                        <div key={step.num} className="flex items-center gap-8">
                            <div className="bg-black text-white w-24 h-24 flex items-center justify-center flex-shrink-0 border-[4px] border-black"
                                style={{ boxShadow: '6px 6px 0 0 #000' }}>
                                <span className="text-4xl font-black">{step.num}</span>
                            </div>
                            <div className="bg-white border-[4px] border-black p-6 flex-1"
                                style={{ boxShadow: '6px 6px 0 0 #000' }}>
                                <p className="text-2xl font-black uppercase font-mono">{step.title}</p>
                                <p className="text-base font-bold text-gray-600 mt-2">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    {isSignedIn ? (
                        <a href="/onboarding">
                            <button className="bg-neo-volt text-black font-black text-2xl px-12 py-6 border-[6px] border-black uppercase hover:translate-x-[-6px] hover:translate-y-[-6px] transition-transform inline-flex items-center gap-4"
                                style={{ boxShadow: '14px 14px 0 0 #000' }}>
                                <Zap size={32} />
                                GO TO DASHBOARD
                            </button>
                        </a>
                    ) : (
                        <SignUpButton mode="modal">
                            <button className="bg-neo-volt text-black font-black text-2xl px-12 py-6 border-[6px] border-black uppercase hover:translate-x-[-6px] hover:translate-y-[-6px] transition-transform inline-flex items-center gap-4"
                                style={{ boxShadow: '14px 14px 0 0 #000' }}>
                                <Code2 size={32} />
                                START NOW
                            </button>
                        </SignUpButton>
                    )}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-black text-white py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="font-mono text-sm text-gray-400">
                        © 2025 WHOAMI. Built for developers.
                    </p>
                </div>
            </footer>
        </div>
    )
}
