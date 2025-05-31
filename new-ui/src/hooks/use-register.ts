import { toaster } from "@/components/ui/toaster";
import { firebaseRegister } from "@/lib/firebase/firebase_register";

import { RegisterCredentials } from "@/types/authentication";

export const useRegister = () => {
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

    return { register };
}