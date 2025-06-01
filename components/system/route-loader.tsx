// components/system/route-loader.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface RouteLoaderProps {
    color?: string;
    height?: number;
    showOnRouteChangeOnly?: boolean;
}

export default function RouteLoader({
    color = '#3b82f6',
    height = 3,
    showOnRouteChangeOnly = true
}: RouteLoaderProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Start loading when route changes
        setIsLoading(true);
        setProgress(0);

        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + Math.random() * 10;
            });
        }, 100);

        // Complete loading after a short delay
        const completeTimer = setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
                setIsLoading(false);
                setProgress(0);
            }, 200);
        }, 500);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(completeTimer);
        };
    }, [pathname, searchParams]);

    if (!showOnRouteChangeOnly || !isLoading) {
        return null;
    }

    return (
        <AnimatePresence>
            {isLoading && (
                <>
                    {/* Top Progress Bar */}
                    <motion.div
                        className="fixed top-0 left-0 right-0 z-50 origin-left"
                        style={{ height: `${height}px` }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: progress / 100 }}
                        exit={{ scaleX: 1 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <div
                            className="h-full shadow-lg"
                            style={{
                                background: `linear-gradient(90deg, ${color}, ${color}80)`,
                                boxShadow: `0 0 10px ${color}40`,
                            }}
                        />
                    </motion.div>

                    {/* Loading Indicator */}
                    <motion.div
                        className="fixed top-4 right-4 z-50 bg-background/90 backdrop-blur-sm border rounded-lg px-3 py-2 shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm font-medium">Loading...</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Page Transition Wrapper
interface PageTransitionProps {
    children: React.ReactNode;
    className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                className={className}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

// Route Loading Hook
export function useRouteLoading() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    return isLoading;
}

// Skeleton Loader for Content
interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'rectangular' | 'circular';
    width?: string | number;
    height?: string | number;
    lines?: number;
}

export function Skeleton({
    className = '',
    variant = 'text',
    width,
    height,
    lines = 1
}: SkeletonProps) {
    const baseClasses = 'animate-pulse bg-muted rounded';

    const getVariantClasses = () => {
        switch (variant) {
            case 'text':
                return 'h-4';
            case 'rectangular':
                return 'h-32';
            case 'circular':
                return 'rounded-full';
            default:
                return 'h-4';
        }
    };

    const style = {
        width: width || (variant === 'circular' ? '40px' : '100%'),
        height: height || undefined,
    };

    if (variant === 'text' && lines > 1) {
        return (
            <div className={`space-y-2 ${className}`}>
                {Array.from({ length: lines }).map((_, index) => (
                    <div
                        key={index}
                        className={`${baseClasses} ${getVariantClasses()}`}
                        style={{
                            ...style,
                            width: index === lines - 1 ? '60%' : style.width,
                        }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={`${baseClasses} ${getVariantClasses()} ${className}`}
            style={style}
        />
    );
}

// Loading States for Different Components
export const LoadingStates = {
    Card: () => (
        <div className="p-6 border rounded-lg space-y-4">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="rectangular" height="120px" />
            <div className="space-y-2">
                <Skeleton variant="text" lines={2} />
            </div>
        </div>
    ),

    Table: ({ rows = 5 }: { rows?: number }) => (
        <div className="space-y-3">
            <Skeleton variant="text" height="40px" />
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex space-x-4">
                    <Skeleton variant="text" width="25%" />
                    <Skeleton variant="text" width="35%" />
                    <Skeleton variant="text" width="20%" />
                    <Skeleton variant="text" width="20%" />
                </div>
            ))}
        </div>
    ),

    Stats: () => (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-6 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <Skeleton variant="text" width="80px" />
                            <Skeleton variant="text" width="120px" height="32px" />
                        </div>
                        <Skeleton variant="circular" width="48px" height="48px" />
                    </div>
                </div>
            ))}
        </div>
    ),
};