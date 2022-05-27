import ViewText from "@/common/ViewText";
import { Box, Center, Divider, SimpleGrid, Tab, Table, TableCaption, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import Image from "next/image";



const CrearCotizacionTecnico = () =>{
    return <div>
        <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
            <Text fontWeight="bold" fontSize='25px'>Cotización del Técnico</Text>

            <ViewText
                id_form="solucion_cotizacion_del_tecnico"
                form_label="Solución y Cotización del Técnico">
                { }
            </ViewText>

            <SimpleGrid columns={[1, 1, 2]} spacing={5}>
                <ViewText
                    id_form="hora_de_contacto"
                    form_label="Fecha y Hora de Contacto">
                    
                </ViewText>

                <ViewText
                    id_form="hora_de_cierre"
                    form_label="Hora de Cierre">
                    
                </ViewText>
            </SimpleGrid>

            <SimpleGrid columns={[1, 1, 2]} spacing={5}>
                <ViewText
                    id_form="costo_de_mano_de_obra"
                    form_label="Costo de Mano de Obra">
                    { }
                </ViewText>

                <ViewText
                    id_form="costo_de_materiales"
                    form_label="Costo de Materiales">
                    { }
                </ViewText>
            </SimpleGrid>

            <Center>
                <Divider orientation='vertical' paddingTop={30} />
                <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' height={200} width={200}>
                    <Image src='Logo' alt='Evidencia 1'  />
                </Box>
                <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' height={200} width={200} paddingLeft={10}>
                    <Image src="Logo" alt='Evidencia 2' />
                </Box>
            </Center>
        </Box>


        <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>
            <Text fontWeight="bold" fontSize='25px'>Citas</Text>


            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab>Tab 1</Tab>
                    <Tab>Tab 2</Tab>
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

    </div>;
};

export default CrearCotizacionTecnico;
