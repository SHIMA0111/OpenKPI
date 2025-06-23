'use client';

import { AppLayout } from "@/components/layout/app-layout/app-layout";
import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    return (
        <AppLayout>
            {children}
        </AppLayout>
    )
}