'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fadeIn, slideUp } from "@/lib/animations";
import { useAuth } from "@/lib/providers/auth-provider";
import { motion } from "framer-motion"
import { CheckCircle, DollarSign, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from 'react'
import { toast } from "react-toastify";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const { login, isLoading } = useAuth();
    const searchParams = useSearchParams();
    const message = searchParams.get('message');

    React.useEffect(() => {
        if (message === 'password-reset-success') {
            toast.success('Password reset successfully! You can now sign in with your new password.');
        }
    }, [message])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            await login(email, password);
            toast.success('Welcome back!');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to sign in');
        }
    }

    const handleDemoLogin = () => {
        setEmail('demo@finplan.app');
        setPassword('demo123');
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/20 dark:to-gray-900 p-6">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]">
            <div className={`absolute inset-0 bg-[url(data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%234F46E5" fill-opacity="1"%3E%3Ccircle cx="7" cy="7" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)] bg-repeat`} />
        </div>

        <motion.div className="w-full max-w-md relative z-10" variants={fadeIn} initial='initial' animate='animate'>
            {/* Header */}
            <motion.div className="text-center mb-8" variants={slideUp}>
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <DollarSign className="w-8 h-8 text-white" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your Finplan account</p>
            </motion.div>

            {/* Demo Credentials Notice */}
            <motion.div className="mb-6" variants={slideUp}>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                            <h4 className="font-medium text-blue-900 dark:text-blue-100 text-sm">Demo Account</h4>
                            <p className="text-blue-700 dark:text-blue-300 text-xs mt-1">
                                Try Finplan with demo credentials: <strong>demo@finplan.app</strong> / <strong>demo123</strong>
                            </p>
                            <Button variant='link' size='sm' className="text-blue-600 dark:text-blue-400 p-0 h-auto mt-2 text-xs" onClick={handleDemoLogin}>
                                Fill demo credentials
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Card */}
            <motion.div variants={slideUp}>
                <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Sign In</CardTitle>
                        <CardDescription>
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="pl-10" required disabled={isLoading} />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"  className="pl-10 pr-10" required disabled={isLoading} />
                                    <button type="button" onClick={() => setShowPassword(true)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" /> }
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                        Remember me
                                    </span>
                                </label>

                                <Link href='/auth/forgot-password' className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</Link>
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="space-y-3">
                            <Button variant='outline' className="w-full" disabled>
                                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                                <Badge variant='secondary' className="ml-2 text-xs">Soon</Badge>
                            </Button>

                            <Button variant='outline' className="w-full" disabled>
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                Continue with Facebook
                                <Badge variant='secondary' className="ml-2 text-xs">Soon</Badge>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Footer */}
            <motion.div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400" variants={slideUp}>
                <p>
                    Dont&apos;t have an account?{' '}
                    <Link href='/auth/register' className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                        Sign up here
                    </Link>
                </p>
            </motion.div>
        </motion.div>
    </div>
  )
}

export default LoginPage