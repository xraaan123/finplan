'use client'

import { motion } from "framer-motion";
import { BarChart3, CreditCard, PiggyBank } from "lucide-react";

const features = [
    {
        icon: PiggyBank,
        title: 'Plan your budget easily',
        description: 'See an overview of your income and expenses so you can decide when to spend or save with clarity.',
    },
    {
        icon: CreditCard,
        title: 'Track debts like a pro',
        description: 'Visualize monthly payments and let Finplan calculate your remaining balance for you.'
    },
    {
        icon: BarChart3,
        title: 'Real-time financial insights',
        description: 'View monthly reports with charts showing income, expenses, and remaining balance.'
    }
]

const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.5 }
    })
}

const FeatureSection = () => {
    return (
        <section className="px-6 py-20 border-t dark:border-gray-800 transition-colors">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10" initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                    🔍 Why use Finplan?
                </motion.h2>

                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {features.map(({ icon: Icon, title, description }, i) => (
                        <motion.div key={title} custom={i} variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                            <Icon className="text-primary mb-4" size={36} />
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
                            <p className="text-sm text-gray-600 dark:text gray-400">{description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeatureSection