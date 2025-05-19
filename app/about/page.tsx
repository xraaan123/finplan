import { Separator } from '@/components/ui/separator'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'About'
}

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors text-gray-800 dark:text-gray-200">
        <h1 className="text-3xl font-bold mb-4">About Finplan</h1>
        <Separator className='mb-6' />
        <p className="mb-4">
            Finplan is your personal financial planning companion. Whether you&apos;re budgeting, paying off debt,
            or saving for your dreams, Finplan helps you visualize and organize your finances with clarity.
        </p>
        <p className="mb-4">
            This app creafted with ❤️ by <strong>Waroon Katewongsa</strong> to simplify and empower your
            financial decisions.
        </p>
        <p className="mb-4">
            Need help or want to say hi? Reach out at <a href="mailto:hello@finplan.app" className="underline">hello@finplan.app</a>
        </p>
    </div>
  )
}

export default AboutPage