'use client'

import { useNotificationStore } from '@/stores/notificationStore'
import React from 'react'
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';

const NotificationDropdown = ({ onClose }: { onClose: () => void }) => {
    const { notifications, markAsRead, clearAll } = useNotificationStore();

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b dark:border-gray-700">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">
                    🔔 Notifications
                </p>
                {notifications.length > 0 && (
                    <Button variant='ghost' size='icon' onClick={clearAll} className='text-red-500 hover:text-red-700'>
                        <Trash2 className='w-4 h-4' />
                    </Button>
                )}
            </div>
            {notifications.length === 0 ? (
                <div className="text-sm divide-gray-100 dark:divide-gray-800">
                    No new notifications.
                </div>
            ) : (
                <ScrollArea className='h-64'>
                    <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                        {notifications.map((n) => (
                            <li key={n.id} className={cn('px-4 py-3 cursor-pointer transition hover:bg-gray-100 dark:hover:bg-gray-800', !n.read && 'bg-gray-50 dark:bg-gray-800/80')} onClick={() => { markAsRead(n.id); onClose(); }}></li>
                        ))}
                    </ul>
                </ScrollArea>
            )}
        </div>
    )
}

export default NotificationDropdown