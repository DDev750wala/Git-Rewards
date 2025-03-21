import { NextResponse } from 'next/server'
import { db } from '@/server/db'
import { currentUser } from '@clerk/nextjs/server'

export async function POST(req: Request) {
    try {
        const { repoId, amount } = await req.json()
        const user = await currentUser()

        if(!user){
            return NextResponse.json({ error: 'User not found' }, { status: 401 })
        }

        const repo = await db.repository.findUnique({
            where: {id : repoId },
        })

        console.log('Repo:', repoId)

        if (!repo) {
            return NextResponse.json({ error: 'Repository not found' }, { status: 404 })
        }

        const updatedRepo = await db.repository.update({
            where: { id: repoId },
            data: {
                depositedFunds: repo.depositedFunds + amount,
            },
        })

        return NextResponse.json({ success: true, data: updatedRepo }, {status: 200})
    } catch (error) {
        console.error('Error updating funds:', error)
        return NextResponse.json({ error: 'Failed to update funds' }, { status: 500 })
    }
}
