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
import { useContext } from 'react';
import { Context } from "../myContext";

const ViewEditModal = ({ currentData }) => {
    const [items, setitems] = useState(currentData && currentData.items)
    const [quantity, setQuantity] = useState(1);
    const [productName, setproductName] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const toast = useToast()

    const { Products, patchdata, deletedata } = useContext(Context);
    const products = Products

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
                description: `no items in cart do you want to delete order`,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            return
        }
        let payload = { currentData: currentData, items: items }
        patchdata.mutate(payload)
        onClose();
        toast({
            title: 'success',
            description: `order modified`,
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
    };

    const cancelOrder = () => {
        deletedata.mutate(currentData)
        setproductName("")
        setQuantity("")
        setitems([])
        onClose();
        toast({
            title: 'success',
            description: `order deleted`,
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
    };

    const handleInputChange = (e) => {
        setproductName(e.target.value);
    };

    const OrderedItems = ({ item }) => {
        const deleteitem = () => {
            let olditem = items
            let newarray = [...olditem.slice(0, items.indexOf(item)), ...olditem.slice(items.indexOf(item) + 1)];
            setitems(newarray)
        }
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
                    <ModalHeader fontFamily={"cursive"} >place your order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Box fontFamily={"cursive"} maxW="md" mx="auto" mt={5} p={5} borderWidth={1} borderRadius="md" boxShadow="md">
                            <Flex flexWrap={"wrap"} justify={"center"} alignItems={"center"} >
                                {items.map((item, i) => <OrderedItems key={i} item={item} />)}
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
                                        {products && products.map((product) => (
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
                                {/* <Box p={2} fontSize={"smaller"} fontWeight={500}>Date - {currentData.invoice_date}</Box>                           */}
                                <Text fontWeight={"medium"}>Total Rs.{items.reduce((total, product) => total + product.total_price, 0)}</Text>
                                <Button m={2} onClick={additem} colorScheme="teal">Add item</Button>
                                <Button m={2} onClick={cancelOrder} colorScheme="teal">Cancel order</Button>
                                <Button m={2} colorScheme="teal" type="submit">Submit</Button>
                            </form>
                        </Box>
                    </ModalBody>


                </ModalContent>
            </Modal>
        </>
    )
}

export default ViewEditModal