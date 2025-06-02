import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./ui/sidebar";
import Header from "./ui/header";
import DashboardContent from "./ui/dashboard-content";

export default function Dashboard() {
    return (
        <Flex h="100vh" bg="gray.50" flexDir="column">
            <Header />
            <Flex flex={1} overflow="hidden">
                <Sidebar />
                <Box as="main" flex={1} overflow="auto">
                    <DashboardContent />
                </Box>
            </Flex>
        </Flex>
    )
}