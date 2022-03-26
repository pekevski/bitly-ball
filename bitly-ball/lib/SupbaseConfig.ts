import { createClient } from "@supabase/supabase-js";
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';

const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

// export const supabase = createClient(
//   SUPABASE_URL,
//   SUPABASE_KEY
// )

export const supabase = supabaseClient;