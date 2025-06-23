import { CardBodyProps, Card as ChakraCard } from "@chakra-ui/react";

interface CardProps extends CardBodyProps {
    title: string;
    titleIcon?: React.ReactNode;
    description: string;
}

export default function SettingCard(props: CardProps) {
    const { title, titleIcon, description, children, ...cardBodyProps } = props;

    return (
        <ChakraCard.Root bgColor="card.bg.color" border="none" shadow="sm">
            <ChakraCard.Header>
                <ChakraCard.Title display="flex" alignItems="center" gap={2} color="body.text.color">
                    {titleIcon} {title}
                </ChakraCard.Title>
                <ChakraCard.Description textStyle="xs" color="body.text.color">
                    {description}
                </ChakraCard.Description>
            </ChakraCard.Header>
            <ChakraCard.Body {...cardBodyProps as CardBodyProps}>
                {children}
            </ChakraCard.Body>
        </ChakraCard.Root>
    )
}