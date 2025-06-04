import Credentials from "next-auth/providers/credentials";
import NextAuth, { AuthError, User } from "next-auth";
import { env } from "./config/env";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authConfig } from "./auth.config";
import { initializeFirebaseAdmin } from "./lib/firebase/firebase_admin";
import { FirebaseError } from "firebase/app";

class AuthenticationError extends AuthError {
    code: string;

    constructor(message: string, code: string) {
        super();
        this.message = message;
        this.name = "AuthenticationError";
        this.code = code;
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const userCredential = await signInWithEmailAndPassword(
                        env.FIREBASE_AUTH, 
                        credentials.email as string, 
                        credentials.password as string
                    );

                    const user = userCredential.user;

                    if (!user.emailVerified) {
                        throw new AuthenticationError("Please verify your email address before logging in.", "auth/email-not-verified");
                    }

                    const idToken = await user.getIdToken();

                    const adminAuth = await initializeFirebaseAdmin();
                    const decodedToken = await adminAuth.verifyIdToken(idToken);

                    return {
                        id: decodedToken.uid,
                        email: user.email!,
                        name: user.displayName,
                        image: user.photoURL,
                    };
                } catch (error: any) {
                    if (error instanceof AuthenticationError) {
                        throw error;
                    }
                    if (error instanceof FirebaseError) {
                        throw new AuthenticationError("Firebase authentication error", error.code as string);
                    }
                    throw new AuthenticationError(error.message, "auth/authentication-error");
                }
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        ...authConfig.callbacks,
        jwt: async ({ token, user }) => {
            if (user?.id) {
                token.uid = user.id;
            }

            return token;
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = token.uid as string;
            }

            return session;
        },
    },
});