import Header from "@/common/Header";
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
  Link,
} from "@chakra-ui/react";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { CiudadesService } from "@/services/ciudades.service";
import { ICiudad } from "@/services/api.models";
import { Form, Formik, useFormik } from "formik";

function CiudadesListado() {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenedit,
    onOpen: onOpenedit,
    onClose: onCloseedit,
  } = useDisclosure();

  const [data, setData] = useState<ICiudad>();
  const [idServicio, setIdServicio] = useState(0);
    
  // editar ciudad

  const formCiudad = useFormik({
    initialValues: {
      nombre: data?.nombre || "",
    },

    onSubmit: async (values: ICiudad) => {
      const actualizaServicio = async () => {
        const data = {
          ...values,
        };

        const ciudad = new CiudadesService();
        const respuesta = await ciudad.getById(Number(idServicio));
        const dataUpdate = respuesta.data as ICiudad;
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


  const [nombreCiudad, setNombreCiudad] = useState("");

  const [nombreCiudadEdit, setNombreCiudadEdit] = useState("");
  const [ciudadEdit, setCiudadEdit] = useState<ICiudad>();

  const [cargando, setCargando] = useState(false);

  const guardarCiudad = async () => {
    const data: ICiudad = {
      nombre: nombreCiudad,
    };

    const ciudad = new CiudadesService()
    const response = await ciudad.create(data)



    if (response.status === 201) {
      onClose();
      setNombreCiudad("");
      toast({
        title: "Ciudad Nueva Agregada con Exito.",
        description: "La ciudad se Agrego con Exito.",
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

  /*CONSULTA EN TABLA DE Ciudades*/

  const [listadoCiudades, setListadoServicios] = useState<ICiudad[]>([]);

  useEffect(() => {
    const consultarServicios = async () => {
      const service = new CiudadesService();
      const respuesta = await service.getAll();
      const data = respuesta.data as ICiudad[];

      if (respuesta.status == 200) {
        setListadoServicios(data);
      } else {
        console.log(respuesta);
      }
    };

    consultarServicios();
  }, []);

  return (
    <DesktopLayout>
      <Header title={"Lista de ciudades "} />
      <form onSubmit={formCiudad.handleSubmit}>
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
            Agregar Nueva Ciudad
          </Button>
        </Box>
        <Box marginLeft={"1%"}>
          <TableContainer>
            <Table size={"md"} variant="simple" colorScheme="teal">
              <TableCaption>Ciudades</TableCaption>
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Opciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listadoCiudades.length != 0 ? (
                  listadoCiudades.map((ciudad, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{ciudad.nombre}</Td>
                        <Td>
                         <Link href={`/ciudades/${ciudad.id}`}>
                          <IconButton
                            onClick={() => {
                              //onOpenedit();
                              setCiudadEdit(ciudad);
                            }}
                            variant="ghost"
                            aria-label="edit"
                            icon={<EditIcon />}
                            
                          />
                          </Link>
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
          <ModalHeader>Agregar una Nueva Ciudad</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel padding={1}>Nombre de la Ciudad</FormLabel>
              <Input
                paddingBottom={2}
                placeholder="Nombre"
                onChange={(e) => {
                  setNombreCiudad(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>




            <Button colorScheme="blue" mr={3} onClick={guardarCiudad}>
              Guardar
            </Button>


            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


          {/* MODAL PARA EDITAR CIUDAD */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpenedit}
        onClose={onCloseedit}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Ciudad</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Nombre del la Ciudad</FormLabel>
              <Input
                placeholder="Nombre"
                value={formCiudad.values.nombre}
                defaultValue={data?.nombre}
                onChange={(e) => {
                  formCiudad.handleChange
                  console.log(formCiudad.values);
                  
                  
                }}
              />
            </FormControl>
          
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={cargando}
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setCargando(true);
                const data: ICiudad = {
                  nombre: nombreCiudadEdit,
                };

                const ciudad = new CiudadesService();
                const respuesta = ciudad.update(data, ciudadEdit?.id || 0);

                console.log(data);
                setCargando(false);
                onCloseedit();
              }}
            >
              Guardar
            </Button>
            <Button onClick={onCloseedit}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </form>
    </DesktopLayout>
  );
}

export default CiudadesListado;