'use client'

import { useLoaderStore } from '@/stores/uiStore'
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

const MobileSidebar = () => {
    const drawerOpen = useLoaderStore((s) => s.drawerOpen);
    const closeDrawer = useLoaderStore((s) => s.closeDrawer);
    const pathname = usePathname();

    useEffect(() => {
        if (drawerOpen) closeDrawer();
    }, [pathname, drawerOpen, closeDrawer])

    return (
        <AnimatePresence>
            {drawerOpen && (
                <motion.div onClick={closeDrawer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm md:hidden">
                    <motion.div onClick={(e) => e.stopPropagation()} initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="w-64 bg-white dark:bg-gray-900 h-full p-4 shadow-lg">
                        <Sidebar />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default MobileSidebar