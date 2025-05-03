'use server'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parseStringify } from '@/lib/utils'
import { liveblocks } from "@/lib/liveblocks";
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
        name: true,
        email: true,
        image: true,
      },
    })

    // Sort users based on the original order of userIds
    const sortedUsers = userIds.map((userId) =>
      users.find((user) => user.id === userId)
    ).filter(Boolean) // Remove any undefined if not found

    const parsed = parseStringify(sortedUsers)

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 })
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

    return parseStringify(users);
  } catch (error) {
    console.log(`Error fetching document users: ${error}`);
  }
}
