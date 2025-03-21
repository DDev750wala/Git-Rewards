// api/clerk/webhook

import { db } from "@/server/db"
import { NextResponse } from "next/server"
import { currentUser } from '@clerk/nextjs/server'

export const GET = async () => {

    const user = await currentUser()

    if(!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 401 })
    }

    try {
        const userWithRepos = await db.user.findUnique({
            where: { id : user.id },
            include: { repositories: true }
        });
    
        console.log('User with repos:', userWithRepos);
    
        if (!(userWithRepos && userWithRepos.repositories.length > 0)) {
            console.log('App not installed');
            return NextResponse.json({ message: "app not installed" }, { status: 400 })
        } 
    
        return NextResponse.json({repositories: userWithRepos.repositories}, { status: 200 });
    } catch (error: any) {
        console.log("Error fetching repositories:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
    
};

