import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    InputRightAddon,
    Select,
    Stack,
    Textarea,
    useDisclosure,

} from "@chakra-ui/react";
import {
    AddIcon, PhoneIcon,
} from '@chakra-ui/icons'
import React from "react";



function AseguradoraNueva() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    return (
        <div>
            <DesktopLayout>
                <Header title={"Crear Nueva Aseguradora"} />

                <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>

                    <FormControl isRequired >
                        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
                        <Input variant="filled" id='nombre' placeholder='María' />

                    </FormControl>

                    <Stack spacing={4}>
                        <InputGroup paddingTop={15}>
                            <FormControl isRequired>
                                <FormLabel htmlFor='telefono'>Teléfono</FormLabel>
                                <InputLeftElement
                                    pointerEvents='none' paddingTop={45} paddingStart={2} children={<PhoneIcon color='gray.300' />}
                                />
                                <Input variant="filled" type='tel' placeholder='4430000000' paddingLeft={8} />
                            </FormControl>
                        </InputGroup>
                    </Stack>
                </Box>




                <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
                    <Button leftIcon={<AddIcon />} colorScheme='teal' variant='solid' onClick={onOpen}>

                        Nueva Asistencia
                    </Button>
                    <Drawer
                        isOpen={isOpen}
                        placement='right'
                        initialFocusRef={firstField}
                        onClose={onClose}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader borderBottomWidth='1px'>
                                Crea una nueva asistencia
                            </DrawerHeader>

                            <DrawerBody>
                                <Stack spacing='24px'>
                                    <Box>
                                        <FormLabel htmlFor='username'>Name</FormLabel>
                                        <Input
                                            ref={firstField}
                                            id='username'
                                            placeholder='Please enter user name'
                                        />
                                    </Box>

                                    <Box>
                                        <FormLabel htmlFor='url'>Url</FormLabel>
                                        <InputGroup>
                                            <InputLeftAddon>http://</InputLeftAddon>
                                            <Input
                                                type='url'
                                                id='url'
                                                placeholder='Please enter domain'
                                            />
                                            <InputRightAddon>.com</InputRightAddon>
                                        </InputGroup>
                                    </Box>

                                    <Box>
                                        <FormLabel htmlFor='owner'>Select Owner</FormLabel>
                                        <Select id='owner' defaultValue='segun'>
                                            <option value='segun'>Segun Adebayo</option>
                                            <option value='kola'>Kola Tioluwani</option>
                                        </Select>
                                    </Box>

                                    <Box>
                                        <FormLabel htmlFor='desc'>Description</FormLabel>
                                        <Textarea id='desc' />
                                    </Box>
                                </Stack>
                            </DrawerBody>

                            <DrawerFooter borderTopWidth='1px'>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='blue'>Submit</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </Box>



            </DesktopLayout>
        </div >
    );
}

export default AseguradoraNueva;