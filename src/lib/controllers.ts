import { db } from '@/server/db'
import { GithubInstallationApp, IssueComment } from './interfaces'

export async function handleNewInstallation(payload: GithubInstallationApp) {
    if (payload.action === 'created') {
        try {
            console.log('sender.login', payload.sender.login.toLowerCase())

            const user = await db.user.findUnique({
                where: { githubId: payload.sender.login.toLowerCase() },
            })

            console.log('This is the user  from database: ', user)

            if (!user) {
                throw new Error('User not found')
            }

            let repositories = payload.repositories.map((repo) => {
                return {
                    name: repo.name,
                    githubRepoId: repo.id.toString(),
                    userId: user.id,
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
    } else if (payload.action === 'deleted') {
        try {
            console.log(
                'sender.login during deleting',
                payload.sender.login.toLowerCase()
            )

            const user = await db.user.findUnique({
                where: { githubId: payload.sender.login.toLowerCase() },
            })
            console.log('This is the user  from database: ', user)
            if (!user) {
                throw new Error('User not found')
            }

            await db.repository.deleteMany({
                where: {
                    userId: user.id,
                },
            })

            return true
        } catch (e: unknown) {
            console.log('Error handling installation delete event:', e)
            return false
        }
    }
}

export async function handleIssueCommentEvent(payload: IssueComment) {
    try {
        console.log('Issue Comment Event:', payload)

        const user = await db.user.findUnique({
            where: { githubId: payload.sender.login.toLowerCase() },
        })

        if (!user) {
            throw new Error('User not found')
        }

        const repository = await db.repository.findUnique({
            where: { githubRepoId: payload.repository.id.toString() },
        })
        if (!repository) {
            throw new Error('Repository not found')
        }

        const comment = payload.comment.body
        const regex = /@(\w+).*?(\d+\.?\d*)\s*ETH/i;
        const matches = comment.match(regex);

        if (matches) {
            const username = matches[1]
            const amountEth = parseFloat(matches[2] as string)
            console.log('Matches:', matches)
            console.log('Username:', username)
            console.log('Amount:', amountEth)

            if (!username) {
                throw new Error('Username not found in comment');
            }

            let contributor = await db.contributor.findUnique({
                where: { githubId: payload.comment.user.id.toString() },
            });

            // Create contributor if they don't exist
            if (!contributor) {
                contributor = await db.contributor.create({
                    data: {
                        githubId: payload.comment.user.id.toString(),
                        username: username.toLowerCase(), 
                    }
                });
            }

            await db.reward.create({
                data: {
                    contributorId: contributor.id,
                    repositoryId: repository.id,
                    prNumber: payload.issue.number,
                    amountUsd: 0, 
                    amountEth,
                },
            });

        } else {
            throw new Error('No valid reward format found in comment')
        }

    } catch (error: any) {
        console.log('Error handling issue comment event:', error)
        return false
    }
}
