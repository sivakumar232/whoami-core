import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { clerkId, username, email } = body

        console.log('[API /user POST] Received request:', { clerkId, username, email })

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

        console.log('[API /user POST] Username check:', {
            username: username.toLowerCase(),
            exists: !!existingUser,
            existingUserClerkId: existingUser?.clerkId
        })

        if (existingUser) {
            // Check if this is the SAME user trying to re-register
            if (existingUser.clerkId === clerkId) {
                console.log('[API /user POST] Same user re-registering, returning existing user')
                return NextResponse.json({ user: existingUser }, { status: 200 })
            }

            return NextResponse.json(
                { error: 'Username is already taken' },
                { status: 409 }
            )
        }

        // Check if user with this clerkId already exists
        const existingClerkUser = await prisma.user.findUnique({
            where: { clerkId },
        })

        console.log('[API /user POST] ClerkId check:', {
            clerkId,
            exists: !!existingClerkUser,
            existingUsername: existingClerkUser?.username
        })

        if (existingClerkUser) {
            console.log('[API /user POST] User with this clerkId exists, returning existing user')
            return NextResponse.json({ user: existingClerkUser }, { status: 200 })
        }

        // Create the user
        const user = await prisma.user.create({
            data: {
                clerkId,
                username: username.toLowerCase(),
                email,
            },
        })

        console.log('[API /user POST] Created new user:', { id: user.id, username: user.username })

        return NextResponse.json({ user }, { status: 201 })
    } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
