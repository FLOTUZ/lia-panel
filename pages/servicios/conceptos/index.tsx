import Header from "@/common/Header";
import DesktopLayout from "@/layouts/DesktopLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AddIcon, ArrowBackIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  HStack,
  IconButton,
  Box,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IConcepto } from "@/services/api.models";
import { ConceptoService } from "@/services/concepto.service";
import { FaMoneyBill } from "react-icons/fa";
import { TipoConceptoService } from "@/services/tipo-concepto.service";
import { useFormik } from "formik";
import { BsList } from "react-icons/bs";

function Conceptos() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal de alta
  const {
    isOpen: actIsOpen,
    onOpen: actOnOpen,
    onClose: actOnClose,
  } = useDisclosure(); // Modal de actualización
  const [conceptosList, setConceptosList] = useState<IConcepto[]>([]);
  const [conceptoAActualizar, setConceptoAActualizar] = useState<IConcepto>();

  const getConceptos = async () => {
    const service = new ConceptoService();
    const respuesta = await service.getAll();

    if (respuesta.status == 200) {
      const data = respuesta.data as IConcepto[];
      setConceptosList(data);
    }
  };

  const eliminarConcepto = async (id: number) => {
    const service = new ConceptoService();
    const respuesta: any = await service.remove(id);

    if (respuesta.status == 200) {
      getConceptos();
    }
  };

  const router = useRouter();
  const toast = useToast();

  const [tiposConceptoList, setTiposCetconceptoList] = useState<IConcepto[]>(
    []
  );

  const getTipoConceptos = async () => {
    const service = new TipoConceptoService();
    const respuesta = await service.getAll();

    if (respuesta.status == 200) {
      const data = respuesta.data as IConcepto[];
      setTiposCetconceptoList(data);
    }
  };

  const formConcepto = useFormik({
    initialValues: {
      nombre: "",
      costo_mano_obra: 0,
      tipo_conceptoId: 0,
    },
    onSubmit: async (values: IConcepto) => {
      const service = new ConceptoService();
      const respuesta = await service.create(values);

      if (respuesta.status == 201) {
        toast({
          title: "Concepto creado",
          description: "El concepto ha sido creado exitosamente",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        getConceptos();
        onClose();
      } else {
        toast({
          title: "Error",
          description:
            "El concepto no ha sido creado, es posible que ya exista",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });

  const formActualizarConcepto = useFormik({
    initialValues: {
      id: conceptoAActualizar?.id!,
      nombre: conceptoAActualizar?.nombre!,
      costo_mano_obra: conceptoAActualizar?.costo_mano_obra!,
      tipo_conceptoId: conceptoAActualizar?.tipo_conceptoId!,
    },
    onSubmit: async (values: IConcepto) => {
      const data = {
        ...values,
      } as IConcepto;

      const service = new ConceptoService();

      const respuesta = await service.update(data!, conceptoAActualizar?.id!);

      if (respuesta.status == 200) {
        toast({
          title: "Concepto creado",
          description: "El concepto ha sido creado exitosamente",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        getConceptos();
        actOnClose();
        setConceptoAActualizar(undefined);
      } else {
        toast({
          title: "Error",
          description:
            "El concepto no ha sido creado, es posible que ya exista",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });

  useEffect(() => {
    getConceptos();
    getTipoConceptos();
  }, []);

  return (
    <DesktopLayout>
      <HStack>
        <IconButton
          w={"fit-content"}
          icon={<ArrowBackIcon />}
          size="lg"
          aria-label={"back"}
          bgColor="Background"
          borderRadius={100}
          m={4}
          onClick={() => router.back()}
        />
        <Header title={"Conceptos "} />
      </HStack>

      <Box m={4} w="100%" bgColor={"white"}>
        <Button
          m={3}
          leftIcon={<AddIcon />}
          colorScheme="messenger"
          variant="solid"
          onClick={onOpen}
        >
          Nuevo
        </Button>

        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nombre</Th>
                <Th>Costo MO</Th>
                <Th>Categoria</Th>
              </Tr>
            </Thead>
            <Tbody>
              {conceptosList.map((concepto) => (
                <Tr key={concepto.id}>
                  <Td>{concepto.id}</Td>
                  <Td>{concepto.nombre}</Td>
                  <Td>{concepto.costo_mano_obra}</Td>
                  <Td>
                    {
                      tiposConceptoList.find((c) => {
                        return c.id == concepto.tipo_conceptoId;
                      })?.nombre
                    }
                  </Td>
                  <Td>
                    <IconButton
                      aria-label={"Eliminar concepto"}
                      onClick={() => eliminarConcepto(concepto.id!)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label={"Update concepto"}
                      onClick={() => {
                        setConceptoAActualizar(concepto);
                        actOnOpen();
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      {/* =================ALTA ======================== */}
      <Modal onClose={onClose} isOpen={isOpen} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alta de concepto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formConcepto.handleSubmit}>
              <SimpleGrid ml={4} columns={1}>
                <FormControl isRequired>
                  <FormLabel>Nombre del concepto</FormLabel>
                  <Input
                    id="nombre"
                    placeholder="Nombre del concepto"
                    variant={"filled"}
                    maxLength={100}
                    minLength={3}
                    autoComplete="off"
                    onChange={formConcepto.handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Costo de mano de obra</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      color="green"
                      fontSize="1.5em"
                      children={<FaMoneyBill />}
                    />
                    <Input
                      id="costo_mano_obra"
                      placeholder="Ingresa el costo recomendado"
                      maxLength={4}
                      minLength={1}
                      type="number"
                      min={0}
                      max={9999}
                      onChange={formConcepto.handleChange}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Categoria del concepto</FormLabel>
                  <Select
                    placeholder="Selecciona el tipo de concepto"
                    onChange={(e) => {
                      formConcepto.setFieldValue(
                        "tipo_conceptoId",
                        parseInt(e.target.value)
                      );
                    }}
                  >
                    {tiposConceptoList.map((tipoConcepto) => (
                      <option value={tipoConcepto.id}>
                        {tipoConcepto.nombre}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </SimpleGrid>

              <SimpleGrid
                ml={4}
                columns={[1, 1, 2]}
                spacing={4}
                w="fit-content"
                pt={4}
              >
                <Button colorScheme={"blue"} type="submit">
                  Guardar
                </Button>
                <Button colorScheme={"red"} onClick={() => router.back()}>
                  Cancelar
                </Button>
              </SimpleGrid>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* ================= UPDATE  ======================== */}
      <Modal onClose={actOnClose} isOpen={actIsOpen} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Actualizacion del concepto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formActualizarConcepto.handleSubmit}>
              <SimpleGrid ml={4} columns={1}>
                <FormControl isRequired>
                  <FormLabel>Nombre del concepto</FormLabel>
                  <Input
                    id="nombre"
                    defaultValue={conceptoAActualizar?.nombre}
                    placeholder="Nombre del concepto"
                    variant={"filled"}
                    maxLength={100}
                    minLength={3}
                    autoComplete="off"
                    onChange={formActualizarConcepto.handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Costo de mano de obra</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      color="green"
                      fontSize="1.5em"
                      children={<FaMoneyBill />}
                    />
                    <Input
                      id="costo_mano_obra"
                      defaultValue={conceptoAActualizar?.costo_mano_obra?.toString()}
                      placeholder="Ingresa el costo recomendado"
                      maxLength={4}
                      minLength={1}
                      type="number"
                      min={0}
                      max={9999}
                      onChange={formActualizarConcepto.handleChange}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Categoria del concepto</FormLabel>
                  <Select
                    placeholder="Selecciona el tipo de concepto"
                    defaultValue={conceptoAActualizar?.tipo_conceptoId}
                    onChange={(e) => {
                      formActualizarConcepto.setFieldValue(
                        "tipo_conceptoId",
                        parseInt(e.target.value)
                      );
                    }}
                  >
                    {tiposConceptoList.map((tipoConcepto) => (
                      <option value={tipoConcepto.id}>
                        {tipoConcepto.nombre}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </SimpleGrid>

              <SimpleGrid
                ml={4}
                columns={[1, 1, 2]}
                spacing={4}
                w="fit-content"
                pt={4}
              >
                <Button colorScheme={"blue"} type="submit">
                  Actualizar
                </Button>
                <Button colorScheme={"red"} onClick={() => router.back()}>
                  Cancelar
                </Button>
              </SimpleGrid>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={actOnClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DesktopLayout>
  );
}

export default Conceptos;
