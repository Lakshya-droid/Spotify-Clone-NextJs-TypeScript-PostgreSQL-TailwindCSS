
import { groups } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClient } from '@supabase/supabase-js'

const getLikedSongs = async(): Promise<[groups]>=>{
;

  const supabaseUrl ="https://tfenopkgpuiprspnbfrt.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmZW5vcGtncHVpcHJzcG5iZnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0MTg1MDYsImV4cCI6MjAxNjk5NDUwNn0.JRvtD37Kr7I95ImE5uoLpS1kYUIEslSOeNdqATOUhZw";
  console.log("supabaseUrl",supabaseUrl,supabaseKey);
  const supabase = createClient(supabaseUrl, supabaseKey);
  


  try {
    const { data, error } = await supabase.from("groups").select();
    if (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to handle it outside the function if needed
    } else {
      console.log('Data fetched successfully:', data);
      return data;
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error; // Re-throw the error to handle it outside the function if needed
  }
};

export default getLikedSongs;
