'use client';

import Repositories from '@/components/Repositories';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function Home() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
                <Link href="/sign-in">
                    <Button variant="outline">Sign In</Button>
                </Link>
            </div>
        );
    }

    return (
        <>
            <h1 className="text-3xl font-bold">{user?.username}</h1>
            <Link href="/temp">
                <Button>Hello World</Button>
            </Link>
            <div className="mt-4 p-2">Hello World 2</div>
            <Repositories />
        </>
    );
}
