import { useRef, useState } from 'react'
import './App.css'
import SaleOrderModal from './components/SaleOrderModal'
import { Box, Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../api';

function App() {
  const [toggle, settoggle] = useState(true)
  const navigate = useNavigate()
  const query = useQuery({ queryKey: ['events'], queryFn: fetchData })

  // console.log(query.data)

  return (
    <>
      <h1>this is home page</h1>
    </>
  )
}

export default App
