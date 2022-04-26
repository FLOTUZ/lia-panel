/* eslint-disable react/no-children-prop */
import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";

import {
    AddIcon,

} from '@chakra-ui/icons'

import {
    Box,
    Divider,
    FormControl,
    FormLabel,
    Input,
    InputLeftElement,
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
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalFooter,
    ModalHeader,
    ModalBody,

} from "@chakra-ui/react";
import React from "react";

function VerTicket() {
    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <DesktopLayout>

            <Header title={"Nuevo Ticket"} />

            <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
                <Text fontWeight="bold" fontSize='25px'>Datos Básicos </Text>

                <Stack direction='row' paddingTop={15}>
                    <Divider orientation='vertical' paddingLeft={700} />
                    <FormLabel htmlFor='nExpediente'>Numero de Expediente:</FormLabel>
                    <Text marginLeft={20}>GPO728</Text>


                    <FormControl paddingTop={2} paddingLeft={2} >
                        <Stack align='center' direction='row'>
                            <Divider orientation='vertical' />
                            <FormLabel htmlFor='asistenciaVial'>Asistencia Vial</FormLabel>
                            <Switch size='md' />
                        </Stack>
                    </FormControl>
                </Stack>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15.5}>
                        <FormLabel htmlFor='horaLlamada'>Hora de la Llamada</FormLabel>
                        <Text marginLeft={5}>08:55 a.m</Text>
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor='fechaLlamada'>Fecha de la Llamada</FormLabel>
                        <Text marginLeft={5}>20/04/2022</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />

                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='asesorGpoLias'>Asesor de Gpo. Lías</FormLabel>
                        <Text marginLeft={5}>Juan Perez</Text>
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor='asesorAseguradora'>Asesor de Aseguradora</FormLabel>
                        <Text marginLeft={5}>Andres Gallegos</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='nombreUsuarioFinal'>Nombre del Usuario Final</FormLabel>
                        <Text marginLeft={5}>Andres Franco</Text>
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor='tituloTicket'>Título del Ticket</FormLabel>
                        <Text marginLeft={5}>Servicio que se dara en el hogar</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl  paddingTop={15} >
                        <FormLabel htmlFor='seguro'>Seguro</FormLabel>
                        <Text marginLeft={5}>IKE</Text>
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor='asistencia'>Asistencia</FormLabel>
                        <Text marginLeft={5}>Hogar</Text>
                    </FormControl>
                </Center>

                <FormControl paddingTop={15}>
                    <FormLabel htmlFor='descripcion'>Descripción de la Problematica</FormLabel>
                    <Text marginLeft={5}>Fuga de agua en la cocina</Text>
                </FormControl>
            </Box>


            <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
                <Text fontWeight="bold" fontSize='25px'>Cotización de Grupo Lías </Text>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='ciudad'>Ciudad</FormLabel>
                        <Text marginLeft={5}>Guadalajara</Text>
                    </FormControl>

                    <FormControl paddingTop={15} paddingLeft={5}>
                        <FormLabel htmlFor='colonia'>Colonia</FormLabel>
                        <Text marginLeft={5}>La Torrecilla</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='calle'>Calle</FormLabel>
                        <Text marginLeft={5}>Ampliación</Text>
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor='numeroDomicilio'>Número del Domicilio</FormLabel>
                        <Text marginLeft={5}>404</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='banderazo'>Banderazo</FormLabel>
                    </FormControl>

                    <FormControl paddingTop={15} paddingLeft={5}>
                        <FormLabel htmlFor='totalSalida'>Total de Salida</FormLabel>
                        <Text marginLeft={5}>$150.00</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='montoSeguro'>Monto de Cobertura del Seguro</FormLabel>
                        <Text marginLeft={5}>$350.00</Text>
                    </FormControl>

                    <FormControl paddingTop={15} paddingLeft={5}>
                        <FormLabel htmlFor='costoGpoLias'>Costo Grupo Lías</FormLabel>
                        <Text marginLeft={5}>$100.00</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='deducible'>Deducible</FormLabel>
                        <Text marginLeft={5}>$60.00</Text>
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor='kilometros'>Kilometros a Recorrer</FormLabel>
                        <Text marginLeft={5}>200</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl isRequired paddingTop={15}>
                        <FormLabel htmlFor='total'>Monto Total</FormLabel>
                        <Text marginLeft={5}>$850.00</Text>
                    </FormControl>

                    <FormControl isRequired paddingTop={15} paddingLeft={5}>
                        <FormLabel htmlFor='anticipo'>Anticipo 60%</FormLabel>
                        <Text marginLeft={5}>$680.00</Text>
                    </FormControl>
                </Center>

                <FormControl paddingTop={15}>
                    <FormLabel htmlFor='comentarios'>Comentarios de Grupo Lías</FormLabel>
                    <Text marginLeft={5}>Se realizará el siguiente servicio en la Calle la Torrecilla, dentro de un hogar</Text>
                </FormControl>
            </Box>

            <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
                <Text fontWeight="bold" fontSize='25px'>Cotización del Técnico</Text>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='cotizacionGpoLias'>Cotización de Grupo Lías</FormLabel>
                        <Text marginLeft={5}>Se realizo la cotización para un trabajo en el hogar.</Text>
                    </FormControl>

                    <FormControl paddingTop={15} paddingLeft={5}>
                        <FormLabel htmlFor='cotizacionTecnico'>Solución y Cotización del Técnico</FormLabel>
                        <Text marginLeft={5}>Se realizo la cotización para un trabajo en el hogar.</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='horaDeContacto'>Hora de Contacto</FormLabel>
                        <Text marginLeft={5}>11:00 a.m</Text>
                    </FormControl>

                    <FormControl paddingTop={15} paddingLeft={5}>
                        <FormLabel htmlFor='horaDeCierre'>Hora de Cierre</FormLabel>
                        <Text marginLeft={5}>05:00 p.m</Text>
                    </FormControl>

                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl  paddingTop={15}>
                        <FormLabel htmlFor='costoManoDeObra'>Costo de Mano de Obra</FormLabel>
                        <Text marginLeft={5}>$250</Text>
                    </FormControl>

                    <FormControl paddingTop={15} paddingLeft={5}>
                        <FormLabel htmlFor='costoMateriales'>Costo de Materiales</FormLabel>
                        <Text marginLeft={5}>$300</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' />
                    <FormControl paddingTop={15}>
                        <FormLabel htmlFor='cotizaciónTecnico'>Cotización Total del Técnico</FormLabel>
                        <Text marginLeft={5}>$150</Text>
                    </FormControl>

                    <FormControl paddingLeft={5} paddingTop={15}>
                        <FormLabel htmlFor='casetas'>Número de Casetas</FormLabel>
                        <Text marginLeft={5}>1</Text>
                    </FormControl>
                </Center>

                <Center>
                    <Divider orientation='vertical' paddingTop={30} />
                    <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' height={200} width={200}>
                        <Image src='' alt='Evidencia 1' paddingStart={8} paddingTop={16} />
                    </Box>
                    <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' height={200} width={200} paddingLeft={10}>
                        <Image src='' alt='Evidencia 2' paddingStart={8} paddingTop={16} />
                    </Box>
                </Center>
            </Box>


            <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
                <Text fontWeight="bold" fontSize='25px'>Citas</Text>


                <TableContainer marginTop={15}>
                    <Table variant='striped' colorScheme='teal'>
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
                                <Td>Trabajo en el Hogar</Td>
                                <Td>Activo</Td>
                                <Td>Plomería en el Hogar</Td>
                                <Td>Juan Perez</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
                <Text fontWeight="bold" fontSize='25px'>Seguimiento</Text>

                <TableContainer marginTop={15}>
                    <Table variant='striped' colorScheme='teal'>
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


            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input placeholder='First name' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Input placeholder='Last name' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </DesktopLayout >
    );
}

export default VerTicket;
