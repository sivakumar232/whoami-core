# Clerk Authentication - Frontend & Backend Deep Dive

This document explains exactly how Clerk works in your portfolio app, both on the frontend (browser) and backend (server).

---

## 🎯 **What is Clerk?**

Clerk is a **complete authentication system** that handles:
- Sign up / Sign in UI
- Session management
- User data storage
- Security (JWT tokens, encryption)

**Think of it as:** Instead of building your own login system (passwords, security, etc.), Clerk does it all for you.

---

## 🏗️ **The Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR NEXT.JS APP                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  FRONTEND (Browser)              BACKEND (Server)          │
│  ├─ Client Components            ├─ Server Components      │
│  ├─ useUser() hook               ├─ currentUser()          │
│  ├─ <SignInButton>               ├─ auth() helper          │
│  └─ <UserButton>                 └─ middleware.ts          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                          ↕
                   CLERK SERVERS
              (Handles authentication)
```

---

## 🔐 **How Clerk Works (Step-by-Step)**

### **1. Initial Setup**

When you wrap your app with `<ClerkProvider>`:

```tsx
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>  {/* ← This makes Clerk available everywhere */}
      <html>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

**What happens:**
- Clerk injects a session cookie in the browser
- This cookie contains a JWT token (encrypted user info)
- Every request to your server includes this cookie

---

## 🖥️ **FRONTEND (Client-Side) Usage**

### **File: `app/LandingContent.tsx`**

```tsx
'use client'  // ← Runs in the browser

import { SignInButton, SignUpButton } from '@clerk/nextjs'

export default function LandingContent() {
  return (
    <div>
      <SignUpButton mode="modal">
        <button>Get Started</button>
      </SignUpButton>
      
      <SignInButton mode="modal">
        <button>Sign In</button>
      </SignInButton>
    </div>
  )
}
```

**What happens when user clicks "Get Started":**

1. **Clerk modal opens** (hosted by Clerk, not your app)
2. **User enters email/password** (or uses Google/GitHub)
3. **Clerk validates credentials** on their servers
4. **Clerk creates a session** and sends a cookie to your browser
5. **User is redirected** to `/onboarding` (configured in `.env.local`)

**Key Point:** You never handle passwords or security. Clerk does it all.

---

### **File: `app/onboarding/page.tsx`**

```tsx
'use client'

import { useUser } from '@clerk/nextjs'

export default function OnboardingPage() {
  const { user } = useUser()  // ← Gets current user from Clerk
  
  // user object contains:
  // - user.id (Clerk's unique ID)
  // - user.primaryEmailAddress.emailAddress
  // - user.firstName, user.lastName
  // - etc.
  
  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      {/* Username selection form */}
    </div>
  )
}
```

**`useUser()` hook:**
- **Only works in Client Components** (`'use client'`)
- Fetches user data from Clerk's session
- Returns `{ user, isLoaded, isSignedIn }`

**Example:**
```tsx
const { user, isLoaded, isSignedIn } = useUser()

if (!isLoaded) return <div>Loading...</div>
if (!isSignedIn) return <div>Please sign in</div>

console.log(user.id)  // "user_2abc123xyz"
console.log(user.primaryEmailAddress.emailAddress)  // "john@example.com"
```

---

## ⚙️ **BACKEND (Server-Side) Usage**

### **File: `middleware.ts`**

```tsx
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/(.+)',  // Allow all username routes to be public
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()  // ← Blocks access if not logged in
  }
})
```

**What this does:**

1. **Runs BEFORE every request** to your app
2. **Checks the session cookie** from the browser
3. **Verifies the JWT token** with Clerk's servers
4. **Allows or blocks** the request based on authentication

**Example flow:**

```
User visits /john
  ↓
middleware.ts runs
  ↓
Checks: Is this a public route? → YES (matches '/(.+)')
  ↓
Allows request → app/[username]/page.tsx loads
```

```
User visits /api/user
  ↓
middleware.ts runs
  ↓
Checks: Is this a public route? → NO
  ↓
Checks: Is user logged in? → NO
  ↓
Blocks request → Returns 401 Unauthorized
```

---

### **File: `app/page.tsx` (Server Component)**

```tsx
import { currentUser } from '@clerk/nextjs/server'

export default async function Home() {
  const user = await currentUser()  // ← Gets user on the SERVER
  
  if (user) {
    // User is logged in
    console.log(user.id)  // "user_2abc123xyz"
  } else {
    // User is NOT logged in
  }
}
```

**`currentUser()` function:**
- **Only works in Server Components** (no `'use client'`)
- Reads the session cookie from the request
- Fetches user data from Clerk's API
- Returns `User | null`

**Difference from `useUser()`:**

| `useUser()` (Frontend) | `currentUser()` (Backend) |
|------------------------|---------------------------|
| Client Component only | Server Component only |
| React hook | Async function |
| `const { user } = useUser()` | `const user = await currentUser()` |
| Runs in browser | Runs on server |

---

### **File: `app/[username]/page.tsx`**

```tsx
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export default async function UserProfilePage({ params }) {
  const { username } = await params
  
  // 1. Get the profile owner from YOUR database
  const profileOwner = await prisma.user.findUnique({
    where: { username }
  })
  
  // 2. Get the logged-in user from CLERK
  const loggedInUser = await currentUser()
  
  // 3. Compare them
  const isEditable = loggedInUser?.id === profileOwner.clerkId
  
  return (
    <div>
      {isEditable ? (
        <p>You are viewing YOUR profile (edit mode)</p>
      ) : (
        <p>You are viewing someone else's profile</p>
      )}
    </div>
  )
}
```

**The ownership logic:**

```tsx
loggedInUser?.id === profileOwner.clerkId
```

- `loggedInUser.id` → Clerk's user ID (e.g., `"user_2abc123xyz"`)
- `profileOwner.clerkId` → Stored in YOUR database when user signed up
- If they match → User is viewing their own profile

---

## 🔄 **Complete Authentication Flow**

### **Scenario: New User Signs Up**

```
1. User visits localhost:3000
   ↓
2. app/page.tsx runs (server)
   ↓
3. currentUser() returns null (not logged in)
   ↓
4. Shows LandingContent.tsx (client)
   ↓
5. User clicks "Get Started"
   ↓
6. <SignUpButton> opens Clerk modal
   ↓
7. User enters email/password
   ↓
8. Clerk creates account on THEIR servers
   ↓
9. Clerk sends session cookie to browser
   ↓
10. User redirected to /onboarding (configured in .env.local)
   ↓
11. app/onboarding/page.tsx loads (client)
   ↓
12. useUser() returns user object from Clerk
   ↓
13. User picks username "john"
   ↓
14. Frontend calls POST /api/user with { clerkId: user.id, username: "john" }
   ↓
15. app/api/user/route.ts runs (server)
   ↓
16. Saves to YOUR database: { clerkId: "user_2abc123xyz", username: "john" }
   ↓
17. Redirects to /john
   ↓
18. app/[username]/page.tsx loads (server)
   ↓
19. Fetches user from YOUR database
   ↓
20. currentUser() gets logged-in user from Clerk
   ↓
21. Compares IDs → isEditable = true
   ↓
22. Shows profile in edit mode
```

---

## 🗄️ **Clerk vs. Your Database**

**Clerk stores:**
- Email, password (hashed)
- Authentication sessions
- OAuth tokens (Google, GitHub, etc.)
- User metadata (firstName, lastName, etc.)

**Your database stores:**
- Username (Clerk doesn't have this)
- Widgets (your custom data)
- Any app-specific data

**The link between them:**
```
Clerk User ID (user_2abc123xyz)
         ↕
Your Database (clerkId column)
```

---

## 🔑 **Environment Variables**

```bash
# .env.local

# Public key (sent to browser, safe to expose)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# Secret key (NEVER sent to browser, server-only)
CLERK_SECRET_KEY=sk_test_...

# Where to redirect after sign in/up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

**How they're used:**

1. **Publishable Key** → Used by `<ClerkProvider>` in the browser
2. **Secret Key** → Used by `currentUser()` on the server to verify tokens

---

## 🛡️ **Security Flow**

### **How Clerk Keeps Your App Secure**

1. **User signs in** → Clerk creates a JWT token
2. **JWT stored in cookie** → Browser sends it with every request
3. **Server verifies JWT** → Checks signature with Clerk's public key
4. **If valid** → Request proceeds
5. **If invalid/expired** → User logged out

**You never handle:**
- Password hashing
- Session management
- Token generation
- Security vulnerabilities

---

## 📊 **Common Clerk Methods**

### **Frontend (Client Components)**

```tsx
import { useUser, useAuth, SignOutButton } from '@clerk/nextjs'

const { user, isLoaded, isSignedIn } = useUser()
const { signOut } = useAuth()

// Sign out programmatically
await signOut()

// Or use the button
<SignOutButton>
  <button>Log Out</button>
</SignOutButton>
```

### **Backend (Server Components)**

```tsx
import { currentUser, auth } from '@clerk/nextjs/server'

// Get full user object
const user = await currentUser()

// Get just the user ID (faster)
const { userId } = await auth()

// Protect a route
const { userId } = await auth()
if (!userId) {
  redirect('/sign-in')
}
```

---

## 🎨 **Customizing Clerk**

### **Redirect URLs**

```bash
# .env.local
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### **Modal vs. Redirect Mode**

```tsx
// Opens in a modal (overlay)
<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

// Redirects to /sign-in page
<SignInButton mode="redirect">
  <button>Sign In</button>
</SignInButton>
```

---

## 🔍 **Debugging Clerk**

### **Check if user is logged in (Frontend)**

```tsx
'use client'
import { useUser } from '@clerk/nextjs'

export default function Debug() {
  const { user, isLoaded, isSignedIn } = useUser()
  
  console.log('Loaded:', isLoaded)
  console.log('Signed In:', isSignedIn)
  console.log('User:', user)
  
  return <pre>{JSON.stringify(user, null, 2)}</pre>
}
```

### **Check if user is logged in (Backend)**

```tsx
import { currentUser } from '@clerk/nextjs/server'

export default async function Debug() {
  const user = await currentUser()
  
  console.log('User:', user)
  
  return <pre>{JSON.stringify(user, null, 2)}</pre>
}
```

---

## 🚀 **Summary**

| Aspect | Frontend | Backend |
|--------|----------|---------|
| **Import from** | `@clerk/nextjs` | `@clerk/nextjs/server` |
| **Get user** | `useUser()` hook | `currentUser()` function |
| **Component type** | Client (`'use client'`) | Server (default) |
| **Use case** | UI interactions, forms | Database queries, auth checks |
| **Example** | Onboarding page | Profile page, API routes |

**Key Takeaway:**
- Clerk handles ALL authentication (sign up, sign in, sessions)
- You just use `useUser()` or `currentUser()` to get the logged-in user
- Your database stores app-specific data (username, widgets)
- The `clerkId` links Clerk's user to your database user

---

**Questions?** Let me know what you want to dive deeper into!
