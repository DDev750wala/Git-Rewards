'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { ethers } from 'ethers'
import Cookies from 'js-cookie'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BsDot } from 'react-icons/bs'
import StarBorder from '@/components/starborder'
import BlurText from '@/components/BlurText'
import axios from 'axios'
import { Repository } from '@prisma/client'
import Link from 'next/link'
<<<<<<< HEAD

=======
>>>>>>> 57481282c5eccba540088df83075c61e3980424a
declare global {
    interface Window {
        ethereum?: any
    }
}

declare global {
    interface Window {
        ethereum?: any
    }
}

export default function Dashboard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [repos, setRepos] = useState<Repository[]>([])
    const [walletAddress, setWalletAddress] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [showPopup, setShowPopup] = useState(false)
    const [rewardInput, setRewardInput] = useState('')
    const [selectedRepo, setSelectedRepo] = useState<string | null>(null)
    const [connectingWallet, setConnectingWallet] = useState(false)
    const [message, setMessage] = useState('')
    const [statusCode, setStatusCode] = useState(0)
<<<<<<< HEAD
=======
    const [githubUsername, setGithubUsername] = useState<string | null>(null)
>>>>>>> 57481282c5eccba540088df83075c61e3980424a
    const [remainingRewards, setRemainingRewards] = useState<{
        [key: string]: number
    }>({})

    useEffect(() => {
<<<<<<< HEAD
        const fetchData = async () => {
            async function getData() {
                const response = await axios.get('/api/check-repos')
                const data = (await response.data) as
                    | Repository[]
                    | { message: string }
                console.log(data)
                setStatusCode(response.status)
                return data
            }
            const data = await getData()

            const storedAddress = Cookies.get('walletAddress')
            if (storedAddress) setWalletAddress(storedAddress)

            if ('message' in data) {
                console.log(data.message)
                setMessage(data.message)
                setLoading(false)
                return
            } else {
                setMessage('')
                setRepos(data as Repository[])
            }

            setLoading(false)
=======
        const fetchUser = async () => {
            if (!isLoaded || !isSignedIn || !user) return

            // Extract GitHub username from external accounts
            const githubAccount = user.externalAccounts?.find(
                (acc) => acc.provider === 'github'
            )

            if (githubAccount) {
                setGithubUsername(githubAccount.username || user.username)
            } else {
                setGithubUsername(user.username)
            }
>>>>>>> 57481282c5eccba540088df83075c61e3980424a
        }

        const fetchData = async () => {
            try {
                const response = await axios.get('/api/check-repos')
                const data = response.data
                console.log(data)
                setStatusCode(response.status)

                if ('message' in data) {
                    console.log(data.message)
                    setMessage(data.message)
                    setRepos([])
                } else if (Array.isArray(data)) {
                    setMessage('')
                    setRepos(data)
                    setRemainingRewards(data.reduce((acc, repo) => {
                        acc[repo.name] = 0; // Initialize remaining rewards to 0
                        return acc;
                    }, {}));
                } else if ('repositories' in data && Array.isArray(data.repositories)) {
                    setMessage('')
                    setRepos(data.repositories)
                    setRemainingRewards(data.repositories.reduce((acc : any, repo : any) => {
                        acc[repo.name] = 0; // Initialize remaining rewards to 0
                        return acc;
                    }, {}));
                } else {
                    console.error('Unexpected data format:', data)
                    setRepos([])
                }
            } catch (error) {
                console.error('Error fetching data:', error)
                setRepos([])
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
        fetchData()
    }, [isLoaded, isSignedIn, user])

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert('MetaMask is not installed!')
            return null
        }
        if (connectingWallet) return null

        try {
            setConnectingWallet(true)
            const provider = new ethers.BrowserProvider(window.ethereum)
            const accounts = await provider.send('eth_requestAccounts', [])
            const address = accounts[0]
            setWalletAddress(address)
            Cookies.set('walletAddress', address, { expires: 1 })

            if (user?.id) {
                await fetch('/api/save-wallet', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        walletAddress: address,
<<<<<<< HEAD
                        githubId: user?.username,
=======
                        githubId: githubUsername,
>>>>>>> 57481282c5eccba540088df83075c61e3980424a
                    }),
                })
            }
            return address
        } catch (error) {
            console.error('Error connecting wallet:', error)
            alert('Failed to connect wallet')
            return null
        } finally {
            setConnectingWallet(false)
        }
    }

    const handleSetReward = async (repoName: string) => {
        let address = walletAddress
        if (!walletAddress) {
            address = await connectWallet()
        }
        if (!address) return

        setSelectedRepo(repoName)
        setShowPopup(true)
    }

    const handleConfirmReward = () => {
        if (!rewardInput || isNaN(Number(rewardInput))) {
            alert('Please enter a valid reward amount!')
            return
        }
        if (selectedRepo && remainingRewards[selectedRepo] !== undefined) {
            setRemainingRewards((prev) => ({
                ...prev,
<<<<<<< HEAD
                [selectedRepo]: Math.max(
                    0,
                    prev[selectedRepo]! - Number(rewardInput)
                ), // Deduct from remaining funds
=======
                [selectedRepo]: Math.max(0, prev[selectedRepo]! - Number(rewardInput)),
>>>>>>> 57481282c5eccba540088df83075c61e3980424a
            }))
        }
        alert(`Reward of ${rewardInput} ETH set for ${selectedRepo}`)
        setShowPopup(false)
        setRewardInput('')
    }

    if (!isLoaded) return <Skeleton count={10} className="bg-black" />

    if (!isSignedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
                {/* redirect to sign-up */}
            </div>
        )
    }

    if (statusCode === 401) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">User not found</h1>
<<<<<<< HEAD
                {/* redirect to sign-up */}
            </div>
        )
    }

    if (statusCode === 500) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">
                    Internal Server Error
                </h1>
            </div>
        )
    }

    if (statusCode === 400) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">App not installed</h1>
                <h2 className="text-xl font-bold mb-4">
                    <Link
                        href={
                            'https://github.com/apps/contriflow/installations/new'
                        }
                    >Start by installing our github app</Link>
                </h2>
            </div>
        )
    }

    if (statusCode === 200 && repos.length !== 0) {
        return (
            <div className="bg-[#0D1117] text-white p-6 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">
                    <BlurText
                        text="Dashboard"
                        delay={100}
                        animateBy="words"
                        direction="top"
                        className="text-6xl mb-8"
                        animationFrom="opacity-0"
                        animationTo="opacity-100"
                        onAnimationComplete={() =>
                            console.log('Animation completed')
                        }
                    />
                </h1>

                <button
                    onClick={connectWallet}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Connect Wallet
                </button>
                {walletAddress && (
                    <p className="text-green-400 p-2 ">
                        Connected Wallet: {walletAddress}
                    </p>
                )}

                <div className="p-[2px] rounded-lg bg-[url('/image1.png')] bg-cover bg-center mb-6">
                    <h1 className="text-2xl p-3 text-bold-500">My Repos</h1>
                    <div className="w-full h-[20rem] mx-auto border border-[#2a3441] rounded-lg overflow-hidden bg-black">
                        <div className="h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                            {loading ? (
                                <Skeleton count={5} height={50} />
                            ) : (
                                repos.map((repo) => (
                                    <div
                                        key={repo.id}
                                        className="flex items-center p-2 border-b border-gray-800 hover:bg-gray-800"
                                    >
                                        <BsDot className="text-green-500 text-2xl" />
                                        <div className="flex-grow">
                                            <a
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 font-semibold"
                                            >
                                                {repo.name}
                                            </a>
                                            <div className="text-sm text-gray-400">
                                                Branch: {repo.branch} • Commit:{' '}
                                                {repo.commit}
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-400 flex items-center">
                                            <span className="mr-2 text-yellow-400">
                                                {remainingRewards[repo.name] ||
                                                    0}{' '}
                                                ETH
                                            </span>
                                            <StarBorder
                                                as="button"
                                                className="custom-class"
                                                color="cyan"
                                                speed="3s"
                                                onClick={() =>
                                                    handleSetReward(repo.name)
                                                }
                                            >
                                                Set Reward
                                            </StarBorder>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
                        <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-xl w-[90%] max-w-md border border-gray-700 transform scale-100 transition-transform duration-300">
                            <h2 className="text-white text-lg font-semibold mb-4 text-center">
                                Set Reward for{' '}
                                <span className="text-blue-400">
                                    {selectedRepo}
                                </span>
                            </h2>
                            <input
                                type="number"
                                placeholder="Enter reward amount"
                                className="w-full p-3 rounded-lg border border-gray-600 bg-[#0D1117] text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={rewardInput}
                                onChange={(e) => setRewardInput(e.target.value)}
                            />
                            <div className="flex justify-end mt-6 gap-3">
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmReward}
                                    className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
=======
            </div>
        )
    }

    if (statusCode === 500) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Internal Server Error</h1>
            </div>
        )
    }

    if (statusCode === 400) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">App not installed</h1>
                <h2 className="text-xl font-bold mb-4">
                    <Link href={'https://github.com/apps/contriflow/installations/new'}>
                        Start by installing our GitHub app
                    </Link>
                </h2>
            </div>
        )
    }

    return (
        <div className="bg-[#0D1117] text-white p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">
                <BlurText 
                    text="Dashboard" 
                    delay={100} 
                    animateBy="words" 
                    direction="top" 
                    className="text-6xl mb-8" 
                    animationFrom="opacity-0" 
                    animationTo="opacity-100" 
                    onAnimationComplete={() => console.log('Animation completed')} 
                />
            </h1>

            <button onClick={connectWallet} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Connect Wallet
            </button>
            {walletAddress && <p className="text-green-400 p-2">Connected Wallet: {walletAddress}</p>}

            <div className="p-[2px] rounded-lg bg-[url('/image1.png')] bg-cover bg-center mb-6">
                <h1 className="text-2xl p-3 font-bold">My Repos</h1>
                <div className="w-full h-[20rem] mx-auto border border-[#2a3441] rounded-lg overflow-hidden bg-black">
                    <div className="h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                        {loading ? (
                            <Skeleton count={5} height={50} />
                        ) : (
                            repos.map((repo) => (
                                <div key={repo.id} className="flex items-center justify-between p-4 border-b border-gray-800 hover:bg-gray-800">
                                    <div className="flex items-center">
                                        <BsDot className="text-green-500 text-2xl" />
                                        <div className="flex-grow">
                                            <a
                                                href={`https://github.com/${githubUsername}/${repo.name}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 font-semibold"
                                            >
                                                {repo.name}
                                            </a>
                                            <p className="text-sm text-gray-400">
                                                Remaining Funds: {remainingRewards[repo.name]?.toFixed(2)} ETH
                                            </p>
                                        </div>
                                    </div>
                                    <StarBorder
                                        as="button"
                                        className="custom-class"
                                        color="cyan"
                                        speed="3s"
                                        onClick={() =>
                                            handleSetReward(repo.name)
                                        }
                                    >
                                        Set Reward
                                    </StarBorder>
                                </div>
                            ))
                            
                        )}
                    </div>
                </div>
            </div>
            {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
                        <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-xl w-[90%] max-w-md border border-gray-700 transform scale-100 transition-transform duration-300">
                            <h2 className="text-white text-lg font-semibold mb-4 text-center">
                                Set Reward for{' '}
                                <span className="text-blue-400">
                                    {selectedRepo}
                                </span>
                            </h2>
                            <input
                                type="number"
                                placeholder="Enter reward amount"
                                className="w-full p-3 rounded-lg border border-gray-600 bg-[#0D1117] text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={rewardInput}
                                onChange={(e) => setRewardInput(e.target.value)}
                            />
                            <div className="flex justify-end mt-6 gap-3">
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmReward}
                                    className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        
    )
}
>>>>>>> 57481282c5eccba540088df83075c61e3980424a
