import { NextRequest, NextResponse } from 'next/server';
import { getContract } from '@/lib/ethers-config';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    try {
        const { address, repoName } = await req.json() as { address: string, repoName: string };

        const user1 = await currentUser();
        
        if (!address || !repoName) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        if (user1 && user1.emailAddresses && user1.emailAddresses[0]) {
            console.log(user1.emailAddresses[0].emailAddress);
        }
        
        const contract = await getContract();

        if (!contract || !contract.getRepoAmount) {
            return NextResponse.json({ message: 'Contract method not available' }, { status: 500 });
        }

        // Call the getter function and get the result directly
        // const amount = await contract.getRepoAmount(address, repoName);
        const amount = await contract.getRepoAmount(address, repoName);

        console.log('Amount retrieved:', amount.toString());
        

        return NextResponse.json({ 
            message: 'Amount retrieved successfully', 
            amount: amount.toString() // Convert BigInt to string for JSON serialization
        }, { status: 200 });
    } catch (error) {
        console.error('Error retrieving amount:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}