import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const response = await fetch('http://localhost:3000/api/debug/user', {
        headers: {
            cookie: request.headers.get('cookie') || '',
        },
    })

    const data = await response.json()

    return NextResponse.json({
        message: 'Middleware test',
        userData: data,
        timestamp: new Date().toISOString(),
    })
}
