// api/clerk/webhook

import { db } from "@/server/db"
import { SignUpWebhookClerk } from "@/lib/interfaces"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const req1 = await req.json();
    const data: SignUpWebhookClerk = req1;
    console.log("webhook data", data);

    const emailAddress = data.data.email_addresses[0]?.email_address! as string;
    const firstname = data.data.first_name;
    const lastname = data.data.last_name;
    const githubId = data.data.external_accounts[0]?.username;

    const id = data.data.id;

    const existingUser = await db.user.findUnique({
        where: { emailAddress }
    });

    if (!existingUser) {
        await db.user.create({
            data: {
                id: id,
                name: `${firstname} ${lastname}`,
                emailAddress: emailAddress,
                githubId: githubId!
            }
        });
    }

    return NextResponse.redirect("https://github.com/apps/contriflow/installations/new");
};

