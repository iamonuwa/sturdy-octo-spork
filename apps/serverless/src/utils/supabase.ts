import { createClient } from "@supabase/supabase-js"

interface Env {
	SUPABASE_URL: string;
	SUPABASE_KEY: string;
}

export const connectDB = (env: Env) => {
	return createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
}
