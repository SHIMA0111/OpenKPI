'use client';

import { signOut } from "next-auth/react";
import { Box, Button, Text } from "@chakra-ui/react";

export default function DashboardPage() {
    const handleSignOut = async () => {
        await signOut();
    }

    return (
        <Box>
            <Text>Dashboard</Text>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </Box>
    )
}