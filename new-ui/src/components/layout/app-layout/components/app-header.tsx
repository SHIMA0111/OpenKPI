import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import { BiBarChart } from "react-icons/bi";

import { useColorModeValue } from "@/components/ui/color-mode";
import { UserDropdown } from "./user-dropdown";



export function AppHeader() {
    const bgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.800", "gray.200");
    const borderColor = useColorModeValue("gray.200", "gray.700");

    return (
        <Flex 
            as="header"
            bgColor={bgColor}
            borderBottom="1px solid"
            borderColor={borderColor}
            py={3}
            px={6}
            align="center"
            justify="space-between"
        >
            <Flex 
                align="center" 
                gap={3}
            >
                <Box 
                    bgGradient="to-br" 
                    gradientFrom="blue.600" 
                    gradientTo="purple.600"
                    p={2}
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Icon as={BiBarChart} w={5} h={5} color="white" />
                </Box>
                <Heading as="h1" size="xl" fontWeight="semibold" color={textColor}>Dashboard</Heading>
            </Flex>
            <Flex align="center" gap={3}>
                <UserDropdown />
            </Flex>
        </Flex>
    )
}