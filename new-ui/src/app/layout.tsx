'use client'

import {ReactNode} from "react";
import {Provider} from "@/components/ui/provider";

export default function RootLayout({children}: {children: ReactNode}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    )
}