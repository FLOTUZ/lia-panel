import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import {
    Box,
    FormControl,
    FormLabel,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Radio,
    RadioGroup
} from "@chakra-ui/react";

function AseguradoraNueva() {
    return (
        <div>
            <DesktopLayout>
                <Header title={"Crear Nueva Aseguradora"} />

                <Box m={2} bgColor="white" padding={5} borderRadius={10}>

                    <FormControl isRequired>
                        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
                        <Input id='nombre' placeholder='María' />
                    </FormControl>

                    <InputGroup>
                        <FormControl isRequired paddingTop={15}>
                        <FormLabel htmlFor='telefono'>Teléfono</FormLabel>
                        <InputLeftElement
                            pointerEvents='none'
                        //children={<PhoneIcon color='gray.300' />}
                        />
                        <Input type='tel' placeholder='4430000000' />
                        </FormControl>
                </InputGroup>

                

            


            </Box>
        </DesktopLayout>
        </div >
    );
}

export default AseguradoraNueva;