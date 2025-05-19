'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';

    return (
        <Button variant="ghost" size="icon" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
            <AnimatePresence>
                <motion.div key={isDark ? 'moon' : 'sun'} initial={{ rotate: -15, scale: 0.7, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: 15, scale: 0.6, opacity: 0 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
                    {isDark ? (
                        <Moon className='w-5 h-5 text-white' />
                    ) : (
                        <Sun className='w-5 h-5 text-yellow-500' />
                    )}
                </motion.div>
            </AnimatePresence>
        </Button>
    )
}

export default ThemeToggle