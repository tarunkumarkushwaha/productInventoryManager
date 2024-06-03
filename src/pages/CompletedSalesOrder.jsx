import React from 'react'
import { Box, Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import ViewEditModal from '../components/ViewEditModal';
import { useContext } from 'react';
import { Context } from "../myContext";
import { completedOrders } from '../../api';

const CompletedSalesOrder = () => {
  const { signIn, dark } = useContext(Context);

  return (
    <>
      {signIn ? 
      <Flex justify={"space-between"} minHeight={"100vh"} flexWrap={"wrap"} align='center' padding={"10px"} gap={3} bg={dark ? "gray.600" : 'gray.300'}>
      <Box flex='1' d='flex' flexDirection='column' alignItems='center' justifyContent='center' m={10} textAlign='center'>
        <Grid templateRows='repeat(auto-fill, minmax(50px, 1fr))'>
          <Grid templateColumns='repeat(5, 1fr)' border='1px solid black' fontWeight={"bold"}>
            <GridItem bg='red.300' p={4} border='1px solid black'>ID</GridItem>
            <GridItem bg='green.300' p={4} border='1px solid black'>Customer Name</GridItem>
            <GridItem bg='blue.300' p={4} border='1px solid black'>Price</GridItem>
            <GridItem bg='yellow.300' p={4} border='1px solid black'>Last modified</GridItem>
            <GridItem bg='purple.300' p={4} border='1px solid black'>Edit/View</GridItem>
          </Grid>
          {completedOrders.map((item,i)=><Grid key={i} templateColumns='repeat(5, 1fr)' border='1px solid black'>
            <GridItem bg='red.100' p={4} border='1px solid black'>{i+1}</GridItem>
            <GridItem bg='green.100' p={4} border='1px solid black'>{item.customer_id}</GridItem>
            <GridItem bg='blue.100' p={4} border='1px solid black'>{item.totalprice}</GridItem>
            <GridItem bg='yellow.100' p={4} border='1px solid black'>{`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`}</GridItem>
            <GridItem bg='purple.100' p={4} border='1px solid black'><ViewEditModal /></GridItem>
          </Grid>)}
        </Grid>
      </Box>
      </Flex> : <Box>user not signed in</Box>}
    </>
  )
}

export default CompletedSalesOrder