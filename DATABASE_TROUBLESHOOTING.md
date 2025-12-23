# Database Connection Troubleshooting

## ❌ Current Issue

Prisma cannot connect to your Neon database. Error:
```
Can't reach database server at ep-wispy-river-a4ys3y4u-pooler.us-east-1.aws.neon.tech:5432
```

## 🔧 Solutions to Try

### Option 1: Use Direct Connection (Not Pooler)

Neon provides TWO connection strings:
1. **Pooled connection** (ends with `-pooler`) - For app usage
2. **Direct connection** (no `-pooler`) - For migrations

**Action:** Go back to your Neon dashboard and copy the **DIRECT connection string** (without `-pooler` in the URL).

Your current URL has `-pooler`:
```
ep-wispy-river-a4ys3y4u-pooler.us-east-1.aws.neon.tech
```

You need the direct one (something like):
```
ep-wispy-river-a4ys3y4u.us-east-1.aws.neon.tech
```

### Option 2: Add `?sslmode=require` Parameter

Make sure your `DATABASE_URL` in `.env` has `?sslmode=require`:

```bash
DATABASE_URL="postgresql://neondb_owner:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### Option 3: Use Prisma Studio to Test Connection

Try opening Prisma Studio to see if the connection works:

```bash
npx prisma studio
```

If this opens successfully, the connection is working!

### Option 4: Check Neon Dashboard

1. Go to your Neon dashboard
2. Make sure the database is **active** (not paused)
3. Check if there are any connection limits

## 📝 Steps to Fix

1. **Get the correct connection string from Neon:**
   - Go to your Neon project
   - Look for "Connection Details"
   - Copy the **Direct connection string** (for Prisma migrations)
   - Also copy the **Pooled connection string** (for your app)

2. **Update your `.env` file:**

```bash
# For Prisma migrations (direct connection)
DATABASE_URL="postgresql://neondb_owner:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

# For your app (pooled connection) - use this in production
# DATABASE_URL_POOLED="postgresql://neondb_owner:password@ep-xxx-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

3. **Try the migration again:**

```bash
npx prisma migrate dev --name init
```

## 🎯 Alternative: Use Prisma DB Push (Faster for Development)

Instead of migrations, you can use `db push` which is simpler for development:

```bash
npx prisma db push
```

This will:
- Create tables directly without migration files
- Work better with some database providers
- Be faster for prototyping

## ✅ How to Know It Worked

When successful, you'll see:
```
✔ Generated Prisma Client
✔ The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20231223_init/
      └─ migration.sql

Your database is now in sync with your schema.
```

## 🆘 Still Not Working?

If none of these work, we can:
1. Try a different database provider (Supabase, Railway)
2. Use SQLite for local development first
3. Debug the network connection

Let me know what happens when you try these solutions!
