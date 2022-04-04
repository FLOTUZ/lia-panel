/* eslint-disable react/no-children-prop */
import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";

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
} from "@chakra-ui/react";

function TicketNuevo() {
  return (
    <DesktopLayout>
      <Header title={"Nuevo Ticket"} />

      <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
        <Text fontWeight="bold" fontSize='25px'>Datos Básicos </Text>

        <Stack direction='row' >
          <Divider orientation='vertical' paddingLeft={700}/>
          <FormLabel htmlFor='nExpediente'>Numero de Expediente:</FormLabel>
            <Input variant="filled" id='nExpediente' type="number" placeholder='GPO728' />
        </Stack>

        

        <Center>
          <Divider orientation='vertical' />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor='horaLlamada'>Hora de la Llamada</FormLabel>
            <Input variant="filled" id='horaLlamada' type="hour" placeholder='08:55 a.m.' />
          </FormControl>

          <FormControl isRequired paddingLeft={5}>
            <FormLabel htmlFor='fechaLlamada'>Fecha de la Llamada</FormLabel>
            <Input variant="filled" type="date" />
          </FormControl>
        </Center>



        <Text mb="8px">Nombre del asesor de la aseguradora: </Text>
        <Input variant="filled" placeholder="Ej. AXA" />

        <Text mb="8px">Nombre del asesor Gpo Lias: </Text>
        <Input variant="filled" placeholder="Ej: Juan Vazquez" />



        <Text mb="8px">Asistencia vial: </Text>
        <Checkbox defaultChecked>Es asistencia vial</Checkbox>

        <Text mb="8px">Nombre del usuario final: </Text>
        <Input variant="filled" placeholder="Ej: María Rodriguez" />

        <Text mb="8px">Descripción de la Problematica: </Text>
        <Textarea variant="filled" placeholder="Fuga de agua en la cocina" />

        <FormLabel mb="8px" htmlFor="country">
          Localidad de la problematica
        </FormLabel>
        <Select id="country" placeholder="Selecciona el lugar">
          <option>Morelia</option>
          <option>Tarimbaro</option>
        </Select>

        <Text mb="8px">Colonia: </Text>
        <Input variant="filled" placeholder="Ej: Lomas de Santiaguito" />

        <Text mb="8px">Calle: </Text>
        <Input variant="filled" placeholder="Ej: Av. Tecnologico" />

        <Text mb="8px">Numero del domicilio: </Text>
        <Input type="number" variant="filled" placeholder="Numero" />

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children="$"
          />

          <Input placeholder="Ingresa el monto" />

          <InputRightElement />
        </InputGroup>
      </Box>
    </DesktopLayout>
  );
}

export default TicketNuevo;
