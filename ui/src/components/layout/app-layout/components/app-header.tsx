import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import { BiBarChart } from "react-icons/bi";

import { UserDropdown } from "./user-dropdown";



export function AppHeader() {
    return (
        <Flex 
            as="header"
            bgColor="card.bg.color"
            borderBottom="1px solid"
            borderColor="border.color"
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
                <Heading as="h1" size="xl" fontWeight="semibold" color="text.color">Dashboard</Heading>
            </Flex>
            <Flex align="center" gap={3}>
                <UserDropdown />
            </Flex>
        </Flex>
    )
}