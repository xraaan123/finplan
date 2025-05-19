'use client'

import { useLoaderStore } from '@/stores/uiStore';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react'

const Loader = () => {
    const { loading, message } = useLoaderStore();

    useEffect(() => {
        console.log('[Loader] loading =', loading);
    }, [loading])


    return (
        <AnimatePresence mode='wait'>
            {loading && (
                <motion.div key='loader' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
                    <motion.div className="w-12 h-12 border-[6px] borde-rgray-900 border-t-transparent rounded-full" style={{ willChange: 'transform' }} initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, repeatType: 'loop', ease: 'linear' }} />
                    <motion.p className="mt-4 text-sm text-gray-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.2 }}>
                        {message}
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Loader