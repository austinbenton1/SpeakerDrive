import { supabase } from './supabase';

export async function uploadAvatar(file: File): Promise<string> {
  try {
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      throw new Error('File size must be less than 2MB');
    }

    // Validate file type
    if (!file.type.match(/^image\/(jpeg|png|gif)$/)) {
      throw new Error('File must be an image (JPEG, PNG, or GIF)');
    }

    // Convert file to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

    // First refresh the session
    const { data: { session }, error: refreshError } = await supabase.auth.refreshSession();
    if (refreshError) throw refreshError;
    if (!session) throw new Error('No session available');

    // Update user metadata with base64 avatar
    const { error: updateError } = await supabase.auth.updateUser({
      data: { 
        avatar_url: base64,
        avatar_updated_at: new Date().toISOString()
      }
    });

    if (updateError) throw updateError;

    return base64;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error instanceof Error ? error : new Error('Failed to upload avatar');
  }
}