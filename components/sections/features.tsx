// components/sections/features.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    BarChart3,
    CreditCard,
    Target,
    PieChart,
    Bell,
    Shield,
    Smartphone,
    Zap,
    Users,
    TrendingUp,
    Lock,
    RefreshCw
} from 'lucide-react';
import { slideUp, staggerContainer, fadeIn } from '@/lib/animations';

const mainFeatures = [
    {
        icon: BarChart3,
        title: "Smart Budget Planning",
        description: "Create and manage budgets with AI-powered insights and intelligent categorization of your expenses.",
        benefits: ["Auto-categorization", "Spending insights", "Budget alerts"],
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50 dark:bg-blue-900/10",
        iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
        icon: CreditCard,
        title: "Debt Tracking & Optimization",
        description: "Monitor and strategically pay down your debts with our advanced optimization algorithms.",
        benefits: ["Payment strategies", "Interest calculations", "Payoff timeline"],
        color: "from-red-500 to-red-600",
        bgColor: "bg-red-50 dark:bg-red-900/10",
        iconColor: "text-red-600 dark:text-red-400"
    },
    {
        icon: Target,
        title: "Goal Setting & Achievement",
        description: "Set and track financial goals with personalized milestones and progress visualization.",
        benefits: ["Custom milestones", "Progress tracking", "Achievement rewards"],
        color: "from-green-500 to-green-600",
        bgColor: "bg-green-50 dark:bg-green-900/10",
        iconColor: "text-green-600 dark:text-green-400"
    },
    {
        icon: PieChart,
        title: "Advanced Financial Reports",
        description: "Get detailed insights into your financial health with comprehensive reporting and analytics.",
        benefits: ["Custom reports", "Trend analysis", "Export options"],
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-50 dark:bg-purple-900/10",
        iconColor: "text-purple-600 dark:text-purple-400"
    },
    {
        icon: Bell,
        title: "Smart Notifications",
        description: "Stay on top of your finances with intelligent alerts, reminders, and important updates.",
        benefits: ["Bill reminders", "Goal updates", "Spending alerts"],
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-50 dark:bg-orange-900/10",
        iconColor: "text-orange-600 dark:text-orange-400"
    },
    {
        icon: Shield,
        title: "Bank-Level Security",
        description: "Your data is protected with end-to-end encryption and industry-leading security measures.",
        benefits: ["256-bit encryption", "2FA support", "Privacy focused"],
        color: "from-gray-500 to-gray-600",
        bgColor: "bg-gray-50 dark:bg-gray-900/10",
        iconColor: "text-gray-600 dark:text-gray-400"
    }
];

const additionalFeatures = [
    { icon: Smartphone, title: "Mobile First", description: "Native mobile experience" },
    { icon: Zap, title: "Real-time Sync", description: "Instant data synchronization" },
    { icon: Users, title: "Family Sharing", description: "Share budgets with family" },
    { icon: TrendingUp, title: "Investment Tracking", description: "Monitor your investments" },
    { icon: Lock, title: "Privacy Control", description: "You own your data" },
    { icon: RefreshCw, title: "Auto Backup", description: "Never lose your data" }
];

export default function FeaturesSection() {
    return (
        <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <motion.div variants={slideUp}>
                        <Badge variant="secondary" className="mb-4">
                            Features
                        </Badge>
                    </motion.div>

                    <motion.h2
                        variants={slideUp}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        Everything You Need to
                        <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Master Your Finances
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={slideUp}
                        className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                    >
                        Powerful tools designed to help you budget smarter, save more, and achieve your financial dreams faster than ever before.
                    </motion.p>
                </motion.div>

                {/* Main Features Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    {mainFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={slideUp}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <CardContent className="p-8">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                                        {feature.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Benefits */}
                                    <div className="space-y-2">
                                        {feature.benefits.map((benefit, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.color}`}></div>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional Features */}
                <motion.div
                    variants={fadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                            And Much More...
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Discover additional features that make Finplan the complete financial solution
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {additionalFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="text-center group cursor-pointer"
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-300">
                                    <feature.icon className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                                </div>
                                <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">
                                    {feature.title}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    className="mt-20 text-center"
                    variants={slideUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 md:p-12">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                            Ready to Transform Your Financial Life?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of users who have already taken control of their finances with Finplan.
                            Start your journey today with our free plan.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Start Free Trial
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="px-8 py-4 text-lg font-semibold rounded-xl border-2"
                            >
                                Schedule Demo
                            </Button>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                            No credit card required • 14-day free trial • Cancel anytime
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}