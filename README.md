# Dynamic Portfolio Builder

A Next.js application that allows users to create customizable portfolio pages with a grid-based widget system.

## 🚀 What We Built (Step 1 Complete)

### Features
- **User Authentication** - Clerk-based authentication with username selection
- **Dynamic Routing** - Each user gets their own URL (`/username`)
- **Database Integration** - PostgreSQL with Prisma ORM
- **Ownership Detection** - Distinguishes between profile owners and visitors
- **Modern UI** - Glassmorphism design with Tailwind CSS

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Authentication**: Clerk
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **State Management**: Zustand (ready for Step 2)
- **Language**: TypeScript

## 📁 Project Structure

```
/app
├── page.tsx                    # Landing page
├── layout.tsx                  # Root layout with ClerkProvider
├── LandingContent.tsx          # Landing page UI component
├── /onboarding
│   └── page.tsx                # Username selection
├── /[username]
│   └── page.tsx                # Dynamic user profiles
└── /api
    └── /user
        ├── route.ts            # Create user API
        └── /check
            └── route.ts        # Check user exists API

/prisma
└── schema.prisma               # Database schema (User & Widget models)

/lib
└── db.ts                       # Prisma client singleton

middleware.ts                   # Clerk authentication middleware
```

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file:
```bash
# Database
DATABASE_URL="your_postgresql_connection_string"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎯 How It Works

### User Flow
1. **Visit `/`** → Landing page with sign up/sign in
2. **Sign up** → Clerk authentication modal
3. **Choose username** → Redirected to `/onboarding`
4. **Create profile** → Redirected to `/your-username`
5. **View profile** → See your portfolio page

### Authentication Flow
- **Clerk** handles all authentication (sign up, sign in, sessions)
- **Middleware** protects routes and manages access
- **Database** stores user data (username, widgets)
- **Dynamic routes** create unique URLs for each user

### Database Schema

**User Model:**
- `id` - Unique identifier
- `clerkId` - Links to Clerk user
- `username` - Unique username
- `email` - User email
- `widgets` - Relation to Widget model

**Widget Model** (Ready for Step 2):
- `id`, `userId` - Identification
- `type` - Widget type (BIO, PROJECT, GITHUB, etc.)
- `x`, `y`, `w`, `h` - Grid position and size
- `data` - JSON field for widget content

## 🔐 Key Concepts

### Server vs. Client Components
- **Server Components** - Default in Next.js 14+, can access database
- **Client Components** - Use `'use client'`, can use React hooks

### Dynamic Routes
- `[username]` folder creates routes for any username
- Example: `/john`, `/alice`, `/yourname`

### Ownership Detection
```typescript
const isEditable = loggedInUser?.id === profileOwner.clerkId
```
This determines if the current user owns the profile they're viewing.

## 📝 API Routes

### POST /api/user
Creates a new user with username
```json
{
  "clerkId": "user_xxx",
  "username": "john",
  "email": "john@example.com"
}
```

### POST /api/user/check
Checks if user exists
```json
{
  "clerkId": "user_xxx"
}
```

## 🚧 Next Steps (Roadmap)

- **Step 2**: Zustand store for widget state management ✅ (Schema ready)
- **Step 3**: CSS Grid layout and tile components
- **Step 4**: Owner/viewer UI differences
- **Step 5**: Interactive editor sidebar
- **Step 6**: Auto-save functionality
- **Step 7**: Live API integrations (GitHub, images, etc.)

## 🐛 Troubleshooting

### Database Connection Issues
- Use direct connection (not pooled) for migrations
- Check if Neon database is active (auto-pauses after inactivity)

### Turbopack Errors
```bash
# Clear cache and restart
rm -rf .next
npm run dev
```

### Port Already in Use
```bash
# Kill existing process
pkill -f "next dev"
npm run dev
```

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📄 License

MIT

---

**Built with ❤️ using Next.js, Clerk, and Prisma**
