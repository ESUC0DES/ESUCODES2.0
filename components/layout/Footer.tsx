'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const [isMars, setIsMars] = useState(false)

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ]

  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Slogan */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-accent-primary to-accent-tertiary bg-clip-text text-transparent mb-2">
              ESUCODES
            </h3>
            <p className="text-text-secondary text-sm">
              Explore Software Universe
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Linkler</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-text-secondary hover:text-accent-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-text-secondary hover:text-accent-primary transition-colors">
                  Ekip
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-secondary hover:text-accent-primary transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-accent-primary transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">Sosyal Medya</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-accent-primary transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-text-muted text-sm">
            © 2025 ESUCODES.{' '}
            <span
              onMouseEnter={() => setIsMars(true)}
              onMouseLeave={() => setIsMars(false)}
              className="inline-block cursor-pointer"
            >
              Made on{' '}
              <span className={isMars ? 'glitch-effect' : ''}>
                {isMars ? 'Mars' : 'Earth'}
              </span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

