import { createClient } from "jsr:@supabase/supabase-js";

export default async function saveToDb(row: {
  website_url: string;
  summary: string;
  tags: string[];
}) {
  console.log("[saveWebsite] inserting row");

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data } = await supabase
    .from("websites")
    .insert(row)
    .select("*")
    .single()
    .throwOnError();

  console.log("[saveWebsite] inserted with id:", data?.id);
  return data;
}
