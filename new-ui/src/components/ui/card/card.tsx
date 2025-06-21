import { CardBodyProps, Card as ChakraCard } from "@chakra-ui/react";
import { useColorModeValue } from "../color-mode";

interface CardProps extends CardBodyProps {
    title: string;
    titleIcon?: React.ReactNode;
    description: string;
}

export default function Card(props: CardProps) {
    const cardBgColor = useColorModeValue("white", "gray.800");

    return (
        <ChakraCard.Root bgColor={cardBgColor} border="none" shadow="sm">
            <ChakraCard.Header>
                <ChakraCard.Title display="flex" alignItems="center" gap={2}>
                    {props.titleIcon} {props.title}
                </ChakraCard.Title>
                <ChakraCard.Description textStyle="xs" color="gray.500">
                    {props.description}
                </ChakraCard.Description>
            </ChakraCard.Header>
            <ChakraCard.Body {...props as CardBodyProps}>
                {props.children}
            </ChakraCard.Body>
        </ChakraCard.Root>
    )
}