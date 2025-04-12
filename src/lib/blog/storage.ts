import { getSupabaseClient } from '../supabase/client';

export async function uploadBlogImage(file: File): Promise<string> {
  const client = getSupabaseClient();
  
  // Generate a unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await client
    .storage
    .from('blog_images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    throw new Error('Failed to upload image');
  }

  return filePath;
}