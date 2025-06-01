// components/sections/hero.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    ArrowRight,
    Play,
    Star,
    TrendingUp,
    Shield,
    Users
} from 'lucide-react';
import { slideUp, staggerContainer } from '@/lib/animations'; // fadeIn, 

export default function Hero() {
    return (
        <section className="relative py-20 lg:py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20" />

                {/* Floating Orbs */}
                <motion.div
                    className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, -25, 0],
                        y: [0, 15, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="text-center space-y-8"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    {/* Badge */}
                    <motion.div variants={slideUp}>
                        <Badge
                            variant="secondary"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                        >
                            <Star className="w-4 h-4 fill-current" />
                            #1 Personal Finance App in Thailand
                            <ArrowRight className="w-4 h-4" />
                        </Badge>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.div variants={slideUp} className="space-y-4">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            <span className="block">Take Control of Your</span>
                            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                                Financial Future
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Smart budgeting, debt tracking, and goal setting in one powerful platform.
                            Start your journey to financial freedom today with our intelligent insights.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        variants={slideUp}
                        className="flex flex-wrap justify-center gap-8 text-center"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-2xl">50K+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-2xl">₿2.5M+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Money Managed</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-2xl">99.9%</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={slideUp}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link href="/dashboard">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            size="lg"
                            className="px-8 py-4 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 group"
                        >
                            <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                            Watch Demo
                        </Button>
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div
                        variants={slideUp}
                        className="flex flex-col items-center gap-4"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Trusted by financial experts and thousands of users
                        </p>

                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 + 1 }}
                                >
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                </motion.div>
                            ))}
                            <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                4.9/5 from 1,200+ reviews
                            </span>
                        </div>
                    </motion.div>

                    {/* App Preview (Mockup) */}
                    <motion.div
                        variants={slideUp}
                        className="relative mt-16"
                    >
                        <div className="relative max-w-4xl mx-auto">
                            {/* Browser Mockup */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                                {/* Browser Header */}
                                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div className="flex-1 mx-4">
                                        <div className="bg-white dark:bg-gray-600 rounded-lg px-3 py-1 text-sm text-gray-500 dark:text-gray-300">
                                            finplan.app/dashboard
                                        </div>
                                    </div>
                                </div>

                                {/* Dashboard Preview */}
                                <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                                        {/* Stats Cards */}
                                        <div className="space-y-3">
                                            {[
                                                { label: 'Total Balance', value: '฿125,000', color: 'bg-blue-500' },
                                                { label: 'Monthly Savings', value: '฿15,000', color: 'bg-green-500' },
                                                { label: 'Goals Progress', value: '78%', color: 'bg-purple-500' }
                                            ].map((stat, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="bg-white dark:bg-gray-700 rounded-lg p-3 shadow-sm"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.2 + 1.5 }}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                                                        <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                                                    </div>
                                                    <div className="font-bold text-lg">{stat.value}</div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Chart Placeholder */}
                                        <div className="md:col-span-2 bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                                            <div className="h-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
                                                <div className="text-center">
                                                    <TrendingUp className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                                                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Financial Overview
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                +฿2,500 saved
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
                                animate={{
                                    y: [0, 10, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1,
                                }}
                            >
                                Goal 85% complete
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}