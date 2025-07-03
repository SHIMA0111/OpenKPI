import { Box, Icon } from "@chakra-ui/react";
import { BiBarChart } from "react-icons/bi";

export default function AppLogo() {
    return (
        <Box 
            bgGradient="to-br" 
            gradientFrom="blue.600" 
            gradientTo="purple.600"
            p={2}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Icon as={BiBarChart} w={5} h={5} color="white" />
        </Box>
    );
}
