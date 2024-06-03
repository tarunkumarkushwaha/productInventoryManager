import React from 'react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input, Box, FormErrorMessage ,Select
} from '@chakra-ui/react'

const SaleOrderModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const products = [
        { id: 1, name: 'Product A' },
        { id: 2, name: 'Product B' },
        { id: 3, name: 'Product C' },
        { id: 4, name: 'Product D' },
      ];

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl isInvalid={errors.productName} mb={4}>
                                    <FormLabel>Product Name</FormLabel>
                                    <Select
                                        id="productName"
                                        placeholder="Select product"
                                        {...register('productName', { required: 'Product name is required' })}
                                    >
                                        {products.map((product) => (
                                            <option key={product.id} value={product.name}>{product.name}</option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>{errors.productName && errors.productName.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.price} mb={4}>
                                    <FormLabel>Price</FormLabel>
                                    <Input
                                        id="price"
                                        placeholder="Price"
                                        type="number"
                                        {...register('price', {
                                            required: 'Price is required',
                                            min: { value: 0, message: 'Price must be at least 0' },
                                        })}
                                    />
                                    <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.amountInUnit} mb={4}>
                                    <FormLabel>Amount in Unit</FormLabel>
                                    <Input
                                        id="amountInUnit"
                                        placeholder="Amount in Unit"
                                        {...register('amountInUnit', { required: 'Amount in unit is required' })}
                                    />
                                    <FormErrorMessage>{errors.amountInUnit && errors.amountInUnit.message}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={errors.quantity} mb={4}>
                                    <FormLabel>Quantity</FormLabel>
                                    <Input
                                        id="quantity"
                                        placeholder="Quantity"
                                        type="number"
                                        {...register('quantity', {
                                            required: 'Quantity is required',
                                            min: { value: 1, message: 'Quantity must be at least 1' },
                                        })}
                                    />
                                    <FormErrorMessage>{errors.quantity && errors.quantity.message}</FormErrorMessage>
                                </FormControl>

                                <Button mt={4} colorScheme="teal" type="submit">Submit</Button>
                            </form>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SaleOrderModal