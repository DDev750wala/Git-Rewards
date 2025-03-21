"use client";

import { useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { ChevronDown, Menu, Sun, Moon } from "lucide-react";
import { ethers } from "ethers";
import Link from "next/link";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { isSignedIn } = useUser(); 
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    setDarkMode(theme === "dark");
    if (theme === "dark") document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      alert("Failed to connect wallet");
    }
  };

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-lg backdrop-filter text-white px-6 py-4 flex items-center justify-between relative border-b border-gray-800">
  
      <div className="flex items-center space-x-4">
        <span className="text-xl font-bold">Git Rewards</span>

      
        <div className="hidden md:flex space-x-6">
          {["Leaderboard", "Challenges", "Rewards"].map((item) => (
            <div key={item} className="relative">
              <button
                className="px-4 py-2 rounded-full transition duration-200 text-white hover:bg-white/10"
                onClick={() => toggleDropdown(item)}
              >
                {item}
                <ChevronDown size={16} className="inline ml-1" />
              </button>

            
              {openDropdown === item && (
                <div className="absolute left-0 mt-2 w-48 bg-gray-900/80 backdrop-blur-md text-sm rounded shadow-lg transition-all duration-300 animate-fadeIn">
                  {item === "Leaderboard"
                    ? [
                        { rank: "🥇", name: "Alice" },
                        { rank: "🥈", name: "Bob" },
                        { rank: "🥉", name: "Charlie" },
                      ].map((user, index) => (
                        <div key={index} className="flex items-center px-4 py-2 hover:bg-gray-700">
                          <span className="mr-2">{user.rank}</span>
                          {user.name}
                        </div>
                      ))
                    : ["Option 1", "Option 2"].map((option, index) => (
                        <a key={index} href="#" className="block px-4 py-2 hover:bg-gray-700">
                          {option}
                        </a>
                        
                      ))}
                      
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      
      <div className="flex items-center space-x-4">
      
      
      <Link href="/" className="px-4 py-2 rounded-full transition duration-200 text-white hover:bg-white/10">
          Home
        </Link>

        <Link href="/claim-rewards" className="px-4 py-2 rounded-full transition duration-200 text-white hover:bg-white/10">
          Claim Reward
        </Link>

      <Link href="/landing" className="px-4 py-2 rounded-full transition duration-200 text-white hover:bg-white/10">
          Landing
        </Link>

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <>
            <a href="/sign-in" className="px-4 py-2 rounded-full transition duration-200 text-white hover:bg-white/10">
              Sign-in
            </a>
            <a href="/sign-up" className="px-4 py-2 rounded-full transition duration-200 text-white hover:bg-white/10">
              Sign-up
            </a>
          </>
        )}

      
        {isSignedIn && (
          <button onClick={connectWallet} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
            {walletAddress ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4) : "Connect Wallet"}
          </button>
        )}

       
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={24} />
        </button>
      </div>

   
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/60 backdrop-blur-lg text-white flex flex-col space-y-2 py-4 px-6">
          {["Leaderboard", "Challenges", "Rewards", "Enterprise", "My Rewards"].map((link) => (
            <a key={link} href="#" className="px-4 py-2 rounded-full transition duration-200 text-white hover:bg-white/10">
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;