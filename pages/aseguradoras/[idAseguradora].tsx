/* eslint-disable react/no-children-prop */
import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  InputLeftElement,
  Stack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spacer,
  Heading,
  IconButton,
  InputRightAddon,
  Switch,
  EditableInput,
  Editable,
  EditablePreview,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import Link from "next/link";
import { IAseguradoras, IAsistencias } from "@/services/api.models";
import { useRouter } from "next/router";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { AsistenciasService } from "@/services/asistencias.service";

function AseguradoraVer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [nombreAseguradora, setNombreAseguradora] = useState("")
  const [telefonoAseguradora, setTelefonoAseguradora] = useState("")
  const [nombreAsistencia, setNombreAsistencia] = useState("")
  const [aseguradoraGuardada, setAseguradoraGuardada] = useState<IAseguradoras>()

  const [data, setData] = useState<IAseguradoras>();

  const router = useRouter();

  const [cargando, setCargando] = useState(false);

  const { idAseguradora } = router.query;

  useEffect(() => {
    const getAseguradora = async () => {
      const service = new AseguradoraService();
      const response = await service.getById(Number(idAseguradora));
      if (response.status == 200) {
        setData(response.data as IAseguradoras);
      }
    };
    getAseguradora();

  }, [idAseguradora]);


  /*CONSULTA de asistencias  */
  const [listadoAsistencias, setListadoAsistencias] = useState<IAsistencias[]>([])


  const consultaAsistencias = async () => {
    const services = new AseguradoraService();
    const respuesta = await services.getById(aseguradoraGuardada?.id || 0);
    const data = respuesta.data as IAseguradoras;


    if (respuesta.status == 200) {
      setListadoAsistencias(data.Asistencia || []);
    } else {
      console.log(respuesta)
    }
  };

  /*AGREGAR ASISTENCIA */
  const guardarAsistencia = async () => {
    const data: IAsistencias = {
      nombre: nombreAsistencia,
      aseguradoraId: aseguradoraGuardada?.id
    };

    const service = new AsistenciasService()
    const response = await service.create(data)

    consultaAsistencias()
    if (response.status === 201) {
      onClose()
      toast({
        title: "Asistencia nueva agregado con exito",
        description: 'La asistencia se agrego con exito',
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops.. Algo salio mal",
        description: response.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

  }


  /*ACTUALIZAR LA ASEGURADORA SELECCIONADA */

  const actualizarAseguradora = async () => {
    setCargando(true);
    const data: IAseguradoras = {
      nombre: nombreAseguradora,
      telefono: telefonoAseguradora,
      expediente: "00000",
    };

    const service = new AseguradoraService();
    const response = await service.update(data, Number(idAseguradora));

    const aseguradora = response.data as IAseguradoras
    setAseguradoraGuardada(aseguradora.id)


    if (response === undefined) {
      toast({
        title: "Error",
        status: "error",
        description: `Error al dar de alta, verifique sus campos`,
      });
      setCargando(false);
    } else {
      toast({
        title: "Guardado",
        status: "success",
        description: `${response.aseguradora} guardado`,
      });
      setData(response);
      console.log(data);

      setCargando(false);
    }


  }

  return (
    <div>
      <DesktopLayout>

        <Header title={"Editar aseguradora"} />

        <FormControl isRequired>
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
            <Stack spacing={1}>
              <FormControl display="flex" alignItems="center">
                <FormLabel
                  display="flex"
                  alignItems="center"
                  marginLeft={1280}
                  htmlFor="isRequired"
                >
                  {" "}
                  Archivar:
                </FormLabel>
                <Switch id="isRequired" isRequired />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="nombre">Nombre de la aseguradora</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdVerifiedUser color="green" />}
                  />

                  <Input id="aseguradora"
                    defaultValue={data?.nombre}
                    onChange={(e) => setNombreAseguradora(e.target.value)}
                    type="Nombre" placeholder="Aseguradora" />
                  <InputRightAddon
                    pointerEvents="none"
                    children={<EditIcon color="green" />}
                  />
                </InputGroup>
              </FormControl>

              <InputGroup>
                <FormControl>
                  <FormLabel htmlFor="telefono">Teléfono</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<PhoneIcon color="gray.300" />}
                    />
                    <Input
                      isRequired
                      id="phone"
                      defaultValue={data?.telefono}
                      onChange={(e) => setTelefonoAseguradora(e.target.value)}
                      type="tel" placeholder="Phone number" />
                    <InputRightAddon
                      pointerEvents="none"
                      children={<EditIcon color="green" />}
                    />
                  </InputGroup>
                </FormControl>
              </InputGroup>
            </Stack>
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
            <Heading marginTop={30} as="h5" size="md">
              Asistencia de Aseguradora
            </Heading>
            
            <Stack marginTop={5} paddingLeft={960} direction="row" spacing={4} align="center">
              <Button
                leftIcon={<AddIcon />}
                colorScheme="facebook"
                variant="solid"
                onClick={onOpen}
              >
                Nueva Asistencia
              </Button>
            </Stack>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Crea una Nueva Asistencia</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl mt={4}>
                    <FormLabel>Nombre del Servicio</FormLabel>
                    <Input placeholder="Nombre del Servicio"
                      onChange={(e) => {
                        setNombreAsistencia(e.target.value)
                      }} />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3}
                    onClick={guardarAsistencia}>
                    Guardar
                  </Button>
                  <Button onClick={onClose}>Cancelar</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>


            


            <TableContainer>
              <Table marginTop={50} size="md" variant="simple" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>Nombre</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listadoAsistencias.length !== 0 ? (

                    listadoAsistencias.map((t, index) => {
                      return (
                        <Tr key={index}>

                          <Td>{t.nombre}</Td>
                          <Td>
                            <IconButton
                              onClick={onOpen}
                              variant="outline"
                              aria-label="edit"
                              icon={<EditIcon />}
                            />
                          </Td>

                        </Tr>
                      )
                    })
                  ) : (
                    <Tr>
                      <Td>NO DATA</Td>

                    </Tr>
                  )}


                </Tbody>
              </Table>
            </TableContainer>
            <Stack marginTop={50} direction="row" spacing={4} align="center" paddingLeft="930">

              <Link href={"/aseguradoras"} >
                <a>
                  <Button
                    id="guardar"
                    onClick={actualizarAseguradora}
                    isLoading={cargando}
                    colorScheme="facebook" variant="solid">
                    Guardar
                  </Button>
                </a>

              </Link>


              <Button
                onClick={() => router.back()}
                colorScheme="red" variant="outline">
                Cancelar
              </Button>

            </Stack>

          </Box>
        </FormControl>

      </DesktopLayout>
    </div >
  );
}

export default AseguradoraVer;
