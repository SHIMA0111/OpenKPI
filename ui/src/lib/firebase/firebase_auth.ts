import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export function initializeFirebaseAuth() {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
        !process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 
        !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 
        !process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 
        !process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
        !process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
        !process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    ) {
        throw new Error("Firebase auth config is not set");
    }

    const config = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    }

    const app = initializeApp(config);

    return getAuth(app);
}

export const firebaseAuth = initializeFirebaseAuth();