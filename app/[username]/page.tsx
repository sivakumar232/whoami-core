import { prisma } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import WidgetGrid from '@/components/WidgetGrid'
import '../widget-grid.css'

interface PageProps {
    params: Promise<{ username: string }>
}

export default async function UserProfilePage({ params }: PageProps) {
    const { username } = await params

    // Fetch the profile owner from the database
    const profileOwner = await prisma.user.findUnique({
        where: { username: username.toLowerCase() },
    })

    if (!profileOwner) {
        notFound()
    }

    // Get the currently logged-in user
    const loggedInUser = await currentUser()

    // Determine if the logged-in user is the owner of this profile
    const isEditable = loggedInUser?.id === profileOwner.clerkId

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 mb-8 shadow-2xl">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        {profileOwner.username}'s Portfolio 🎨
                    </h1>
                    <p className="text-gray-300">
                        {isEditable ? (
                            <span className="text-green-400">✏️ Edit mode: Drag widgets to rearrange</span>
                        ) : (
                            <span>Viewing {profileOwner.username}'s portfolio</span>
                        )}
                    </p>
                </div>

                {/* Widget Grid */}
                <WidgetGrid userId={profileOwner.id} isEditable={isEditable} />
            </div>
        </div>
    )
}

// Generate static params for known users (optional, for better performance)
export async function generateStaticParams() {
    const users = await prisma.user.findMany({
        select: { username: true },
        take: 100, // Limit to prevent build issues with many users
    })

    return users.map((user: { username: string }) => ({
        username: user.username,
    }))
}
