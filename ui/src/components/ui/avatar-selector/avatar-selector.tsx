import { Dialog, Field, Flex, Grid, Icon, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { LuCamera } from "react-icons/lu";
import AvatarDisplay from "./avatar-display";
import AvatarOption from "./avatar-option";

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
        },
        {
            id: "image",
            label: "Image",
        }
    ];

    const handleSelector = (avatarType: string) => {
        setSelectedAvatar(avatarType);
        onAvatarChange?.(avatarType);
        setIsOpen(false);
    };

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
                <AvatarDisplay 
                    name={name} 
                    imageUrl={initialImageUrl} 
                    avatarType={selectedAvatar as "default" | "image"} 
                />
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
                                <Dialog.Title>Select avatar</Dialog.Title>
                                <Dialog.Description>
                                    Select a new avatar for your profile.
                                </Dialog.Description>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Grid templateColumns="repeat(3, minmax(0, 1fr))" gap={4} py={4}>
                                    {avatarOptions.map((option) => (
                                        <AvatarOption
                                            key={option.id}
                                            id={option.id}
                                            label={option.label}
                                            name={name}
                                            imageUrl={initialImageUrl}
                                            isSelected={selectedAvatar === option.id}
                                            onClick={handleSelector}
                                        />
                                    ))}
                                </Grid>
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </Flex>
    );
}
