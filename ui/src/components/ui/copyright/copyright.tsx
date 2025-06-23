import { Text } from "@chakra-ui/react";

interface CopyrightProps {
    mt?: number;
}

export default function Copyright(props: CopyrightProps) {
    const { mt } = props;

    return (
        <Text textAlign="center" textStyle="xs" fontWeight="medium" color="footer.text.color" mt={mt}>
            &copy; {new Date().getFullYear()} SHIMA0111. All rights reserved.
        </Text>
    )
}