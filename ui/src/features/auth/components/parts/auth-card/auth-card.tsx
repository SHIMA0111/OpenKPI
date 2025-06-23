import { Box, Card, CardBodyProps, Heading, Icon, Text, VStack } from "@chakra-ui/react";

interface AuthCardProps extends CardBodyProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    iconColor?: string;
    iconBgGradientFrom?: string;
    iconBgGradientTo?: string;
}

export default function AuthCard(props: AuthCardProps) {
    const { title, description, icon, iconColor, iconBgGradientFrom, iconBgGradientTo, children, ...cardBodyProps } = props;

    return (
        <Card.Root
            bgColor="card.bg.color"
            shadow="2xl"
            borderRadius="2xl"
            border="none"
            backdropFilter="blur(10px)"
        >
            <Card.Header textAlign="center" pb={8}>
                <VStack gap={4}>
                    <Box
                        w={12}
                        h={12}
                        bgGradient="to-br"
                        gradientFrom={iconBgGradientFrom}
                        gradientTo={iconBgGradientTo}
                        borderRadius="xl"
                        display="flex"
                        alignItems="center"
                        justifyContent="center">
                        <Icon w={6} h={6} color={iconColor}>
                            {icon}
                        </Icon>
                    </Box>
                    <Heading
                        size="xl"
                        bgClip="text"
                        color="text.color"
                    >
                        {title}
                    </Heading>
                    <Text color="text.color">{description}</Text>
                </VStack>
            </Card.Header>
            <Card.Body {...cardBodyProps}>
                {children}
            </Card.Body>
        </Card.Root>
    )
}