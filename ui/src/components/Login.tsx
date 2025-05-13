import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  Flex,
  Container,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useUser } from '../contexts/UserContext.tsx';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const success = login(username, password);

      if (success) {
        toast({
          title: 'Login successful',
          description: 'Welcome to your KPI Dashboard',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid username or password',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }

      setIsLoading(false);
    }, 1000);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Container maxW="container.xl" p={4}>
      <Flex 
        minHeight="80vh" 
        align="center" 
        justify="center"
      >
        <Box 
          maxW="md" 
          w="full"
          p={8} 
          borderWidth="1px" 
          borderRadius="lg" 
          boxShadow="lg"
          bg="white"
        >
          <VStack spacing={6} align="flex-start" w="full">
            <Heading as="h1" size="xl" color="brand.500">KPI Dashboard</Heading>
            <Text color="gray.600">Sign in to access your KPI dashboard</Text>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing={4} w="full">
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Enter your username"
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input 
                      type={showPassword ? 'text' : 'password'} 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="Enter your password"
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        variant="ghost"
                        size="sm"
                        onClick={toggleShowPassword}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button 
                  type="submit" 
                  colorScheme="brand" 
                  width="full" 
                  mt={4} 
                  isLoading={isLoading}
                >
                  Sign In
                </Button>
              </VStack>
            </form>

            <Box w="full" mt={4}>
              <Text fontSize="sm" color="gray.500">
                Demo accounts: 
                <Text as="span" fontWeight="bold"> user1/password1, user2/password2, admin/admin123</Text>
              </Text>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;
