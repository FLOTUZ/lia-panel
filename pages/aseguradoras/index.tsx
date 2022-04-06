import Header from "@/common/Header";
import Link from "next/link";
import DesktopLayout from "@/layouts/DesktopLayout";
import {
  TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Box, Button, FormLabel, Input, InputLeftAddon, InputGroup, IconButton, EditableInput, Spacer,

} from "@chakra-ui/react";
import {
  AddIcon, AttachmentIcon, EditIcon, PhoneIcon, SearchIcon,
} from '@chakra-ui/icons'
import { useState } from "react";
import { userInfo } from "os";



function AseguradorasListado() {

  const [query, setQuery] = useState("");

  return <div>Aseguradoras

    <DesktopLayout>
      <Header title={"Aseguradoras "} />
      <Box m={2} bgColor="white" padding={5} borderRadius={10} boxShadow='2xl' p='6' rounded='md' bg='white'>


        <Box m={2} bgColor="white" padding={5} borderRadius={10} p='6' rounded='md' bg='white'>
          <Link href={"/aseguradoras/nuevo"}>

            <a>             <Button leftIcon={<AddIcon />} colorScheme='facebook' variant='solid' marginLeft={'80%'}>Nueva aseguradora</Button >
            </a>
          </Link>

        </Box>



        <InputGroup marginLeft={350} marginBlockEnd={10}>
          <InputLeftAddon>
            <IconButton
              disabled
              aria-label='Search database'
              icon={<SearchIcon />}
            />  </InputLeftAddon>

          <Input htmlSize={60} width='auto' type='text' placeholder='Buscar aseguradoras...' className="search" />
        </InputGroup>


        <TableContainer>
          <Table variant='simple' colorScheme='teal'>
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
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Nombre</Td>
                <Td>Estatus</Td>
                <Td>Actividad</Td>
                <Td> 5 <IconButton
                  variant='ghost'
                  aria-label='add'
                  icon={<AddIcon />}
                /></Td>
                <Td>creado</Td>
                <Td>Modificacion</Td>
                <Td>reportes</Td>
                <Td> <IconButton

                  aria-label='Search database'
                  icon={<EditIcon />}
                /></Td>
              </Tr>
              <Tr>
                <Td>Nombre</Td>
                <Td>Estatus</Td>
                <Td>Actividad</Td>
                <Td>
                  1 <IconButton
                    variant='ghost'

                    aria-label='add'
                    icon={<AddIcon />}
                  /></Td>
                <Td>creado</Td>
                <Td>Modificacion</Td>
                <Td>reportes</Td>
                <Td> <IconButton
                  variant='outline'

                  aria-label='edit'

                  icon={<EditIcon />}


                />
                </Td>

              </Tr>
              <Tr>
                <Td>Nombre</Td>
                <Td>Estatus</Td>
                <Td>Actividad</Td>
                <Td>
                  1 <IconButton
                    variant='ghost'

                    aria-label='add'
                    icon={<AddIcon />}
                  /></Td>
                <Td>creado</Td>
                <Td>Modificacion</Td>
                <Td>reportes</Td>
                <Td>
                   <IconButton
                  variant='outline'

                  aria-label='edit'

                  icon={<EditIcon />}


                />
                </Td>

              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

      </Box>


    </DesktopLayout>
  </div>;


}

export default AseguradorasListado;
