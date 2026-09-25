import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { email, full_name, role, is_active, password } = body;

    // Update password in Supabase Auth if provided
    if (password) {
      const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(params.id, {
        password,
      });

      if (authError) throw authError;
    }

    // Update editorial_users record
    const { data, error } = await supabaseAdmin
      .from('editorial_users')
      .update({
        email,
        full_name,
        role,
        is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating editorial user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Delete from Supabase Auth
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(params.id);

    if (authError) throw authError;

    // Delete from editorial_users
    const { error } = await supabaseAdmin
      .from('editorial_users')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting editorial user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
