import { db } from '@/server/db'
import { GithubInstallationApp } from './interfaces'

export async function handleNewInstallation(payload: GithubInstallationApp) {
    if (payload.action === 'created') {
        try {
            console.log('Received installation event:', payload)

            const user = await db.user.findUnique({
                where: { githubId: payload.sender.login.toLowerCase() },
            })

            if (!user) {
                throw new Error('User not found')
            }

            let repositories = payload.repositories.map((repo) => {
                return {
                    name: repo.name,
                    githubRepoId: repo.id.toString(),
                    userId: user.id.toLowerCase(),
                }
            })

            await db.repository.createMany({
                data: repositories,
            })

            return true
        } catch (e: unknown) {
            console.log('Error handling installation event:', e)
            return false
        }
    } else if(payload.action === 'deleted') {
        try {
            console.log('Received installation event:', payload)

            const user = await db.user.findUnique({
                where: { githubId: payload.sender.login },
            })

            if (!user) {
                throw new Error('User not found')
            }

            await db.repository.deleteMany({
                where: {
                    userId: user.id
                }
            })

            return true
        } catch (e: unknown) {
            console.log('Error handling installation delete event:', e)
            return false
        }
    }
}


