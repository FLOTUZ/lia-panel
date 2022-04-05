/* eslint-disable react/no-children-prop */
import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";

import {
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
} from "@chakra-ui/react";


function TicketNuevo() {
  return (
    <DesktopLayout>
      <Header title={"Nuevo Ticket"} />

      <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
        <Text fontWeight="bold" fontSize='25px'>Datos Básicos </Text>




        <Stack direction='row' paddingTop={15}>
          <Divider orientation='vertical' paddingLeft={500} />
          <FormLabel htmlFor='nExpediente'>Numero de Expediente:</FormLabel>
          <Input variant="filled" id='nExpediente' type="number" placeholder='GPO728' />

          <FormControl paddingTop={15} paddingLeft={2} >
            <Stack align='center' direction='row'>
              <Divider orientation='vertical' />
              <FormLabel htmlFor='asistenciaVial'>Asistencia Vial</FormLabel>
              <Switch size='md' />
            </Stack>
          </FormControl>
        </Stack>

        <Center>
          <Divider orientation='vertical' />
          <FormControl isRequired paddingTop={15.5}>
            <FormLabel htmlFor='horaLlamada'>Hora de la Llamada</FormLabel>
            <InputLeftElement
              pointerEvents='none' paddingTop={59} paddingStart={3} children={<PhoneIcon color='gray.300' />}
            />
            <Input variant="filled" id='horaLlamada' type="hour" placeholder='08:55 a.m.' paddingLeft={10} />
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor='fechaLlamada'>Fecha de la Llamada</FormLabel>
            <Input variant="filled" type="date" />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation='vertical' />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor='asesorGpoLias'>Asesor de Gpo. Lías</FormLabel>
            <Input variant="filled" id='asesorGpoLias' placeholder='Marí Gallegos' />
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor='asesorAseguradora'>Asesor de Aseguradora</FormLabel>
            <Input variant="filled" id='asesorAseguradora' placeholder='Juan Perez' />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation='vertical' />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor='nombreUsuarioFinal'>Nombre del Usuario Final</FormLabel>
            <Input variant="filled" id='nombreUsuarioFinal' placeholder='Andres Franco' />
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor='tituloTicket'>Título del Ticket</FormLabel>
            <Input variant="filled" id='tituloTicket' placeholder='Servicio que se dara en el hogar.' />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation='vertical' />
          <FormControl isRequired paddingTop={15} >
            <FormLabel htmlFor='seguro'>Seguro</FormLabel>
            <Select id="country" placeholder="Selecciona el Tipo de Seguro" variant="filled">
              <option>IKE</option>
              <option>AXA</option>
              <option>IGS</option>
            </Select>
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor='asistencia'>Asistencia</FormLabel>
            <Select id="asistencia" placeholder="Selecciona el Tipo de Asistencia" variant="filled">
              <option>FORD</option>
              <option>COPPEL</option>
              <option>CASA</option>
            </Select>
          </FormControl>
        </Center>

        <FormControl isRequired paddingTop={15}>
          <FormLabel htmlFor='descripcion'>Descripción de la Problematica</FormLabel>
          <Textarea variant="filled" placeholder="Fuga de agua en la cocina" />
        </FormControl>
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

          <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor='colonia'>Colonia</FormLabel>
            <Input variant="filled" id='colonia' placeholder='La Torrecilla' />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation='vertical' />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor='calle'>Calle</FormLabel>
            <Input variant="filled" id='calle' placeholder='Av. Tecnológico' />
          </FormControl>

          <FormControl isRequired paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor='numeroDomicilio'>Número del Domicilio</FormLabel>
            <Input variant="filled" id='numeroDomicilio' placeholder='F404' />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation='vertical' />
          <FormControl paddingTop={15}>
            <FormLabel htmlFor='banderazo'>Banderazo</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={4}
              color='gray.300'
              pointerEvents='none'
              children='$'
            />
            <Input variant="filled" id='banderazo' placeholder='120.00' paddingLeft={8} type="number" />
          </FormControl>

          <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor='totalSalida'>Total de Salida</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={8}
              color='gray.300'
              pointerEvents='none'
              children='$'
            />
            <Input variant="filled" id='bandetotalSalidarazo' placeholder='120.00' paddingLeft={8} type="number" />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation='vertical' />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor='montoSeguro'>Monto de Cobertura del Seguro</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={4}
              color='gray.300'
              pointerEvents='none'
              children='$'
            />
            <Input variant="filled" id='montoSeguro' placeholder='000.00' paddingLeft={8} type="number" />
          </FormControl>

          <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor='costoGpoLias'>Costo Grupo Lías</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={8}
              color='gray.300'
              pointerEvents='none'
              children='$'
            />
            <Input variant="filled" id='costoGpoLias' placeholder='000.00' paddingLeft={8} type="number" />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation='vertical' />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor='deducible'>Deducible</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={4}
              color='gray.300'
              pointerEvents='none'
              children='$'
            />
            <Input variant="filled" id='deducible' placeholder='000.00' paddingLeft={8} type="number" />
          </FormControl>

          <FormControl paddingLeft={5} paddingTop={15}>
            <FormLabel htmlFor='kilometros'>Kilometros a Recorrer</FormLabel>
            <Input variant="filled" id='kilometros' placeholder='200' type="number" />
          </FormControl>
        </Center>

        <Center>
          <Divider orientation='vertical' />
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor='total'>Monto Total</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={4}
              color='gray.300'
              pointerEvents='none'
              children='$'
            />
            <Input variant="filled" id='total' placeholder='000.00' paddingLeft={8} type="number" />
          </FormControl>

          <FormControl isRequired paddingTop={15} paddingLeft={5}>
            <FormLabel htmlFor='anticipo'>Anticipo 60%</FormLabel>
            <InputLeftElement
              paddingTop={55}
              paddingStart={8}
              color='gray.300'
              pointerEvents='none'
              children='$'
            />
            <Input variant="filled" id='anticipo' placeholder='000.00' paddingLeft={8} type="number" />
          </FormControl>
        </Center>

        <FormControl isRequired paddingTop={15}>
          <FormLabel htmlFor='comentarios'>Comentarios de Grupo Lías</FormLabel>
          <Textarea variant="filled" placeholder="Se realizara el siguiente servicio en la Avenida Tecnológico." />
        </FormControl>
      </Box>



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

    </DesktopLayout >
  );
}

export default TicketNuevo;
