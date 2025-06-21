'use client'

import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    ClientOnly,
    CloseButton,
    Container,
    Dialog,
    Grid,
    Heading,
    Icon,
    Link, Portal, Skeleton,
    Spacer,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import {BiUser} from "react-icons/bi";
import {LuCheck, LuLock, LuMail, LuUser, LuX} from 'react-icons/lu';
import { RegisterCredentials } from '@/types/authentication';
import { useRegister } from '@/hooks/use-register';
import { useRouter } from 'next/navigation';
import LabelInput from '@/components/ui/label-input';

function RegisterFormContent() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [validatePassword, setValidatePassword] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { register } = useRegister();

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
                                gradientFrom="green.600"
                                gradientTo="blue.600"
                                borderRadius="xl"
                                display="flex"
                                alignItems="center"
                                justifyContent="center">
                                <Icon w={6} h={6} color="white">
                                    <BiUser/>
                                </Icon>
                            </Box>
                            <Heading
                                size="xl"
                                bgClip="text"
                            >
                                <Text as="span" color="text.color">
                                    Create Account
                                </Text>
                            </Heading>
                            <Text color="text.color">Let's create your account and start your journey!</Text>
                        </VStack>
                    </Card.Header>
                    <Card.Body>
                        <VStack gap={6}>
                            <Box as="form" w="full" onSubmit={handleSubmit}>
                                <Stack gap={4}>
                                    <Grid templateColumns="1fr 1fr" gap={3}>
                                        <LabelInput 
                                            label="First Name"
                                            startElement={<LuUser color="gray.400" />}
                                            type="text"
                                            placeholder="Taro"
                                            value={firstName}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                                            h={12}
                                            borderColor="gray.200"
                                            focusRingColor="blue.500"
                                            _focus={{
                                                borderColor: "blue.500",
                                                boxShadow: "0 0 0 1px blue.500",
                                            }}
                                        />
                                        <LabelInput 
                                            label="Last Name"
                                            startElement={<LuUser color="gray.400" />}
                                            type="text"
                                            placeholder="Yamada"
                                            value={lastName}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                                            h={12}
                                            borderColor="gray.200"
                                            focusRingColor="blue.500"
                                            _focus={{
                                                borderColor: "blue.500",
                                                boxShadow: "0 0 0 1px blue.500",
                                            }}
                                        />
                                    </Grid>
                                    <LabelInput
                                        label="Email"
                                        required
                                        startElement={<LuMail color="gray.400" />}
                                        type="email"
                                        placeholder="taro@example.com"
                                        value={email}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                        h={12}
                                        borderColor="gray.200"
                                        focusRingColor="blue.500"
                                        _focus={{
                                            borderColor: "blue.500",
                                            boxShadow: "0 0 0 1px blue.500",
                                        }}
                                    />
                                    
                                    <LabelInput 
                                        label="Password"
                                        required
                                        startElement={<LuLock color="gray.400" />}
                                        type="password"
                                        placeholder="Your password"
                                        value={password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                        h={12}
                                        borderColor="gray.200"
                                        focusRingColor="blue.500"
                                        _focus={{
                                            borderColor: "blue.500",
                                            boxShadow: "0 0 0 1px blue.500",
                                        }}
                                    />

                                    <LabelInput 
                                        label="Confirm Password"
                                        required
                                        invalid={!validatePassword}
                                        invalidMessage="Password does not match"
                                        startElement={validatePassword ? <LuCheck color="gray.400" /> : <LuX color="gray.400" />}
                                        type="password"
                                        placeholder="Your password"
                                        value={confirmPassword}
                                        onChange={handleValidatePassword}
                                        h={12}
                                        borderColor={validatePassword ? "gray.200" : "red.500"}
                                        focusRingColor="blue.500"
                                        _focus={{
                                            borderColor: "blue.500",
                                            boxShadow: "0 0 0 1px blue.500",
                                        }}
                                    />
                                    
                                    <Spacer h={4} />

                                    <Button 
                                        type="submit"
                                        loading={isLoading}
                                        loadingText="Registering..."
                                        w="full" 
                                        h={12}
                                        {...((!validatePassword || !email || !password || !confirmPassword)
                                            ? {
                                                bgColor: "gray.500",
                                                cursor: "not-allowed"
                                            }
                                            : {
                                                bgGradient: "to-r",
                                                gradientFrom: "green.600",
                                                gradientTo: "blue.600"
                                            }
                                        )}
                                        color="white"
                                        fontWeight="medium" 
                                        borderRadius="lg"
                                        disabled={!validatePassword || !email || !password || !confirmPassword}
                                        _hover={{
                                            transform: "scale(1.02)",
                                            background: "linear(to-r, blue.600, purple.600)"
                                        }}>
                                            Register
                                    </Button>
                                </Stack>
                            </Box>

                            <Text textAlign="center" fontSize="sm" color="text.color">
                                Already have an account?{" "}
                                <Link
                                    href="/auth/login"
                                    color="blue.500"
                                    fontWeight="medium"
                                    _hover={{ color: "blue.700", textDecoration: "underline" }}
                                >
                                    Login
                                </Link>
                            </Text>
                            <Text fontSize="xs" color="text.color">
                                You've never registered with this email address before but you can't register?{" "}
                                <Link href="/contact" color="blue.500" fontWeight="medium" _hover={{ color: "blue.700", textDecoration: "underline" }}>Contact us</Link>
                            </Text>
                        </VStack>
                    </Card.Body>
                </Card.Root>
                <Text textAlign="center" fontSize="xs" color="gray.500" mt={8}>
                    &copy; 2025 SHIMA0111. All rights reserved.
                </Text>
                <Dialog.Root lazyMount open={isOpen} placement="center" onOpenChange={(e) => handleCloseDialog(e.open)}>
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content>
                                <Dialog.Header>
                                    <Dialog.Title>Not completed yet!</Dialog.Title>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton />
                                    </Dialog.CloseTrigger>
                                </Dialog.Header>
                                <Dialog.Body>
                                    <Text color="text.color">
                                        We've sent you an email to verify your account. Please check your email and click the link to verify your account.
                                    </Text>
                                </Dialog.Body>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            </Container>
        </Box>
    )
}

export default function RegisterForm() {
    return (
        <ClientOnly fallback={
            <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
                <Skeleton h="500px" w="400px" borderRadius="xl" />
            </Box>
        }>
            <RegisterFormContent />
        </ClientOnly>
    )
}