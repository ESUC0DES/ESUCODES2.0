'use client'

import Link from 'next/link'
import { Github, Linkedin, Twitter, Bot } from 'lucide-react'
import { motion } from 'framer-motion'

export default function RoboticsFooter() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ]

  return (
    <footer className="border-t border-orange-500/20 bg-slate-950 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Slogan */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Bot className="w-5 h-5 text-orange-500" />
              <h3 className="text-xl font-mono font-bold text-orange-500">
                THE HANGAR
              </h3>
            </div>
            <p className="text-slate-400 font-mono text-sm">
              // ROBOTICS DIVISION
            </p>
            <p className="text-slate-500 font-mono text-xs mt-2">
              ESUCODES Robotics
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-orange-500 font-mono font-semibold mb-4 uppercase tracking-wider text-sm">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-slate-400 hover:text-orange-500 transition-colors font-mono text-sm"
                >
                  {'>'} Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-slate-400 hover:text-orange-500 transition-colors font-mono text-sm"
                >
                  {'>'} Ekip
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-orange-500 transition-colors font-mono text-sm"
                >
                  {'>'} Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-orange-500 transition-colors font-mono text-sm"
                >
                  {'>'} İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-orange-500 font-mono font-semibold mb-4 uppercase tracking-wider text-sm">
              Connect
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-orange-500 transition-colors"
                    aria-label={social.label}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-orange-500/20 text-center">
          <p className="text-slate-500 font-mono text-xs">
            © 2025 ESUCODES ROBOTICS DIVISION
          </p>
          <p className="text-slate-600 font-mono text-xs mt-2">
            // SYSTEM STATUS: OPERATIONAL
          </p>
        </div>
      </div>
    </footer>
  )
}


