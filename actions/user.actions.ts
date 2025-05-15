'use server'
import { prisma } from '@/lib/prisma'
import { parseStringify } from '@/lib/utils'
import { liveblocks } from "@/lib/liveblocks";
import { auth } from "@/auth";

export const getUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          in: userIds,
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
      },
    })
    
    const sortedUsers = userIds.map((userId) =>
      users.find((user) => user.email === userId)
    ).filter(Boolean) 
   return  parseStringify(sortedUsers)

  } catch (error) {
    console.error("Error fetching users:", error)
  }
}


export const getDocumentUsers = async ({ roomId, currentUser, text }: { roomId: string, currentUser: string, text: string }) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const users = Object.keys(room.usersAccesses).filter((email) => email !== currentUser);

    if(text.length) {
      const lowerCaseText = text.toLowerCase();

      const filteredUsers = users.filter((email: string) => email.toLowerCase().includes(lowerCaseText))
      
      return parseStringify(filteredUsers);
    }
    console.log(" users from getUsers action: ", users);
    return parseStringify(users);
  } catch (error) {
    console.log(`Error fetching document users: ${error}`);
  }
}


// this for ticket chat
const getUserss = async ()=>{

  const session = await auth ();
  if (!session?.user?.email)
    return []

  try {
    const users = await prisma.user.findMany({
      orderBy :{
        createdAt: "desc",
      },
      where :{
        NOT:{
          email : session.user.email
        }
      }
    });

    return users;
  } catch (error) {
   return []; 
  }

}

export default getUserss ;


export const getCurrentUser = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
      },
    });
    
    return parseStringify(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}