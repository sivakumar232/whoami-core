# Next.js Architecture Explained - Portfolio Builder

This document explains every file in your project and how Next.js works.

---

## 📁 **Project Structure Overview**

```
/your-project
├── /app                    # Next.js 14 App Router (main application code)
├── /lib                    # Utility functions (database, helpers)
├── /prisma                 # Database schema
├── /public                 # Static files (images, icons)
├── middleware.ts           # Runs BEFORE every request
├── package.json            # Dependencies
└── .env.local             # Secret keys (YOU CREATE THIS)
```

---

## 🧩 **Understanding Next.js App Router**

### **What is the `/app` folder?**

In Next.js 14, the `/app` folder is special. Each folder inside it becomes a **route** (URL).

```
/app
  ├── page.tsx              → URL: /
  ├── /onboarding
  │   └── page.tsx          → URL: /onboarding
  └── /[username]
      └── page.tsx          → URL: /anything (dynamic)
```

**Key Rule:** A `page.tsx` file makes that folder accessible as a URL.

---

## 📄 **File-by-File Breakdown**

### **1. `app/layout.tsx` - The Wrapper**

**What it is:** The "shell" that wraps EVERY page in your app.

**What it does:**
- Loads fonts
- Adds `<ClerkProvider>` so authentication works everywhere
- Sets metadata (title, description)

**Think of it as:** The picture frame that goes around every painting.

```tsx
<ClerkProvider>  ← Makes auth available everywhere
  <html>
    <body>
      {children}  ← Your actual pages go here
    </body>
  </html>
</ClerkProvider>
```

---

### **2. `app/page.tsx` - The Home Page**

**URL:** `http://localhost:3000/`

**What it does:**
1. Checks if user is logged in
2. If logged in + has username → Redirect to `/username`
3. If logged in + no username → Redirect to `/onboarding`
4. If NOT logged in → Show landing page

**Server Component:** This runs on the server, so it can check the database BEFORE showing the page.

```tsx
export default async function Home() {
  const user = await currentUser()  // Server-side check
  // ... redirect logic
}
```

---

### **3. `app/LandingContent.tsx` - Landing Page UI**

**What it is:** The visual part of the home page (sign up buttons, feature cards).

**Why separate file?**
- `page.tsx` is a **Server Component** (runs on server)
- `LandingContent.tsx` is a **Client Component** (runs in browser)
- Clerk's `<SignInButton>` needs to run in the browser, so we split it.

**Client Component marker:**
```tsx
'use client'  ← This line makes it run in the browser
```

---

### **4. `app/onboarding/page.tsx` - Username Selection**

**URL:** `http://localhost:3000/onboarding`

**What it does:**
1. Shows a form to pick a username
2. Validates the username (3+ chars, alphanumeric)
3. Calls `/api/user` to save it to the database
4. Redirects to `/username` after success

**Client Component:** Uses React hooks (`useState`, `useEffect`) so it must run in the browser.

**Flow:**
```
User types "john" → Click submit → POST to /api/user → Save to DB → Redirect to /john
```

---

### **5. `app/[username]/page.tsx` - Dynamic Profile Pages**

**URL:** `http://localhost:3000/john` (or any username)

**What `[username]` means:**
- The square brackets `[]` make it **dynamic**
- Next.js captures whatever is in the URL
- `[username]` becomes a variable you can use

**Example:**
```
URL: /john       → params.username = "john"
URL: /alice      → params.username = "alice"
URL: /anything   → params.username = "anything"
```

**What it does:**
1. Gets the username from the URL
2. Looks up that user in the database
3. Checks if the logged-in person is the owner
4. Shows the profile (placeholder for now, widgets in Step 3)

**Server Component:** Runs on the server to fetch data before rendering.

```tsx
const { username } = await params  // Get from URL
const profileOwner = await prisma.user.findUnique({
  where: { username }  // Look up in database
})
```

---

### **6. `app/api/user/route.ts` - Create User API**

**URL:** `POST http://localhost:3000/api/user`

**What it is:** A backend endpoint (like an Express.js route).

**What it does:**
1. Receives JSON: `{ clerkId, username, email }`
2. Checks if username is already taken
3. Creates new user in database
4. Returns success or error

**Called by:** The onboarding page when you submit the form.

**Think of it as:** A function that the frontend calls to save data.

```tsx
export async function POST(request: NextRequest) {
  const body = await request.json()  // Get data from frontend
  // ... validate and save to database
  return NextResponse.json({ user })  // Send response back
}
```

---

### **7. `app/api/user/check/route.ts` - Check User Exists**

**URL:** `POST http://localhost:3000/api/user/check`

**What it does:**
- Checks if a user with a given `clerkId` already exists
- Returns `{ exists: true, username: "john" }` or `{ exists: false }`

**Called by:** The onboarding page on load to see if you already picked a username.

---

### **8. `middleware.ts` - The Gatekeeper**

**What it is:** Code that runs BEFORE every request.

**What it does:**
- Checks if the user is logged in
- Allows public access to view profiles
- Blocks access to protected routes if not logged in

**Think of it as:** A security guard at the entrance.

```tsx
export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()  // Require login
  }
})
```

**When it runs:**
```
User visits /john → middleware checks → allows (public route)
User visits /api/user → middleware checks → requires login
```

---

### **9. `lib/db.ts` - Database Connection**

**What it is:** A singleton Prisma client (fancy way to say "one shared database connection").

**Why needed:** Without this, Next.js would create 100s of database connections in development (bad!).

**How it works:**
```tsx
export const prisma = new PrismaClient()
```

**Used by:** All API routes and server components that need to talk to the database.

```tsx
import { prisma } from '@/lib/db'
const user = await prisma.user.findUnique({ ... })
```

---

### **10. `prisma/schema.prisma` - Database Blueprint**

**What it is:** The definition of your database tables.

**What it does:**
- Defines the `User` table (id, clerkId, username, email)
- Defines the `Widget` table (id, type, position, data)
- Defines the relationship (User has many Widgets)

**Think of it as:** An Excel spreadsheet template before you add data.

```prisma
model User {
  id       String   @id @default(cuid())
  username String   @unique
  widgets  Widget[]  ← One user has many widgets
}
```

**Commands:**
```bash
npx prisma generate    # Creates TypeScript types
npx prisma migrate dev # Creates actual database tables
```

---

## 🔄 **How Everything Connects**

### **User Flow Example:**

1. **Visit `/`** → `app/page.tsx` runs
2. **Not logged in** → Shows `LandingContent.tsx`
3. **Click "Sign Up"** → Clerk modal appears
4. **Complete signup** → Redirected to `/onboarding`
5. **`app/onboarding/page.tsx` loads**
6. **Pick username "john"** → Calls `POST /api/user`
7. **`app/api/user/route.ts` runs** → Saves to database via `lib/db.ts`
8. **Redirected to `/john`** → `app/[username]/page.tsx` loads
9. **Fetches user from DB** → Shows profile

---

## 🔑 **Key Next.js Concepts**

### **Server Components vs. Client Components**

| Server Component | Client Component |
|-----------------|------------------|
| Default in Next.js 14 | Needs `'use client'` |
| Runs on server | Runs in browser |
| Can access database directly | Cannot access database |
| Cannot use `useState`, `useEffect` | Can use React hooks |
| Example: `app/page.tsx` | Example: `app/LandingContent.tsx` |

### **File-Based Routing**

```
/app/about/page.tsx        → /about
/app/blog/[slug]/page.tsx  → /blog/anything
/app/api/hello/route.ts    → /api/hello (API endpoint)
```

### **Dynamic Routes**

```tsx
// URL: /john
// File: app/[username]/page.tsx

async function Page({ params }) {
  const { username } = await params  // username = "john"
}
```

---

## 🛠️ **Environment Variables (`.env.local`)**

**What they are:** Secret keys that shouldn't be in your code.

**Why needed:**
- Database password (don't commit to GitHub!)
- API keys (Clerk secret key)

**How Next.js uses them:**
```tsx
process.env.DATABASE_URL  // Reads from .env.local
```

**Public vs. Private:**
- `NEXT_PUBLIC_*` → Available in browser
- No prefix → Only available on server

---

## 📊 **Database Flow (Prisma)**

```
1. Define schema (schema.prisma)
   ↓
2. Run migration (creates tables in PostgreSQL)
   ↓
3. Generate Prisma Client (TypeScript types)
   ↓
4. Use in code (prisma.user.create(...))
```

**Commands:**
```bash
npx prisma generate       # Step 3
npx prisma migrate dev    # Step 2
npx prisma studio         # View database in browser
```

---

## 🎯 **What You Need to Do**

1. **Get PostgreSQL URL** from Neon
2. **Get Clerk keys** from Clerk dashboard
3. **Create `.env.local`** with those values
4. **Run migrations** to create database tables
5. **Start the app** with `npm run dev`

---

## 🚀 **Next Steps (After Step 1 Works)**

- **Step 2:** Build Zustand store for widget state
- **Step 3:** Create CSS Grid layout for widgets
- **Step 4:** Show/hide edit controls based on ownership
- **Step 5:** Add sidebar to add new widgets
- **Step 6:** Auto-save changes to database
- **Step 7:** Integrate GitHub API, image uploads, etc.

---

**Questions?** Let me know which part you want me to explain more!
