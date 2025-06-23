'use client'

import React from 'react';
import {
    Box,
    Button,
    ClientOnly,
    Container,
    Grid,
    Link, Skeleton,
    Spacer,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import {BiUser} from "react-icons/bi";
import {LuCheck, LuLock, LuMail, LuUser, LuX} from 'react-icons/lu';
import { useRegister } from '../hooks/use-register';
import LabelInput from '@/components/ui/label-input';
import AuthCard from './parts/auth-card';
import Copyright from '@/components/ui/copyright/copyright';
import AuthDialog from './parts/auth-dialog/auth-dialog';

function RegisterFormContent() {
    const {
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
    } = useRegister();

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
                <AuthCard
                    title="Register"
                    description="Let's create your account and start your journey!"
                    icon={<BiUser />}
                    iconColor="white"
                    iconBgGradientFrom="green.600"
                    iconBgGradientTo="blue.600"
                >
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
                </AuthCard>
                
                <Copyright mt={8} />

                <AuthDialog
                    isOpen={isOpen}
                    setIsOpen={handleCloseDialog}
                    title="Not completed yet!"
                >
                    <Text color="text.color">
                        We've sent you an email to verify your account. Please check your email and click the link to verify your account.
                    </Text>
                </AuthDialog>
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