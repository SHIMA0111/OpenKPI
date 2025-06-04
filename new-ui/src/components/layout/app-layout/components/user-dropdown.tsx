import { Link, Flex, Portal, Text, Icon, Avatar, Button, Menu } from "@chakra-ui/react";
import { LuSettings, LuUser } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";

import { toaster } from "@/components/ui/toaster";
import { signOut } from "next-auth/react";

export function UserDropdown() {
    const router = useRouter();

    const firstName = "Taro";
    const lastName = "Yamada";
    const email = "taro.yamada@example.com";

    const menuItems = [
        {
            label: "Profile",
            icon: LuUser,
            href: "/profile",
        },
        {
            label: "Settings",
            icon: LuSettings,
            href: "/settings",
        }
    ]

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await signOut();

            router.push("/auth/login");
            router.refresh();
        } catch (error) {
            toaster.create({
                title: "Logout failed",
                description: "Please try again later",
                type: "error",
                duration: 3000,
            })
        }
    }


    return (
        <Menu.Root>
            <Menu.Trigger 
                asChild 
                _focusVisible={{
                    outline: "none",
                    boxShadow: "none",
                }}
            >
                <Button 
                    variant="ghost" 
                    position="relative" 
                    h={9} 
                    w={9} 
                    borderRadius="full" 
                    p={0}
                    _focusVisible={{
                        outline: "none",
                        boxShadow: "none",
                    }}
                >
                    <Avatar.Root>
                        <Avatar.Fallback name="Taro Yamada" />
                        <Avatar.Image src="https://github.com/shadcn.png" />
                    </Avatar.Root>
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Flex 
                            flexDir="column" 
                            spaceY={1}
                            p={2}
                        >
                            <Text textStyle="sm" fontWeight="medium">{firstName} {lastName}</Text>
                            <Text textStyle="xs" fontWeight="medium" color="gray.500">{email}</Text>
                        </Flex>  
                        <Menu.Separator />
                        {
                            menuItems.map((item) => (
                                <Menu.Item key={item.href} asChild value={item.label}>
                                    <Link href={item.href} rel="noreferrer">
                                        <Icon as={item.icon} />
                                        {item.label}
                                    </Link>
                                </Menu.Item>
                            ))
                        }
                        <Menu.Separator />
                        <Menu.Item asChild value="logout">
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                w="full" 
                                justifyContent="flex-start" 
                                color="red.500"
                                onClick={handleLogout}
                            >
                                <Icon as={LuLogOut} />
                                Logout
                            </Button>
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}