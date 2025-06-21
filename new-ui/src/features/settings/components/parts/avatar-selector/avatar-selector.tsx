import { Avatar, Box, Dialog, Field, Flex, Grid, Icon, IconButton, Portal, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuCamera } from "react-icons/lu";

interface AvatarSelectorProps {
    name: string;
    initialImageUrl?: string;
    onAvatarChange?: (avatarType: string) => void;
    label?: string;
}

export default function AvatarSelector({ name, initialImageUrl, onAvatarChange, label }: AvatarSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState("default");

    const avatarOptions = [
        {
            id: "default",
            label: "Default",
            component: (
                <Avatar.Root bgColor="gray.200" color="gray.800">
                    <Avatar.Fallback name={name} />
                </Avatar.Root>
            ),
        },
        {
            id: "image",
            label: "Image",
            component: (
                <Avatar.Root>
                    <Avatar.Fallback />
                    <Avatar.Image src={initialImageUrl} />
                </Avatar.Root>
            ),
        }
    ]

    const handleSelector = (avatarType: string) => {
        setSelectedAvatar(avatarType);
        onAvatarChange?.(avatarType);
        setIsOpen(false);
    }

    return (
        <Flex flexDir="column" gap={2} align="start" justify="center">
            {
                label && (
                    <Field.Root>
                        <Field.Label>{label}</Field.Label>
                    </Field.Root>
                )
            }
            <Flex position="relative" display="inline-block">
                {
                    avatarOptions.find((option) => option.id == selectedAvatar)?.component
                }
                <Flex 
                    position="absolute" 
                    inset={0} 
                    bg="rgba(0, 0, 0, .5)" 
                    rounded="full" 
                    align="center" 
                    justify="center" 
                    opacity={0}
                    _hover={{
                        opacity: 1,
                    }}
                >
                    <Icon as={LuCamera} w={5} h={5} color="white" onClick={() => setIsOpen(true)} cursor="pointer" />
                </Flex>
                <Flex
                    position="absolute" 
                    bottom={-1}
                    right={-1}
                    h={5} 
                    w={5} 
                    rounded="full" 
                    p={0} 
                    border="1px solid"
                    borderColor="white"
                    bg="white"
                    color="gray.500"
                    shadow="md"
                    align="center"
                    justify="center"
                    cursor="pointer"
                    _hover={{
                        bg: "gray.200",
                        borderColor: "gray.200",
                    }}
                    onClick={() => setIsOpen(true)}
                >
                    <Icon as={LuCamera} />
                </Flex>
            </Flex>

            <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(!isOpen)} placement="center" lazyMount>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        
                        <Dialog.Content maxW={{ md: "400px" }}>
                            <Dialog.Header flexDir="column">
                                <Dialog.Title>Select avater</Dialog.Title>
                                <Dialog.Description>
                                    Select a new avatar for your profile.
                                </Dialog.Description>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Grid templateColumns="repeat(3, minmax(0, 1fr))" gap={4} py={4}>
                                    {avatarOptions.map((option) => (
                                        <Flex 
                                            key={option.id} 
                                            flexDir="column"
                                            align="center" 
                                            justify="center" 
                                            p={3} 
                                            rounded="lg" 
                                            border="2px solid" 
                                            cursor="pointer" 
                                            borderColor={selectedAvatar == option.id ? "blue.500" : "gray.200"}
                                            bgColor={selectedAvatar == option.id ? "blue.50" : "transparent"}
                                            _hover={{
                                                borderColor: selectedAvatar == option.id ? "transparent" : "gray.300",
                                            }}
                                            onClick={() => handleSelector(option.id)}
                                        >
                                            {option.component}
                                            <Text>{option.label}</Text>
                                        </Flex>
                                    ))}
                                </Grid>
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </Flex>
    )
}