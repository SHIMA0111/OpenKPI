import { Box, Flex, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { LuPaintbrush, LuPalette, LuSparkles } from "react-icons/lu";

export function Fallback() {
    return (
        <Flex 
            minH="100vh" 
            align="center" 
            justify="center"
            bgGradient="to-br"
            gradientFrom="blue.50"
            gradientTo="purple.50"
        >
            <VStack w="full" maxW="xs" gap={4}>
                <Box position="relative">
                    {/* Paintbrush */}
                    <Flex 
                        w={32} 
                        h={32} 
                        zIndex={10}
                        borderRadius="full"
                        bgGradient="to-br"
                        gradientFrom="blue.100"
                        gradientTo="purple.100"
                        align="center"
                        justify="center"
                    >
                        <Icon as={LuPaintbrush} w={16} h={16} color="purple.600" animation="bounce 2s ease-in-out infinite" />
                    </Flex>

                    {/* Bar animation */}
                    <Box position="absolute" top={6} right={6}>
                        <Box 
                            w={6} 
                            h={1} 
                            bgGradient="to-r" 
                            gradientFrom="pink.400" 
                            gradientTo="purple.500" 
                            borderRadius="full" 
                            animation="pulse 2s ease-in-out infinite" 
                            opacity={0.7} />
                    </Box>
                    <Box position="absolute" bottom={6} left={6}>
                        <Box 
                            w={4} 
                            h={1} 
                            bgGradient="to-r" 
                            gradientFrom="blue.400" 
                            gradientTo="cyan.500" 
                            borderRadius="full" 
                            animation="pulse 2s ease-in-out infinite" 
                            opacity={0.6} />
                    </Box>

                    {/* Sparkles */}
                    <Box position="absolute" top={1} left={1}>
                        <Icon 
                            as={LuSparkles} 
                            w={4} 
                            h={4} 
                            color="yellow.400" 
                            animation="ping 2s ease-in-out infinite 0.2s" 
                            opacity={0.8} />
                    </Box>
                    <Box position="absolute" bottom={2} right={-2}>
                        <Icon 
                            as={LuSparkles} 
                            w={3} 
                            h={3} 
                            color="pink.400" 
                            animation="ping 2s ease-in-out infinite 0.8s" 
                            opacity={0.6} />
                    </Box>
                    <Box position="absolute" top={6} right={-2}>
                        <Icon 
                            as={LuSparkles} 
                            w={5} 
                            h={5} 
                            color="purple.400" 
                            animation="ping 2s ease-in-out infinite 1.2s" 
                            opacity={0.8} />
                    </Box>
                </Box>
                <Heading as="h2" fontSize="2xl" fontWeight="bold" color="gray.800">
                    Now Drawing...
                </Heading>
                <Text color="gray.600">
                    Your page is drawing now...
                </Text>
                <Box 
                    w="full" 
                    mx="auto"
                >
                    <Box 
                        h={2} 
                        bg="gray.200" 
                        borderRadius="full" 
                        overflow="hidden"
                    >
                        <Box 
                            h="full" 
                            bgGradient="to-r" 
                            gradientFrom="blue.500" 
                            gradientVia="purple.500" 
                            gradientTo="pink.500" 
                            borderRadius="full" 
                            animation="progress 2s ease-in-out infinite"
                        />
                    </Box>
                </Box>
                <Flex justify="center">
                    <Icon as={LuPalette} w={8} h={8} color="gray.400" animation="spin 1s linear infinite" />
                </Flex>
            </VStack>
        </Flex>
    )
}