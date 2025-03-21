import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { githubId, walletAddress } = body;

        if (!githubId || !walletAddress) {
            console.error("Missing githubId or walletAddress", body);
            return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
        }

        // Check if user exists
        const user = await db.user.findUnique({ where: { githubId } });

        if (!user) {
            console.error("User not found in DB:", githubId);
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Update wallet address in database
        await db.user.update({
            where: { githubId },
            data: { walletAddress },
        });

        console.log(`Wallet updated for ${githubId}: ${walletAddress}`);

        return NextResponse.json({ message: 'Wallet address saved successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error saving wallet address:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}