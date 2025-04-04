import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ticketSchema } from '@/lib/ticketSchema';

export async function GET(request: Request, context :{ params: { id: string } }) {
    const { id } =  context.params; 

    try {
        const ticket = await prisma.ticket.findUnique({
            where: { id }, 
        });

        
        if (!ticket) {
            return NextResponse.json({ message: 'Ticket not found' }, { status: 404 });
        }

        return NextResponse.json(ticket, { status: 200 });
    } catch (error) {
        console.error('Error fetching ticket:', error);
        return NextResponse.json({ message: 'Error fetching ticket' }, { status: 500 });
    }
}



//---------------patch------------------

export async function PATCH(req: Request, context: { params: { id: string } }) {
    const { id } = context.params; // Extract the ticket ID from the URL parameters

     const body = await req.json();
        const validation = ticketSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }

    // Validate the request body
    if (!body) {
        return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    const { title, description, priority, status, assignedTo, type } = body; // Destructure the required fields from the request body

    try {
        // Check for duplicate ticket title
         const checkDuplicate = await prisma.ticket.findFirst({
            where: {
                title,            // Matches the title you're trying to update to
                NOT: { id },      // Excludes the ticket with the current id (you don't want to match the same ticket)
            },
            });
            if (checkDuplicate) {
                return NextResponse.json({ message: 'Ticket with this title already exists' }, { status: 400 });
            }
        
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
        // Update the ticket in the database
        const updatedTicket = await prisma.ticket.update({
            where: { id }, // Find the ticket by ID
            data: {
                title,
                description,
                priority,
                status,
                type,
                assignedToId: assignedUser ? assignedUser.id : null, // Assign if exists we access the id prisma return the whole user object
            },
        });

        return NextResponse.json(updatedTicket, { status: 200 }); // Return the updated ticket
    } catch (error) {
        console.error('Error updating ticket:', error);
        return NextResponse.json({ message: 'Error updating ticket' }, { status: 500 });
    }
}   