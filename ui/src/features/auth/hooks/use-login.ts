import { useEffect, useState } from "react"
import { login } from "../lib/login";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { firebaseResendVerificationEmailByCreds } from "@/lib/firebase/firebase_register";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [isResendVerificationEmailLoading, setIsResendVerificationEmailLoading] = useState(false);
    const [intervalResendVerificationEmail, setIntervalResendVerificationEmail] = useState(0);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const result = await login(email, password);

            if (result?.error) {
                if (result.error.code === "auth/email-not-verified") {
                    setIsOpen(true);
                } else if (result.error.code === "auth/invalid-credential") {
                toaster.create({
                    title: "Invalid credentials",
                    description: "Please check your email and password and try again.",
                    type: "error",
                    duration: 5000,
                    closable: true
                });
                } else {
                    toaster.create({
                        title: "An error occurred. Please try again.",
                        description: "Please contact support if the problem persists with your account information.",
                        type: "error",
                        duration: 5000,
                        closable: true
                    });
                }
            } else {
                toaster.create({
                    title: "Login successful",
                    type: "success",
                    duration: 5000,
                    closable: true
                });

                router.push("/dashboard");
                router.refresh();
            }
        } catch (error) {
            console.log(error);
            toaster.create({
                title: "An error occurred. Please try again.",
                type: "error",
                duration: 5000,
                closable: true
            });
        } finally {
            setIsLoading(false);
        }
    }

    const handleResendVerificationEmail = async () => {
        setIsResendVerificationEmailLoading(true);
        try {
            await firebaseResendVerificationEmailByCreds(email, password);
            setIntervalResendVerificationEmail(30);
            toaster.create({
                title: "Verification email sent",
                description: "Please check your email and click the link to verify your account.",
                type: "success",
                duration: 5000,
                closable: true
            });
        } catch (error: any) {
            toaster.create({
                title: "Failed to resend verification email",
                description: error.message || "Please try again. If the problem persists, please contact support.",
                type: "error",
                duration: 5000,
                closable: true
            });
        } finally {
            setIsResendVerificationEmailLoading(false);
        }
    }

    useEffect(() => {
        if (intervalResendVerificationEmail > 0) {
            setTimeout(() => setIntervalResendVerificationEmail(intervalResendVerificationEmail - 1), 1000);
        }
    }, [intervalResendVerificationEmail]);

    return {
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        isOpen,
        isResendVerificationEmailLoading,
        intervalResendVerificationEmail,
        handleSubmit,
        handleResendVerificationEmail,
        setIsOpen,
    }
}