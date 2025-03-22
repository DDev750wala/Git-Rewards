import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db'
import { currentUser } from '@clerk/nextjs/server'

export async function GET(req: NextRequest) {

    try {
        const contributor = await currentUser();
        if (!contributor) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        
        console.log('HERE IS THE Contributor:', contributor.username);
        
        const contributorFromDb = await db.contributor.findUnique({
            where: { username: contributor.username as string }
        })
        if (!contributorFromDb) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
    
        const allRewards = await db.reward.findMany({
            where: { contributorId: contributorFromDb.id, claimed: false }, include: {
                repository: true
            }
        })
        console.log('All rewards:', allRewards);
        
    
        return NextResponse.json({ rewards: allRewards }, { status: 200 })
    } catch (error) {
        console.error('Error updating funds:', error)
        return NextResponse.json(
            { error: 'Failed to update funds' },
            { status: 500 }
        )
    }
}
