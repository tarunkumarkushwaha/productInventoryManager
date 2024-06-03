import './App.css'
import { Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { Context } from "./myContext";

function App() {
  const { dark } = useContext(Context);

  return (
    <>
      <Flex justify={"center"} minHeight={"100vh"} flexWrap={"wrap"} align='center' padding={"10px"} gap={3} bg={dark ? "gray.600" : 'gray.300'}>

        <Text color={dark ? "gray.100" : 'gray.900'} fontSize='2xl'>
          Seamless Inventory management on the go
        </Text>
      </Flex>

    </>
  )
}

export default App
