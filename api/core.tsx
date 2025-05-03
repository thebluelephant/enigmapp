import { createClient } from "@supabase/supabase-js";
import config from "../config";

export const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY, { db: { schema: config.SUPABASE_SCHEMA } })