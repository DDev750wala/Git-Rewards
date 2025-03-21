'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'

const UserProfile = () => {
    const { isLoaded, isSignedIn, user } = useUser()

    if (!isLoaded) return <div>Loading...</div>
    if (!isSignedIn) return <div>Please sign in</div>

    return <div>Username: {user.username}</div>
}

export default UserProfile