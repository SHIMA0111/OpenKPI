'use client';

import { Flex, Box, Button, Text, Icon } from "@chakra-ui/react";
import { BiBarChart } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";

import { usePathname, useRouter } from "next/navigation";
import Copyright from "@/components/ui/copyright/copyright";

export function AppSidebar() {
    const router = useRouter();

    const menuItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: BiBarChart,
            href: "/dashboard",
        },
        {
            id: "settings",
            label: "Settings",
            icon: LuSettings,
            href: "/settings",
        }
    ];
    const activeItem = usePathname().split("/")[1];

    return (
        <Flex 
            bgColor="card.bg.color" 
            borderRight="1px solid" 
            borderColor="border.color" 
            w={64} 
            flexDir="column"
            justify="space-between"
        >
            <Box as="nav" flex={1} p={4}>
                <Box as="ul" spaceY={1}>
                    {
                        menuItems.map((item) => {
                            const IconContent = item.icon;
                            const isActive = activeItem === item.id;

                            return (
                                <Box as="li" key={item.id}>
                                    <Button
                                        variant="ghost"
                                        w="full"
                                        justifyContent="start"
                                        px={3}
                                        py={2}
                                        onClick={() => router.push(item.href)}
                                        {...(isActive ? {
                                            bgGradient: "to-br",
                                            gradientFrom: "active.gradient.from",
                                            gradientTo: "active.gradient.to"
                                        } : {
                                            _hover: {
                                                bg: "button.bg.color.hover",
                                            }
                                        }
                                        )}
                                    >
                                        <Icon 
                                            as={IconContent}
                                            height={5}
                                            width={5}
                                            color={isActive ? "active.text.color" : "text.color"}
                                        />
                                        <Text 
                                            textStyle="sm" 
                                            fontWeight="medium" 
                                            ml={3} 
                                            color={isActive ? "active.text.color" : "text.color"}
                                            transition="color 0.2s"
                                        >
                                            {item.label}</Text>
                                    </Button>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
            <Box as="footer" px={1}  py={2}textAlign="center">
                <Copyright />
            </Box>
        </Flex>
    )
}