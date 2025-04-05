import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { auth } from "@/auth";
import { ticketSchema } from '@/lib/ticketSchema';

export async function POST(req: Request) {
    // const session = await auth();
    // console.log('Session:', session); // Log the session for debugging
    // if (!session || !session.user) {
    //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }

    const body = await req.json();
    const validation = ticketSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
    }

    const { title, description, priority, status, assignedTo, type } = body;

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
        if (assignedTo) {
            assignedUser = await prisma.user.findUnique({
                where: { email: assignedTo },
            });
            if (!assignedUser) {
                return NextResponse.json({ message: 'Assigned user not found' }, { status: 404 });
            }
        }

        // Create a new ticket
        await prisma.ticket.create({
            data: {
                title,
                description,
                priority,
                status,
                type,
                userId: '67eb5a558e2fc983efc1da39', //session.user.id, // Creator's ID
                assignedToId: assignedUser ? assignedUser.id : null, // Assign if exists we access the id prisma return the whole user object
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
        const tickets = await prisma.ticket.findMany();
        return NextResponse.json(tickets, { status: 200 });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return NextResponse.json({ message: 'Error fetching tickets' }, { status: 500 });
    }
}


