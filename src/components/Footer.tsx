"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/30 backdrop-blur-lg backdrop-filter text-white py-8 border-t border-gray-800">
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Contact Section */}
          <div className="bg-gradient-to-r from-[#161B22] to-[#0D1117] p-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
              
              <div className="w-40 h-40 flex items-center justify-center bg-transperent rounded-full shadow-lg">
              <img src="/github.png" alt="GitHub Logo" className="w-32 h-20" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">Contact Us</h3>
                <p className="text-gray-300 text-sm">Reach out for support, inquiries, or collaborations.</p>
              </div>
            </div>
          </div>

          {/* Email Marketing */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Email </h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="#" className="hover:text-purple-300 transition-colors">
                  krishpatel.co22d2@scet.ac.in
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="#" className="hover:text-purple-300 transition-colors">
                divijpatel.co22d2@scet.ac.in
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="#" className="hover:text-purple-300 transition-colors">
                mannpatel.co22d2@scet.ac.in
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="#" className="hover:text-purple-300 transition-colors">
                dev750.co22d2@scet.ac.in
                </Link>
              </motion.li>
              
              
            </ul>
          </div>

          {/* Our Story */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Techstack</h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="#" className="hover:text-purple-300 transition-colors">
                  Next.js
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="#" className="hover:text-purple-300 transition-colors">
                  Solidity
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="#" className="hover:text-purple-300 transition-colors">
                  Prisma Studio
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="#" className="hover:text-purple-300 transition-colors">
                  Github API's
                </Link>
              </motion.li>

            </ul>
          </div>

          {/* FAQs */}
          <div>
            <h3 className="text-lg font-semibold mb-4">FAQs</h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="#" className="hover:text-purple-300 transition-colors">
                  Campaigns
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link href="#" className="hover:text-purple-300 transition-colors">
                  Branding
                </Link>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-6 mb-4 md:mb-0">
            <motion.a
              href="#"
              whileHover={{ y: -3, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="text-white hover:text-purple-300"
            >
              <Facebook className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -3, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="text-white hover:text-purple-300"
            >
              <Twitter className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -3, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="text-white hover:text-purple-300"
            >
              <Instagram className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -3, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="text-white hover:text-purple-300"
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
          </div>
          <p className="text-sm text-gray-300">{currentYear} All right reserved. Contriflow.in</p>
        </div>
      </div>
    </footer>
  )
}
