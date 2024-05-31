import React from 'react'
import { Box, Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import ViewEditModal from '../components/ViewEditModal';
import { useContext } from 'react';
import { Context } from "../myContext";

const CompletedSalesOrder = () => {
  const { signIn } = useContext(Context);
 
  return (
    <>
      {signIn ? <Box bg='gray.100' flex='1' d='flex' flexDirection='column' alignItems='center' justifyContent='center' m={10} textAlign='center'>
        <Grid templateRows='repeat(auto-fill, minmax(50px, 1fr))'>
          <Grid templateColumns='repeat(5, 1fr)' border='1px solid black' fontWeight={"bold"}>
            <GridItem bg='red.300' p={4} border='1px solid black'>ID</GridItem>
            <GridItem bg='green.300' p={4} border='1px solid black'>Customer Name</GridItem>
            <GridItem bg='blue.300' p={4} border='1px solid black'>Price</GridItem>
            <GridItem bg='yellow.300' p={4} border='1px solid black'>Last modified</GridItem>
            <GridItem bg='purple.300' p={4} border='1px solid black'>Edit/View</GridItem>
          </Grid>
          <Grid templateColumns='repeat(5, 1fr)' border='1px solid black'>
            <GridItem bg='red.100' p={4} border='1px solid black'>maxwell</GridItem>
            <GridItem bg='green.100' p={4} border='1px solid black'>100</GridItem>
            <GridItem bg='blue.100' p={4} border='1px solid black'>loser</GridItem>
            <GridItem bg='yellow.100' p={4} border='1px solid black'>Roow</GridItem>
            <GridItem bg='purple.100' p={4} border='1px solid black'><ViewEditModal /></GridItem>
          </Grid>
        </Grid>
      </Box> : <Box>user not signed in</Box>}
    </>
  )
}

export default CompletedSalesOrder