import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Cookie Policy'
}

const CookiesPage = () => {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
            <Separator className='mb-6' />
            <p className="mb-4">
                Finplan uses cookies to improve your experience. These may include local storage for theme preference, login state, or notifications.
            </p>
            <p className="mb-4">
                We do not use thrid-party trackers or analytics cookies at this time.
            </p>
            <p className="mb-4">
                You can clear your browser storage at any time to remove cookies associated with Finplan.
            </p>
        </div>
    )
}

export default CookiesPage