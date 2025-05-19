import MobileSidebar from '@/components/dashboard/MobileSidebar'
import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="hidden md:block">
                <Sidebar />
            </div>
            <MobileSidebar />

            <div className="flex flex-col flex-1">
                <Topbar />
                <main className="p-4 md:p-6">{children}</main>
            </div>
        </div>
    )
}

export default DashboardLayout