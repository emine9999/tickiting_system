// this for GET and POST
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { userSchema } from '@/lib/userSchema';
import { auth } from '@/auth';
import * as bcrypt from "bcryptjs";

// GET all users
export async function GET() {
    // const session = await auth();
    // if (!session || !session.user) {
    //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }

    // if (!session.user.role || session.user.role !== 'admin') {
    //     return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    // }



    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
    }
}


// POST create a user
export async function POST(req: Request){
    const session = await auth ();
    if (!session || !session.user){
        return NextResponse.json({message : 'Unauthorized'}, {status:401});
    }

    if (!session.user.role || session.user.role !== 'admin'){
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const validation = userSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
    }

    const { name, email, role, password,groupId } = body;

    //check for duplicate users

    const checkDuplicate = await prisma.user.findFirst({
        where : {email},
    });

    if (checkDuplicate){
        return NextResponse.json({message: "user already existe"},{status:400});
    }

    try {
         // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await prisma.user.create({
        data: {
            name,
            email,
            role: role as 'ADMIN' | 'USER' | 'MANAGER', // Cast the role to the enum values
            password: hashedPassword,
        },
    });

    // Add the user to the group
    if (groupId) {
        const group = await prisma.group.findUnique({
            where: { id: groupId },
        });

        if (!group) {
            return NextResponse.json({ message: "Group not found" }, { status: 404 });
        }

        await prisma.userGroup.create({
            data: {
                userId: user.id,
                groupId: groupId,
            },
        });
    }

     return NextResponse.json({message:"user Created Successfully"},{status:201})
    } catch (error) {
        console.error('Error creating ticket:', error);
        return NextResponse.json({ message: 'Error creating ticket' }, { status: 500 });
    }
}