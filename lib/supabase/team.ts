import { supabase } from "@/lib/supabase/client";

export type SupabaseTeamMember = {
  id: string;
  full_name: string;
  role: string;
  title?: string;
  bio?: string;
  image_url?: string;
  email?: string;
  linkedin_url?: string;
  x_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  cv_url?: string;
  research_interests?: string[];
  is_active?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
};

export async function getTeamMembers(): Promise<SupabaseTeamMember[]> {
  const { data, error } = await supabase
    .from("team")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Supabase getTeamMembers error:", error);
    return [];
  }

  return (data ?? []) as SupabaseTeamMember[];
}

export async function getAllTeamMembers(): Promise<SupabaseTeamMember[]> {
  const { data, error } = await supabase
    .from("team")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Supabase getAllTeamMembers error:", error);
    return [];
  }

  return (data ?? []) as SupabaseTeamMember[];
}

export async function getTeamMemberById(id: string): Promise<SupabaseTeamMember | null> {
  const { data, error } = await supabase
    .from("team")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase getTeamMemberById error:", error);
    return null;
  }

  return data as SupabaseTeamMember;
}

export async function createTeamMember(
  member: Omit<SupabaseTeamMember, "id" | "created_at" | "updated_at">
): Promise<SupabaseTeamMember | null> {
  try {
    console.log("Attempting to create team member with data:", JSON.stringify(member, null, 2));
    
    const { data, error } = await supabase
      .from("team")
      .insert(member as any)
      .select()
      .single();

    console.log("Supabase response data:", data);
    console.log("Supabase response error:", error);

    if (error) {
      console.error("Supabase createTeamMember error:", JSON.stringify(error, null, 2));
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);
      console.error("Error details:", error.details);
      console.error("Error hint:", error.hint);
      return null;
    }

    return data as SupabaseTeamMember;
  } catch (err) {
    console.error("Unexpected error in createTeamMember:", err);
    return null;
  }
}

export async function updateTeamMember(
  id: string,
  member: Partial<SupabaseTeamMember>
): Promise<SupabaseTeamMember | null> {
  try {
    const { data, error } = await supabase
      .from("team")
      .update({ ...member, updated_at: new Date().toISOString() } as any)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase updateTeamMember error:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return null;
    }

    return data as SupabaseTeamMember;
  } catch (err) {
    console.error("Unexpected error in updateTeamMember:", err);
    return null;
  }
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("team")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase deleteTeamMember error:", error);
    return false;
  }

  return true;
}
