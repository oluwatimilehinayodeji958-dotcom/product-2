import { supabase } from "@/lib/supabase/client";

export type SupabaseGalleryImage = {
  id: string;
  title: string;
  caption?: string;
  category: string;
  image_url: string;
  featured?: boolean;
  display_order?: number;
  event_date?: string;
  created_at?: string;
  updated_at?: string;
};

export type SupabaseGalleryVideo = {
  id: string;
  title: string;
  caption?: string;
  category: string;
  video_type: string;
  video_url: string;
  thumbnail_url?: string;
  featured?: boolean;
  display_order?: number;
  event_date?: string;
  created_at?: string;
  updated_at?: string;
};

export type SupabaseGalleryItem = SupabaseGalleryImage | SupabaseGalleryVideo;

export async function getGalleryImages(): Promise<SupabaseGalleryImage[]> {
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Supabase getGalleryImages error:", error);
    return [];
  }

  return (data ?? []) as SupabaseGalleryImage[];
}

export async function getGalleryVideos(): Promise<SupabaseGalleryVideo[]> {
  const { data, error } = await supabase
    .from("gallery_videos")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Supabase getGalleryVideos error:", error);
    return [];
  }

  return (data ?? []) as SupabaseGalleryVideo[];
}

export async function getGalleryItems(): Promise<SupabaseGalleryItem[]> {
  const [images, videos] = await Promise.all([getGalleryImages(), getGalleryVideos()]);
  return [...images, ...videos].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
}

export async function createGalleryImage(
  item: Omit<SupabaseGalleryImage, "id" | "created_at" | "updated_at">
): Promise<SupabaseGalleryImage | null> {
  const { data, error } = await supabase
    .from("gallery_images")
    .insert(item as any)
    .select()
    .single();

  if (error) {
    console.error("Supabase createGalleryImage error:", error);
    return null;
  }

  return data as SupabaseGalleryImage;
}

export async function updateGalleryImage(
  id: string,
  item: Partial<SupabaseGalleryImage>
): Promise<SupabaseGalleryImage | null> {
  const { data, error } = await supabase
    .from("gallery_images")
    .update({ ...item, updated_at: new Date().toISOString() } as any)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase updateGalleryImage error:", error);
    return null;
  }

  return data as SupabaseGalleryImage;
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("gallery_images")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase deleteGalleryImage error:", error);
    return false;
  }

  return true;
}

export async function createGalleryVideo(
  item: Omit<SupabaseGalleryVideo, "id" | "created_at" | "updated_at">
): Promise<SupabaseGalleryVideo | null> {
  const { data, error } = await supabase
    .from("gallery_videos")
    .insert(item as any)
    .select()
    .single();

  if (error) {
    console.error("Supabase createGalleryVideo error:", error);
    return null;
  }

  return data as SupabaseGalleryVideo;
}

export async function updateGalleryVideo(
  id: string,
  item: Partial<SupabaseGalleryVideo>
): Promise<SupabaseGalleryVideo | null> {
  const { data, error } = await supabase
    .from("gallery_videos")
    .update({ ...item, updated_at: new Date().toISOString() } as any)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase updateGalleryVideo error:", error);
    return null;
  }

  return data as SupabaseGalleryVideo;
}

export async function deleteGalleryVideo(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("gallery_videos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase deleteGalleryVideo error:", error);
    return false;
  }

  return true;
}
