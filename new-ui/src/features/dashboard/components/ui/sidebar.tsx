import { Box, Button, Flex, Icon, HStack, List, Text, VStack } from "@chakra-ui/react";
import { BiBarChart } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";

export default function Sidebar() {
    const menuItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: BiBarChart,
        },
        {
            id: "settings",
            label: "Settings",
            icon: LuSettings,
        }
    ];
    const activeItem = "dashboard";

    return (
        <Flex bgColor="white" borderRight="1px solid" borderColor="gray.200" w={64} flexDir="column">
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
                                        {...(isActive ? {
                                            bgGradient: "to-br",
                                            gradientFrom: "blue.50",
                                            gradientTo: "purple.50"
                                        } : {
                                            _hover: {
                                                bg: "gray.100",
                                            }
                                        }
                                        )}
                                    >
                                        <Icon 
                                            as={IconContent}
                                            height={5}
                                            width={5}
                                            color={isActive ? "blue.700" : "gray.700"}
                                        />
                                        <Text 
                                            textStyle="sm" 
                                            fontWeight="medium" 
                                            ml={3} 
                                            color={isActive ? "blue.700" : "gray.700"}
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
        </Flex>
    )
}