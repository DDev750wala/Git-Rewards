import { NextRequest, NextResponse } from 'next/server';
import { getContract } from '@/lib/ethers-config';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    try {
        const { user ,repoName, amount } = await req.json() as {user : string , repoName: string; amount: string };

        const user1 = await currentUser();
        
        if (!user || !repoName || !amount) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        if (user1 && user1.emailAddresses && user1.emailAddresses[0]) {
            console.log(user1.emailAddresses[0].emailAddress);
        }
        
        const contract = await getContract();

        if (!contract || !contract.addAmount) {
            return NextResponse.json({ message: 'Contract method not available' }, { status: 500 });
        }

        const tx = await contract.addAmount(user, repoName, { value: BigInt(amount) });
        await tx.wait();

        return NextResponse.json({ message: 'Amount added successfully', txHash: tx.hash }, { status: 200 });
    } catch (error) {
        console.error('Error adding amount:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}