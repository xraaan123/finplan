// components/layout/footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DollarSign, Github, Twitter, Mail, Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';

const footerLinks = {
    product: [
        { name: 'Features', href: '/#features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'API', href: '/api-docs' },
    ],
    company: [
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
    ],
    resources: [
        { name: 'Help Center', href: '/help' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Security', href: '/security' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms & Conditions', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'GDPR', href: '/gdpr' },
    ],
};

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/finplan',
        icon: Github,
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/finplan',
        icon: Twitter,
    },
    {
        name: 'Email',
        href: 'mailto:hello@finplan.app',
        icon: Mail,
    },
];

interface FooterProps {
    variant?: 'default' | 'minimal';
}

export default function Footer({ variant = 'default' }: FooterProps) {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith('/dashboard');

    // Don't show footer on dashboard pages
    if (isDashboard) {
        return null;
    }

    if (variant === 'minimal') {
        return <MinimalFooter />;
    }

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                                    <DollarSign className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Finplan
                                </h3>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                                Take control of your financial future with our comprehensive personal finance management platform.
                                Budget, track, and achieve your financial goals.
                            </p>

                            {/* Social Links */}
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors shadow-sm"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Links Sections */}
                    {Object.entries(footerLinks).map(([category, links], index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                                {category.replace('_', ' ')}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter Signup */}
                <motion.div
                    className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
                        <div className="max-w-md mx-auto text-center">
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Stay Updated
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Get the latest financial tips and updates delivered to your inbox.
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
                        <span>© {new Date().getFullYear()} Finplan. All rights reserved.</span>
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
                        <span>in Thailand</span>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}

// Minimal Footer Component
function MinimalFooter() {
    return (
        <footer className="border-t bg-background/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center mr-2">
                            <DollarSign className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">Finplan</span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">
                            Terms
                        </Link>
                        <span>© {new Date().getFullYear()}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Footer Newsletter Component (can be used separately)
export function NewsletterSignup() {
    const [email, setEmail] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSubscribed, setIsSubscribed] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubscribed(true);
        setIsLoading(false);
        setEmail('');
    };

    if (isSubscribed) {
        return (
            <motion.div
                className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <motion.svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </motion.svg>
                </div>
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                    Successfully Subscribed!
                </h4>
                <p className="text-green-700 dark:text-green-300">
                    Thank you for subscribing to our newsletter.
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium min-w-[100px] flex items-center justify-center"
                >
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        'Subscribe'
                    )}
                </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
                We respect your privacy. Unsubscribe at any time.
            </p>
        </form>
    );
}