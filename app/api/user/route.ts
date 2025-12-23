import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { clerkId, username, email } = body

        if (!clerkId || !username || !email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Check if username is already taken
        const existingUser = await prisma.user.findUnique({
            where: { username: username.toLowerCase() },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'Username is already taken' },
                { status: 409 }
            )
        }

        // Check if user with this clerkId already exists
        const existingClerkUser = await prisma.user.findUnique({
            where: { clerkId },
        })

        if (existingClerkUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 409 }
            )
        }

        // Create the user
        const user = await prisma.user.create({
            data: {
                clerkId,
                username: username.toLowerCase(),
                email,
            },
        })

        return NextResponse.json({ user }, { status: 201 })
    } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
