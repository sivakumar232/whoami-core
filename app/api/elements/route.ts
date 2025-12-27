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
        if (!clerkId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { userId, type, x, y, width, height, zIndex, props } = body;

        if (!userId || !type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Verify ownership
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || user.clerkId !== clerkId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
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
        return NextResponse.json({ error: 'Failed to create element' }, { status: 500 });
    }
}

/**
 * PATCH /api/elements
 * Update an element
 */
export async function PATCH(request: NextRequest) {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) {
            return NextResponse.json({ error: 'Element ID is required' }, { status: 400 });
        }

        // Verify ownership
        const element = await prisma.element.findUnique({
            where: { id },
            include: { user: true },
        });

        if (!element || element.user.clerkId !== clerkId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Filter and prepare updates - only allow specific fields
        const allowedFields = ['x', 'y', 'width', 'height', 'zIndex', 'props', 'type'];
        const filteredUpdates: any = {};

        for (const key of allowedFields) {
            if (key in updates) {
                filteredUpdates[key] = updates[key];
            }
        }

        const updatedElement = await prisma.element.update({
            where: { id },
            data: filteredUpdates,
        });

        return NextResponse.json({ element: updatedElement });
    } catch (error) {
        console.error('Error updating element:', error);
        return NextResponse.json({ error: 'Failed to update element' }, { status: 500 });
    }
}

/**
 * DELETE /api/elements
 * Delete an element
 */
export async function DELETE(request: NextRequest) {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

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

        if (!element || element.user.clerkId !== clerkId) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        await prisma.element.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting element:', error);
        return NextResponse.json({ error: 'Failed to delete element' }, { status: 500 });
    }
}
