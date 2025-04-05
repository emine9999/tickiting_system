import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get users' emails based on query
export async function GET(req: Request) {
    // Extract query parameter from the URL
    const url = new URL(req.url);
    const query = url.searchParams.get('query')?.toLowerCase() || '';

    try {
        // Fetch users' emails, optionally filtering by the search query
        const users = await prisma.user.findMany({
            where: {
                email: {
                    contains: query,  // Filter emails based on the query
                    mode: 'insensitive', // Case-insensitive search
                },
            },
            select: {
                email: true,
            },
        });

        // Return the filtered users' emails
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
    }
}
