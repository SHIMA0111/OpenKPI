import Credentials from "next-auth/providers/credentials";
import NextAuth, { User } from "next-auth";
import { env } from "./config/env";
import { signInWithEmailAndPassword } from "firebase/auth";
import { adminAuth } from "./lib/firebase_admin";
import { authConfig } from "./auth.config";

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
                    const idToken = await user.getIdToken();

                    const decodedToken = await adminAuth.verifyIdToken(idToken);

                    return {
                        id: decodedToken.uid,
                        email: user.email!,
                        name: user.displayName,
                        image: user.photoURL,
                    };
                } catch (error) {
                    console.error("Authentication error", error);
                    return null;
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