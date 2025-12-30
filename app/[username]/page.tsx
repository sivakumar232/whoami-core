import { prisma } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import UserPortfolio from '@/components/UserPortfolio'
import DatabaseErrorFallback from '@/components/DatabaseErrorFallback'


interface PageProps {
    params: Promise<{ username: string }>
}

export default async function UserProfilePage({ params }: PageProps) {
    const { username } = await params

    console.log('[PROFILE] Looking for username:', username)

    try {
        // Fetch the profile owner from the database
        const profileOwner = await prisma.user.findUnique({
            where: { username: username.toLowerCase() },
        })

        console.log('[PROFILE] Database lookup result:', profileOwner ? { id: profileOwner.id, username: profileOwner.username } : 'NOT FOUND')

        if (!profileOwner) {
            console.log('[PROFILE] User not found, returning 404')
            notFound()
        }

        // Get the currently logged-in user
        const loggedInUser = await currentUser()

        // Determine if the logged-in user is the owner of this profile
        const isOwner = loggedInUser?.id === profileOwner.clerkId

        console.log('[PROFILE] Rendering portfolio:', { username, isOwner })

        return (
            <UserPortfolio
                profileOwner={profileOwner}
                isOwner={isOwner}
            />
        )
    } catch (error) {
        console.error('[PROFILE] Database error:', error)

        // Return a fallback UI when database is unavailable
        return <DatabaseErrorFallback username={username} />
    }
}

// Generate static params for known users (optional, for better performance)
export async function generateStaticParams() {
    try {
        const users = await prisma.user.findMany({
            select: { username: true },
            take: 100, // Limit to prevent build issues with many users
        })

        return users.map((user: { username: string }) => ({
            username: user.username,
        }))
    } catch (error) {
        // Return empty array if database is not available
        console.error('Failed to generate static params:', error)
        return []
    }
}
