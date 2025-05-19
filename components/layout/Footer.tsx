'use client'

import Link from "next/link"

const Footer = () => {
    return (
        <footer className="border-t bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400 text-sm py-4 px-6 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                <span>© {new Date().getFullYear()} Finplan. All rights reserved.</span>
                <div className="flex gap-4 text-xs">
                    <Link href='/about' className="hover:underline">About</Link>
                    <Link href='/privacy' className="hover:underline">Privacy</Link>
                    <Link href='/terms' className="hover:underline">Terms</Link>
                    <Link href='/cokies' className="hover:underline">Cookies</Link>
                </div>
                <span className="text-xs">Mide with ❤️ for your financial future.</span>
            </div>
        </footer>
    )
}

export default Footer