import { Flex, Heading } from "@chakra-ui/react";
import { AppLogo } from "@/components/ui/app-logo";
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
                <AppLogo />
                <Heading as="h1" size="xl" fontWeight="semibold" color="text.color">Dashboard</Heading>
            </Flex>
            <Flex align="center" gap={3}>
                <UserDropdown />
            </Flex>
        </Flex>
    );
}
