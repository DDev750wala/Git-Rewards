import { db } from "@/server/db"
import { NextResponse } from "next/server"
import { currentUser } from '@clerk/nextjs/server'

export const GET = async () => {
    const user = await currentUser();
    
    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }  

    const userFromDb = await db.user.findUnique({
        where: { githubId: user.username as string }
    });

    if (!userFromDb) {
        return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }

    console.log("User from DB:", userFromDb);

    try {
        const repositories = await db.repository.findMany({
            where: { userId: userFromDb.id }
        });

        console.log('User repositories:', repositories);

        if (repositories.length === 0) {
            console.log('App not installed');
            return NextResponse.json({ message: "App not installed" }, { status: 400 });
        }

        return NextResponse.json({ repositories }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching repositories:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};