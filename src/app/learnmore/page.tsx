'use client'

import React from 'react'
import Link from 'next/link'
import { FaGithub, FaGift, FaStar, FaUsers, FaTrophy, FaCode } from 'react-icons/fa'

const LearnMore = () => {
  return (
    <div className="bg-[#0D1117] text-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">GitHub Reward Program</h1>
        
        <p className="text-lg text-gray-400 mb-8">
          The GitHub Reward Program is designed to encourage developers to contribute to open-source projects and get recognized for their efforts. Whether you're an experienced developer or just starting out, your contributions matter! Earn rewards for your work, collaborate with the community, and unlock exciting benefits.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 border border-gray-700 rounded-lg shadow-lg bg-black">
            <FaStar className="text-yellow-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Earn Stars</h3>
            <p className="text-gray-400">Get stars on your repositories to earn reward points. The more stars you receive, the closer you get to unlocking new perks.</p>
          </div>
          <div className="p-6 border border-gray-700 rounded-lg shadow-lg bg-black">
            <FaGift className="text-red-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Claim Rewards</h3>
            <p className="text-gray-400">Redeem points for exclusive GitHub perks, such as premium tools, GitHub swag, and even discounts on tech gear.</p>
          </div>
          <div className="p-6 border border-gray-700 rounded-lg shadow-lg bg-black">
            <FaGithub className="text-blue-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Contribute & Win</h3>
            <p className="text-gray-400">Make commits, pull requests, and fix issues to increase your score. The more you contribute, the higher you rank on the leaderboard!</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4">Why Join the Program?</h2>
        <p className="text-lg text-gray-400 mb-8">
          By participating in the GitHub Reward Program, you not only improve your coding skills but also get the opportunity to collaborate with top developers around the world. Whether it's fixing bugs, optimizing performance, or building new features, your contributions help make the open-source ecosystem better.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 border border-gray-700 rounded-lg shadow-lg bg-black">
            <FaUsers className="text-green-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Join the Community</h3>
            <p className="text-gray-400">Network with other developers, collaborate on projects, and be part of a thriving open-source ecosystem.</p>
          </div>
          <div className="p-6 border border-gray-700 rounded-lg shadow-lg bg-black">
            <FaTrophy className="text-yellow-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Compete & Get Recognized</h3>
            <p className="text-gray-400">Rank on leaderboards, win coding challenges, and showcase your skills to potential employers.</p>
          </div>
          <div className="p-6 border border-gray-700 rounded-lg shadow-lg bg-black">
            <FaCode className="text-purple-400 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Improve Your Skills</h3>
            <p className="text-gray-400">Contributing to real-world projects helps you learn best practices, write better code, and gain valuable experience.</p>
          </div>
        </div>

        <p className="text-lg text-gray-400 mb-8">
          Ready to get started? Sign up now, connect your GitHub account, and start contributing to earn rewards!
        </p>

        <Link href="/">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  )
}

export default LearnMore