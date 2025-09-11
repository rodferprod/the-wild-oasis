import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fbpqhvjpercsxpllcnqw.supabase.co";
// supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicHFodmpwZXJjc3hwbGxjbnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMTkzOTcsImV4cCI6MjA3MjU5NTM5N30.z-4gLFDH9mqbk5pUdHXCZALYGQqRVNy2D4G9NPovEdM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
