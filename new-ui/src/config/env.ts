import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { z } from "zod";

const createEnv = () => {
    const envSchema = z.object({
        AUTH_PROVIDER: z.enum(["Firebase"]),
        FIREBASE_AUTH: z.any().optional(),
    });
    
    if (process.env.NEXT_PUBLIC_AUTH_PROVIDER === "Firebase" && !process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS) {
        throw new Error("NEXT_PUBLIC_FIREBASE_CREDENTIALS must be set when using Firebase as authentication provider");
    }

    const FirebaseCredentials = process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS ? JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS) : null;
    const FirebaseAuth = initializeApp(FirebaseCredentials);
    const auth = getAuth(FirebaseAuth);

    const envVars = {
        AUTH_PROVIDER: process.env.NEXT_PUBLIC_AUTH_PROVIDER,
        FIREBASE_AUTH: auth,
    }

    const parsedEnvVars = envSchema.parse(envVars);
    return parsedEnvVars;
}

export const env = createEnv();