import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";

import {
    Box,
    FormLabel,
    Input,
    FormControl,
    RadioGroup,
    HStack,
    Radio,
    InputGroup,
    InputRightElement,
    Button,
    Show,
} from "@chakra-ui/react";


function UsuarioNuevo() {
    return (
        <div>

            <DesktopLayout>
                <Header title={"Nuevo Usuario"} />

                <Box m={2} bgColor="white" padding={5} borderRadius={10}>

                    <FormControl isRequired>
                        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
                        <Input id='nombre' placeholder='María' />
                    </FormControl>

                    <FormControl isRequired paddingTop={15}>
                        <FormLabel htmlFor='apellidos'>Apellidos</FormLabel>
                        <Input id='apellidos' placeholder='Juares Gallegos' />
                    </FormControl>

                    <FormControl isRequired paddingTop={15}>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input id='email' placeholder='maria@gmail.com' />
                    </FormControl>

                    <FormControl isRequired paddingTop={15}>
                        <FormLabel htmlFor='telefono'>Teléfono</FormLabel>
                        <Input id='telefono' placeholder='4430000000' />
                    </FormControl>


                    <FormLabel as='legend' paddingTop={15}>Tipo de Usuario</FormLabel>
                    <RadioGroup defaultValue='Itachi'>
                        <HStack spacing='24px'>
                            <Radio value='Capturista'>Capturista</Radio>
                            <Radio value='Administrador'>Administrador</Radio>
                            <Radio value='Técnico'>Técnico</Radio>
                        </HStack>
                    </RadioGroup>


                    <FormControl isRequired paddingTop={15}>
                        <FormLabel htmlFor='contraseña'>Contraseña</FormLabel>
                        <Input id='contraseña' placeholder='123456789' />
                    </FormControl>
                    

                </Box>
            </DesktopLayout>

        </div>
    );
}

export default UsuarioNuevo;
