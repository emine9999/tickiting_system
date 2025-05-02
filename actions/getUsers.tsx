'use server'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parseStringify } from '@/lib/utils'

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
