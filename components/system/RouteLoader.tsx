'use client'

import { useLoaderStore } from "@/stores/uiStore";
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react";

export default function RouteLoader() {
    const pathname = usePathname();
    const prevPathRef = useRef<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { showLoader, hideLoader } = useLoaderStore();

    useEffect(() => {
        if (prevPathRef.current === null) {
            prevPathRef.current = pathname;
            return;
        }

        if (prevPathRef.current !== pathname) {
            console.log('[RouteLoader] PATH CHANGE -> showLoader');
            queueMicrotask(() => {
                showLoader('Loading...');
            })

            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                console.log('[RouteLoader] hideLoader()');
                hideLoader();
            }, 700);

            prevPathRef.current = pathname;

            return () => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }
        }
    }, [pathname, showLoader, hideLoader])

    return null;
}