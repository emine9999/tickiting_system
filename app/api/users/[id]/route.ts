//this for GET ,PUT and DELETE by id
import { auth } from '@/auth';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import { revalidatePath } from "next/cache";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params; 
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
    revalidatePath("/users")
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
  }
}



// GET a specific user by id


export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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


export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json();
  const { password ,username,email,image} = body;

  if (!id || !password) {
      return NextResponse.json({ message: 'User ID and password are required' }, { status: 400 });
  }

  if (password.length < 6) {
      return NextResponse.json({ message: 'Password is required' }, { status: 400 });
  }

  try {
     
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prisma.user.update({
          where: { id },
          data: { 
            password: hashedPassword ,
            username : username,
            email : email,
            image : image,
          
          },
      });

      if (!user) {
          return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }

      return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
  } catch (error) {
      console.error('Error updating password:', error);
      return NextResponse.json({ message: 'Error updating password' }, { status: 500 });
  }
}

