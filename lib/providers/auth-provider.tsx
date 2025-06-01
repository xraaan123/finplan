// lib/providers/auth-provider.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    emailVerified?: boolean;
    createdAt?: string;
    lastLogin?: string;
    preferences?: {
        currency: string;
        language: string;
        notifications: boolean;
        twoFactorEnabled?: boolean;
    };
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (name: string, email: string, password: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
    verifyEmail: (token: string) => Promise<void>;
    resendVerification: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development
const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    preferences: {
        currency: 'THB',
        language: 'th',
        notifications: true,
    },
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    useEffect(() => {
        // Simulate checking authentication status
        const checkAuth = async () => {
            try {
                // In a real app, you would check with your backend
                const localToken = localStorage.getItem('finplan_token');
                const cookieToken = document.cookie.split(';').find(row => row.startsWith('finplan_token='))?.split('=')[1];

                const token = localToken || cookieToken;

                if (token) {
                    // Simulate API call to verify token and get user data
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    setUser(mockUser);
                } else if (isProtectedRoute) {
                    // Redirect to login if accessing protected route without token
                    router.push('/auth/login');
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                if (isProtectedRoute) {
                    router.push('/auth/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [pathname, router, isProtectedRoute]);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Simulate login API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock validation
            if (email === 'demo@finplan.app' && password === 'demo123') {
                const token = 'mock_jwt_token_' + Date.now();

                localStorage.setItem('finplan_token', token);
                
                const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
                document.cookie = `finplan_token=${token}; expires=${expires}; path=/; secure; samesite=strict;`

                setUser(mockUser);
                router.push('/dashboard');
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        try {
            // Simulate registration API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock validation - check password requirements
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }

            // Mock email validation
            if (!email.includes('@')) {
                throw new Error('Please enter a valid email address');
            }

            // Mock check if email already exists
            if (email === 'existing@example.com') {
                throw new Error('An account with this email already exists');
            }

            const newUser: User = {
                id: Date.now().toString(),
                name,
                email,
                emailVerified: false,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                preferences: {
                    currency: 'THB',
                    language: 'th',
                    notifications: true,
                    twoFactorEnabled: false,
                },
            };

            const token = 'mock_jwt_token_' + Date.now();
            localStorage.setItem('finplan_token', token);
            setUser(newUser);

            // In real app, you might want to send verification email here
            console.log(`Account created for ${email} with password validation`);

            router.push('/dashboard');
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('finplan_token');
        document.cookie = 'finplan_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        setUser(null);
        router.push('/');
    };

    const forgotPassword = async (email: string) => {
        setIsLoading(true);
        try {
            // Simulate forgot password API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock validation - check if email exists
            if (!email.includes('@')) {
                throw new Error('Please enter a valid email address');
            }

            // In real app, send password reset email
            console.log(`Password reset email sent to: ${email}`);

            // You could show a toast notification here
            // toast.success('Password reset email sent! Check your inbox.');

        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (token: string, newPassword: string) => {
        setIsLoading(true);
        try {
            // Simulate reset password API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock validation
            if (!token) {
                throw new Error('Invalid reset token');
            }

            if (newPassword.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }

            // In real app, verify token and update password
            console.log('Password reset successful');

            // Redirect to login page after successful reset
            router.push('/auth/login?message=password-reset-success');

        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const changePassword = async (currentPassword: string, newPassword: string) => {
        if (!user) throw new Error('No user logged in');

        setIsLoading(true);
        try {
            // Simulate change password API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock validation
            if (currentPassword === 'demo123') {
                if (newPassword.length < 6) {
                    throw new Error('New password must be at least 6 characters');
                }

                console.log('Password changed successfully');
                // In real app, user would need to login again

            } else {
                throw new Error('Current password is incorrect');
            }

        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const verifyEmail = async (token: string) => {
        setIsLoading(true);
        try {
            // Simulate email verification API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (!token) {
                throw new Error('Invalid verification token');
            }

            // Update user email verification status
            if (user) {
                setUser({
                    ...user,
                    emailVerified: true
                });
            }

            console.log('Email verified successfully');

        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const resendVerification = async () => {
        if (!user) throw new Error('No user logged in');

        setIsLoading(true);
        try {
            // Simulate resend verification API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log(`Verification email sent to: ${user.email}`);

        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const updateProfile = async (data: Partial<User>) => {
        if (!user) return;

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const updatedUser = { ...user, ...data };
            setUser(updatedUser);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        forgotPassword,
        resetPassword,
        changePassword,
        updateProfile,
        verifyEmail,
        resendVerification,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Auth Guard Component
interface AuthGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const pathname = usePathname();
    const isProtectedRoute = ['/dashboard'].some(route => pathname.startsWith(route));

    if (isLoading) {
        return fallback || (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isProtectedRoute && !isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
                    <p className="text-muted-foreground">Please log in to access this page.</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}