'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const tweets = [
        {
          user: 'Alice',
          handle: '@AliceCodes',
          text: "Just earned my first GitHub Reward for contributing to an open-source project! This is such a cool initiative. 🎉🚀 #OpenSource #Rewards",
          img: '/images/alice.jpg',
          link: 'https://x.com/AliceCodes/status/192837465928374',
        },
        {
          user: 'Bob',
          handle: '@BobDev',
          text: "GitHub just made contributing even more exciting! Just got rewarded for fixing a critical bug. 🛠️💰 #Hacktoberfest #DevLife",
          img: '/images/bob.jpg',
          link: 'https://x.com/BobDev/status/198273465928374',
        },
        {
          user: 'Charlie',
          handle: '@CharlieTech',
          text: "Massive shoutout to the GitHub Reward System! My PR got merged, and I received some exclusive perks. Love this! 🔥🤩 #GitHub #Rewards",
          img: '/images/charlie.jpg',
          link: 'https://x.com/CharlieTech/status/196472839283749',
        },
        {
          user: 'Dana',
          handle: '@DanaBuilds',
          text: "Contributed to an open-source project, and guess what? I got rewarded with free GitHub Pro access! 🔥🙌 #OpenSourceRocks",
          img: '/images/dana.jpg',
          link: 'https://x.com/DanaBuilds/status/199283746529837',
        },
        {
          user: 'Ethan',
          handle: '@EthanJS',
          text: "GitHub's new reward system is a game-changer! Just unlocked a discount on my favorite dev tools. 🛠️🎁 #DevRewards",
          img: '/images/ethan.jpg',
          link: 'https://x.com/EthanJS/status/1983746589273',
        },
        {
          user: 'Fiona',
          handle: '@FionaOpenSource',
          text: "Earned my first GitHub NFT badge for consistent contributions! This is a huge motivation boost. 🚀💎 #Web3 #GitHubRewards",
          img: '/images/fiona.jpg',
          link: 'https://x.com/FionaOpenSource/status/194872364982374',
        },
        {
          user: 'George',
          handle: '@GeorgeAI',
          text: "The GitHub Reward System is amazing! Got recognized for my AI contributions and received a surprise swag box! 🎁🤖 #AI #GitHubSwag",
          img: '/images/george.jpg',
          link: 'https://x.com/GeorgeAI/status/192837465927364',
        },
        {
          user: 'Hannah',
          handle: '@HannahSecurity',
          text: "Security bug bounty rewards are here! Just got paid for reporting a vulnerability. 🛡️💰 #BugBounty #GitHubSecurity",
          img: '/images/hannah.jpg',
          link: 'https://x.com/HannahSecurity/status/19837465928374',
        },
];

// Duplicate tweets for looping
const loopTweets = [...tweets, ...tweets];

export default function Marquee() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full bg-black py-6 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Masking Wrapper */}
      <div className="overflow-hidden w-full">
        <div
          className="flex gap-8 transition-transform duration-200 will-change-transform"
          style={{
            animation: isHovered ? 'none' : 'marquee 15s linear infinite'
          }}
        >
          {loopTweets.map((tweet, index) => (
            <a 
              key={index} 
              href={tweet.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center bg-black text-white p-6 rounded-xl shadow-lg w-80 min-w-[20rem] border-2 border-gray-700
                transform transition-transform duration-300 overflow-visible will-change-transform
                ${isHovered ? 'rotate-0' : index % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[3deg]'}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Image src={tweet.img} alt={tweet.user} width={50} height={50} className="rounded-full mr-4" />
              <div className="overflow-visible">
                <p className="font-bold text-lg">{tweet.user}</p>
                <p className="text-sm text-gray-400">{tweet.handle}</p>
                <p className="text-base mt-2">{tweet.text}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

    
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}