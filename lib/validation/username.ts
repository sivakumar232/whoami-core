export interface ValidationResult {
    valid: boolean
    error?: string
}

const RESERVED_USERNAMES = [
    'admin', 'api', 'auth', 'login', 'signup', 'onboarding',
    'dashboard', 'settings', 'profile', 'user', 'users',
    'about', 'contact', 'help', 'support', 'terms', 'privacy',
    'blog', 'docs', 'documentation', 'status', 'health'
]

export function validateUsername(username: string): ValidationResult {
    // Trim whitespace
    const trimmed = username.trim()

    // Length check
    if (trimmed.length < 3) {
        return { valid: false, error: 'Username must be at least 3 characters' }
    }

    if (trimmed.length > 30) {
        return { valid: false, error: 'Username must be 30 characters or less' }
    }

    // Format check - only letters, numbers, hyphens, underscores
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
        return { valid: false, error: 'Username can only contain letters, numbers, hyphens, and underscores' }
    }

    // Must start with letter or number
    if (!/^[a-zA-Z0-9]/.test(trimmed)) {
        return { valid: false, error: 'Username must start with a letter or number' }
    }

    // Must end with letter or number
    if (!/[a-zA-Z0-9]$/.test(trimmed)) {
        return { valid: false, error: 'Username must end with a letter or number' }
    }

    // No consecutive special characters
    if (/[-_]{2,}/.test(trimmed)) {
        return { valid: false, error: 'Username cannot have consecutive hyphens or underscores' }
    }

    // Reserved words check
    if (RESERVED_USERNAMES.includes(trimmed.toLowerCase())) {
        return { valid: false, error: 'This username is reserved' }
    }

    return { valid: true }
}

export function sanitizeUsername(username: string): string {
    return username.trim().toLowerCase()
}
