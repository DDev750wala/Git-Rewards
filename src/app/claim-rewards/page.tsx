'use client'

import { useState, useEffect } from 'react'

declare global {
    interface Window {
        ethereum?: any
    }
}

import { useUser } from '@clerk/nextjs'
import { ethers } from 'ethers'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BsDot } from 'react-icons/bs'
import BlurText from '@/components/BlurText'

interface Repo {
    id: number
    name: string
    html_url: string
    stargazers_count: number
    branch: string
    commit: string
    timestamp: string
}

function LeetCodeCoinAnimation() {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            {/* Glowing outer ring */}
            <div className="relative w-32 h-32">
                <div className="absolute inset-0 animate-ping bg-yellow-400 rounded-full opacity-30"></div>

                {/* Coin with 3D effect */}
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="w-full h-full border-4 border-yellow-400 rounded-full animate-bounce flex items-center justify-center bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg">
                        <img
                            src="/goldcoin.png"
                            alt="Gold Coin"
                            className="w-20 h-20 object-contain"
                        />
                    </div>
                </div>
            </div>
            <p className="mt-4 text-xl font-bold text-yellow-400 animate-fade-in">Reward Processing...</p>
        </div>
    )
}

export default function Claim() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [repos, setRepos] = useState<Repo[]>([])
    const [walletAddress, setWalletAddress] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [isClaiming, setIsClaiming] = useState(false)
    const [claimedRepo, setClaimedRepo] = useState<string | null>(null)
    const [claimedRepos, setClaimedRepos] = useState<{ [key: string]: boolean }>({})
    const [githubUsername, setGithubUsername] = useState<string | null>(null)
    const [claimableAmounts, setClaimableAmounts] = useState<{ [key: string]: number }>({
        "repo1": 0.5,
        "repo2": 1.2,
        "repo3": 0.8,
    })

    useEffect(() => {
        const fetchUser = async () => {
            if (!isLoaded || !isSignedIn || !user) return

            const githubAccount = user.externalAccounts?.find(acc => acc.provider === 'github')
            const username = githubAccount ? githubAccount.username || user.username : user.username
            
            setGithubUsername(username)
        }

        fetchUser()
    }, [isLoaded, isSignedIn, user])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/check-repos')
                const data = await response.json()

                if (Array.isArray(data)) {
                    setRepos(data)
                } else if ('repositories' in data && Array.isArray(data.repositories)) {
                    setRepos(data.repositories)
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

        if (githubUsername) {
            fetchData()
        }
    }, [githubUsername])

    async function connectWallet() {
        if (!window.ethereum) {
            alert('MetaMask is not installed!')
            return
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const accounts = await provider.send('eth_requestAccounts', [])
            setWalletAddress(accounts[0])
            alert(`Wallet Connected: ${accounts[0]}`)
        } catch (error) {
            console.error('Error connecting to MetaMask:', error)
            alert('Failed to connect wallet')
        }
    }

    async function handleClaimReward(repoName: string) {
        if (!walletAddress) {
            await connectWallet()
        } else {
            setIsClaiming(true)
            setClaimedRepo(repoName)
            setTimeout(() => {
                setIsClaiming(false)
                setClaimedRepos(prev => ({ ...prev, [repoName]: true }))
                setTimeout(() => {
                    setClaimedRepo(null)
                }, 2000)
            }, 3000)
        }
    }

    if (!isLoaded) return   <Skeleton 
                                baseColor="#1A1A1A" 
                                highlightColor="#333" 
                                count={5} 
                                height={60} 
                                className="rounded-lg my-2 animate-pulse"
                            />

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
                <BlurText text="Claim Rewards" delay={100} animateBy="words" direction="top" className="text-6xl mb-8" />
            </h1>

            {isClaiming && <LeetCodeCoinAnimation />}
            {claimedRepo && !isClaiming && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-xl text-white font-bold">
                        Reward claimed for <span className="text-yellow-400">{claimedRepo}</span>
                    </p>
                </div>
            )}

            <div className="p-[2px] rounded-lg bg-[url('/image1.png')] bg-cover bg-center mb-6">
                <h1 className="text-2xl p-3 font-bold">My Repos</h1>
                <div className="w-full mx-auto border border-[#2a3441] rounded-lg overflow-hidden bg-black">
                    <div className="w-fullmax-h-[80vh]  scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 mx-auto border border-[#2a3441] rounded-lg overflow-hidden bg-black overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                        {loading || !githubUsername ? (
                                                    
                                                        <Skeleton 
                                                        baseColor="#1A1A1A" 
                                                        highlightColor="#333" 
                                                        count={5} 
                                                        height={60} 
                                                        className="rounded-lg my-2 animate-pulse"
                                                    />
                        ) : (
                            repos.map(repo => (
                                <div key={repo.id} className="flex items-center p-2 border-b border-gray-800 hover:bg-gray-800">
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
                                        <div className="text-sm text-gray-400">
                                            Branch: {repo.branch} • Commit: {repo.commit}
                                        </div>
                                    </div>
                                    <div className="text-sm text-white flex items-center">
                                    <span className="mr-4 text-green-400 font-bold">
                                         {claimableAmounts[repo.name] !== undefined ? claimableAmounts[repo.name] : "Loading..."} ETH
                                    </span>
                                        <button
                                            onClick={() => handleClaimReward(repo.name)}
                                            className={`px-4 py-2 font-semibold rounded-lg transition-all ${
                                                claimedRepos[repo.name]
                                                    ? 'bg-transparent text-red-600 cursor-pointer'
                                                    : 'bg-green-500 hover:bg-green-600 cursor-pointer'
                                            }`}
                                            disabled={claimedRepos[repo.name]}
                                        >
                                            {claimedRepos[repo.name] ? 'Claimed' : 'Claim Reward'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}