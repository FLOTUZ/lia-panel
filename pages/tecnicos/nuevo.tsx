import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";

import {
  AddIcon,
  CheckIcon,
  PhoneIcon,
} from '@chakra-ui/icons'

import {
    Box,
    Checkbox,
    Divider,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Select,
    Text,
    Textarea,
    Center,
    Stack,
    Switch,
    Image,
    Button,
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot
  } from "@chakra-ui/react";

  function TecnicoNuevo() {
    return (
        <DesktopLayout>
      <Header title={"Nuevo Ticket"} />

      <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
        <Text fontWeight="bold" fontSize='25px'>Datos Usuario </Text>

        <Center>
          <Divider orientation='vertical' />
          <FormControl isRequired paddingTop={15.5}>
            <FormLabel htmlFor='usuario'>Usuario</FormLabel>
            <Input variant="filled" id='usuario' placeholder='usuario' paddingLeft={5} />
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor='nombre'>Nombre</FormLabel>
            <Input variant="filled"  id='Nombre' placeholder='Nombre'/>
          </FormControl>
        </Center>

        <Center>
          <Divider orientation='vertical' />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor='apellidoPaterno'>Apellido Paterno</FormLabel>
            <Input variant="filled" id='apellidoPaterno' placeholder='Apellido Paterno' />
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor='apellidoMaterno'>Apellieo Materno</FormLabel>
            <Input variant="filled" id='apellidoMaterno' placeholder='Apellido Materno' />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation='vertical' />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor='email'>E-mail</FormLabel>
            <Input variant="filled" id='email' placeholder='e-mail@correo.com' />
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor='password'>Contraseña</FormLabel>
            <Input variant="filled" id='password' placeholder='Contraseña' />
          </FormControl>
        </Center>

      </Box>

      <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
        <Text fontWeight="bold" fontSize='25px'>Cotización de Grupo Lías </Text>

        <Center>
            
          <Divider orientation='vertical' />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor='ciudad'>Ciudad</FormLabel>
            <Select id="ciudad" placeholder="Selecciona la Ciudad" variant="filled">
              <option>Guadalajara</option>
              <option>Puebla</option>
              <option>Morelia</option>
            </Select>
          </FormControl>

        </Center>
      </Box>

      


      <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
        <Text fontWeight="bold" fontSize='25px'>Datos del Técnico</Text>

        <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor='telefono'>Telefono</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={8}
              color='gray.300'
              pointerEvents='none'
            />
            <Input variant="filled" id='anticipo' placeholder='4431777777' paddingLeft={8} type="number" />
          </FormControl>

          <FormControl paddingTop={2} paddingLeft={2} >
            <Stack align='center' direction='row'>
            <Divider orientation='vertical' />
            </Stack>
          </FormControl>

        <FormControl paddingTop={2} paddingLeft={2} >
            <Stack align='center' direction='row'>
              <Divider orientation='vertical' />
              <FormLabel htmlFor='asistenciaVial'>Uso de la Aplicación</FormLabel>
              <Switch size='md' />
            </Stack>
          </FormControl>

        
      </Box>

    </DesktopLayout >

    );
}

export default TecnicoNuevo;