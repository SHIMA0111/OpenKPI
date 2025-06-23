import { toaster } from "@/components/ui/toaster";
import { firebaseRegister } from "@/lib/firebase/firebase_register";
import { RegisterCredentials } from "@/types/authentication";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useRegister = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [validatePassword, setValidatePassword] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const router = useRouter();

    const register = async (credentials: RegisterCredentials): Promise<boolean> => {
        const registerResult = await firebaseRegister(credentials);
        if (!registerResult.success) {
            toaster.create({
                title: "Registration failed",
                description: registerResult.message,
                type: "error",
                duration: 5000,
                closable: true
            });
        }
    
        return registerResult.success;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const credentials: RegisterCredentials = {
            email,
            password,
            firstName,
            lastName
        }

        if (await register(credentials)) {
            setIsOpen(true);
        };

        setIsLoading(false);
    }

    const handleValidatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPassword = e.target.value
        setConfirmPassword(confirmPassword)
        setValidatePassword(password === confirmPassword && password.length > 0 && confirmPassword.length > 0)
    }

    const handleCloseDialog = (isOpen: boolean) => {
        setIsOpen(isOpen);
        router.push("/auth/login");
    }

    return { 
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        isLoading,
        validatePassword,
        isOpen,
        handleSubmit,
        handleValidatePassword,
        handleCloseDialog,
     };
}