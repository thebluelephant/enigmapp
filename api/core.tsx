import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_KEY, { db: { schema: process.env.EXPO_PUBLIC_SUPABASE_SCHEMA } })