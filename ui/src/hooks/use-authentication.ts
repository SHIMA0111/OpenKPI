import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthentication = (redirectAuth = true) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (redirectAuth && status === "unauthenticated") {
            router.push("/auth/login");
        }
    }, [status, router, redirectAuth]);

    return { session, status, isAuthenticated: !!session };
}