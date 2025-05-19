'use client'

import { useLoaderStore } from '@/stores/uiStore'
import { Calculator, ChartColumn, LayoutDashboard, Target, Wallet } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Budget Plan', href: '/dashboard/plan', icon: Calculator },
    { label: 'Debt Tracker', href: '/dashboard/debt', icon: Wallet },
    { label: 'Goals', href: '/dashboard/goals', icon: Target },
    { label: 'Reports', href: '/dashboard/report', icon: ChartColumn },
]

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { showLoader } = useLoaderStore();

    const handleNavigate = (href: string) => {
        if (pathname !== href) {
            showLoader('Loading...');
            router.push(href)
        }
    }

    return (
        <aside className="w-60 bg-white dark:bg-gray-900 border-r dark:border-gray-800 h-full p-6 space-y-8 md:block">
            <h1 onClick={() => handleNavigate('/')} className="text-xl font-bold text-gray-900 dark:text-white cursor-pointer hover:opacity-80 transition">Finplan</h1>
            <nav className="space-y-2">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Button key={href} variant='ghost' onClick={() => handleNavigate(href)} className={cn('w-full justify-start gap-3', isActive ? 'bg-muted text-foreground hover:bg-muted/80' : 'text-muted-foreground')}>
                            <Icon className='w-4 h-4' />
                            {label}
                        </Button>
                    )
                })}
            </nav>
        </aside>
    )
}

export default Sidebar