import { createClient } from "@supabase/supabase-js"

export const connectDB = (env: Env) => {
	return createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
}
