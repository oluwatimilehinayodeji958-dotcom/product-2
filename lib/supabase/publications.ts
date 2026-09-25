import { supabase } from "@/lib/supabase/client";

export type SupabasePublication = {
  id: string;
  title: string;
  slug: string;
  publication_type: "journal" | "conference" | "book" | "preprint";
  authors: string[];
  research_area?: string;
  abstract?: string;
  content?: string;
  journal?: string;
  doi?: string;
  keywords?: string[];
  category?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  citations?: number;
  impactFactor?: number;
  pdf_url?: string;
  supplementary_url?: string;
  data_url?: string;
  code_url?: string;
  image?: string;
  featured?: boolean;
  status?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
};

export async function getPublications(): Promise<SupabasePublication[]> {
  const { data, error } = await supabase
    .from("publications")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Supabase getPublications error:", error);
    return [];
  }

  return (data ?? []) as SupabasePublication[];
}

export async function getFeaturedPublications(limit = 24): Promise<SupabasePublication[]> {
  const { data, error } = await supabase
    .from("publications")
    .select("*")
    .eq("featured", true)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Supabase getFeaturedPublications error:", error);
    return [];
  }

  return (data ?? []) as SupabasePublication[];
}

export async function getPublicationById(id: string): Promise<SupabasePublication | null> {
  const { data, error } = await supabase
    .from("publications")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase getPublicationById error:", error);
    return null;
  }

  // DEBUG: log exactly what Supabase returns (remove after confirming fix)
  console.log("[DEBUG] getPublicationById result:", {
    id: data?.id,
    title: data?.title,
    pdf_url: data?.pdf_url,
    image: data?.image,
    status: data?.status,
    content_length: data?.content?.length ?? 0,
  });

  return data as SupabasePublication;
}

export async function getPublicationIds(): Promise<string[]> {
  const { data, error } = await supabase
    .from("publications")
    .select("id")
    .eq("status", "published");

  if (error) {
    console.error("Supabase getPublicationIds error:", error);
    return [];
  }

  return (data ?? []).map((row: any) => row.id);
}

export async function getRecentPublications(count = 4): Promise<SupabasePublication[]> {
  const { data, error } = await supabase
    .from("publications")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(count);

  if (error) {
    console.error("Supabase getRecentPublications error:", error);
    return [];
  }

  return (data ?? []) as SupabasePublication[];
}

export async function getAllPublications(): Promise<SupabasePublication[]> {
  const { data, error } = await supabase
    .from("publications")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Supabase getAllPublications error:", error);
    return [];
  }

  return (data ?? []) as SupabasePublication[];
}

export async function createPublication(
  pub: Omit<SupabasePublication, "id" | "created_at" | "updated_at">
): Promise<SupabasePublication | null> {
  const { data, error } = await supabase
    .from("publications")
    .insert(pub as any)
    .select()
    .single();

  if (error) {
    console.error("Supabase createPublication error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    return null;
  }

  return data as SupabasePublication;
}

export async function updatePublication(
  id: string,
  pub: Partial<SupabasePublication>
): Promise<SupabasePublication | null> {
  const { data, error } = await supabase
    .from("publications")
    .update({ ...pub, updated_at: new Date().toISOString() } as any)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase updatePublication error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    return null;
  }

  return data as SupabasePublication;
}

export async function deletePublication(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("publications")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase deletePublication error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    return false;
  }

  return true;
}

export async function uploadPublicationFile(
  bucket: string,
  path: string,
  file: File
): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('public_id', path);

    const response = await fetch('/api/cloudinary/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudinary upload failed:', response.status, errorText);
      return null;
    }

    const result = await response.json();
    return result.secure_url || null;
  } catch (error) {
    console.error('Cloudinary uploadPublicationFile error:', error);
    return null;
  }
}
