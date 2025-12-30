export class APIError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public code?: string,
        public details?: any
    ) {
        super(message)
        this.name = 'APIError'
    }

    toJSON() {
        return {
            error: this.message,
            code: this.code,
            details: this.details,
            statusCode: this.statusCode,
        }
    }
}

export function handleAPIError(error: unknown) {
    console.error('API Error:', error)

    if (error instanceof APIError) {
        return {
            body: error.toJSON(),
            status: error.statusCode,
        }
    }

    if (error instanceof Error) {
        return {
            body: {
                error: 'Internal server error',
                message: process.env.NODE_ENV === 'development' ? error.message : undefined,
            },
            status: 500,
        }
    }

    return {
        body: { error: 'Unknown error occurred' },
        status: 500,
    }
}
