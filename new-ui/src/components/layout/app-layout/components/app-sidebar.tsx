'use client';

import { Flex, Box, Button, Text, Icon } from "@chakra-ui/react";
import { BiBarChart } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";

import { useColorModeValue } from "@/components/ui/color-mode";
import { usePathname, useRouter } from "next/navigation";

export function AppSidebar() {
    const bgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.800", "gray.200");
    const hoverBgColor = useColorModeValue("gray.100", "gray.700");
    const activeTextColor = useColorModeValue("blue.700", "blue.300");
    const activeBgGradientFrom = useColorModeValue("blue.50", "blue.900");
    const activeBgGradientTo = useColorModeValue("purple.50", "purple.900");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const footerTextColor = useColorModeValue("gray.500", "gray.400");

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
            bgColor={bgColor} 
            borderRight="1px solid" 
            borderColor={borderColor} 
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
                                            gradientFrom: activeBgGradientFrom,
                                            gradientTo: activeBgGradientTo
                                        } : {
                                            _hover: {
                                                bg: hoverBgColor,
                                            }
                                        }
                                        )}
                                    >
                                        <Icon 
                                            as={IconContent}
                                            height={5}
                                            width={5}
                                            color={isActive ? activeTextColor : textColor}
                                        />
                                        <Text 
                                            textStyle="sm" 
                                            fontWeight="medium" 
                                            ml={3} 
                                            color={isActive ? activeTextColor : textColor}
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
                <Text textStyle="xs" fontWeight="medium" color={footerTextColor}>
                    &copy; {new Date().getFullYear()} SHIMA0111. All rights reserved.
                </Text>
            </Box>
        </Flex>
    )
}