import React from 'react'
import { useRef, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input, Box, Select,
    useToast, Text, Flex
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createData, Products } from '../../api';
import { useContext } from 'react';
import { Context } from "../myContext";

const SaleOrderModal = () => {
    const [item, setitem] = useState([])
    const [quantity, setQuantity] = useState(1);
    const [productName, setproductName] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const toast = useToast()
    const { name, setformData } = useContext(Context);
    const products = Products.products
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createData,
        onSuccess: () => {
            queryClient.invalidateQueries(['events']);
        },
    });

    const additem = () => {
        const filteredObjects = products.filter(obj => productName.includes(obj.name));
        filteredObjects[0].amount = quantity
        filteredObjects[0].total_price = quantity * filteredObjects[0].selling_price
        console.log(filteredObjects[0])
        setitem(prev => [...prev, ...filteredObjects])
        setproductName("")
        setQuantity(1)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (item.length < 1) {
            toast({
                title: 'error',
                description: `no items in cart`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return
        }

        const salesOrderPayload = {
            "customer_id": name,
            "items": item.map(item => item),
            "totalprice": item.reduce((total, product) => total + product.total_price, 0),
            "paid": false,
            "invoice_no": "Invoice - 1212121",
            "invoice_date": new Date()
        }
        // console.log(salesOrderPayload)
        mutation.mutate(salesOrderPayload);
        setformData(prev => [...prev, salesOrderPayload])
        setproductName("")
        setQuantity("")
        setitem([])
        onClose();
    };

    const handleInputChange = (e) => {
        setproductName(e.target.value);
    };

    const OrderedItems = ({ item }) => {
        return (
            <>
                <Flex bg={"purple.100"} margin={1} borderRadius={"25px"} flexDirection={"row"} justify={"center"} alignItems={"center"}>
                    <Text p={1} margin={3} color={"black"} fontSize={"smaller"} fontWeight={500}>{item.name}</Text>
                    <Text color={"black"} fontSize={"smaller"} fontWeight={500}>{`${item.amount} ${item.unit}`}</Text>
                    <Button bg={"purple.100"} height={"15px"} m={3} color={"red"} onClick={() => console.log(item.name, "deleted")}>X</Button>
                </Flex>
            </>
        )
    }

    return (
        <>
            <Button colorScheme='white' color={"black"} bg={'white'} variant='outline' onClick={onOpen}>+ Sale order</Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>place your order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Box maxW="md" mx="auto" mt={5} p={5} borderWidth={1} borderRadius="md" boxShadow="md">
                            <Flex flexWrap={"wrap"} justify={"center"} alignItems={"center"} >
                            {item.map((item, i) => <OrderedItems key={i} item={item} />)}
                            </Flex>
                            <form onSubmit={handleSubmit}>
                                <FormControl mb={4}>
                                    <FormLabel>Product Name</FormLabel>
                                    <Select
                                        id="productName"
                                        placeholder="Select product"
                                        value={productName}
                                        onChange={handleInputChange}
                                    >
                                        {products.map((product) => (
                                            <option key={product.id} value={product.name}>
                                                {`${product.name} price -- ${product.selling_price} rupees`}
                                            </option>
                                        ))}
                                    </Select>

                                </FormControl>

                                <FormControl mb={4}>
                                    <FormLabel>Quantity in kg</FormLabel>
                                    <Input
                                        id="quantity"
                                        placeholder={`Quantity in Kg`}
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </FormControl>

                                <Text fontWeight={"medium"}>Total Rs.{item.reduce((total, product) => total + product.total_price, 0)}</Text>

                                <Button m={4} onClick={additem} colorScheme="teal">Add item</Button>
                                <Button m={4} colorScheme="teal" type="submit">Submit</Button>
                            </form>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SaleOrderModal