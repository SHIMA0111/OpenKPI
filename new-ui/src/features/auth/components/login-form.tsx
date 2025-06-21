'use client'

import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    ClientOnly,
    CloseButton,
    Container,
    Dialog,
    Fieldset,
    Flex,
    Heading,
    Icon,
    IconButton,
    Link, Portal, Skeleton,
    Spacer,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import {BiLock} from "react-icons/bi";
import {LuEye, LuEyeClosed, LuLock, LuMail} from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import { toaster } from '@/components/ui/toaster';
import { login } from '../lib/login';
import { firebaseResendVerificationEmailByCreds } from '@/lib/firebase/firebase_register';
import LabelInput from '@/components/ui/label-input';

function LoginFormContent() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isResendVerificationEmailLoading, setIsResendVerificationEmailLoading] = useState(false);
    const [intervalResendVerificationEmail, setIntervalResendVerificationEmail] = useState(0);

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
    };
    
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

    return (
        <Box
            minH="100vh"
            bgGradient="to-br"
            gradientFrom="screen.bg.gradient.from"
            gradientTo="screen.bg.gradient.to"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
        >
            <Container maxW="md">
                <Card.Root
                    bgColor="card.bg.color"
                    shadow="2xl"
                    borderRadius="2xl"
                    border="none"
                    backdropFilter="blur(10px)"
                >
                    <Card.Header textAlign="center" pb={8}>
                        <VStack gap={4}>
                            <Box
                                w={12}
                                h={12}
                                bgGradient="to-br"
                                gradientFrom="blue.500"
                                gradientTo="purple.500"
                                borderRadius="xl"
                                display="flex"
                                alignItems="center"
                                justifyContent="center">
                                <Icon w={6} h={6} color="white">
                                    <BiLock />
                                </Icon>
                            </Box>
                            <Heading
                                size="xl"
                                bgClip="text"
                                color="text.color"
                            >
                                Login
                            </Heading>
                            <Text color="text.color">Please sign-in to your account!</Text>
                        </VStack>
                    </Card.Header>
                    <Card.Body>
                        <VStack gap={6}>
                            <Box as="form" onSubmit={handleSubmit} w="full">
                                <Stack gap={4}>
                                    <Fieldset.Root>
                                        <Fieldset.Content>
                                            <LabelInput 
                                                label="Email" 
                                                required 
                                                startElement={<LuMail color="gray.400" />}
                                                type="email"
                                                placeholder="taro@example.com"
                                                value={email}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                                h={12}
                                                border="1px solid"
                                                borderColor="gray.100"
                                                focusRingColor="blue.500"
                                                _focus={{
                                                    borderColor: "blue.500",
                                                    boxShadow: "0 0 0 1px blue.500",
                                                }}
                                                disabledRequiredIndicator
                                            />
                                            <LabelInput 
                                                label="Password"
                                                required
                                                startElement={<LuLock color="gray.400" />}
                                                endElement={
                                                    <IconButton
                                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        color="gray.400"
                                                        _hover={{ color: "gray.600" }}
                                                    >
                                                        { showPassword ? <LuEye /> : <LuEyeClosed /> }
                                                    </IconButton>
                                                }
                                                type={showPassword ? "text" : "password"}
                                                placeholder={showPassword ? "Your password" : "********"}
                                                value={password}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                                h={12}
                                                border="1px solid"
                                                borderColor="gray.100"
                                                focusRingColor="blue.500"
                                                _focus={{
                                                    borderColor: "blue.500",
                                                    boxShadow: "0 0 0 1px blue.500",
                                                }}
                                                disabledRequiredIndicator
                                            />
                                        </Fieldset.Content>
                                        
                                        <Flex justify="flex-end">
                                            <Link 
                                                href="/forget-password" 
                                                fontSize="sm"
                                                color="blue.500"
                                                _hover={{ color: "blue.700", textDecoration: "underline" }}
                                            >
                                                Forgot your password?
                                            </Link>
                                        </Flex>
                                        <Button 
                                            loading={isLoading}
                                            loadingText="Logging in..."
                                            type="submit" 
                                            w="full" 
                                            h={12}
                                            bgGradient="to-r"
                                            gradientFrom="blue.500"
                                            gradientTo="purple.500"
                                            color="white"
                                            fontWeight="medium" 
                                            borderRadius="lg"
                                            _hover={{
                                                transform: "scale(1.02)",
                                                background: "linear(to-r, blue.600, purple.600)"
                                            }}>
                                                Login
                                        </Button>
                                    </Fieldset.Root>
                                </Stack>
                            </Box>

                            <Text textAlign="center" fontSize="sm" color="text.color">
                                Don&#39;t have an account?{" "}
                                <Link
                                    href="/auth/register"
                                    color="blue.500"
                                    fontWeight="medium"
                                    _hover={{ color: "blue.700", textDecoration: "underline" }}
                                >
                                    Register
                                </Link>
                            </Text>
                        </VStack>
                    </Card.Body>
                </Card.Root>
                <Text textAlign="center" fontSize="xs" color="gray.500" mt={8}>
                    &copy; 2025 SHIMA0111. All rights reserved.
                </Text>
                <Dialog.Root lazyMount open={isOpen} placement="center" onOpenChange={(e) => setIsOpen(e.open)}>
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content>
                                <Dialog.Header>
                                    <Dialog.Title>Your account is not verified!!</Dialog.Title>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton />
                                    </Dialog.CloseTrigger>
                                </Dialog.Header>
                                <Dialog.Body>
                                    <Text color="text.color">
                                        We've sent you an email to verify your account. 
                                        <br />
                                        Please check your email and click the link to verify your account.
                                    </Text>
                                    <Spacer h={4} />
                                    <Button 
                                        disabled={intervalResendVerificationEmail > 0}
                                        loading={isResendVerificationEmailLoading} 
                                        loadingText="Resending verification email..." 
                                        onClick={handleResendVerificationEmail}
                                        w="full"
                                        h={12}
                                        bgGradient="to-r"
                                        gradientFrom="blue.500"
                                        gradientTo="purple.500"
                                        color="white"
                                        fontWeight="medium"
                                        borderRadius="lg"
                                        _hover={{
                                            transform: "scale(1.02)",
                                            background: "linear(to-r, blue.600, purple.600)"
                                        }}
                                    >Resend verification email</Button>
                                    {intervalResendVerificationEmail > 0 ? (
                                        <Text color="text.color">
                                            You can resend the verification email in {intervalResendVerificationEmail} seconds.
                                        </Text>
                                    ) : ""}
                                </Dialog.Body>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            </Container>
        </Box>
    )
}

export default function LoginForm() {
    return (
        <ClientOnly fallback={
            <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
                <Skeleton h="500px" w="400px" borderRadius="xl" />
            </Box>
        }>
            <LoginFormContent />
        </ClientOnly>
    )
}