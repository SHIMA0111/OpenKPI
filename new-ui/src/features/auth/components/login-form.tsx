'use client'

import React, { useState } from 'react';
import {
    Box,
    Button,
    ClientOnly,
    Container,
    Fieldset,
    Flex,
    IconButton,
    Link, Skeleton,
    Spacer,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import {BiLock} from "react-icons/bi";
import {LuEye, LuEyeClosed, LuLock, LuMail} from 'react-icons/lu';
import LabelInput from '@/components/ui/label-input';
import AuthCard from './parts/auth-card';
import { useLogin } from '../hooks/use-login';
import Copyright from '@/components/ui/copyright/copyright';
import AuthDialog from './parts/auth-dialog/auth-dialog';

function LoginFormContent() {
    const [showPassword, setShowPassword] = useState(false);

    const {
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
    } = useLogin();

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
                    title="Login"
                    description="Please sign-in to your account!"
                    icon={<BiLock />}
                    iconColor="white"
                    iconBgGradientFrom="blue.500"
                    iconBgGradientTo="purple.500"
                >
                    <VStack gap={6}>
                        <Box as="form" onSubmit={handleSubmit} w="full">
                            <Stack gap={4}>
                                <Fieldset.Root>
                                    <Fieldset.Content>

                                        {/* Email input */}
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

                                        {/* Password input */}
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
                </AuthCard>

                <Copyright mt={8} />

                <AuthDialog
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    title="Your account is not verified!!"
                >
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
                </AuthDialog>
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