import { Avatar, Flex, Text } from "@chakra-ui/react";

interface AvatarOptionProps {
    id: string;
    label: string;
    name: string;
    imageUrl?: string;
    isSelected: boolean;
    onClick: (id: string) => void;
}

export default function AvatarOption({ id, label, name, imageUrl, isSelected, onClick }: AvatarOptionProps) {
    const renderAvatar = () => {
        if (id === "image" && imageUrl) {
            return (
                <Avatar.Root>
                    <Avatar.Fallback />
                    <Avatar.Image src={imageUrl} />
                </Avatar.Root>
            );
        }

        return (
            <Avatar.Root bgColor="gray.200" color="gray.800">
                <Avatar.Fallback name={name} />
            </Avatar.Root>
        );
    };

    return (
        <Flex 
            flexDir="column"
            align="center" 
            justify="center" 
            p={3} 
            rounded="lg" 
            border="2px solid" 
            cursor="pointer" 
            borderColor={isSelected ? "active.text.color" : "gray.200"}
            bgColor={isSelected ? "active.bg.color" : "transparent"}
            _hover={{
                borderColor: isSelected ? undefined : "gray.300",
                bgColor: isSelected ? undefined : "button.bg.color.hover",
            }}
            onClick={() => onClick(id)}
        >
            {renderAvatar()}
            <Text>{label}</Text>
        </Flex>
    );
}
