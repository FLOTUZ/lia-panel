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
import { AddIcon, CheckIcon, EditIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { IAseguradoras, IAsistencias } from "@/services/api.models";
import { useRouter } from "next/router";
import { AseguradoraService } from "@/services/aseguradoras.service";
import { AsistenciasService } from "@/services/asistencias.service";
import { useFormik } from "formik";

function AseguradoraVer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();


  const [nombreAsistencia, setNombreAsistencia] = useState("")
  const [aseguradoraGuardada, setAseguradoraGuardada] = useState<IAseguradoras>()

  const [data, setData] = useState<IAseguradoras>();

  const router = useRouter();

  const [cargando, setCargando] = useState(false);

  const { idAseguradora } = router.query;
  /**CONSULTA DE ASISTENCIA DE LA ASEGURADORA */

  const [listaAsistencias, setListaAsistencias] = useState<IAsistencias[]>([])


  /**AGREGAR ASISTENCIA A LA ASEGURADORA */

  const consultaAsistencias = async () => {
    const services = new AsistenciasService();
    const response: any = await services.getAsistenciasByIdAseguradora(Number(idAseguradora));
    const data = response.data as IAsistencias[];

    if (response.status == 200) {
      setListaAsistencias(data || []);
    } else {
      console.log(response)
    }
  };

  
  const guardarAsistencia = async () => {
    const data: IAsistencias = {
      nombre: nombreAsistencia,
      aseguradoraId: Number(idAseguradora),
    };

    const service = new AsistenciasService()
    const response = await service.create(data)

    
    consultaAsistencias()
    if (response.status === 201) {
      onClose()
      toast({
        title: "Asistencia Nueva Agregado con Exito.",
        description: 'La Asistencia se Agrego con Exito.',
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


  /**ID ASEGURADORA  */


  useEffect(() => {
    const getAseguradora = async () => {
      const service = new AseguradoraService();
      const respuesta = await service.getById(Number(idAseguradora));
      if (respuesta.status == 200) {
        setData(respuesta.data as IAseguradoras);
      }

    };
    const consultaAsistencias = async () => {
      const services = new AsistenciasService();
      const response: any = await services.getAsistenciasByIdAseguradora(Number(idAseguradora));
      const data = response.data as IAsistencias[];

      if (response.status == 200) {
        setListaAsistencias(data || []);
      } else {
        console.log(response)
      }
    };


    getAseguradora();
    consultaAsistencias();

  }, [idAseguradora]);


  /*ACTUALIZAR LA ASEGURADORA SELECCIONADA FORMIK */

  const formAseguradora = useFormik({
    initialValues: {
      nombre: data?.nombre || "",
      telefono: data?.telefono || "",
      expediente: data?.expediente || "",
    },
    enableReinitialize: true,

    onSubmit: async (values: IAseguradoras) => {

      const data = {
        ...values,
      };

      const service = new AseguradoraService();
      const respuesta = await service.update(data, Number(idAseguradora));

      const dataUpdate = respuesta.data as IAseguradoras;
      setData(dataUpdate);

      if (respuesta.status !== 200) {
        toast({
          title: "Error",
          status: "error",
          description: `Error al actualizar, verifique sus campos`,
        });
        setCargando(false);
      } else {
        toast({
          title: "Guardado",
          status: "success",
          description: `${respuesta.Aseguradora} guardado`,

        });
      }
    },
  });


  return (
    <div>
      <DesktopLayout>

        <Header title={"Editar aseguradora"} />
        <form onSubmit={formAseguradora.handleSubmit}>

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

                <InputGroup>
                  <FormControl >
                    <FormLabel htmlFor="expediente">Folio de la Aseguradora</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CheckIcon color="gray.300" />} />
                      <Input disabled type="number"
                        id="expediente"
                        variant="filled"
                        onChange={formAseguradora.handleChange}
                        defaultValue={data?.expediente}
                      />
                    </InputGroup>
                  </FormControl>
                </InputGroup>
                <FormControl>
                  <FormLabel htmlFor="nombre">Nombre de la aseguradora</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<MdVerifiedUser color="green" />}
                    />
                    <Input id="nombre"
                      variant="filled"
                      defaultValue={data?.nombre}
                      onChange={formAseguradora.handleChange}
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
                        children={<PhoneIcon color="blue.300" />}
                      />
                      <Input
                        isRequired
                        id="phone"
                        variant="filled"
                        defaultValue={data?.telefono}
                        onChange={formAseguradora.handleChange}

                        type="tel" placeholder="Phone number" />
                      <InputRightAddon
                        pointerEvents="none"
                        children={<EditIcon color="green" />}
                      />
                    </InputGroup>
                  </FormControl>
                </InputGroup>
              </Stack>
              <Stack marginTop={50} direction="row" spacing={4} align="center" paddingLeft="930">

              
                <Button
                  id="guardar"
                  type="submit"
                  isLoading={cargando}
                  colorScheme="facebook" variant="solid">
                  Actualizar
                </Button>
                
                

                <Button
                  onClick={() => router.back()}
                  colorScheme="red" variant="outline">
                  Cancelar
                </Button>

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
                      <Input 
                      onChange={(e) => {
                        setNombreAsistencia(e.target.value)
                      }}
                      placeholder="Nombre del Servicio"
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3}
                      onClick={guardarAsistencia}
                    >
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
                    {listaAsistencias.length == 0 ? (
                      <Tr>
                        <Td>NO DATA</Td>
                      </Tr>
                    ) : (
                      listaAsistencias.map((asistencias, index) => {
                        return (
                          <Tr key={index}>
                            <Td> {asistencias.nombre}  </Td>
                          </Tr>
                        )
                      })
                    )}


                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </FormControl>
        </form>
      </DesktopLayout>
    </div >
  );
}

export default AseguradoraVer;
