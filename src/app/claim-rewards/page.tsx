'use client'

import { useState, useEffect } from 'react'

declare global {
    interface Window {
        ethereum?: any
    }
}

import { useUser } from '@clerk/nextjs'
import { Contract, ethers } from 'ethers'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BsDot } from 'react-icons/bs'
import BlurText from '@/components/BlurText'
import axios from 'axios'
import { FetchClaimableDetailsInterface, IRepository, IReward } from '@/lib/interfaces'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/ethers-config'

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
    const [repoOwner, setRepoOwner] = useState<{
        walletAddress: string | null
        name: string
        id: string
        createdAt: Date
        updatedAt: Date
        emailAddress: string
        githubId: string
    } | null>(null)
    const [reward, setReward] = useState<IReward | null>(null)
    const { isLoaded, isSignedIn, user } = useUser()
    const [repos, setRepos] = useState<FetchClaimableDetailsInterface[]>([])
    const [walletAddress, setWalletAddress] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [isClaiming, setIsClaiming] = useState(false)
    const [claimedRepo, setClaimedRepo] = useState<string | null>(null)
    const [status, setStatus] = useState<number>(0)
    const [claimedRepos, setClaimedRepos] = useState<{
        [key: string]: boolean
    }>({})
    const [githubUsername, setGithubUsername] = useState<string | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            if (!isLoaded || !isSignedIn || !user) return

            const githubAccount = user.externalAccounts?.find(
                (acc) => acc.provider === 'github'
            )
            const username = githubAccount
                ? githubAccount.username || user.username
                : user.username

            setGithubUsername(username)
        }

        fetchUser()
    }, [isLoaded, isSignedIn, user])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    '/api/dataBase/fetch-claimable-details'
                )
                const data = await response.data
                setStatus(response.status)

                console.log(response.status);
                console.log("Status: ", status);
                
                if (response.status === 200) {
                    console.log('Data:', data);
                    setRepos(data.rewards)
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

    async function handleClaimReward(repo: IRepository) {
        if (!walletAddress) {
            await connectWallet()
        } else {
            setIsClaiming(true)

            // call to change in database
            const response = await axios.post('/api/dataBase/claimReward', {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    rewardId: repo.id,
                },
            })
            if (response.status !== 200) {
                console.error('Failed to claim reward:', response.data)
                alert('Failed to claim reward')
                setIsClaiming(false)
                return
            }
            // if (response.status === 200 && response.data.owner) {
            setRepoOwner(
                response.data.owner as {
                    walletAddress: string | null
                    name: string
                    id: string
                    createdAt: Date
                    updatedAt: Date
                    emailAddress: string
                    githubId: string
                }
            )
            setReward(response.data.reward as IReward)
            // }

            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const userAddress = await signer.getAddress()
            await provider.send('eth_requestAccounts', [])
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                signer
            ) as Contract

            if (contract) {
                if (typeof contract.sendReward === 'function') {
                    const tx = await contract.sendReward(
                        repoOwner,
                        userAddress,
                        reward?.amountEth,
                        repo.name
                    )
                } else {
                    console.error(
                        'addAmount function is not defined on the contract'
                    )
                }
            }
        }
        setClaimedRepo(repo.name)
        setTimeout(() => {
            setIsClaiming(false)
            setClaimedRepos((prev) => ({ ...prev, [repo.name]: true }))
            setTimeout(() => {
                setClaimedRepo(null)
            }, 2000)
        }, 3000)
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
                <BlurText
                    text="Claim Rewards"
                    delay={100}
                    animateBy="words"
                    direction="top"
                    className="text-6xl mb-8"
                />
            </h1>

            {isClaiming && <LeetCodeCoinAnimation />}
            {claimedRepo && !isClaiming && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-xl text-white font-bold">
                        Reward claimed for{' '}
                        <span className="text-yellow-400">{claimedRepo}</span>
                    </p>
                </div>
            )}

            <div className="p-[2px] rounded-lg bg-[url('/image1.png')] bg-cover bg-center mb-6">
                <h1 className="text-2xl p-3 font-bold">My Repos</h1>
                <div className="w-full mx-auto border border-[#2a3441] rounded-lg overflow-hidden bg-black">
                    <div className="h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                        {loading || !githubUsername ? (
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
                                            href={`https://github.com/${githubUsername}/${repo.repository.name}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 font-semibold"
                                        >
                                            {repo.repository.name}
                                        </a>
                                        {/* <div className="text-sm text-gray-400">
                                            Branch: {repo.branch} • Commit: {repo.commit}
                                        </div> */}
                                    </div>
                                    <div className="text-sm text-white flex items-center">
                                        <button
                                            onClick={() =>
                                                handleClaimReward(repo.repository)
                                            }
                                            className={`px-4 py-2 font-semibold rounded-lg transition-all ${
                                                claimedRepos[repo.repository.name]
                                                    ? 'bg-transparent text-red-600 cursor-not-allowed'
                                                    : 'bg-green-500 hover:bg-green-600'
                                            }`}
                                            disabled={claimedRepos[repo.repository.name]}
                                        >
                                            {claimedRepos[repo.repository.name]
                                                ? 'Claimed'
                                                : 'Claim Reward'}
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
