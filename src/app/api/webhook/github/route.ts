import { NextApiRequest, NextApiResponse } from 'next';
// import crypto from 'crypto';

// const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET!;

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//     const signature = req.headers['x-hub-signature-256'] as string;

//     // Verify the signature
//     const payload = JSON.stringify(req.body);
//     const hmac = crypto.createHmac('sha256', GITHUB_WEBHOOK_SECRET).update(payload).digest('hex');
//     const expectedSignature = `sha256=${hmac}`;

//     console.log('Received signature:', signature);
//     console.log('Expected signature:', expectedSignature);
//     console.log('Payload:', payload);
    

//     if (signature !== expectedSignature) {
//         return res.status(401).json({ error: 'Invalid signature' });
//     }

//     const event = req.headers['x-github-event'];
    
//     switch (event) {
//         case 'issues':
//             await handleIssueEvent(req.body);
//             break;
//         case 'pull_request':
//             await handlePullRequestEvent(req.body);
//             break;
//         case 'issue_comment':
//             await handleIssueCommentEvent(req.body);
//             break;
//         default:
//             console.log(`Unhandled event: ${event}`);
//     }

//     res.status(200).json({ success: true });
// }

// // Example Handlers
// async function handleIssueEvent(payload: any) {
//     console.log('Issue Event:', payload);
// }

// async function handlePullRequestEvent(payload: any) {
//     console.log('Pull Request Event:', payload);
// }

// async function handleIssueCommentEvent(payload: any) {
//     console.log('Issue Comment Event:', payload);
// }


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        console.error(`Invalid method: ${req.method}`);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    console.log('Webhook received:', req.body);
    res.status(200).json({ success: true });
}
