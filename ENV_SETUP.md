# Environment Variables Configuration

Copy this file and create your own `.env.local` file with your actual credentials.

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

# Clerk URLs (optional - for custom domains)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

## Getting Your Credentials

### PostgreSQL Database
You can get a free PostgreSQL database from:
- [Neon](https://neon.tech) (Recommended)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

### Clerk Keys
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to "API Keys" section
4. Copy the Publishable Key and Secret Key
