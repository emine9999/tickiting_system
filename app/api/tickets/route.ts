import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from "@/auth";
import { ticketSchema } from '@/lib/ticketSchema';

export async function POST(req: Request) {
    const session = await auth();
    console.log('Session:', session); // Log the session for debugging
    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = ticketSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
    }

    const { title, description, priority, status, assignee, type } = body;

    // Check for duplicate ticket title
    const checkDuplicate = await prisma.ticket.findFirst({
        where: { title },
    });
    if (checkDuplicate) {
        return NextResponse.json({ message: 'Ticket with this title already exists' }, { status: 400 });
    }

    try {
        // Validate assignedTo email if provided
        let assignedUser = null;
        if (assignee) {
            assignedUser = await prisma.user.findUnique({
                where: { email: assignee },
            });
            if (!assignedUser) {
                return NextResponse.json({ message: 'Assigned user not found' }, { status: 404 });
            }
        }

        const Group = await prisma.group.findUnique({
            where: { name: "SIR" }
        });
    
        // If group doesn't exist, create it
        if (!Group) {
            await prisma.group.create({
                data: {
                    name: "SIR",
                    description: "SIR Group" 
                }
            });
        }

await prisma.ticket.create({
    data: {
        title,
        description,
        priority,
        status,
        type,
        assignedTo: assignedUser ? {
            connect: { id: assignedUser.id }
        } : undefined,
        createdBy: {
            connect: { id: session.user.id }
        },
        group: {
            connect: { name: "SIR" }
        },
        
    },
});


        return NextResponse.json({ message: 'Ticket created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating ticket:', error);
        return NextResponse.json({ message: 'Error creating ticket' }, { status: 500 });
    }
}



// GET /tickets
export async function GET() {
    // const session = await auth();
    // if (!session || !session.user) {
    //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }

    try {
        const tickets = await prisma.ticket.findMany({
            include: {
                assignedTo: true,
                createdBy: true,
            }
        });
        return NextResponse.json(tickets, { status: 200 });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return NextResponse.json({ message: 'Error fetching tickets' }, { status: 500 });
    }
}


