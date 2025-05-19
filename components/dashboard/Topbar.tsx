'use client'

import { useLoaderStore } from '@/stores/uiStore'
import React from 'react'
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import NotificationBell from '../system/NotificationBell';
import ThemeToggle from '../system/ThemeToggle';
import UserDropdown from './UserDropdown';

const Topbar = () => {
    const toggleDrawer = useLoaderStore((s) => s.toggleDrawer);

    return (
        <header className="h-16 bg-white dark:bg-gray-950 border-b dark:border-gray-800 px-4 md:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Button variant='ghost' size='icon' onClick={toggleDrawer} className='md:hidden'>
                    <Menu className='w-5 h-5 text-gray-700 dark:text-gray-300' />
                </Button>
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-100 hidden md:block">📊 Dashboard</div>
            </div>
            <div className="flex items-center gap-2">
                <NotificationBell />
                <ThemeToggle />
                <UserDropdown />
            </div>
        </header>
    )
}

export default Topbar