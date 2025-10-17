import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create Supabase client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper function to upload profile photo to Supabase Storage
export async function uploadProfilePhoto(userId: string, file: File): Promise<string> {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.')
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}-${Date.now()}.${fileExt}`
  const filePath = `profile-photos/${fileName}`

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    throw new Error(`Failed to upload profile photo: ${error.message}`)
  }

  // Get the public URL
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  return publicUrl
}

// Helper function to delete profile photo from Supabase Storage
export async function deleteProfilePhoto(photoUrl: string): Promise<void> {
  if (!supabase) {
    console.warn('Supabase is not configured. Cannot delete profile photo.')
    return
  }

  // Extract file path from URL
  const urlParts = photoUrl.split('/')
  const fileName = urlParts[urlParts.length - 1]
  const filePath = `profile-photos/${fileName}`

  const { error } = await supabase.storage
    .from('avatars')
    .remove([filePath])

  if (error) {
    console.error('Failed to delete profile photo:', error.message)
    // Don't throw error as this is not critical
  }
}

// Helper function to get profile photo URL
export function getProfilePhotoUrl(photoUrl: string | null): string | null {
  if (!photoUrl) return null
  
  // If it's already a Supabase URL, return as is
  if (photoUrl.includes('supabase')) {
    return photoUrl
  }
  
  // If it's a base64 data URL, return as is (for backward compatibility)
  if (photoUrl.startsWith('data:')) {
    return photoUrl
  }
  
  return photoUrl
}
