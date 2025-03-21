import { NextResponse } from 'next/server'
import { db } from '@/server/db'
import { currentUser } from '@clerk/nextjs/server'

export async function POST(req: Request) {
    try {
        const { repoId } = await req.json()
        const user = await currentUser()

        if(!user){
            return NextResponse.json({ error: 'User not found' }, { status: 401 })
        }

        const remaningAmount = await db.repository.findUnique({
            where: {id : repoId },
            select: {
                depositedFunds: true,
        }})


        if (!remaningAmount) {
            return NextResponse.json({ error: 'Repository not found' }, { status: 404 })
        }


        return NextResponse.json({ success: true, data: remaningAmount })
    } catch (error) {
        console.error('Error updating funds:', error)
        return NextResponse.json({ error: 'Failed to update funds' }, { status: 500 })
    }
}
