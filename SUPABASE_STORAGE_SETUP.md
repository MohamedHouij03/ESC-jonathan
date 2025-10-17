# Supabase Storage Setup for Profile Photos

## Step 1: Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon public** key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

## Step 2: Create Environment File

Create a `.env.local` file in your project root with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database Configuration (if not already set)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Next.js Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

## Step 3: Set Up Supabase Storage

1. In your Supabase Dashboard, go to **Storage**
2. Create a new bucket called `avatars`
3. Set the bucket to **Public** (so profile photos can be accessed)
4. Configure the bucket policies:

### Bucket Policy for Public Access
```sql
-- Allow public access to read profile photos
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

-- Allow authenticated users to upload profile photos
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- Allow users to update their own profile photos
CREATE POLICY "Users can update own photos" ON storage.objects FOR UPDATE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own profile photos
CREATE POLICY "Users can delete own photos" ON storage.objects FOR DELETE 
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Step 4: Test the Setup

1. Restart your development server: `npm run dev`
2. Go to your profile page
3. Try uploading a profile photo
4. Check the browser console for any errors
5. Verify the photo appears in your Supabase Storage dashboard

## Step 5: Verify Profile Photos Persist

1. Upload a profile photo
2. Navigate to different pages
3. Refresh the page
4. Check that the profile photo still displays correctly

## Troubleshooting

### If profile photos don't upload:
- Check that your Supabase credentials are correct
- Verify the `avatars` bucket exists and is public
- Check the browser console for error messages
- Ensure the bucket policies are set correctly

### If profile photos disappear during navigation:
- The navbar now fetches fresh user data from the database
- Check that the database connection is working
- Verify that profile photos are being saved to the database

### If you get CORS errors:
- Make sure your Supabase project allows requests from your domain
- Check that the bucket is set to public

## Benefits of Supabase Storage

✅ **Persistent**: Photos are stored in the cloud, not localStorage
✅ **Scalable**: No size limitations like localStorage
✅ **Reliable**: Photos persist across devices and sessions
✅ **Fast**: CDN-backed delivery for quick loading
✅ **Secure**: Proper authentication and authorization
