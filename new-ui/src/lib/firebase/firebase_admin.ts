'use server';

import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

export async function initializeFirebaseAdmin() {
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
        throw new Error("Firebase admin config is not set");
    }

    const config = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),   
    };
    
    const app = !admin.apps.length ? admin.initializeApp({
        credential: admin.credential.cert(config),
    }) : admin.app();

    return getAuth(app);
}

