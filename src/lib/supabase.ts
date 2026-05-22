import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fallback placeholder values are used during build time (e.g. in GitHub Actions CI)
// to prevent Next.js static prerendering from crashing when .env.local is not committed.
export const supabase = createClient(
  supabaseUrl || "https://placeholder-ellegance.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);

