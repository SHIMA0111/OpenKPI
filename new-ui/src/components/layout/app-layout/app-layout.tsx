import { Box } from "@chakra-ui/react";

import { Flex } from "@chakra-ui/react";

import { ClientOnly } from "@chakra-ui/react";
import { AppHeader } from "./components/app-header";
import { AppSidebar } from "./components/app-sidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClientOnly fallback={<div>Dashboard Loading...</div>}>
            <Flex h="100vh" bg="gray.50" flexDir="column">
                <AppHeader />
                <Flex flex={1} overflow="hidden">
                    <AppSidebar />
                    <Box as="main" flex={1} overflow="auto">
                        {children}
                    </Box>
                </Flex>
            </Flex>
        </ClientOnly>
    )
}