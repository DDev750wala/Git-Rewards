import { NextResponse } from 'next/server'
import { db } from '@/server/db'
import { currentUser } from '@clerk/nextjs/server'

export async function POST(req: Request) {
    try {
        const { rewardId } = await req.json()

        await db.$transaction(async (tx) => {
            const reward = await tx.reward.update({
                where: { id: rewardId },
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
        const reward = await db.reward.findUnique({
            where: { id: rewardId }
        })
        if(!reward) {
            return NextResponse.json({ error: 'Reward not found' }, { status: 404 })
        }
        const repository = await db.repository.findUnique({
            where: { id: reward.repositoryId }
        })
        if(!repository) {
            return NextResponse.json({ error: 'Repository not found' }, { status: 404 })
        }
        const owner = await db.user.findUnique({
            where: { id: repository.userId }
        })

        return NextResponse.json({ success: true, owner: owner, reward: reward }, { status: 200 })
    } catch (error) {
        console.error('Error updating funds:', error)
        return NextResponse.json(
            { error: 'Failed to update funds' },
            { status: 500 }
        )
    }
}
