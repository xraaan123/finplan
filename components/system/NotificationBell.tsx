'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNotificationStore } from '@/stores/notificationStore'
import { Button } from '../ui/button'
import { Bell } from 'lucide-react'
import NotificationDropdown from './NotificationDropdown'

const NotificationBell = () => {
    const [open, setOpen] = useState(false)
    const notifications = useNotificationStore((s) => s.notifications);
    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="relative">
            <Button variant='ghost' size='icon' onClick={() => setOpen((prev) => !prev)} className='relative' aria-label='Toggle notifications'>
                <Bell className='w-5 h-5 text-gray-700 dark:text-white' />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full text-[10px]">
                        {unreadCount}
                    </span>
                )}
            </Button>

            <AnimatePresence>
                {open && (
                    <motion.div key='dropdown' initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className='absolute right-0 mt-2 w-80 z-50'>
                        <NotificationDropdown onClose={() => setOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default NotificationBell