import { useRef, useState } from 'react'
import './App.css'
import SaleOrderModal from './components/SaleOrderModal'
import { Box, Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [toggle, settoggle] = useState(true)
  const navigate = useNavigate()

  return (
    <>
      <Flex justify='center' align='center' gap={3}>
        <Button colorScheme='white' variant='outline' onClick={() => navigate("/")}>
          Active Sales Order
        </Button>
        <Button colorScheme='white' variant='outline' onClick={() => navigate("/completedsalesorder")}>
          Completed Sales Order
        </Button>
        <SaleOrderModal />
      </Flex>
    </>
  )
}

export default App
