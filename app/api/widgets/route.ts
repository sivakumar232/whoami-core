import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

/**
 * GET /api/widgets
 * Fetch all widgets for a specific user
 * 
 * Query params:
 * - userId: The user's database ID (required)
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: 'userId is required' },
                { status: 400 }
            );
        }

        // Fetch widgets from database
        const widgets = await prisma.widget.findMany({
            where: { userId },
            orderBy: [
                { y: 'asc' },  // Sort by row first
                { x: 'asc' },  // Then by column
            ],
        });

        return NextResponse.json({ widgets });
    } catch (error) {
        console.error('Error fetching widgets:', error);
        return NextResponse.json(
            { error: 'Failed to fetch widgets' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/widgets
 * Create a new widget
 * 
 * Body:
 * - userId: User's database ID
 * - type: Widget type (BIO, PROJECT, etc.)
 * - x, y: Grid position
 * - w, h: Grid size
 * - data: Widget-specific data (JSON)
 */
export async function POST(request: NextRequest) {
    try {
        // Verify authentication
        const { userId: clerkId } = await auth();
        if (!clerkId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { userId, type, x, y, w, h, data } = body;

        // Validate required fields
        if (!userId || !type || x === undefined || y === undefined || w === undefined || h === undefined) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Verify ownership: Check if the authenticated user owns this profile
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user || user.clerkId !== clerkId) {
            return NextResponse.json(
                { error: 'Forbidden: You can only add widgets to your own profile' },
                { status: 403 }
            );
        }

        // Create widget
        const widget = await prisma.widget.create({
            data: {
                userId,
                type,
                x,
                y,
                w,
                h,
                data: data || {},
            },
        });

        return NextResponse.json({ widget }, { status: 201 });
    } catch (error) {
        console.error('Error creating widget:', error);
        return NextResponse.json(
            { error: 'Failed to create widget' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/widgets
 * Update an existing widget
 * 
 * Body:
 * - id: Widget ID (required)
 * - type, x, y, w, h, data: Fields to update (optional)
 */
export async function PUT(request: NextRequest) {
    try {
        // Verify authentication
        const { userId: clerkId } = await auth();

        console.log('[PUT /api/widgets] Auth check:', { clerkId });

        if (!clerkId) {
            console.error('[PUT /api/widgets] Unauthorized - no clerkId');
            return NextResponse.json(
                { error: 'Unauthorized - Please sign in' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { id, ...updates } = body;

        console.log('[PUT /api/widgets] Request:', { id, updates });

        if (!id) {
            console.error('[PUT /api/widgets] Missing widget ID');
            return NextResponse.json(
                { error: 'Widget ID is required' },
                { status: 400 }
            );
        }

        // Fetch widget to verify ownership
        const existingWidget = await prisma.widget.findUnique({
            where: { id },
            include: { user: true },
        });

        console.log('[PUT /api/widgets] Existing widget:', {
            found: !!existingWidget,
            widgetUserId: existingWidget?.userId,
            userClerkId: existingWidget?.user?.clerkId,
            requestClerkId: clerkId,
        });

        if (!existingWidget) {
            console.error('[PUT /api/widgets] Widget not found:', id);
            return NextResponse.json(
                { error: 'Widget not found' },
                { status: 404 }
            );
        }

        if (existingWidget.user.clerkId !== clerkId) {
            console.error('[PUT /api/widgets] Forbidden - ownership mismatch');
            return NextResponse.json(
                { error: 'Forbidden: You can only update your own widgets' },
                { status: 403 }
            );
        }

        // Update widget
        const widget = await prisma.widget.update({
            where: { id },
            data: updates,
        });

        console.log('[PUT /api/widgets] Success:', widget.id);
        return NextResponse.json({ widget });
    } catch (error) {
        console.error('[PUT /api/widgets] Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to update widget' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/widgets
 * Delete a widget
 * 
 * Query params:
 * - id: Widget ID (required)
 */
export async function DELETE(request: NextRequest) {
    try {
        // Verify authentication
        const { userId: clerkId } = await auth();
        if (!clerkId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Widget ID is required' },
                { status: 400 }
            );
        }

        // Fetch widget to verify ownership
        const existingWidget = await prisma.widget.findUnique({
            where: { id },
            include: { user: true },
        });

        if (!existingWidget) {
            return NextResponse.json(
                { error: 'Widget not found' },
                { status: 404 }
            );
        }

        if (existingWidget.user.clerkId !== clerkId) {
            return NextResponse.json(
                { error: 'Forbidden: You can only delete your own widgets' },
                { status: 403 }
            );
        }

        // Delete widget
        await prisma.widget.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting widget:', error);
        return NextResponse.json(
            { error: 'Failed to delete widget' },
            { status: 500 }
        );
    }
}
