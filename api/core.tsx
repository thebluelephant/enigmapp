import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";

export const supabase = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.EXPO_PUBLIC_SUPABASE_KEY,
    {
        db: { schema: process.env.EXPO_PUBLIC_SUPABASE_SCHEMA },
        accessToken: async () => {
            const token = await SecureStore.getItemAsync("auth_token");
            return token
        }
    })

