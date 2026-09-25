import { supabase } from "@/lib/supabase/client";

export type SupabaseEditorialUser = {
  id: string;
  email: string;
  full_name: string;
  role: "Super Admin" | "Admin" | "Editor";
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export async function getEditorialUsers(): Promise<SupabaseEditorialUser[]> {
  const { data, error } = await supabase
    .from("editorial_users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getEditorialUsers error:", error);
    return [];
  }

  return (data ?? []) as SupabaseEditorialUser[];
}

export async function getEditorialUserById(id: string): Promise<SupabaseEditorialUser | null> {
  const { data, error } = await supabase
    .from("editorial_users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase getEditorialUserById error:", error);
    return null;
  }

  return data as SupabaseEditorialUser;
}

export async function createEditorialUser(
  user: Omit<SupabaseEditorialUser, "id" | "created_at" | "updated_at"> & { password: string }
): Promise<SupabaseEditorialUser | null> {
  console.log("createEditorialUser called with:", { email: user.email, full_name: user.full_name, role: user.role });

  try {
    const response = await fetch('/api/editorial-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to create user:", error);
      return null;
    }

    const created = await response.json();
    console.log("User successfully created:", created);
    return created as SupabaseEditorialUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

export async function updateEditorialUser(
  id: string,
  user: Partial<SupabaseEditorialUser> & { password?: string }
): Promise<SupabaseEditorialUser | null> {
  try {
    const response = await fetch(`/api/editorial-users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to update user:", error);
      return null;
    }

    const updated = await response.json();
    return updated as SupabaseEditorialUser;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
}

export async function deleteEditorialUser(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/editorial-users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to delete user:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
}
