import { Link, useNavigate } from "react-router-dom"
import { useContext } from 'react';
import { Context } from "../myContext";
import { useState } from "react"
import {
  useToast,
  HStack,
  Box,
  Flex,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Text,
  useColorMode,
} from '@chakra-ui/react';

const Signup = () => {
  const [naam, setNaam] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { colorMode } = useColorMode();
  const { setName, setPwd } = useContext(Context);

  const toast = useToast()

  const passwordValidator = (pass) => {
    let passobject = { password: pass, error: false, errormessege: "" }
    if (pass.length > 8) {
      let capital = []
      let small = []
      let specialordigit = []
      pass.split('').map((char) => {
        if (char.charCodeAt() >= 65 && char.charCodeAt() <= 90) {
          capital.push(char)
        }
        else if (char.charCodeAt() >= 97 && char.charCodeAt() <= 122) {
          small.push(char)
        } else { specialordigit.push(char) }
      })
      if (capital.length < 1) {
        passobject.error = true
        passobject.errormessege = "password must contain a capital letter"
        return passobject
      }
      if (specialordigit.length < 1) {
        passobject.error = true
        passobject.errormessege = "password must contain a special letter"
        return passobject
      }
      else { return passobject }
    }
    else if (pass.length < 8 || pass.length == 0) {
      passobject.error = true
      passobject.errormessege = "password must be of 8 characters"
      return passobject
    }
  }

  const handle = () => {
    setName(naam)
    setPwd(password)
  };

  let navigate = useNavigate()

  const handleSignup = () => {
    if (naam.length <= 3) {
      toast({
        title: 'Error',
        description: "name must be of 3 characters",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }

    if (passwordValidator(password).error) {
      let messege = passwordValidator(password).errormessege
      toast.error(messege)
      return
    }
    if (checkPassword == password) {
      handle()
      navigate("/login")
      toast({
        title: 'Success',
        description: "acount created",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      localStorage.setItem('Name', JSON.stringify(naam));
      localStorage.setItem('Password', JSON.stringify(password));
    }
    else {
      toast({
        title: 'Error',
        description: "password don't match",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Box minH="100vh">
        <Flex bg="rgba(15, 23, 42, 0.6)" minH="100vh" justifyContent="center" alignItems="center">
          <VStack spacing={8} px={6} py={8} mx="auto" w="full" maxW="md">
            <Box bg={colorMode === 'dark' ? 'gray.800' : 'white'} rounded="lg" shadow="md" p={8} w="full">
              <Heading as="h1" size="xl" textAlign="center" mb={6} color={colorMode === 'dark' ? 'white' : 'gray.900'}>
                Create an account
              </Heading>
              <VStack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Your email</FormLabel>
                  <Input
                    value={naam}
                    onChange={(e) => setNaam(e.target.value)}
                    type="email"
                    name="email"
                    placeholder="name@anymail.com"
                    bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                    borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.300'}
                    focusBorderColor={colorMode === 'dark' ? 'blue.500' : 'primary.600'}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                    borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.300'}
                    focusBorderColor={colorMode === 'dark' ? 'blue.500' : 'primary.600'}
                  />
                </FormControl>
                <FormControl id="confirm-password">
                  <FormLabel>Confirm password</FormLabel>
                  <Input
                    value={checkPassword}
                    onChange={(e) => setCheckPassword(e.target.value)}
                    type={showPass ? "text" : "password"}
                    name="confirm-password"
                    placeholder="••••••••"
                    bg={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                    borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.300'}
                    focusBorderColor={colorMode === 'dark' ? 'blue.500' : 'primary.600'}
                  />
                </FormControl>
                <HStack spacing={2}>
                  <Checkbox
                    isChecked={showPass}
                    onChange={(e) => setShowPass(e.target.checked)}
                    colorScheme="teal"
                  />
                  <Text color={colorMode === 'dark' ? 'white' : 'gray.900'}>View password</Text>
                </HStack>
                <Button
                  onClick={handleSignup}
                  w="full"
                  colorScheme="teal"
                  bgGradient="linear(to-br, green.400, blue.600)"
                  _hover={{
                    bgGradient: "linear(to-bl, green.400, blue.600)"
                  }}
                  size="lg"
                >
                  Create an account
                </Button>
                <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}>
                  Already have an account? <Link to="/login" style={{ color: colorMode === 'dark' ? '#4FD1C5' : '#3182CE' }}>Login here</Link>
                </Text>
              </VStack>
            </Box>
          </VStack>
        </Flex>
      </Box>
    </>
  )
}

export default Signup