import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// DELETE a group
export async function DELETE(req:Request, {params}: {params:{id:string}}){
    const session = await auth()
    if(!session || !session.user){
        return NextResponse.json({message: 'Unauthorized' }, { status: 401 })
    }
    
    if (!session.user.role || session.user.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    try {
        const group = await prisma.group.delete({
            where : {id: params.id}
        })
        return NextResponse.json({message: "Group deleted successfully", group}, {status: 200})
    } catch (error) {
        console.error('Error deleting Group:', error);
        return NextResponse.json({ message: 'Error deleting Group', error }, { status: 500 });
    }
}