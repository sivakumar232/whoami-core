import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { validateUsername, sanitizeUsername } from '@/lib/validation/username'
import { APIError, handleAPIError } from '@/lib/errors/APIError'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { clerkId, username, email } = body

        console.log('[API /user POST] Received request:', { clerkId, username, email })

        if (!clerkId || !username || !email) {
            throw new APIError(400, 'Missing required fields', 'MISSING_FIELDS')
        }

        // Validate username
        const validation = validateUsername(username)
        if (!validation.valid) {
            throw new APIError(400, validation.error!, 'INVALID_USERNAME')
        }

        // Sanitize username
        const sanitizedUsername = sanitizeUsername(username)

        // Check if username is already taken
        const existingUser = await prisma.user.findUnique({
            where: { username: sanitizedUsername },
        })

        console.log('[API /user POST] Username check:', {
            username: sanitizedUsername,
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
                username: sanitizedUsername,
                email,
            },
        })

        console.log('[API /user POST] Created new user:', { id: user.id, username: user.username })

        return NextResponse.json({ user }, { status: 201 })
    } catch (error) {
        const { body, status } = handleAPIError(error)
        return NextResponse.json(body, { status })
    }
}
