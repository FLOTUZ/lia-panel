import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,

} from "@chakra-ui/react";
import {AddIcon, PhoneIcon,
} from '@chakra-ui/icons'



function AseguradoraNueva() {
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
                                pointerEvents='none' paddingTop={45} paddingStart={2} children={<PhoneIcon color='gray.300'/>}
                            />
                            <Input variant="filled" type='tel' placeholder='4430000000' paddingLeft={8}/>
                        </FormControl>
                    </InputGroup>
                    </Stack>
                </Box>
             
                <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
                <Button leftIcon={<AddIcon/>} colorScheme='facebook' variant='solid'>
                    Nueva Asistencia
                </Button>
                </Box>
            </DesktopLayout>
        </div >
    );
}

export default AseguradoraNueva;