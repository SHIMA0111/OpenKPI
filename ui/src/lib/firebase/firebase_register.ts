import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile, User } from "firebase/auth";
import { firebaseAuth } from "./firebase_auth";
import { RegisterCredentials } from "@/types/authentication";
import { FirebaseError } from "firebase/app";

export async function firebaseRegister(credentials: RegisterCredentials) {
    const { email, password, firstName, lastName } = credentials;

    try {
        const registerResult = await createUserWithEmailAndPassword(firebaseAuth, email, password);

        const user = registerResult.user;
        await updateProfile(user, {
            displayName: `${firstName} ${lastName}`,
        });

        await sendEmailVerification(user);

        return {
            success: true,
            message: "Registration successful! Please check your email for verification.",
        };

    } catch (error) {
        if (error instanceof FirebaseError) {
            return {
                success: false,
                message: error.message,
            };
        }

        return {
            success: false,
            message: error as string,
        };
    }
}

export async function firebaseResendVerificationEmail(user: User) {
    await sendEmailVerification(user);
}

export async function firebaseResendVerificationEmailByCreds(email: string, password: string) {
    const user = await signInWithEmailAndPassword(firebaseAuth, email, password);
    await sendEmailVerification(user.user);
}