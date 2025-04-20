import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    const body = await req.json();
    const { roleName } = body;
    
    if (!roleName) {
      return NextResponse.json({ message: "Role name is required" }, { status: 400 });
    }
    
    try {
      // Find the role ID first
      const role = await prisma.userRole.findFirst({
        where: {
          name: roleName,
        },
      });
  
      if (!role) {
        return NextResponse.json({ message: "Role not found" }, { status: 404 });
      }
  
      // Then find users with that role ID
      const users = await prisma.user.findMany({
        where: {
          roleId: role.id,
        },
        select: {
          id: true,
          username: true,
          email: true,
          role: {
            select: {
              name: true,
            },
          },
        },
      });
      
      return NextResponse.json(users, { status: 200 });
    } catch (error) {
      console.error("Error fetching users by role:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }