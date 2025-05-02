// create a new group
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { groupSchema } from '@/lib/groupSchema';


// create a new Group
export async function POST(req: Request) {
    const body = await req.json();
  
    const validation = groupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
  
    const { name, description, members } = body;
  
    const checkDuplicategroup = await prisma.group.findUnique({
      where: { name },
    });
  
    if (checkDuplicategroup) {
      return NextResponse.json(
        { message: 'Group already exists' },
        { status: 400 }
      );
    }
  
    const memberConnections = [];
  
    if (members && Array.isArray(members)) {
      for (const email of members) {
        const user = await prisma.user.findUnique({
          where: { email },
        });
  
        if (!user) {
          return NextResponse.json(
            { message: `User with email ${email} not found` },
            { status: 404 }
          );
        }
  
        const existingMembership = await prisma.userGroup.findFirst({
          where: {
            userId: user.id,
            group: {
              name,
            },
          },
          include: {
            group: true,
          },
        });
  
        if (existingMembership) {
          return NextResponse.json(
            { message: `User ${email} is already a member of this group` },
            { status: 400 }
          );
        }
  
        memberConnections.push({
          user: {
            connect: { id: user.id },
          },
        });
      }
    }
  
    try {
      const group = await prisma.group.create({
        data: {
          name,
          description,
          memberships: {
            create: memberConnections,
          },
        },
      });
  
      return NextResponse.json(
        { message: 'Group created successfully', group },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating Group:', error);
      return NextResponse.json(
        { message: 'Error creating Group', error },
        { status: 500 }
      );
    }
  }
  

//GET all groups

export async function GET() {
    // const session = await auth()
    // if (!session || !session.user) {
    //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    // }

    // if (!session.user.role || session.user.role !== 'admin') {
    //     return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    // }

    try {
        const group = await prisma.group.findMany({
            include: {
                memberships: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return NextResponse.json(
            { message: "Groups fetched successfully", group },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching groups', error },
            { status: 500 }
        );
    }
}


// delete a group
export async function DELETE(req: Request) {
  // const session = await auth()
  // if(!session || !session.user){
  //     return NextResponse.json({message: 'Unauthorized' }, { status: 401 })
  // }

  // if (!session.user.role || session.user.role !== 'admin') {
  //     return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  // }

  try {
    const body = await req.json();
    const { groupename } = body;

    if (! groupename ) {
      return NextResponse.json({ message: "Group ID is required" }, { status: 400 });
    }

    const group = await prisma.group.delete({
      where: { name: groupename },
    });

    return NextResponse.json({ message: "Group deleted successfully", group }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Group:", error);
    return NextResponse.json({ message: "Error deleting Group", error }, { status: 500 });
  }
}


export async function PATCH(req: Request) {
  const body = await req.json();
  const { GroupName: name, members} = body;

  if (!name || !members || !Array.isArray(members)) {
    return NextResponse.json({ message: "Group name and members are required" }, { status: 400 });
  }

  try {
    // 1. Ensure the group exists
    const group = await prisma.group.findUnique({
      where: { name },
    });

    if (!group) {
      return NextResponse.json({ message: `Group "${name}" not found` }, { status: 404 });
    }

    const memberConnections = [];

    // 2. Process members one by one
    for (const email of members) {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { message: `User with email ${email} not found` },
          { status: 404 }
        );
      }

      const existingMembership = await prisma.userGroup.findFirst({
        where: {
          userId: user.id,
          groupId: group.id,
        },
      });

      if (existingMembership) {
        return NextResponse.json(
          { message: `User with email ${email} is already part of this group` },
          { status: 400 }
        );
      }

      memberConnections.push({
        user: {
          connect: { id: user.id },
        },
      });
    }

    // 3. Add the new members
    const updatedGroup = await prisma.group.update({
      where: { name },
      data: {
        memberships: {
          create: memberConnections,
        },
      },
    });

    return NextResponse.json({
      message: "Members added successfully",
      group: updatedGroup,
    }, { status: 200 });

  } catch (error) {
    console.error("Error adding members to Group:", error);
    return NextResponse.json({ message: "Error adding members to Group", error }, { status: 500 });
  }
}

