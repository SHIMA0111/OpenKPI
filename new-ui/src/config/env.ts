import { z } from "zod";
import { initializeFirebaseAuth } from "@/lib/firebase/firebase_auth";

const createEnv = () => {
    const envSchema = z.object({
        AUTH_PROVIDER: z.enum(["Firebase"]),
        FIREBASE_AUTH: z.any().optional(),
    });
    
    
    const firebaseAuth = initializeFirebaseAuth();

    const envVars = {
        AUTH_PROVIDER: process.env.NEXT_PUBLIC_AUTH_PROVIDER,
        FIREBASE_AUTH: firebaseAuth,
    }

    const parsedEnvVars = envSchema.parse(envVars);
    return parsedEnvVars;
}

export const env = createEnv();