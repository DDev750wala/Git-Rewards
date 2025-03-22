"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InstallPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();

    useEffect(() => {
        console.log("isLoaded:", isLoaded);
        console.log("isSignedIn:", isSignedIn);
        console.log("user:", user);
    }, [isLoaded, isSignedIn, user]);

    if (!isLoaded) return <p>Loading...</p>;
    if (!isSignedIn) return <p>Please sign in first.</p>;

    return (
        <div >
            
            <button
                onClick={() => router.push("https://github.com/apps/contriflow/installations/new")}
                className="px-6 cursor-pointer py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
                Add/Remove Repo
            </button>
        </div>
    );
}