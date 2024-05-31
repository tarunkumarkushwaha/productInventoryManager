import React from 'react'
import SaleOrderModal from './SaleOrderModal';
import { Box, Button, Flex, Grid, GridItem, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from "../myContext";

const Navbar = () => {
  const navigate = useNavigate()
  const { signIn, setsignIn } = useContext(Context);
  const toast = useToast()

  return (
    <>
      {signIn && <Flex justify='center' align='center' gap={3}>
        <Button colorScheme='white' variant='outline' onClick={() => navigate("/")}>
          Active Sales Order
        </Button>
        <Button colorScheme='white' variant='outline' onClick={() => navigate("/completedsalesorder")}>
          Completed Sales Order
        </Button>
        <Button colorScheme='white' variant='outline' onClick={() => {
          setsignIn(false)
          navigate('/')
          localStorage.setItem('login', false);
          toast({
            title: 'Log out',
            description: `User successfully logged out`,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }}>
          Sign Out
        </Button>
        <SaleOrderModal />
      </Flex>}
    </>
  )
}

export default Navbar
