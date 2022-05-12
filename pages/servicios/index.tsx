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
  Editable,
  EditablePreview,
  CheckboxGroup,
  Stack,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import {
  AddIcon,
  AttachmentIcon,
  DeleteIcon,
  EditIcon,
  PhoneIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { ServiciosService } from "@/services/servicios.service";
import { IServicio } from "@/services/api.models";
import { Form, Formik, useFormik } from "formik";

import { useRouter } from "next/router";
function ServiciosListado() {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenedit,
    onOpen: onOpenedit,
    onClose: onCloseedit,
  } = useDisclosure();


  const [nombreServicio, setNombreServicio] = useState("");
  const [tipoServicio, setTipoServicio] = useState("");

  const [nombreServicioEdit, setNombreServicioEdit] = useState("");
  const [servicioEdit, setServicioEdit] = useState<IServicio>();

  const [cargando, setCargando] = useState(false);

  
  const router = useRouter();
  

  const guardarServicio = async () => {
    const data: IServicio = {
      nombre: nombreServicio,
      tipo: tipoServicio,
    };

    const service = new ServiciosService()
    const response = await service.create(data)



    if (response.status === 201) {
      onClose();
      setNombreServicio("");
      setTipoServicio("");
      toast({
        title: "Servicio nuevo agregado con exito",
        description: "El servicio de agrego con exito",
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
  };

  /*CONSULTA EN TABLA DE SERVICIOS*/

  const [listadoServicios, setListadoServicios] = useState<IServicio[]>([]);

  useEffect(() => {
    const consultarServicios = async () => {
      const service = new ServiciosService();
      const respuesta = await service.getAll();
      const data = respuesta.data as IServicio[];

      if (respuesta.status == 200) {
        setListadoServicios(data);
      } else {
        console.log(respuesta);
      }
    };

    consultarServicios();
  }, []);


  /* PA EDITAR  */
  const [data, setData] = useState<IServicio>();
  const { idServicio } = router.query;

  const getServicio = async () => {
    const servicio = new ServiciosService();
    const response = await servicio.getById(Number(idServicio))
    if (response.status == 200) {
      setData(response.data as IServicio);
    }
  };

  const formServicio = useFormik({
    initialValues: {
      nombre: data?.nombre || "",
      tipo: data?.tipo || "",
    },

    onSubmit: async (values: IServicio) => {
      const actualizaServicio = async () => {
        const data = {
          ...values,
        };

        const service = new ServiciosService();
        const respuesta = await service.getById(Number(idServicio));
        const dataUpdate = respuesta.data as IServicio;
        setData(dataUpdate);

        if (respuesta === undefined) {
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
            description: `${respuesta.usuario} guardado`,
          });
        }
      };
      actualizaServicio()
    },
  });

  /**DELET SERVICIO */
 /* const deleteServicio = async () => {
    const data: IServicio = {
      nombre: nombreServicio,
      tipo: tipoServicio,
    };

    const service = new ServiciosService()
    const response = await service.remove(Number(idServicio))



    if (response.status === 201) {
      onClose();
      setNombreServicio("");
      setTipoServicio("");
      toast({
        title: "Servicio eliminado con exito",
        description: "El servicio de agrego con exito",
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
  };
*/
  return (
    <DesktopLayout>
      <Header title={"Lista de servicios "} />
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
          {" "}
          <Button
            onClick={onOpen}
            leftIcon={<AddIcon />}
            colorScheme="facebook"
            variant="solid"
            marginLeft={"80%"}
          >
            Nuevo servicio
          </Button>
        </Box>
        <Box marginLeft={"1%"}>
          <TableContainer>
            <Table size={"md"} variant="simple" colorScheme="teal">
              <TableCaption>Servicios</TableCaption>
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Tipo de servicio</Th>
                  <Th>Opciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listadoServicios.length != 0 ? (
                  listadoServicios.map((serv, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{serv.nombre}</Td>
                        <Td>{serv.tipo}</Td>
                        <Td>
                          <IconButton
                            onClick={() => {
                              onOpenedit();
                              setServicioEdit(serv);
                            }}
                            variant="ghost"
                            aria-label="edit"
                            icon={<EditIcon />}
                          />{" "}
                          <IconButton
                            variant="ghost"
                            aria-label="delet"
                            colorScheme={"red"}
                            icon={<DeleteIcon color={"red"} />}
                          />
                        </Td>
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Td>No hay data</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crea una nuevo servicio</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel padding={1}>Nombre del servicio</FormLabel>
              <Input
                paddingBottom={2}
                placeholder="Nombre del servicio"
                onChange={(e) => {
                  setNombreServicio(e.target.value);
                }}
              />
              <FormLabel padding={1}>Tipo del servicio</FormLabel>
              <CheckboxGroup colorScheme="green">
                <Stack
                  padding={2}
                  spacing={[1, 5]}
                  direction={["column", "row"]}
                >
                  <Checkbox
                    onChange={(e) => {
                      setTipoServicio(e.target.value);
                    }}
                    value="DOMESTICO"
                  >
                    Domestico
                  </Checkbox>
                  <Checkbox
                    onChange={(e) => {
                      setTipoServicio(e.target.value);
                    }}
                    value="VIAL"
                  >
                    Automovilistico
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={guardarServicio}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <form onSubmit={formServicio.handleSubmit} >
        <Modal

          isOpen={isOpenedit}
          onClose={onCloseedit}
        >
          <ModalOverlay />
          <ModalContent>
            {/* MODAL PARA EDITAR SERVICIO */}
            <ModalHeader>Editar servicio</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Nombre del servicio</FormLabel>
                <Input
                  placeholder="Nombre del servicio"
                  id="nombre"
                  value={formServicio.values.nombre}
                  onChange={formServicio.handleChange}
                />
              </FormControl>

              <FormControl >
                <FormLabel padding={1} >Tipo del servicio</FormLabel>
                <CheckboxGroup colorScheme='green'
                  onChange={formServicio.handleChange}
                >
                  <Stack padding={2} spacing={[1, 5]} direction={['column', 'row']}>
                    <Checkbox value={"DOMESTICO"}
                    >Domestico</Checkbox>
                    <Checkbox
                      value={"VIAL"}
                    >Automovilistico</Checkbox>

                  </Stack>
                </CheckboxGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                id="guardar"
                type="submit"
                colorScheme="blue"
                variant="solid"
                isLoading={cargando}
                mr={3}

              >
                Guardar
              </Button>
              <Button onClick={onCloseedit}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </DesktopLayout >
  );
}

export default ServiciosListado;
