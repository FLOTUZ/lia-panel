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
  Tfoot,
  Box,
  Button,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  IconButton,
  EditableInput,
  Spacer,
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

  /*CONSULTA de asistencias  */
  const [listadoAsistencias, setListadoAsistencias] = useState<IAsistencias[]>([])
  useEffect(() => {
    const consultaAsistencias = async () => {
      const services = new AsistenciasService();
      const respuesta = await services.getAll();
      const data = respuesta.data as IAsistencias[];

      if (respuesta.status == 200) {
        setListadoAsistencias(data);
      } else {
        console.log(respuesta)
      }
    };
    consultaAsistencias();
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

            <Link href={"/aseguradoras/nuevo"}>
              <a>
                {" "}
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="facebook"
                  variant="solid"
                  marginLeft={"80%"}
                >
                  Nueva aseguradora
                </Button>
              </a>
            </Link>
          </FormControl>
        </Box>

        <Box marginLeft="25%" p={4}>
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
                <Th>Nº Expediente</Th>
                <Th>Nombre</Th>
                <Th>Telefono</Th>
                <Th>Asistencias</Th>
                <Th>Creado</Th>
                <Th>Ultima modificacion</Th>
                <Th>Reportes</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {listadoAseguradoras.length != 0 ? (
                listadoAseguradoras.map((t, index) => {

                  return (
                    <Tr key={index} >
                      <Td>{t.expediente}</Td>
                      <Td>{t.nombre}</Td>
                      <Td>{t.telefono}</Td>






                      <Td>
                        {" "}
                        5{" "}
                        <IconButton
                          onClick={onOpen}
                          variant="ghost"
                          aria-label="add"
                          icon={<AddIcon />}
                        />
                      </Td>
                      <Td>{t.createdAt}</Td>
                      <Td>{t.updatedAt}</Td>
                      <Td>reportes</Td>
                      <Td>
                        <Link href={"/aseguradoras/1"}>
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
                  <Td>Nombre</Td>
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
              <Input placeholder="Nombre de la asistencia" />
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
