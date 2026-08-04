import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * The magic link in the sign-in email points here with a one-time `code`.
 * We exchange it for a real session (stored in cookies), then send the
 * user on to their dashboard.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
