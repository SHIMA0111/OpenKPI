'use client'

import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    ClientOnly,
    Container,
    Field,
    FieldErrorText,
    Grid,
    Heading,
    Icon,
    Input,
    InputGroup,
    Link, Skeleton,
    Spacer,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import {useColorModeValue} from "@/components/ui/color-mode";
import {BiUser} from "react-icons/bi";
import {LuCheck, LuDot, LuLock, LuMail, LuUser, LuX} from 'react-icons/lu';

function LoginFormContent() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [validatePassword, setValidatePassword] = useState(false)

    const bgGradientFrom = useColorModeValue("gray.50", "gray.900")
    const bgGradientTo = useColorModeValue("gray.100", "gray.800")

    const cardBg = useColorModeValue("white", "gray.800")
    const textColor = useColorModeValue("gray.600", "gray.300")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("submit")
    }

    const handleValidatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPassword = e.target.value
        setConfirmPassword(confirmPassword)
        setValidatePassword(password === confirmPassword && password.length > 0 && confirmPassword.length > 0)
    }

    return (
        <Box
            minH="100vh"
            bgGradient="to-br"
            gradientFrom={bgGradientFrom}
            gradientTo={bgGradientTo}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
        >
            <Container maxW="md">
                <Card.Root
                    bgColor={cardBg}
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
                                gradientFrom="green.500"
                                gradientTo="blue.500"
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
                                <Text as="span" color={textColor}>
                                    Create Account
                                </Text>
                            </Heading>
                            <Text color={textColor}>Let's create your account and start your journey!</Text>
                        </VStack>
                    </Card.Header>
                    <Card.Body>
                        <VStack gap={6}>
                            <Box as="form" onSubmit={handleSubmit} w="full">
                                <Stack gap={4}>
                                    <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                                        <Field.Root>
                                            <Field.Label color={textColor}>
                                                First Name
                                            </Field.Label>
                                            <InputGroup startElement={<LuUser color="gray.400" />}>
                                                <Input 
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
                                            </InputGroup>
                                        </Field.Root>
                                        <Field.Root>
                                            <Field.Label color={textColor}>
                                                Last Name
                                            </Field.Label>
                                            <InputGroup startElement={<LuUser color="gray.400" />}>
                                                <Input 
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
                                            </InputGroup>
                                        </Field.Root>
                                    </Grid>
                                    <Field.Root required>
                                        <Field.Label color={textColor}>
                                            Email
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <InputGroup startElement={<LuMail color="gray.400" />}>
                                            <Input 
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
                                        </InputGroup>
                                    </Field.Root>

                                    <Field.Root required>
                                        <Field.Label color={textColor}>
                                            Password
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <InputGroup 
                                            startElement={<LuLock color="gray.400" />} 
                                        >
                                            <Input 
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
                                        </InputGroup>
                                    </Field.Root>

                                    <Field.Root required invalid={!validatePassword}>
                                        <Field.Label color={textColor}>
                                            Confirm Password
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <InputGroup 
                                            startElement={validatePassword ? <LuCheck color="gray.400" /> : <LuX color="gray.400" />} 
                                        >
                                            <Input 
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
                                        </InputGroup>
                                        <FieldErrorText>Password does not match</FieldErrorText>
                                    </Field.Root>
                                    
                                    <Spacer h={4} />

                                    <Button 
                                        type="submit" 
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

                            <Text textAlign="center" fontSize="sm" color={textColor}>
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
                        </VStack>
                    </Card.Body>
                </Card.Root>
                <Text textAlign="center" fontSize="xs" color="gray.500" mt={8}>
                    &copy; 2025 SHIMA0111. All rights reserved.
                </Text>
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