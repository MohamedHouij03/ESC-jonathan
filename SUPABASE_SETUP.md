# Supabase Database Setup Guide

## Step 1: Get Your Supabase Database URL

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **Database**
4. Scroll down to **Connection string**
5. Copy the **URI** connection string
6. Replace `[YOUR-PASSWORD]` with your actual database password

## Step 2: Create Environment File

Create a `.env.local` file in your project root with:

```env
# Supabase Database Configuration
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Example:
# DATABASE_URL="postgresql://postgres:your_password@db.abcdefghijklmnop.supabase.co:5432/postgres"

# Next.js Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

## Step 3: Push Database Schema

Run this command to create the tables in your Supabase database:

```bash
npx prisma db push
```

## Step 4: Generate Prisma Client

```bash
npx prisma generate
```

## Step 5: Test Database Connection

```bash
npx prisma studio
```

This will open Prisma Studio where you can view and manage your database.

## Step 6: Verify Setup

1. Start your development server: `npm run dev`
2. Go to any lesson page
3. Click "Mark as Completed"
4. Check the browser console for success messages
5. Check your Supabase dashboard to see the data being saved

## Troubleshooting

### If you get "Environment variable not found: DATABASE_URL"
- Make sure your `.env.local` file is in the project root
- Check that the DATABASE_URL is correctly formatted
- Restart your development server after adding the environment variable

### If you get connection errors
- Verify your Supabase project is active
- Check that your database password is correct
- Ensure your IP is not blocked in Supabase settings

### If tables don't exist
- Run `npx prisma db push` to create the schema
- Check the Supabase dashboard to see if tables were created

## Database Schema

Your database will have these main tables:
- `users` - User accounts and profiles
- `course_progress` - Course completion tracking
- `completed_lessons` - Individual lesson completions
- `completed_chapters` - Chapter completions
- `courses` - Course information
- `chapters` - Chapter information
- `lessons` - Lesson information

## Next Steps

Once the database is connected:
1. Progress will be saved to Supabase when users are logged in
2. Local progress will still work for anonymous users
3. All progress data will persist across sessions
4. You can view progress in your Supabase dashboard
