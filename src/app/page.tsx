
import { Button } from '@/components/ui/button'
import { auth, currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function Home() {
    const { userId } = await auth()
    const user = await currentUser()

    return (
        <>
            <h1 className='text-3xl font-bold underline'>{user?.fullName}</h1>
            <h1></h1>
            <Link href={'/temp'}>
                <Button>Follow</Button>
            </Link>
        </>
    )
}
