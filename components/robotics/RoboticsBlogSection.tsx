'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, ArrowRight, Loader2 } from 'lucide-react'
import { getPosts, type WordPressPost } from '@/actions/wordpress-data'

export default function RoboticsBlogSection() {
    const [posts, setPosts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRoboticsPosts = async () => {
            try {
                setLoading(true)
                // "robot" anahtar kelimesi ile filtrele
                const { posts: wpPosts } = await getPosts({ per_page: 3, search: 'robot' })

                const transformed = wpPosts.map((post: WordPressPost) => {
                    const excerptText = post.excerpt.rendered
                        .replace(/<[^>]*>/g, '')
                        .trim()
                        .substring(0, 100)

                    return {
                        id: post.id,
                        slug: post.slug,
                        title: post.title.rendered,
                        excerpt: excerptText + (excerptText.length >= 100 ? '...' : ''),
                        date: post.date,
                        thumbnailUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url
                    }
                })

                if (transformed.length === 0) {
                    // Fallback to mock data for demonstration
                    setPosts([
                        {
                            id: 101,
                            slug: 'robot-vision-systems',
                            title: 'ADVANCED_ROBOT_VISION_SYSTEMS_V2',
                            excerpt: 'Implementing neural networks for real-time object detection in chaotic environments. Technical overview of the new vision matrix...',
                            date: new Date().toISOString(),
                            thumbnailUrl: 'https://images.unsplash.com/photo-1555255707-c07966488bc1?q=80&w=2000&auto=format&fit=crop'
                        },
                        {
                            id: 102,
                            slug: 'ai-navigation-logic',
                            title: 'AUTONOMOUS_NAVIGATION_LOGIC_FLOW',
                            excerpt: 'Deep dive into the pathfinding algorithms used in the SENTRY series. How we optimized SLAM for indoor patrolling...',
                            date: new Date().toISOString(),
                            thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&auto=format&fit=crop'
                        },
                        {
                            id: 103,
                            slug: 'mechatronics-optimization',
                            title: 'MECHATRONICS_HARDWARE_OPTIMIZATION',
                            excerpt: 'Upgrading the servo response times for high-speed delivery robots. A study on kinetic energy distribution...',
                            date: new Date().toISOString(),
                            thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop'
                        }
                    ])
                } else {
                    setPosts(transformed)
                }
            } catch (error) {
                console.error('Error fetching robotics blogs:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchRoboticsPosts()
    }, [])

    if (loading) {
        return (
            <div className="py-20 bg-slate-950/80 border-t border-slate-900 flex justify-center">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
        )
    }

    if (posts.length === 0) return null

    return (
        <section className="py-20 bg-slate-950/80 relative border-t border-slate-900">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-mono font-bold text-orange-500 mb-2">
              // INTEL_DATABASE
                        </h2>
                        <p className="text-sky-400 font-mono text-sm">
                            LATEST MISSION REPORTS AND TECHNICAL LOGS
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="group flex items-center space-x-2 text-slate-400 hover:text-orange-500 transition-colors font-mono text-xs"
                    >
                        <span>ACCESS_ALL_ARCHIVES</span>
                        <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <Link href={`/blog/${post.slug}`} className="block h-full">
                                <div className="bg-slate-900/40 border border-slate-800 p-1 rounded-sm group-hover:border-orange-500/50 transition-colors h-full flex flex-col">
                                    {post.thumbnailUrl && (
                                        <div className="relative h-48 overflow-hidden mb-4 rounded-sm">
                                            <img
                                                src={post.thumbnailUrl}
                                                alt={post.title}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                            <div className="absolute inset-0 bg-orange-500/10 mix-blend-overlay" />
                                        </div>
                                    )}

                                    <div className="p-4 flex flex-col flex-1">
                                        <div className="flex items-center space-x-2 text-[10px] font-mono text-sky-500 mb-3">
                                            <BookOpen className="w-3 h-3" />
                                            <span>MISSION_REPORT</span>
                                        </div>

                                        <h3 className="text-base font-mono font-bold text-slate-200 group-hover:text-orange-500 transition-colors mb-3 line-clamp-2 uppercase">
                                            {post.title}
                                        </h3>

                                        <p className="text-slate-400 text-[10px] font-mono leading-relaxed mb-6 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between text-[9px] font-mono text-slate-500">
                                            <span>DATE: {new Date(post.date).toLocaleDateString('tr-TR')}</span>
                                            <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">READ_MORE</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
