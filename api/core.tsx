import { createClient } from "@supabase/supabase-js";
import Config from '../env';

export const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY, { db: { schema: Config.SUPABASE_SCHEMA } })