import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ticketSchema } from '@/lib/ticketSchema';

// Define params type for better type safety
type RouteParams = { params: { id: string } };

export async function GET(req: NextRequest, { params }: RouteParams) {
  const id = params.id;

  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      return NextResponse.json({ message: 'Ticket not found' }, { status: 404 });
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return NextResponse.json({ message: 'Error fetching ticket' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const id = params.id;

  try {
    const body = await request.json();
    const validation = ticketSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
    }

    const { title, description, priority, status, assignedTo, type } = body;

    // Check for duplicate ticket title
    const checkDuplicate = await prisma.ticket.findFirst({
      where: {
        title,
        NOT: { id },
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
      where: { id },
      data: {
        title,
        description,
        priority,
        status,
        type,
        assignedToId: assignedUser ? assignedUser.id : null,
      },
    });

    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json({ message: 'Error updating ticket' }, { status: 500 });
  }
}