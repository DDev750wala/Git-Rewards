import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import {
    handleNewInstallation,
    handleIssueCommentEvent,
} from '@/lib/controllers'

const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
    const signature = req.headers.get('x-hub-signature-256') as string

    // Verify the signature
    const payload = await req.json() // Use `await req.json()` for App Router
    const hmac = crypto
        .createHmac('sha256', GITHUB_WEBHOOK_SECRET)
        .update(JSON.stringify(payload))
        .digest('hex')
    const expectedSignature = `sha256=${hmac}`

    console.log('Received signature:', signature)
    console.log('Expected signature:', expectedSignature)
    console.log('Payload:', payload)

    if (signature !== expectedSignature) {
        return NextResponse.json(
            { error: 'Invalid signature' },
            { status: 401 }
        )
    }

    const event = req.headers.get('x-github-event')

    switch (event) {
        case 'installation':
            const res = await handleNewInstallation(payload)
            if (res) {
                return NextResponse.json({ success: true })
            } else {
                return NextResponse.json(
                    { error: 'Error handling installation event' },
                    { status: 500 }
                )
            }
            break
        // case 'issues':
        //     await handleIssueEvent(payload);
        //     break;
        case 'issue_comment':
            let res1 = await handleIssueCommentEvent(payload)
            if (res1) {
                return NextResponse.json({ success: true })
            } else {
                return NextResponse.json(
                    { error: 'Error handling issue comment event' },
                    { status: 500 }
                )
            }
            break
        default:
            console.log(`Unhandled event: ${event}`)
    }

    return NextResponse.json({ success: true })
}

// async function handleIssueEvent(payload: any) {
//     console.log('Issue Event:', payload);
// }

// async function handlePullRequestEvent(payload: any) {
//     console.log('Pull Request Event:', payload);
// }

// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//     const payload = await req.json();

//     // Verify the signature if needed
//     const githubEvent = req.headers.get('X-GitHub-Event');

//     if (githubEvent === 'installation') {
//         console.log('Received installation event:', payload);
//         return NextResponse.json({ success: true });
//     }

//     return NextResponse.json({ error: 'Unhandled event' }, { status: 400 });
// }
