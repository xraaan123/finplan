import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Privacy Policy'
}

const PrivacyPage = () => {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <Separator className='mb-6' />
            <p className="mb-4">
                At Finplan, we respect your privacy and are committed to protecting your personal data.
            </p>
            <p className="mb-4">
                We do not collect or store any sensitive personal information. All your data stays on your device unless explicity exported.
            </p>
            <p className="mb-4">
                This app may use localStorage or cookies to enhance your experience, but we never share your data with third parties.
            </p>
            <p className="mb-4">
                By using Finplan, you agree to this privacy policy. For any concerns, contact us at <a href="mailto:privacy@finplan.app" className="underline">privacy@finplan.app</a>
            </p>
        </div>
    )
}

export default PrivacyPage