import { Input,Box, Heading, HStack, IconButton, Image, Modal, ModalCloseButton,ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack, ModalFooter ,Button} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useProductStore } from "../store/product";
import { useState } from "react";
import { set } from "mongoose";

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textcolor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue("white", 'gray.800');
    const { isOpen, onOpen, onClose } = useDisclosure(); 
    const { deleteProduct,updateProduct } = useProductStore();
    const toast = useToast();

    const handleDeleteProduct = async (pid) => {
        const {success,message}=await deleteProduct(pid)
        if (!success)
        {
               toast({
                title: "error",
                description: message,
                status: "error",
                isClosable: true
            });
        }
          else
        {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            });

        }
    }
    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
         if (!success)
        {
               toast({
                title: "error",
                description: message,
                status: "error",
                isClosable: true
            });
        }
          else
        {
            toast({
                title: "Updated",
                description: message,
                status: "success",
                isClosable: true
            });

        }

        onClose();
    }
    return (<>
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: "translate(-5px)", shadow: 'xl' }}
            bg={bg}
        >
            
            <Image src={product.image} alt={product.name} height={48} w={'full'} objectFit={'cove'} />
            
            <Box p={4}
            >
                <Heading as={'h3'} size='md' mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight={'bold'} fontSize={'xl'} color={textcolor} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
                    <IconButton icon={<DeleteIcon />} onClick={()=>handleDeleteProduct(product._id)} colorScheme="red" />
                    
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input placeholder='Product Name' name='name' value={updatedProduct.name} onChange={(e)=> setUpdatedProduct({...updatedProduct,name:e.target.value})}/>
                            <Input placeholder='Product Price' name='price' type='number' value={updatedProduct.price} onChange={(e)=> setUpdatedProduct({...updatedProduct,price:e.target.value})}/>
                             <Input placeholder='Image URL' name='image' value={updatedProduct.image} onChange={(e)=> setUpdatedProduct({...updatedProduct,image:e.target.value})}/>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={()=>(handleUpdateProduct(product._id,updatedProduct))} >Update</Button>
                        <Button variant={'ghost'} onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
    </Box>
       
    </>)
}

export default ProductCard;