import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { clerkId } = body

        if (!clerkId) {
            return NextResponse.json(
                { error: 'Missing clerkId' },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { clerkId },
            select: { username: true },
        })

        if (user) {
            return NextResponse.json({ exists: true, username: user.username })
        }

        return NextResponse.json({ exists: false })
    } catch (error) {
        console.error('Error checking user:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
