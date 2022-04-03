/* eslint-disable react/no-children-prop */
import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";

import {
  Box,
  Checkbox,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";

function TicketNuevo() {
  return (
    <DesktopLayout>
      <Header title={"Nuevo Ticket"} />

      <Box m={2} bgColor="white" padding={5} borderRadius={10}>
        <Text mb="8px">Numero de expediente: </Text>
        <Input variant="filled" placeholder="Ej:18120215" type="number" />

        <Text mb="8px">Nombre del asesor de la aseguradora: </Text>
        <Input variant="filled" placeholder="Ej. AXA" />

        <Text mb="8px">Nombre del asesor Gpo Lias: </Text>
        <Input variant="filled" placeholder="Ej: Juan Vazquez" />

        <Text mb="8px">Fecha llamada: </Text>
        <Input variant="filled" type="date" />

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
