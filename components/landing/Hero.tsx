'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button';

const Hero = () => {
    const router = useRouter();

    return (
        <section className="flex flex-col items-center justify-center text-center px-6 py-24">
            <motion.h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white max-w-2xl leading-tight" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                Plan your finance like a pro ✨
            </motion.h1>

            <motion.p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} >
                Finplan helps you control your expenses, spend wisely, and reach your goals faster.
            </motion.p>

            <motion.div className="mt-8" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Button onClick={() => router.push('/dashboard')} size='lg'>
                    🚀 Start Planning Now
                </Button>
            </motion.div>
        </section>
    )
}

export default Hero