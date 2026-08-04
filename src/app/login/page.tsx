"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

/**
 * Passwordless sign-in: the user enters their email, we send a magic link,
 * clicking it logs them in. No passwords to manage or leak — simplest
 * possible auth flow for a student-facing side project.
 */
export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setStatus(error ? "error" : "sent");
  }

  return (
    <div className="container flex max-w-sm flex-col items-center py-20 text-center">
      <h1 className="text-2xl font-bold tracking-tight">Sign in to Physics Path</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter your email and we'll send you a magic link — no password needed. This lets your
        progress follow you across devices instead of staying in one browser.
      </p>

      {status === "sent" ? (
        <div className="mt-8 rounded-lg border border-success/30 bg-success/5 px-4 py-3 text-sm">
          Check your inbox for a sign-in link. You can close this tab.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-3">
          <input
            type="email"
            required
            placeholder="name@school.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
          />
          <Button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending link…" : "Send magic link"}
          </Button>
          {status === "error" && (
            <p className="text-sm text-destructive">Something went wrong. Try again in a moment.</p>
          )}
        </form>
      )}

      <p className="mt-6 text-xs text-muted-foreground">
        You can also{" "}
        <a href="/roadmap" className="underline">
          keep browsing without an account
        </a>{" "}
        — your progress just stays local to this browser.
      </p>
    </div>
  );
}
