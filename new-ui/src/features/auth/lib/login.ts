'use server';

import { signIn } from '@/auth';

export async function login(email: string, password: string) {
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        
        return { success: true, message: "Login successful" };
    } catch (error: any) {
        if (error.type === "AuthError") {
            return {
                error: { 
                    code: error.code,
                    message: error.message,
                }
            }
        }

        if (error.type === "FirebaseError") {
            return {
                error: {
                    code: error.code,
                    message: error.message,
                }
            }
        }
        return {
            error: {
                code: "unknown",
                message: "An unknown error occurred",
                error: error,
            }   
        }
    }
}