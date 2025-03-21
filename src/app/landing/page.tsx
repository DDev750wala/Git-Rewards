'use client'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { ethers } from 'ethers'
import Cookies from 'js-cookie'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaRegClock } from 'react-icons/fa'
import { BsDot } from 'react-icons/bs'
import StarBorder from '@/components/starborder'
import BlurText from '@/components/BlurText'

declare global {
    interface Window {
        ethereum?: any
    }
}

interface Repo {
    id: number
    name: string
    html_url: string
    stargazers_count: number
    branch: string
    commit: string
    timestamp: string
}

export default function Dashboard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [repos, setRepos] = useState<Repo[]>([])
    const [walletAddress, setWalletAddress] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [showPopup, setShowPopup] = useState(false)
    const [rewardInput, setRewardInput] = useState('')
    const [selectedRepo, setSelectedRepo] = useState<string | null>(null)
    const [connectingWallet, setConnectingWallet] = useState(false) // Prevent multiple clicks
    const [remainingRewards, setRemainingRewards] = useState<{ [key: string]: number }>({})

    useEffect(() => {
        const storedAddress = Cookies.get('walletAddress')
        if (storedAddress) setWalletAddress(storedAddress)

        setTimeout(() => {
            const mockRepos = Array.from({ length: 15 }, (_, i) => ({
                id: i + 1,
                name: `repo${i + 1}`,
                html_url: `https://github.com/user/repo${i + 1}`,
                stargazers_count: Math.floor(Math.random() * 100),
                branch: 'main',
                commit: Math.random().toString(36).substring(2, 8),
                timestamp: `${Math.floor(Math.random() * 10) + 1}d ago`,
            }))
            setRepos(mockRepos)

            const mockRemainingRewards = mockRepos.reduce((acc, repo) => {
                acc[repo.name] = Math.floor(Math.random() * 10) + 1 // Assign random ETH values
                return acc
            }, {} as { [key: string]: number })

            setRemainingRewards(mockRemainingRewards)
            setLoading(false)
        }, 1000)
    }, [])

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert('MetaMask is not installed!')
            return null
        }
        if (connectingWallet) return null // Prevent multiple clicks

        try {
            setConnectingWallet(true)
            const provider = new ethers.BrowserProvider(window.ethereum)
            const accounts = await provider.send('eth_requestAccounts', [])
            const address = accounts[0]
            setWalletAddress(address)
            Cookies.set('walletAddress', address, { expires: 1 }) // Store in cookies

            if (user?.id) {
                await fetch('/api/save-wallet', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ walletAddress: address, githubId: user?.username })
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
                [selectedRepo]: Math.max(0, prev[selectedRepo] - Number(rewardInput)), // Deduct from remaining funds
            }))
        }
        alert(`Reward of ${rewardInput} ETH set for ${selectedRepo}`)
        setShowPopup(false)
        setRewardInput('')
    }

    if (!isLoaded) return <Skeleton count={10} />

    if (!isSignedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
            </div>
        )
    }

    return (
        <div className="bg-[#0D1117] text-white p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">
                <BlurText text="Dashboard" delay={100} animateBy="words" direction="top" className="text-6xl mb-8" />
            </h1>

            <button onClick={connectWallet} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Connect Wallet
            </button>
            {walletAddress && <p className="text-green-400 p-2 ">Connected Wallet: {walletAddress}</p>}

            <div className="p-[2px] rounded-lg bg-[url('/image1.png')] bg-cover bg-center mb-6">
                <h1 className="text-2xl p-3 text-bold-500">My Repos</h1>
                <div className="w-full h-[20rem] mx-auto border border-[#2a3441] rounded-lg overflow-hidden bg-black">
                    <div className="h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                        {loading ? (
                            <Skeleton count={5} height={50} />
                        ) : (
                            repos.map((repo) => (
                                <div key={repo.id} className="flex items-center p-2 border-b border-gray-800 hover:bg-gray-800">
                                    <BsDot className="text-green-500 text-2xl" />
                                    <div className="flex-grow">
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold">
                                            {repo.name}
                                        </a>
                                        <div className="text-sm text-gray-400">Branch: {repo.branch} • Commit: {repo.commit}</div>
                                    </div>
                                    <div className="text-sm text-gray-400 flex items-center">
                                        <span className="mr-2 text-yellow-400">{remainingRewards[repo.name] || 0} ETH</span>
                                        <StarBorder as="button" className="custom-class" color="cyan" speed="3s" onClick={() => handleSetReward(repo.name)}>
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
                            Set Reward for <span className="text-blue-400">{selectedRepo}</span>
                        </h2>
                        <input
                            type="number"
                            placeholder="Enter reward amount"
                            className="w-full p-3 rounded-lg border border-gray-600 bg-[#0D1117] text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            value={rewardInput}
                            onChange={(e) => setRewardInput(e.target.value)}
                        />
                        <div className="flex justify-end mt-6 gap-3">
                            <button onClick={() => setShowPopup(false)} className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all">
                                Cancel
                            </button>
                            <button onClick={handleConfirmReward} className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}