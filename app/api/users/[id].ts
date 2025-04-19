//this for GET ,PUT and DELETE by id
import { auth } from '@/auth';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Extract the user ID from the URL
  const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Delete the user
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
  }
}



// GET a specific user by id


export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Extract the user ID from the URL

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User fetched successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error finding user:", error);
    return NextResponse.json({ message: "Error finding user" }, { status: 500 });
  }
}