'use client'

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthProvider'
import React from 'react'

const LoginPage = () => {
    const { login } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-background">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow w-full max-w-sm space-y-6">
                <h1 className="text-2xl font-bold text-center text-foreground">🔐 Login</h1>
                <p className="text-sm text-center text-muted-foreground">
                    Use the mokc login system to try the app.
                </p>

                <Button onClick={login} className='w-full'>
                    🚀 Login to continue
                </Button>
            </div>
        </div>
    )
}

export default LoginPage