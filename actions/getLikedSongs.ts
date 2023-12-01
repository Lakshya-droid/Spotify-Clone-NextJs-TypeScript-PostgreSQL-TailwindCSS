import { Song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const getLikedSongs = async(): Promise<void>=>{
  const supabase = createServerComponentClient({
      cookies: cookies
  });
  console.log(cookies);

  const {
      data:{
          session
      }
  } = await supabase.auth.getSession();
  try {
    console.log("here");
    const { data, error } = await supabase.from("groups").select();
console.log("-----------",data,error)
    if (error) {
      console.error('Error seeding data:', error);
    } else {
      console.log('Data seeded successfully:', data);
    }
  } catch (error:any) {
    console.error('Error seeding data:', error.message);
  }

}

export default getLikedSongs;