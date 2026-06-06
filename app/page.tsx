import { assemblePage, loadBodyContent, injectCampusUpdates } from "@/lib/html-assembler";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default async function Home() {
  let homeBody = loadBodyContent("app/home-body.html");

  if (isSupabaseConfigured()) {
    try {
      const { data: updates, error } = await supabase!
        .from('campus_updates')
        .select('*')
        .order('publish_date', { ascending: false });
      
      if (!error && updates && updates.length > 0) {
        homeBody = injectCampusUpdates(homeBody, updates);
      }
    } catch (e) {
      console.error("Error fetching campus updates from Supabase:", e);
    }
  }

  const assembledHtml = assemblePage(homeBody, "/");

  return (
    <div
      dangerouslySetInnerHTML={{ __html: assembledHtml }}
      suppressHydrationWarning
    />
  );
}

