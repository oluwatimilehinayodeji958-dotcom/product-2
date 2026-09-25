import { supabase } from "@/lib/supabase/client";

// Research Philosophy Types
export type ResearchPhilosophy = {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
};

// Research Areas Types
export type ResearchArea = {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
};

// Research Methodology Types
export type ResearchMethodology = {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
};

// Research Collaborations Types
export type ResearchCollaboration = {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  website_url?: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
};

// Research Philosophy CRUD
export async function getResearchPhilosophy(): Promise<ResearchPhilosophy[]> {
  const { data, error } = await supabase
    .from("research_philosophy")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Supabase getResearchPhilosophy error:", error);
    return [];
  }

  return (data ?? []) as ResearchPhilosophy[];
}

export async function createResearchPhilosophy(
  item: Omit<ResearchPhilosophy, "id" | "created_at" | "updated_at">
): Promise<ResearchPhilosophy | null> {
  const { data, error } = await supabase
    .from("research_philosophy")
    .insert(item as any)
    .select()
    .single();

  if (error) {
    console.error("Supabase createResearchPhilosophy error:", error);
    return null;
  }

  return data as ResearchPhilosophy;
}

export async function updateResearchPhilosophy(
  id: string,
  item: Partial<ResearchPhilosophy>
): Promise<ResearchPhilosophy | null> {
  const { data, error } = await supabase
    .from("research_philosophy")
    .update({ ...item, updated_at: new Date().toISOString() } as any)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase updateResearchPhilosophy error:", error);
    return null;
  }

  return data as ResearchPhilosophy;
}

export async function deleteResearchPhilosophy(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("research_philosophy")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase deleteResearchPhilosophy error:", error);
    return false;
  }

  return true;
}

// Research Areas CRUD
export async function getResearchAreas(): Promise<ResearchArea[]> {
  const { data, error } = await supabase
    .from("research_areas")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Supabase getResearchAreas error:", error);
    return [];
  }

  return (data ?? []) as ResearchArea[];
}

export async function createResearchArea(
  item: Omit<ResearchArea, "id" | "created_at" | "updated_at">
): Promise<ResearchArea | null> {
  const { data, error } = await supabase
    .from("research_areas")
    .insert(item as any)
    .select()
    .single();

  if (error) {
    console.error("Supabase createResearchArea error:", error);
    return null;
  }

  return data as ResearchArea;
}

export async function updateResearchArea(
  id: string,
  item: Partial<ResearchArea>
): Promise<ResearchArea | null> {
  const { data, error } = await supabase
    .from("research_areas")
    .update({ ...item, updated_at: new Date().toISOString() } as any)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase updateResearchArea error:", error);
    return null;
  }

  return data as ResearchArea;
}

export async function deleteResearchArea(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("research_areas")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase deleteResearchArea error:", error);
    return false;
  }

  return true;
}

// Research Methodology CRUD
export async function getResearchMethodology(): Promise<ResearchMethodology[]> {
  const { data, error } = await supabase
    .from("research_methodology")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Supabase getResearchMethodology error:", error);
    return [];
  }

  return (data ?? []) as ResearchMethodology[];
}

export async function createResearchMethodology(
  item: Omit<ResearchMethodology, "id" | "created_at" | "updated_at">
): Promise<ResearchMethodology | null> {
  const { data, error } = await supabase
    .from("research_methodology")
    .insert(item as any)
    .select()
    .single();

  if (error) {
    console.error("Supabase createResearchMethodology error:", error);
    return null;
  }

  return data as ResearchMethodology;
}

export async function updateResearchMethodology(
  id: string,
  item: Partial<ResearchMethodology>
): Promise<ResearchMethodology | null> {
  const { data, error } = await supabase
    .from("research_methodology")
    .update({ ...item, updated_at: new Date().toISOString() } as any)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase updateResearchMethodology error:", error);
    return null;
  }

  return data as ResearchMethodology;
}

export async function deleteResearchMethodology(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("research_methodology")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase deleteResearchMethodology error:", error);
    return false;
  }

  return true;
}

// Research Collaborations CRUD
export async function getResearchCollaborations(): Promise<ResearchCollaboration[]> {
  const { data, error } = await supabase
    .from("research_collaborations")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Supabase getResearchCollaborations error:", error);
    return [];
  }

  return (data ?? []) as ResearchCollaboration[];
}

export async function createResearchCollaboration(
  item: Omit<ResearchCollaboration, "id" | "created_at" | "updated_at">
): Promise<ResearchCollaboration | null> {
  const { data, error } = await supabase
    .from("research_collaborations")
    .insert(item as any)
    .select()
    .single();

  if (error) {
    console.error("Supabase createResearchCollaboration error:", error);
    return null;
  }

  return data as ResearchCollaboration;
}

export async function updateResearchCollaboration(
  id: string,
  item: Partial<ResearchCollaboration>
): Promise<ResearchCollaboration | null> {
  const { data, error } = await supabase
    .from("research_collaborations")
    .update({ ...item, updated_at: new Date().toISOString() } as any)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase updateResearchCollaboration error:", error);
    return null;
  }

  return data as ResearchCollaboration;
}

export async function deleteResearchCollaboration(id: string): Promise<boolean> {
  const { error } = await supabase
    .from("research_collaborations")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase deleteResearchCollaboration error:", error);
    return false;
  }

  return true;
}
