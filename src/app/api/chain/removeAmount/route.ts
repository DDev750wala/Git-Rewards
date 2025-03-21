import { NextRequest, NextResponse } from 'next/server';
import { getContract } from '@/lib/ethers-config';
// import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    try {
        const { user ,repoName, amount } = await req.json() as {user : string , repoName: string; amount: string };

        // const user1 = await currentUser();
        
        if (!user || !repoName || !amount) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        
        
        const contract = await getContract();

        if (!contract || !contract.removeAmount) {
            return NextResponse.json({ message: 'Contract method not available' }, { status: 500 });
        }
        const tx = await contract.removeAmount(user, repoName, BigInt(amount) );
        await tx.wait();

        return NextResponse.json({ message: 'Amount added successfully', txHash: tx.hash }, { status: 200 });
    } catch (error) {
        console.error('Error adding amount:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}