import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        authorized({ auth, request: {nextUrl} }: { auth: any, request: { nextUrl: URL } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = !nextUrl.pathname.startsWith("/auth/") && nextUrl.pathname !== "/forget-password";
            const isProtectedRoute = isOnDashboard;

            if (isProtectedRoute) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn && nextUrl.pathname === "/auth/login") {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;