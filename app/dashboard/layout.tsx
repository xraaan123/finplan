// app/(dashboard)/layout.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    Menu,
    Bell,
    BarChart3,
    Wallet,
    CreditCard,
    Target,
    PieChart,
    DollarSign
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { slideLeft, staggerContainer, navItem } from '@/lib/animations';
// import { ThemeToggle } from '@/components';
import ThemeToggle from '@/components/common/theme-toggle';

const navigation = [
    { name: 'Overview', href: '/dashboard', icon: BarChart3 },
    { name: 'Budget Plan', href: '/dashboard/budget', icon: Wallet },
    { name: 'Debt Tracker', href: '/dashboard/debt', icon: CreditCard },
    { name: 'Goals', href: '/dashboard/goals', icon: Target },
    { name: 'Reports', href: '/dashboard/reports', icon: PieChart },
    { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
];

interface DashboardLayoutProps {
    children: React.ReactNode;
}

interface NavigationItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>
}

interface NavItemProps {
    item: NavigationItem;
    isMobile?: boolean;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const NavItem = ({ item, isMobile = false }: NavItemProps) => {
        const isActive = pathname === item.href;

        return (
            <motion.div variants={navItem}>
                <Link
                    href={item.href}
                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                    className={cn(
                        "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                        isActive
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                    {item.name === 'Notifications' && (
                        <span className="ml-auto w-2 h-2 bg-red-500 rounded-full" />
                    )}
                </Link>
            </motion.div>
        );
    };

    const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
        <motion.nav
            className="space-y-2"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
        >
            {navigation.map((item) => (
                <NavItem key={item.name} item={item} isMobile={isMobile} />
            ))}
        </motion.nav>
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-16 items-center px-6">
                    <div className="flex items-center">
                        {/* Mobile menu trigger */}
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="sm" className="md:hidden mr-4">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 p-0">
                                <div className="p-6">
                                    <div className="flex items-center mb-8">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                            <DollarSign className="w-5 h-5 text-white" />
                                        </div>
                                        <h1 className="text-xl font-bold">Finplan</h1>
                                    </div>
                                    <Sidebar isMobile />
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                <DollarSign className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-xl font-bold">Finplan</h1>
                        </div>
                    </div>

                    <div className="ml-auto flex items-center space-x-4">
                        {/* Theme toggle */}
                        <ThemeToggle />

                        {/* Notifications */}
                        <Button variant="ghost" size="sm" className="relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Desktop Sidebar */}
                <motion.aside
                    className="hidden md:flex w-64 min-h-screen border-r bg-muted/30"
                    variants={slideLeft}
                    initial="initial"
                    animate="animate"
                >
                    <div className="w-full p-6">
                        <Sidebar />
                    </div>
                </motion.aside>

                {/* Main Content */}
                <main className="flex-1 min-h-screen">
                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={pathname}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
}