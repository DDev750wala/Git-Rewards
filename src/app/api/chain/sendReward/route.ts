import { db } from '@/server/db';
import { NextRequest, NextResponse } from 'next/server';
// import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    try {
        const { user, reciptent,repoName, amount } = await req.json() as {user : string , reciptent:string ,repoName: string; amount: string };

        // const user1 = await currentUser();
        
        if (!user || !repoName || !amount) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        return NextResponse.json({ message: 'Amount added successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error adding amount:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}