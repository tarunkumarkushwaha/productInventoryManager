import React from 'react'
import { useContext } from 'react';
import { Context } from "../myContext";
import { Flex, Text, Box } from '@chakra-ui/react';

const Footer = () => {
  const { dark } = useContext(Context);
  return (
    <>
    <Box color={dark ? "gray.100" : 'gray.900'} textAlign={"center"} bg={dark ? "gray.900" : 'gray.400'}>© 2024 Tarun kushwaha</Box>
    </>
  )
}

export default Footer