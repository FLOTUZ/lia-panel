import Header from "@/common/Header";
import Link from "next/link";
import DesktopLayout from "@/layouts/DesktopLayout";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Button,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  ModalFooter,
  useDisclosure,
  useToast,
  toast,
  Stack,
} from "@chakra-ui/react";
import {
  AddIcon,
  AttachmentIcon,
  EditIcon,
  PhoneIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { IAseguradoras, IAsistencias } from "@/services/api.models";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { AsistenciasService } from "@/services/asistencias.service";

export default function AseguradorasListado() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()


  const [nombreAsistencia, setNombreAsistencia] = useState("")


  /*CONSULTA EN TABLA DE LAS ASEGURADORAS CON ASISTENCIAS */
  const [listadoAseguradoras, setListadoAseguradoras] = useState<IAseguradoras[]>([])
  useEffect(() => {
    const consultaAseguradoras = async () => {
      const services = new AseguradoraService();
      const respuesta = await services.getAll();
      const data = respuesta.data as IAseguradoras[];

      if (respuesta.status == 200) {
        setListadoAseguradoras(data);
      } else {
        console.log(respuesta)
      }
    };
    consultaAseguradoras();
  }, []);
  

  return (
    <DesktopLayout>
      <Header title={"Aseguradoras "} />
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
        <Box
          m={2}
          bgColor="white"
          padding={5}
          borderRadius={10}
          p="6"
          rounded="md"
          bg="white"
        >
          <FormControl>
          <Stack 
            paddingTop={10}
           
             paddingLeft={530}
            direction={["column", "row"]} spacing="24px">

            <Link href={"/aseguradoras/nuevo"}>    
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="facebook"
                  variant="solid"
                  marginLeft={"20%"}
                >
                  Nueva aseguradora
                </Button>
            </Link>
            </Stack>
          </FormControl>
        </Box>

        <Box  marginLeft="20%" padding={5}>
          <InputGroup>
            <InputLeftAddon>
              <IconButton
                disabled
                aria-label="Search database"
                icon={<SearchIcon />}
              />{" "}
            </InputLeftAddon>

            <Input
              htmlSize={60}
              width="auto"
              type="text"
              placeholder="Buscar aseguradoras..."
              className="search"
            />
          </InputGroup>
        </Box>

        <TableContainer>
          <Table variant="simple" colorScheme="teal">
            <TableCaption>Aseguradoras</TableCaption>
            <Thead>
              <Tr>
                <Th>Nº</Th>
                <Th>Nombre</Th>
                <Th>Telefono</Th>
                <Th>Km Max</Th>
                <Th>Costo Km</Th>
                <Th>Creado</Th>
 
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {listadoAseguradoras.length != 0 ? (
                listadoAseguradoras.map((aseguradoras, index) => {

                  return (
                    <Tr key={index} >
                      
                      <Td>{aseguradoras.id}</Td>
                      <Td>{aseguradoras.nombre}</Td>
                      <Td>{aseguradoras.telefono}</Td>
                      <Td>{aseguradoras.kilometraje_permitido}</Td>
                      <Td>{aseguradoras.costo_por_kilometro}</Td>
                      <Td>{aseguradoras.createdAt}</Td>
                      <Td>{aseguradoras.updatedAt}</Td>
                      
                      <Td>
                      <Link href={`/aseguradoras/${aseguradoras.id}`}>
                          <a>
                            <IconButton

                              variant="outline"
                              aria-label="edit"
                              icon={<EditIcon />}
                            />
                          </a>
                        </Link>
                      </Td>
                    </Tr>
                  )
                })
              ) : (
                <Tr>
                  <Td>NO DATA</Td>
                </Tr>
              )
              }

            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crea una nueva asistencia</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Nombre de la asistencia</FormLabel>
              <Input onChange={(e) => {
                setNombreAsistencia(e.target.value)
              }} placeholder="Nombre de la asistencia" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DesktopLayout>
  );
}
