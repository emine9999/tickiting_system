import { NextResponse } from 'next/server';
import { roleSchema } from '@/lib/roleSchema';
import { prisma } from '@/lib/prisma';


export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body using Zod schema
    const validation = roleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, description, portee} = body;

    // Check if the role already exists in the database
    const checkDuplicateRole = await prisma.userRole.findUnique({
      where: { name },
    });

    if (checkDuplicateRole) {
      return NextResponse.json(
        { message: 'Role already exists' },
        { status: 400 }
      );
    }

    // Create the new role
    const newRole = await prisma.userRole.create({
      data: {
        name,
        description,
        portee,
      }
    });

    return NextResponse.json(
      { message: `${newRole.name} created successfully` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while creating the role:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


// get all roles

export async function GET (){
    try {
        const roles = await prisma.userRole.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            portee: true
        }
        });
    
        return NextResponse.json(roles, { status: 200 });
    } catch (error) {
        console.error("Error while fetching roles:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// patch  role

export async function PATCH(req: Request) {
  const body = await req.json();
  const { roleName, members } = body;

  if (!roleName || !members || !Array.isArray(members)) {
    return NextResponse.json({ message: "Role name and members are required" }, { status: 400 });
  }

  try {
    // 1. Ensure the Role exists
    const role = await prisma.userRole.findUnique({
      where: { name: roleName },
    });

    if (!role) {
      return NextResponse.json({ message: `Role "${roleName}" not found` }, { status: 404 });
    }

    // 2. Process members one by one
    const updatedUsers = [];
    
    for (const email of members) {
      // Find the user
      const user = await prisma.user.findUnique({
        where: { email },
        include: { role: true }
      });

      if (!user) {
        return NextResponse.json(
          { message: `User with email ${email} not found` },
          { status: 404 }
        );
      }

      // Check if user already has this role
      if (user.role?.id === role.id) {
        return NextResponse.json(
          { message: `User with email ${email} is already assigned to this role` },
          { status: 400 }
        );
      }

      // Update the user with the new role
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          roleId: role.id
        },
      });

      updatedUsers.push(updatedUser);
    }

    return NextResponse.json({
      message: "Role assigned successfully",
      updatedUsers,
    }, { status: 200 });

  } catch (error) {
    console.error("Error assigning role to users:", error);
    return NextResponse.json({ 
      message: "Error assigning role to users", 
      error: (error as Error).message 
    }, { status: 500 });
  }
}



