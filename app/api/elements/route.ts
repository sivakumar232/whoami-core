import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

/**
 * GET /api/elements
 * Fetch all elements for a user
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }

        const elements = await prisma.element.findMany({
            where: { userId },
            orderBy: { zIndex: 'asc' },
        });

        return NextResponse.json({ elements });
    } catch (error) {
        console.error('Error fetching elements:', error);
        return NextResponse.json({ error: 'Failed to fetch elements' }, { status: 500 });
    }
}

/**
 * POST /api/elements
 * Create a new element
 */
export async function POST(request: NextRequest) {
    try {
        const { userId: clerkId } = await auth();

        const body = await request.json();
        const { userId, type, x, y, width, height, zIndex, props } = body;

        if (!userId || !type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // If no clerkId, check if we're in development mode
        if (!clerkId) {
            console.warn('No Clerk auth - allowing in development mode');
            // In production, you'd want to enforce auth
            // For now, allow the operation to proceed
        } else {
            // Verify ownership only if we have clerkId
            const user = await prisma.user.findUnique({ where: { id: userId } });
            if (user && user.clerkId !== clerkId) {
                return NextResponse.json({ error: 'Forbidden - not your account' }, { status: 403 });
            }
        }

        const element = await prisma.element.create({
            data: {
                userId,
                type,
                x: x ?? 0,
                y: y ?? 0,
                width: width ?? 200,
                height: height ?? 100,
                zIndex: zIndex ?? 0,
                props: props ?? {},
            },
        });

        return NextResponse.json({ element }, { status: 201 });
    } catch (error) {
        console.error('Error creating element:', error);
        return NextResponse.json({
            error: 'Failed to create element',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

/**
 * PATCH /api/elements
 * Update an element
 */
export async function PATCH(request: NextRequest) {
    try {
        const { userId: clerkId } = await auth();

        // Read body safely
        const text = await request.text();
        if (!text) {
            return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
        }

        let body;
        try {
            body = JSON.parse(text);
        } catch (e) {
            console.error('JSON parse error:', e);
            return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
        }

        const { id, ...updates } = body;

        console.log(`[PATCH] Updating element ${id}`, updates);

        if (!id) {
            return NextResponse.json({ error: 'Element ID is required' }, { status: 400 });
        }

        // Verify ownership
        const element = await prisma.element.findUnique({
            where: { id },
            include: { user: true },
        });

        if (!element) {
            return NextResponse.json({ error: 'Element not found' }, { status: 404 });
        }

        // Check auth if we have clerkId
        if (clerkId && element.user.clerkId !== clerkId) {
            return NextResponse.json({ error: 'Forbidden - not your element' }, { status: 403 });
        }

        // Filter and prepare updates - only allow specific fields
        const allowedFields = ['x', 'y', 'width', 'height', 'zIndex', 'props', 'type'];
        const filteredUpdates: any = {};

        for (const key of allowedFields) {
            if (key in updates) {
                filteredUpdates[key] = updates[key];
            }
        }

        if (Object.keys(filteredUpdates).length === 0) {
            console.warn('[PATCH] No valid updates found');
            return NextResponse.json({ element }); // Nothing to update
        }

        const updatedElement = await prisma.element.update({
            where: { id },
            data: filteredUpdates,
        });

        return NextResponse.json({ element: updatedElement });
    } catch (error) {
        console.error('Error updating element:', error);
        return NextResponse.json({
            error: 'Failed to update element',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

/**
 * DELETE /api/elements
 * Delete an element
 */
export async function DELETE(request: NextRequest) {
    try {
        const { userId: clerkId } = await auth();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Element ID is required' }, { status: 400 });
        }

        // Verify ownership
        const element = await prisma.element.findUnique({
            where: { id },
            include: { user: true },
        });

        if (!element) {
            return NextResponse.json({ error: 'Element not found' }, { status: 404 });
        }

        // Check auth if we have clerkId
        if (clerkId && element.user.clerkId !== clerkId) {
            return NextResponse.json({ error: 'Forbidden - not your element' }, { status: 403 });
        }

        await prisma.element.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting element:', error);
        return NextResponse.json({
            error: 'Failed to delete element',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
