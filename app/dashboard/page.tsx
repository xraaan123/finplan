'use client'

import { showInfo } from '@/lib/toastUtil';
import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import DashboardSummary from '@/components/features/analytics/DashboardSummary';

const DashboardPage = () => {
    useEffect(() => {
        showInfo('You are on the Dashboard!');
    }, [])


    return (
        <div className="p-6 space-y-6">
            <motion.h1 className="text-2xl font-semibold text-gray-900 dark:text-white" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>📊 Financial Dashboard</motion.h1>
            <DashboardSummary />
        </div>
    )
}

export default DashboardPage