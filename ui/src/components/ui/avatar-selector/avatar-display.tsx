import { Avatar } from "@chakra-ui/react";

interface AvatarDisplayProps {
    name: string;
    imageUrl?: string;
    avatarType: "default" | "image";
}

export default function AvatarDisplay({ name, imageUrl, avatarType }: AvatarDisplayProps) {
    if (avatarType === "image" && imageUrl) {
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
}
