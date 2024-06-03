import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useContext } from 'react';
import { Context } from "../myContext";
import {
  useToast,
  Box,
  Flex,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text
} from '@chakra-ui/react';

const Login = () => {
  const [userName, setuserName] = useState("")
  const [password, setpassword] = useState("")
  const { name, pwd, setsignIn, signIn,dark } = useContext(Context);

  // console.log(name,pwd,signIn)

  let navigate = useNavigate()
  const toast = useToast()

  const handleSignin = () => {
    if (userName == name && password == pwd) {
      setsignIn(true)
      localStorage.setItem('login', JSON.stringify(true));
      toast({
        title: 'Login suces',
        description: `User - ${userName} successfully logged in`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      navigate("/activesalesorder")
    }
    else {
      toast({
        title: 'error',
        description: `User - ${userName} not found`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    const NAME = JSON.parse(localStorage.getItem('Name'));
    const PASSWORD = JSON.parse(localStorage.getItem('Password'));
    if (NAME) {
      setuserName(NAME);
    }
    if (PASSWORD) {
      setpassword(PASSWORD);
    }
  }, []);

  return (
    <>
      <Box  bgPosition="left" h="100vh">
        <Flex bg="rgba(15, 23, 42, 0.6)" h="100vh" justifyContent="center" alignItems="center">
          <VStack spacing={8} px={6} py={8} mx="auto" w="full" maxW="md">
            <Box bg={dark  ? 'gray.800' : 'white'} rounded="lg" shadow="md" p={8} w="full">
              <Heading as="h1" size="xl" textAlign="center" mb={6} color={dark  ? 'white' : 'gray.900'}>
                Sign in to your account
              </Heading>
              <VStack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email or Username</FormLabel>
                  <Input
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)}
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    bg={ 'green.100'}
                    borderColor={dark  ? 'gray.600' : 'gray.300'}
                    focusBorderColor={dark  ? 'blue.500' : 'primary.600'}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    bg={'green.100'}
                    borderColor={dark  ? 'gray.600' : 'gray.300'}
                    focusBorderColor={dark  ? 'blue.500' : 'primary.600'}
                  />
                </FormControl>
                <Button
                  onClick={handleSignin}
                  w="full"
                  colorScheme="teal"
                  bgGradient="linear(to-br, green.400, blue.600)"
                  _hover={{
                    bgGradient: "linear(to-bl, green.400, blue.600)"
                  }}
                  size="lg"
                >
                  Sign in
                </Button>
                <Text fontSize="sm" color={dark  ? 'gray.400' : 'gray.500'}>
                  Don’t have an account yet? <Link to="/signup" style={{ color: dark  ? '#4FD1C5' : '#3182CE' }}>Sign up</Link>
                </Text>
              </VStack>
            </Box>
          </VStack>
        </Flex>
      </Box>
    </>
  )
}

export default Login