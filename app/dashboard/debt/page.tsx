'use client'

import DebtForm from "@/components/features/debt/DebtForm"
import DebtTable from "@/components/features/debt/DebtTable"
import { motion } from "framer-motion"

const DebtPage = () => {
    return (
        <motion.div className="p-6 space-y-6" initial="hidden" animate='visible' variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">📋 Manage Your Debts</h1>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                <DebtForm />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <DebtTable />
            </motion.div>
        </motion.div>
    )
}

export default DebtPage