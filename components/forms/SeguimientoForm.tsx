import { Box, Tab, Table, TableCaption, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

const SeguimientoForm = () => {
    return (
        <div>
            
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
        </div>
    );
}

export default SeguimientoForm;