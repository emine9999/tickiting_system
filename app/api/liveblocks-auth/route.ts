
import {liveblocks} from "@/lib/liveblocks"
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export async function POST(request: Request) {
  // Get the current user from your database
  const session = await auth();
  if (!session) redirect("/auth")
  const user = {
            id : session.user?.id,
            
        }

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.id,
      groupIds, // Optional
    },
    { userInfo: user.metadata },
  );

  return new Response(body, { status });
}