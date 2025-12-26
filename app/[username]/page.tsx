import { prisma } from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import UserPortfolio from '@/components/UserPortfolio'


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
    const isOwner = loggedInUser?.id === profileOwner.clerkId

    return (
        <UserPortfolio
            profileOwner={profileOwner}
            isOwner={isOwner}
        />
    )
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
