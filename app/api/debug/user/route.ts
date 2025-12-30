import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
    try {
        const user = await currentUser()

        if (!user) {
            return NextResponse.json({ error: 'Not logged in' }, { status: 401 })
        }

        const dbUser = await prisma.user.findUnique({
            where: { clerkId: user.id },
        })

        return NextResponse.json({
            clerk: {
                id: user.id,
                email: user.emailAddresses?.[0]?.emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            database: dbUser ? {
                id: dbUser.id,
                clerkId: dbUser.clerkId,
                username: dbUser.username,
                email: dbUser.email,
            } : null,
            match: dbUser?.clerkId === user.id
        })
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 })
    }
}
