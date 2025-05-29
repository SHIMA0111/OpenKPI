'use client'

import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    ClientOnly,
    Container,
    Field,
    Fieldset,
    Flex,
    Heading,
    Icon,
    IconButton,
    Input,
    InputGroup,
    Link, Skeleton,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import {useColorModeValue} from "@/components/ui/color-mode";
import {BiLock} from "react-icons/bi";
import {LuEye, LuEyeOff, LuLock, LuMail} from 'react-icons/lu';

function LoginFormContent() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const bgGradientFrom = useColorModeValue("gray.50", "gray.900")
    const bgGradientTo = useColorModeValue("gray.100", "gray.800")

    const cardBg = useColorModeValue("white", "gray.800")
    const textColor = useColorModeValue("gray.600", "gray.300")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("submit")
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
                            >
                                <Text as="span" color={textColor}>
                                    Login
                                </Text>
                            </Heading>
                            <Text color={textColor}>Please sign-in to your account!</Text>
                        </VStack>
                    </Card.Header>
                    <Card.Body>
                        <VStack gap={6}>
                            <Box as="form" onSubmit={handleSubmit} w="full">
                                <Stack gap={4}>
                                    <Fieldset.Root>
                                        <Fieldset.Content>

                                            <Field.Root required>
                                                <Field.Label color={textColor}>
                                                    Email
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
                                                <Field.Label color={textColor}>Password</Field.Label>
                                                <InputGroup 
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
                                                            { showPassword ? <LuEye /> : <LuEyeOff /> }
                                                        </IconButton>
                                                    }>
                                                    <Input 
                                                        type={ showPassword ? "text" : "password" } 
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

                            <Text textAlign="center" fontSize="sm" color={textColor}>
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