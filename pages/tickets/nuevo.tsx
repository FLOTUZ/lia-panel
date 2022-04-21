/* eslint-disable react/no-children-prop */
import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";

import { AddIcon, CheckIcon, PhoneIcon } from "@chakra-ui/icons";

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
  Tfoot,
} from "@chakra-ui/react";

function TicketNuevo() {
  return (
    <DesktopLayout>
      <Header title={"Nuevo Ticket"} />

      <Box
        m={2}
        bgColor="white"
        padding={5}
        borderRadius={10}
        boxShadow="2xl"
        p="6"
        rounded="md"
        bg="white"
      >
        <Text fontWeight="bold" fontSize="25px">
          Datos Básicos{" "}
        </Text>

        <Stack direction="row" paddingTop={15}>
          <Divider orientation="vertical" paddingLeft={500} />
          <FormLabel htmlFor="nExpediente">Numero de Expediente:</FormLabel>
          <Input
            variant="filled"
            id="nExpediente"
            type="number"
            placeholder="GPO728"
          />

          <FormControl paddingTop={2} paddingLeft={2}>
            <Stack align="center" direction="row">
              <Divider orientation="vertical" />
              <FormLabel htmlFor="asistenciaVial">Asistencia Vial</FormLabel>
              <Switch size="md" />
            </Stack>
          </FormControl>
        </Stack>

        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15.5}>
            <FormLabel htmlFor="horaLlamada">Hora de la Llamada</FormLabel>
            <Input
              variant="filled"
              id="horaLlamada"
              type="time"
              placeholder="08:55 a.m."
              paddingLeft={5}
            />
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor="fechaLlamada">Fecha de la Llamada</FormLabel>
            <Input variant="filled" type="date" />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="asesorGpoLias">Asesor de Gpo. Lías</FormLabel>
            <Input
              variant="filled"
              id="asesorGpoLias"
              placeholder="Marí Gallegos"
            />
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor="asesorAseguradora">
              Asesor de Aseguradora
            </FormLabel>
            <Input
              variant="filled"
              id="asesorAseguradora"
              placeholder="Juan Perez"
            />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="nombreUsuarioFinal">
              Nombre del Usuario Final
            </FormLabel>
            <Input
              variant="filled"
              id="nombreUsuarioFinal"
              placeholder="Andres Franco"
            />
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor="tituloTicket">Título del Ticket</FormLabel>
            <Input
              variant="filled"
              id="tituloTicket"
              placeholder="Servicio que se dara en el hogar."
            />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="seguro">Seguro</FormLabel>
            <Select
              id="country"
              placeholder="Selecciona el Tipo de Seguro"
              variant="filled"
            >
              <option>IKE</option>
              <option>AXA</option>
              <option>IGS</option>
            </Select>
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor="asistencia">Asistencia</FormLabel>
            <Select
              id="asistencia"
              placeholder="Selecciona el Tipo de Asistencia"
              variant="filled"
            >
              <option>FORD</option>
              <option>COPPEL</option>
              <option>CASA</option>
            </Select>
          </FormControl>
        </Center>

        <FormControl isRequired paddingTop={15}>
          <FormLabel htmlFor="descripcion">
            Descripción de la Problematica
          </FormLabel>
          <Textarea variant="filled" placeholder="Fuga de agua en la cocina" />
        </FormControl>
      </Box>

      <Box
        m={2}
        bgColor="white"
        padding={5}
        borderRadius={10}
        boxShadow="2xl"
        p="6"
        rounded="md"
        bg="white"
      >
        <Text fontWeight="bold" fontSize="25px">
          Cotización de Grupo Lías{" "}
        </Text>

        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="ciudad">Ciudad</FormLabel>
            <Select
              id="ciudad"
              placeholder="Selecciona la Ciudad"
              variant="filled"
            >
              <option>Guadalajara</option>
              <option>Puebla</option>
              <option>Morelia</option>
            </Select>
          </FormControl>

          <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor="colonia">Colonia</FormLabel>
            <Input variant="filled" id="colonia" placeholder="La Torrecilla" />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="calle">Calle</FormLabel>
            <Input variant="filled" id="calle" placeholder="Av. Tecnológico" />
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor="numeroDomicilio">
              Número del Domicilio
            </FormLabel>
            <Input variant="filled" id="numeroDomicilio" placeholder="F404" />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" />
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="banderazo">Banderazo</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={4}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="banderazo"
              placeholder="0.00"
              paddingLeft={8}
              type="number"
            />
          </FormControl>

          <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor="totalSalida">Total de Salida</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={8}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="bandetotalSalidarazo"
              placeholder="0.00"
              paddingLeft={8}
              type="number"
            />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="montoSeguro">
              Monto de Cobertura del Seguro
            </FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={4}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="montoSeguro"
              placeholder="0.00"
              paddingLeft={8}
              type="number"
            />
          </FormControl>

          <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor="costoGpoLias">Costo Grupo Lías</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={8}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="costoGpoLias"
              placeholder="0.00"
              paddingLeft={8}
              type="number"
            />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="deducible">Deducible</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={4}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="deducible"
              placeholder="0.00"
              paddingLeft={8}
              type="number"
            />
          </FormControl>

          <FormControl paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor="kilometros">Kilometros a Recorrer</FormLabel>
            <Input
              variant="filled"
              id="kilometros"
              placeholder="0"
              type="number"
              min={0}
            />
          </FormControl>

          <FormControl paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor="kilometros">Numero de casetas</FormLabel>
            <Input
              variant="filled"
              id="kilometros"
              placeholder="0"
              min={0}
              type="number"
            />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="total">Monto Total</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={4}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="total"
              placeholder="0.00"
              paddingLeft={8}
              type="number"
            />
          </FormControl>

          <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor="anticipo">Anticipo 60%</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={8}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="anticipo"
              placeholder="0.00"
              paddingLeft={8}
              type="number"
            />
          </FormControl>
        </Center>

        <FormControl isRequired paddingTop={15}>
          <FormLabel htmlFor="comentarios">Comentarios de Grupo Lías</FormLabel>
          <Textarea
            variant="filled"
            placeholder="Se realizará el siguiente servicio en la Avenida Tecnológico."
          />
        </FormControl>
      </Box>

      <Box
        m={2}
        bgColor="white"
        padding={5}
        borderRadius={10}
        boxShadow="2xl"
        p="6"
        rounded="md"
        bg="white"
      >
        <Text fontWeight="bold" fontSize="25px">
          Cotización del Técnico
        </Text>

        <Center>
          <Divider orientation="vertical" />

          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="cotizacionTecnico">
              Solución y Cotización del Técnico
            </FormLabel>
            <Textarea variant="filled" placeholder="Aquí va el texto..." />
          </FormControl>
        </Center>

        <Center>
          <FormControl isRequired paddingTop={15} paddingRight={15}>
            <FormLabel htmlFor="horaDeContacto">Hora de Contacto</FormLabel>
            <Input
              variant="filled"
              id="horaDeContacto"
              type="time"
              placeholder="08:55 a.m."
              paddingLeft={5}
            />
          </FormControl>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="costoManoDeObra">
              Costo de Mano de Obra
            </FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={4}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="costoManoDeObra"
              placeholder="120.00"
              paddingLeft={8}
              type="number"
            />
          </FormControl>

          <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor="costoMateriales">Costo de Materiales</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={8}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="costoMateriales"
              placeholder="000.00"
              paddingLeft={8}
              type="number"
            />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="cotizaciónTecnico">
              Cotización Total del Técnico
            </FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={8}
              color="gray.300"
              pointerEvents="none"
              children="$"
            />
            <Input
              variant="filled"
              id="cotizaciónTecnico"
              placeholder="120.00"
              paddingLeft={8}
              type="number"
            />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation="vertical" paddingTop={30} />
          <Box
            m={2}
            bgColor="white"
            padding={5}
            borderRadius={10}
            boxShadow="2xl"
            p="6"
            height={200}
            width={200}
          >
            <Image
              src=""
              alt="Evidencia justificacion del problema 1"
              paddingStart={8}
              paddingTop={16}
            />
          </Box>
          <Box
            m={2}
            bgColor="white"
            padding={5}
            borderRadius={10}
            boxShadow="2xl"
            p="6"
            height={200}
            width={200}
            paddingLeft={10}
          >
            <Image
              src=""
              alt="Evidencia justificacion del problema 2"
              paddingStart={8}
              paddingTop={16}
            />
          </Box>
        </Center>
      </Box>

      <Box
        m={2}
        bgColor="white"
        padding={5}
        borderRadius={10}
        boxShadow="2xl"
        p="6"
        rounded="md"
        bg="white"
      >
        <Text fontWeight="bold" fontSize="25px">
          Citas
        </Text>

        <Button
          leftIcon={<AddIcon />}
          colorScheme="facebook"
          variant="solid"
          marginTop={15}
          marginLeft={900}
        >
          Nueva Cita
        </Button>

        <TableContainer marginTop={15}>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Citas</TableCaption>
            <Thead>
              <Tr>
                <Th>Título del Ticket</Th>
                <Th>Estatus</Th>
                <Th>Ultima actividad</Th>
                <Th>Creado</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Trabajo de Plomeria</Td>
                <Td>Activo</Td>
                <Td>Plomería en el Hogar</Td>
                <Td>Juan Perez</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Box
        m={2}
        bgColor="white"
        padding={5}
        borderRadius={10}
        boxShadow="2xl"
        p="6"
        rounded="md"
        bg="white"
      >
        <Text fontWeight="bold" fontSize="25px">
          Seguimiento
        </Text>

        <Button
          leftIcon={<AddIcon />}
          colorScheme="facebook"
          variant="solid"
          marginTop={15}
          marginLeft={850}
        >
          Nuevo Seguimiento
        </Button>

        <TableContainer marginTop={15}>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Seguimiento</TableCaption>
            <Thead>
              <Tr>
                <Th>Asesor Grupo Lías</Th>
                <Th>Seguimiento</Th>
                <Th>Asesor de Seguro</Th>
                <Th>Fecha</Th>
                <Th>Hora</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Juan Perez</Td>
                <Td>Alejandro Hernandez</Td>
                <Td>Enrique Zavala</Td>
                <Td>12/03/2022</Td>
                <Td>11:00 a.m.</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </DesktopLayout>
  );
}

export default TicketNuevo;
