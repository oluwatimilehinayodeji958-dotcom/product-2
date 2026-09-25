import { supabase } from "@/lib/supabase/client";

export type SupabaseResearchProject = {
  id: string;
  title: string;
  description?: string;
  lead_investigator?: string;
  funding_source?: string;
  start_date?: string;
  end_date?: string;
  status: string;
  image_url?: string;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
};

export async function getResearchProjects(): Promise<SupabaseResearchProject[]> {
  const { data, error } = await supabase
    .from("research_projects")
    .select("*")
    .eq("status", "ongoing")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getResearchProjects error:", error);
    return [];
  }

  return (data ?? []) as SupabaseResearchProject[];
}

export async function getAllResearchProjects(): Promise<SupabaseResearchProject[]> {
  const { data, error } = await supabase
    .from("research_projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getAllResearchProjects error:", error);
    return [];
  }

  return (data ?? []) as SupabaseResearchProject[];
}

export async function getResearchProjectById(id: string): Promise<SupabaseResearchProject | null> {
  const { data, error } = await supabase
    .from("research_projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase getResearchProjectById error:", error);
    return null;
  }

  return data as SupabaseResearchProject;
}

export async function createResearchProject(
  project: Omit<SupabaseResearchProject, "id" | "created_at" | "updated_at">
): Promise<SupabaseResearchProject | null> {
  const { data, error } = await supabase
    .from("research_projects")
    .insert(project as any)
    .select()
    .single();

  if (error) {
    console.error("Supabase createResearchProject error:", error);
    return null;
  }

  return data as SupabaseResearchProject;
}

export async function updateResearchProject(
  id: string,
  project: Partial<SupabaseResearchProject>
): Promise<SupabaseResearchProject | null> {
  const { data, error } = await supabase
    .from("research_projects")
    .update({ ...project, updated_at: new Date().toISOString() } as any)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase updateResearchProject error:", error);
    return null;
  }

  return data as SupabaseResearchProject;
}

export async function deleteResearchProject(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("research_projects")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase deleteResearchProject error:", error);
    return false;
  }

  return true;
}
