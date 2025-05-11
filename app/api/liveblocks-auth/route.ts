
import {liveblocks} from "@/lib/liveblocks"
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserColor } from "@/lib/utils";
export async function POST() {
  // Get the current user from your database
  const session = await auth();
  if (!session) redirect("/auth")

    
  const {email ,name ,image,id} = session.user || {}
  console.log("sessionnnn",session)
  const user = {
            id,
            info: {
            id,
            email: email || "",
            name: name || "",
            image,
            color: getUserColor(id), 
          },    
        }
      

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: [],
    },
    { userInfo: user.info },
  );

  return new Response(body, { status });
}