import { Box, Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { BiBarChart } from "react-icons/bi";
import UserDropdown from "./user-dropdown";
import { LuSearch } from "react-icons/lu";

export default function Header() {
    return (
        <Flex 
            as="header"
            bg="white"
            borderBottom="1px solid"
            borderColor="gray.200"
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
                <Heading as="h1" size="xl" fontWeight="semibold" color="gray.800">Dashboard</Heading>
            </Flex>
            <Flex align="center" gap={3}>
                <UserDropdown />
            </Flex>
        </Flex>
    )
}