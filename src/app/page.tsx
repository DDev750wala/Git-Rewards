"use client";
import Stepper from "@/components/Stepper";
import React, { useState, useEffect } from "react";
import Marquee from "@/components/Sliding";
import Link from "next/link";


const words = ["Git Rewards", "Earn Tokens", "Redeem & Save"];

const Landing = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[index];
    const typingSpeed = isDeleting ? 50 : 100;
    const delay = isDeleting && charIndex === 0 ? 1000 : typingSpeed;

    const timeout = setTimeout(() => {
      if (currentWord) {
        setText(currentWord.substring(0, charIndex));
      }

      if (currentWord && !isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }

      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  return (
    <div className="flex flex-col items-center justify-center text-white space-y-6">
    
   <h1 className="text-9xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 font-extrabold uppercase drop-shadow-lg mt-20">
  <span className="titlefont">ContriFlow</span>
</h1>
      <h1 className="text-2xl">Rewarding <span className=" text-purple-400">open source </span>contributions one commit at a time </h1>
      <h1 className="text-4xl md:text-5xl">
        {text}
        <span className="animate-blink">|</span>
      </h1>
      

     
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <Link href="/sign-up" className="px-6 py-3 bg-white text-black rounded-lg font-semibold shadow-md hover:bg-white transition">
          Get Started 
        </Link>
        <Link href="/learnmore" className="px-6 py-3 bg-[#666566] text-black rounded-lg font-semibold shadow-md hover:bg-white transition">
          Learn More
        </Link>
        <Link href="/contactus" className="px-6 py-3 bg-[#666566] text-black rounded-lg font-semibold shadow-md hover:bg-white transition">
          Contact Us
        </Link>
      </div>
      <Stepper children={["Connect GitHub",
    "Contribute to Open Source",
    "Earn Tokens",
    "Redeem Rewards"]} />
    
    <Marquee/>
    </div>
  );
};

export default Landing;



