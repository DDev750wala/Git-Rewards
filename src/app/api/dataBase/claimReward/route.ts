import { NextResponse } from 'next/server'
import { db } from '@/server/db'
import { currentUser } from '@clerk/nextjs/server'
import { FetchClaimableDetailsInterface } from '@/lib/interfaces'

export async function POST(req: Request) {
    try {
        const { rewardFull }: { rewardFull: FetchClaimableDetailsInterface } = await req.json()

        console.log("Reward Full:", rewardFull);
        

        await db.$transaction(async (tx) => {
            const reward = await tx.reward.update({
                where: { id: rewardFull.id, prNumber: rewardFull.prNumber },
                data: {
                    claimed: true,
                    claimedAt: new Date(),
                },
            })

            await tx.repository.update({
                where: { id: reward.repositoryId },
                data: {
                    depositedFunds: {
                        decrement: reward.amountEth,
                    },
                },
            })
        })

        const owner = await db.user.findUnique({
            where: { id: rewardFull.repository.userId },
        })

        console.log("Owner qwertyuiopdskjfhdihfghdhgkghdkghkf:", owner);
        
        // const reward = await db.reward.findUnique({
        //     where: { id: rewardFull.id, prNumber: rewardFull.prNumber }, 
        // })
        // if(!reward) {
        //     console.log('Reward not found');
        //     return NextResponse.json({ error: 'Reward not found' }, { status: 404 })
        // }
        // const repository = await db.repository.findUnique({
        //     where: { id: reward.repositoryId }
        // })
        // if(!repository) {
        //     console.log('Repository not found');
        //     return NextResponse.json({ error: 'Repository not found' }, { status: 404 })
        // }
        // const owner = await db.user.findUnique({
        //     where: { id: repository.userId }
        // })

        return NextResponse.json({ success: true, owner: owner }, { status: 200 })
    } catch (error) {
        console.error('Error updating funds:', error)
        return NextResponse.json(
            { error: 'Failed to update funds' },
            { status: 500 }
        )
    }
}
