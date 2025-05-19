import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Terms of service'
}

const TermsPage = () => {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl fonr-bold mb-4">Terms of Service</h1>
            <Separator className='mb-6' />
            <p className="mb-4">
                By using Finplan, you agree to the following terms. This service is provided as-is and we make no guarantees about accuracy or uptime.
            </p>
            <p className="mb-4">
                You are resposible for any financial decisions made baed on the data shown in the app.
                We do not provide financial advice.
            </p>
            <p className="mb04">
                These terms may be updated occasionally. Continued use of the app means you accept the revised terms.
            </p>
        </div>
    )
}

export default TermsPage