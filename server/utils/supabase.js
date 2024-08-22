import { configDotenv } from "dotenv";
configDotenv();
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPRESS_APP_SUPABASE_URL;
const supabaseKey = process.env.EXPRESS_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
