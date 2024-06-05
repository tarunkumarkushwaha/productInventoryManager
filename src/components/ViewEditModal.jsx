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
    useToast,
    Text,
    Flex
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createData, Products, patchData } from '../../api';
import { useContext } from 'react';
import { Context } from "../myContext";

const ViewEditModal = ({ formData, setformData, currentData }) => {
    const [items, setitems] = useState(currentData.items)
    const [quantity, setQuantity] = useState(1);
    const [productName, setproductName] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const toast = useToast()
    const { name } = useContext(Context);
    const products = Products.products
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: patchData,
        onSuccess: () => {
            queryClient.invalidateQueries(['events']);
        },
    });

    const additem = () => {
        const filteredObjects = products.filter(obj => productName.includes(obj.name));
        if (filteredObjects.length < 1) {
            toast({
                title: 'error',
                description: `no items selected`,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            return
        }
        filteredObjects[0].amount = quantity
        filteredObjects[0].total_price = quantity * filteredObjects[0].selling_price
        // console.log(filteredObjects)
        setitems(prev => [...prev, ...filteredObjects])
        setproductName("")
        setQuantity(1)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (items.length < 1) {
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
            "items": items.map(item => item),
            "totalprice": items.reduce((total, product) => total + product.total_price, 0),
            "paid": false,
            "invoice_no": "Invoice - 1212121",
            "invoice_date": new Date()
        }

        // setformData([...modorder, salesOrderPayload])
        console.log(salesOrderPayload)
        setproductName("")
        setQuantity("")
        setitems([])
        onClose();
    };

    const handleInputChange = (e) => {
        setproductName(e.target.value);
    };

    const OrderedItems = ({ item }) => {
        const deleteitem = () => {
            let olditem = items
            let newarray = [...olditem.slice(0, items.indexOf(item)), ...olditem.slice(items.indexOf(item) + 1)];
            // console.log(olditem,newarray)
            setitems(newarray)
        }
        // console.log(item,items.indexOf(item))
        return (
            <>
                <Flex bg={"purple.100"} margin={1} borderRadius={"25px"} flexDirection={"row"} justify={"center"} alignItems={"center"}>
                    <Text p={1} margin={3} color={"black"} fontSize={"smaller"} fontWeight={500}>{item.name}</Text>
                    <Text color={"black"} fontSize={"smaller"} fontWeight={500}>{`${item.amount} ${item.unit}`}</Text>
                    <Button bg={"purple.100"} height={"15px"} m={3} color={"red"} onClick={deleteitem}>X</Button>
                </Flex>
            </>
        )
    }

    return (
        <>
            <Box cursor={"pointer"} fontWeight={"700"} onClick={onOpen}>...</Box>
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
                                {items.map((item, i) => <OrderedItems key={i} item={item} />)}
                            </Flex>
                            {/* <Box p={4} fontSize={"larger"} fontWeight={500}>date - {currentData.invoice_date}</Box>                           */}
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
                                    <FormLabel>Quantity</FormLabel>
                                    <Input
                                        id="quantity"
                                        placeholder="Quantity"
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </FormControl>

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

export default ViewEditModal