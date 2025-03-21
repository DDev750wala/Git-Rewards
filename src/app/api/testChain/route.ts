import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { getContract , getWalletAddress } from '@/lib/ethers-config'

export async function GET(req: NextRequest) {
    try {

        const contract = await getContract();
        console.log(contract)
        

    } catch (error) {
        console.error('Error saving wallet address:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}