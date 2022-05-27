import ViewText from "@/common/ViewText";
import { Box, Button, Center, Divider, FormControl, FormLabel, Input, SimpleGrid, Tab, Table, TableCaption, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import Image from "next/image";
import { BsPrinter } from "react-icons/bs";
import Logo from "../../public/logo.jpeg";

interface IcotizacionTecnico {
    nombre: string;
}

const CrearCotizacionTecnicoForm = () => {
    return <div>
        <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
            <Text fontWeight="bold" fontSize='25px'>Cotización del Técnico</Text>

            <FormControl paddingLeft={5} paddingTop={15}>
                <FormLabel htmlFor="solucion_cotizacion_del_tecnico">
                    Solución y Cotización del Técnico
                </FormLabel>
                <Input
                    variant="unstyled"
                    isReadOnly
                    id="fecha_solucion_cotizacion_del_tecnicollamada"
                    placeholder="Solución y Cotización del Técnico"
                    borderColor="twitter.100"
                />
            </FormControl>

            <SimpleGrid columns={[1, 1, 2]} spacing={5}>
                <FormControl paddingLeft={5} paddingTop={15}>
                    <FormLabel htmlFor="fecha_llamada">
                        Fecha y Hora de Contacto
                    </FormLabel>
                    <Input
                        variant="unstyled"
                        isReadOnly
                        id="fecha_llamada"
                        placeholder="Fecha y Hora de Contacto"
                        borderColor="twitter.100"
                    />
                </FormControl>

                <FormControl paddingLeft={5} paddingTop={15}>
                    <FormLabel htmlFor="hora_cierre">
                        Hora de Cierre
                    </FormLabel>
                    <Input
                        variant="unstyled"
                        isReadOnly
                        id="hora_cierre"
                        placeholder="Hora de Cierre"
                        borderColor="twitter.100"
                    />
                </FormControl>
            </SimpleGrid>

            <SimpleGrid columns={[1, 1, 2]} spacing={5}>
                <FormControl paddingLeft={5} paddingTop={15}>
                    <FormLabel htmlFor="costo_de_mano_de_obra">
                        Costo de Mano de Obra
                    </FormLabel>
                    <Input
                        variant="unstyled"
                        isReadOnly
                        id="costo_de_mano_de_obra"
                        placeholder="Costo de Mano de Obra"
                        borderColor="twitter.100"
                    />
                </FormControl>

                <FormControl paddingLeft={5} paddingTop={15}>
                    <FormLabel htmlFor="costo_de_materiales">
                        Costo de Materiales
                    </FormLabel>
                    <Input
                        variant="unstyled"
                        isReadOnly
                        id="costo_de_materiales"
                        placeholder="Costo de Materiales"
                        borderColor="twitter.100"
                    />
                </FormControl>
            </SimpleGrid>

            <Center>
                <Divider orientation='vertical' paddingTop={30} />
                <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' height={200} width={200}>
                    <Image src={Logo} alt='Evidencia 1' />
                </Box>
                <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' height={200} width={200} paddingLeft={10}>
                    <Image src={Logo} alt='Evidencia 2' />
                </Box>
            </Center>
        </Box>


        <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
            <Text fontWeight="bold" fontSize='25px'>Citas</Text>


            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab>Cita 1</Tab>
                    <Tab>Cita 2</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <p>Cita 1</p>
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
                    </TabPanel>
                    <TabPanel>
                        <p>Cita 2</p>
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
                    </TabPanel>
                </TabPanels>
            </Tabs>
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
                    <Button
                        marginTop={15}
                        marginRight={8}
                        justifySelf="end"
                        leftIcon={<BsPrinter/>}
                        id="imprimirTicket"
                        type="submit"
                        colorScheme="telegram"
                        borderColor="twitter.100"
                        size="lg"
                    >
                        Imprimir
                    </Button>
                </Box>

    </div>;
};

export default CrearCotizacionTecnicoForm;
