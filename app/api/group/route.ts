// create a new group
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { groupSchema } from '@/lib/groupSchema';


// create a new Group
export async function POST(req:Request){
    // const session = await auth();
    // if (!session || !session.user) {
    //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }

    // if (!session.user.role || session.user.role !== 'admin') {
    //     return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    // }

    const body = await req.json();
    const validation = groupSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }
    const {name ,description,member} = body;
    console.log("body:", name)

    const checkDuplicategroup = await prisma.group.findUnique({
        where : {name}
    })
    if (checkDuplicategroup) {
        return NextResponse.json({ message: "Group already exists" }, { status: 400 });
    }

    //check if the member existe

    if (member) {
          const foundMember = await prisma.user.findUnique({
            where: { email: member },
          });
          if (!foundMember) {
            return NextResponse.json({ message: ' user not found' }, { status: 404 });
          }
        }
    
            // Check if the user is already a member of the group
    const existingMembership = await prisma.userGroup.findFirst({
         where: {
                userId,
                name,
                },
            });
    
            if (existingMembership) {
                return NextResponse.json({ message: 'User is already a member of this group' }, { status: 400 });
            }

    try {
        const group = await prisma.group.create({
            data: {
                name,
                description,
                member,
            },
        });
        return NextResponse.json({ message: "Group created successfully" ,group}, { status: 201 });

    } catch (error) {
        console.error('Error creating Group:', error);
        return NextResponse.json({ message: 'Error creating Group' ,error}, { status: 500 });
    }
}


//GET all groups

export async function GET(){
    const session = await auth()
    if(!session || !session.user){
        return NextResponse.json({message: 'Unauthorized' }, { status: 401 })
    }
    
    if (!session.user.role || session.user.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    try {
        const group = await prisma.group.findMany();
        return NextResponse.json({ message: "Groups fetched successfully" ,group}, { status: 201 });

    } catch (error) {
        console.error('Error fetching Group:', error);
        return NextResponse.json({ message: 'Error fetching Group' ,error}, { status: 500 });
    }
}