'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthProvider'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ChevronDown } from 'lucide-react'

const UserDropdown = () => {
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const user = {
        name: 'Waroon Katewongsa',
        avaratUrl: 'https://ui-avatars.com/api/?name=Waroon+Katewongsa&background=000&color=fff'
    }

    const handleGoToProfile = () => {
        router.push('/dashboard/profile');
        setOpen(false);
    }

    const handleGoToSettings = () => {
        router.push('/dashboard/settings');
        setOpen(false);
    }

    return (
        <div className="relative">
            <Button variant='ghost' onClick={() => setOpen(!open)} className='flex items-center gap-2 px-2'>
                <Avatar className='w-8 h-8'>
                    <AvatarImage src={user.avaratUrl} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <ChevronDown className='w-4 h-4 text-muted-foreground' />
            </Button>

            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0, scale: 0.95, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -4 }} transition={{ duration: 0.2 }} className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 shadow-md rounded-md overflow-hidden z-50">
                        <Button variant='ghost' onClick={handleGoToProfile} className='w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-white'>
                            👤 Profile
                        </Button>
                        <Button variant='ghost' onClick={handleGoToSettings} className='w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-white'>
                            ⚙️ Settings
                        </Button>
                        <Button variant='ghost' onClick={logout} className='w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-white'>
                            🚪 Sign out
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default UserDropdown