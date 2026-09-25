import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('editorial_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching editorial users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, full_name, role, is_active } = body;

    console.log("API: Creating user with:", { email, full_name, role, is_active });

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    console.log("API: Supabase Auth response:", { authData, authError });

    if (authError) {
      console.error("API: Supabase Auth error:", authError);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      console.error("API: No user returned from Supabase Auth");
      return NextResponse.json({ error: 'No user returned from Supabase Auth' }, { status: 500 });
    }

    console.log("API: User created in Supabase Auth with ID:", authData.user.id);

    // Create editorial_users record
    const { data: editorialUser, error: editorialError } = await supabaseAdmin
      .from('editorial_users')
      .insert({
        id: authData.user.id,
        email,
        full_name,
        role,
        is_active,
      })
      .select()
      .single();

    console.log("API: Editorial users insert response:", { editorialUser, editorialError });

    if (editorialError) {
      console.error("API: Editorial users insert error:", editorialError);
      return NextResponse.json({ error: editorialError.message }, { status: 500 });
    }

    console.log("API: User successfully created:", editorialUser);
    return NextResponse.json(editorialUser);
  } catch (error) {
    console.error("API: Error creating editorial user:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
