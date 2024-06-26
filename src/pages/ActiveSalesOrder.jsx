import React, { useState ,useEffect } from 'react'
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import ViewEditModal from '../components/ViewEditModal';
import { useContext } from 'react';
import { Context } from "../myContext";
import { Spinner } from '@chakra-ui/react'

const ActiveSalesOrder = ({ }) => {
  const { signIn, dark, formData, setformData } = useContext(Context);
  const [notsigned, setnotsigned] = useState(false)

  useEffect(() => {
    if (!signIn) {
      setTimeout(() => {
        setnotsigned(true)
      }, 2000); 
    }
  }, [signIn]);

  return (
    <>
      {signIn ?
        <Box fontFamily={"cursive"}  minHeight={"100vh"} padding={10} bg={dark ? "gray.600" : 'gray.300'}>
          <Text fontWeight={"medium"} fontSize={"large"} textAlign={"center"} padding={5}>Active Orders</Text>
          <Box bg={dark ? "gray.600" : 'gray.300'} flex='1' d='flex' flexDirection='column' alignItems='center' justifyContent='center' m={10} textAlign='center'>
            <Grid templateRows='repeat(auto-fill, minmax(50px, 1fr))' >
              <Grid templateColumns='repeat(5, 1fr)' border='1px solid black' fontWeight={"bold"}>
                <GridItem bg='red.300' p={4} border='1px solid black'>S no.</GridItem>
                <GridItem bg='green.300' p={4} border='1px solid black'>Customer Name</GridItem>
                <GridItem bg='blue.300' p={4} border='1px solid black'>Total Price</GridItem>
                <GridItem bg='yellow.300' p={4} border='1px solid black'>Last modified</GridItem>
                <GridItem bg='purple.300' p={4} border='1px solid black'>Edit/View</GridItem>
              </Grid>
              {formData && formData.map((item, i) => <Grid key={i} templateColumns='repeat(5, 1fr)' border='1px solid black'>
                <GridItem bg='red.100' p={4} border='1px solid black'>{i + 1}</GridItem>
                <GridItem overflow={"hidden"} bg='green.100' p={4} border='1px solid black'>{item.customer_id}</GridItem>
                <GridItem bg='blue.100' p={4} border='1px solid black'>{item.totalprice}</GridItem>
                <GridItem bg='yellow.100' p={4} border='1px solid black'>{`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`}</GridItem>
                <GridItem bg='purple.100' p={4} border='1px solid black'>
                  <ViewEditModal setformData={setformData} formData={formData} currentData={item} />
                  </GridItem>
              </Grid>)}
            </Grid>
          </Box></Box> : <Flex justifyContent={"center"} alignItems={"center"} minHeight={"100vh"} padding={10} bg={dark ? "gray.600" : 'gray.300'}>{notsigned?<Text p={10} textAlign={"center"}>User not signed in</Text> :<Spinner color='blue.800' size={"xl"} />}</Flex>}
    </>
  )
}

export default ActiveSalesOrder