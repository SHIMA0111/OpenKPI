"use client"
import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Card, Flex, Grid, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { LuGlobe } from "react-icons/lu";

export default function Settings() {
    const bgColor = useColorModeValue("gray.50", "gray.900");
    const cardBgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.800", "gray.200");
    
    return (
        <Box h="100%" spaceY={6} p={6} bgColor={bgColor}>
            <Flex align="center" justify="space-between">
                <Box spaceY={2}> 
                    <Heading as="h1" textStyle="2xl" color={textColor}>Settings</Heading>
                    <Text color={textColor}>
                        Manage your account settings and preferences.
                    </Text>
                </Box>
            </Flex>

            <Grid gap={6} templateColumns={{ md: "repeat(3, minmax(0, 1fr))" }}>
                <Card.Root gridColumn={{ md: 2 }} bgColor={cardBgColor} border="none" shadow="sm">
                    <Card.Header>
                        <Card.Title display="flex" alignItems="center" gap={2}>
                            <Icon as={LuGlobe} w={5} h={5} />
                            Basic Settings
                        </Card.Title>
                    </Card.Header>
                    <Card.Body spaceY={4}>
                        <Flex align="start" gap={6}>

                        </Flex>
                    </Card.Body>
                </Card.Root>
            </Grid>
        </Box>
    )
}