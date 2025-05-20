import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/user.actions";
import { pusherServer } from "@/lib/pusher";

// this to create a conversation 1 to 1, or a group chat
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    if (isGroup) {
      const validMembers = members
        .filter((member: { value: string }) => member.value)
        .map((member: { value: string }) => ({
          id: member.value,
        }));

      if (validMembers.length < 2) {
        return new NextResponse("At least 2 valid members are required", {
          status: 400,
        });
      }


      // create a group conversation
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...validMembers,
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, "conversation:new", newConversation);
        }
      });

      return NextResponse.json(newConversation);
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
          // TODO : link the conv to the ticket
        ],
      },
    });

    const singleConversation = existingConversations[0];
    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

     // create 1 to 1 conversation
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", newConversation);
      }
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    console.log("eroor creating the conver", error);
    return new NextResponse("Internal Errooor", { status: 500 });
  }
}
