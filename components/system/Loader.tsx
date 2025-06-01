// components/system/loader.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign } from 'lucide-react';

interface LoaderProps {
    isLoading?: boolean;
    message?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'spinner' | 'pulse' | 'dots' | 'logo';
}

export function Loader({
    isLoading = false,
    message = 'Loading...',
    size = 'md',
    variant = 'logo'
}: LoaderProps) {
    const [show, setShow] = useState(isLoading);

    useEffect(() => {
        if (isLoading) {
            setShow(true);
        } else {
            const timer = setTimeout(() => setShow(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    const SpinnerLoader = () => (
        <div className={`animate-spin rounded-full border-2 border-muted border-t-primary ${sizeClasses[size]}`} />
    );

    const PulseLoader = () => (
        <div className={`animate-pulse rounded-full bg-primary ${sizeClasses[size]}`} />
    );

    const DotsLoader = () => (
        <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}
        </div>
    );

    const LogoLoader = () => (
        <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="relative"
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <DollarSign className="w-8 h-8 text-white" />
                </div>
            </motion.div>

            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="font-semibold text-lg">Finplan</h3>
                <p className="text-sm text-muted-foreground">{message}</p>
            </motion.div>

            <motion.div
                className="flex space-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );

    const renderLoader = () => {
        switch (variant) {
            case 'spinner':
                return <SpinnerLoader />;
            case 'pulse':
                return <PulseLoader />;
            case 'dots':
                return <DotsLoader />;
            case 'logo':
                return <LogoLoader />;
            default:
                return <SpinnerLoader />;
        }
    };

    if (!show) return null;

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderLoader()}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Global App Loader
export function AppLoader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate app initialization
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Loader
            isLoading={isLoading}
            message="Initializing Finplan..."
            variant="logo"
        />
    );
}

// Button Loader
interface ButtonLoaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export function ButtonLoader({
    isLoading = false,
    children,
    className = '',
    disabled,
    ...props
}: ButtonLoaderProps) {
    return (
        <button
            className={`relative ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>
            <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
                {children}
            </span>
        </button>
    );
}