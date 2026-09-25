import { supabase } from "@/lib/supabase/client";

export type SupabaseEvent = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  short_description?: string;
  category?: string;
  event_date: string;
  event_time?: string;
  location?: string;
  venue?: string;
  image_url?: string;
  banner_image?: string;
  registration_url?: string;
  registration_link?: string;
  is_featured?: boolean;
  featured?: boolean;
  status: string;
  created_at?: string;
  updated_at?: string;
};

export async function getEvents(): Promise<SupabaseEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .in("status", ["upcoming", "ongoing"])
    .order("event_date", { ascending: true });

  if (error) {
    console.error("Supabase getEvents error:", error);
    return [];
  }

  return (data ?? []) as SupabaseEvent[];
}

export async function getAllEvents(): Promise<SupabaseEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: false });

  if (error) {
    console.error("Supabase getAllEvents error:", error);
    return [];
  }

  return (data ?? []) as SupabaseEvent[];
}

export async function getEventById(id: string): Promise<SupabaseEvent | null> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase getEventById error:", error);
    return null;
  }

  return data as SupabaseEvent;
}

export async function createEvent(
  event: Omit<SupabaseEvent, "id" | "created_at" | "updated_at">
): Promise<SupabaseEvent | null> {
  const { data, error } = await supabase
    .from("events")
    .insert(event as any)
    .select()
    .single();

  if (error) {
    console.error("Supabase createEvent error:", error);
    return null;
  }

  return data as SupabaseEvent;
}

export async function updateEvent(
  id: string,
  event: Partial<SupabaseEvent>
): Promise<SupabaseEvent | null> {
  const { data, error } = await supabase
    .from("events")
    .update({ ...event, updated_at: new Date().toISOString() } as any)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase updateEvent error:", error);
    return null;
  }

  return data as SupabaseEvent;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase deleteEvent error:", error);
    return false;
  }

  return true;
}
