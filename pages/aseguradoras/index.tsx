import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import {
  TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Box, Button,

} from "@chakra-ui/react";
import {
  AddIcon, PhoneIcon,
} from '@chakra-ui/icons'


function AseguradorasListado() {
  return <div>Aseguradoras

    <DesktopLayout>
      <Header title={"Aseguradoras "} />
      <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>


      <Box m={2} bgColor="white" padding={5} borderRadius={10}  p='6' rounded='md' bg='white'>
                <Button leftIcon={<AddIcon/>} colorScheme='facebook' variant='solid' marginLeft={'80%'}>
                    Nueva Aseguradora
                </Button>
                </Box>



      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>Aseguradoras</TableCaption>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Estatus</Th>
              <Th>Ultima actividad</Th>
              <Th>Asistencias</Th>
              <Th>Creado</Th>
              <Th>Ultima modificacion</Th>
              <Th>Reportes</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>

      </Box>


    </DesktopLayout>
  </div>;


}

export default AseguradorasListado;
