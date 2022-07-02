import {
  ICotizacionTecnico,
  IImagen,
  ITicket,
  IUsuario,
} from "@/services/api.models";
import { CotizacionTecnicoService } from "@/services/cotizacion-tecnico.service";
import Router from "next/router";
import { ImagenesService } from "@/services/imagenes.service";
import { TicketsService } from "@/services/tickets.service";
import {
  Box,
  Button,
  Center,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import Image from "next/image";
import moment from "moment";
import { UsuariosService } from "@/services/usuarios.service";

interface CrearCotizacionTecnicoProps {
  cotizacion: ICotizacionTecnico;
  usuario: IUsuario;
}

export const CrearCotizacionTecnico = ({
  cotizacion,
}: CrearCotizacionTecnicoProps) => {
  const toast = useToast();
  const [imagen, setImagen] = useState<IImagen>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenImgLlegada,
    onOpen: OnOpenImgLLegada,
    onClose: onCloseImgLlegada,
  } = useDisclosure();
  const {
    isOpen: isOpenImgPlacas,
    onOpen: OnOpenImgPlacas,
    onClose: onCloseImgPlacas,
  } = useDisclosure();
  const [imgLlegada, setImgLlegada] = useState<string>("");
  const [imgPlacas, setImgPlacas] = useState<string>("");
  const [imgPresolucion, setImgPresolucion] = useState<string>("");
  const [sesion, setSesion] = useState<IUsuario>();
  const [usuarioAprobador, setUsuarioAprobador] = useState<IUsuario>();

  const getImagenUpload = async () => {
    const service = new ImagenesService();
    const resImgLlegada: any = await service.getUploadImage(
      cotizacion.img_llegadaId!
    );

    const resImgPresolucion: any = await service.getUploadImage(
      cotizacion.preSolucionId!
    );

    if (resImgLlegada.status == 200) {
      const data = resImgLlegada.data as IImagen;
      setImgLlegada(data.url);
    }

    if (resImgPresolucion.status == 200) {
      const data = resImgPresolucion.data as IImagen;
      setImgPresolucion(data.url);
    }

    if (cotizacion.img_placasId != null) {
      const resImgPlacas: any = await service.getUploadImage(
        cotizacion.img_placasId!
      );

      if (resImgPlacas.status == 200) {
        const data = resImgPlacas.data as IImagen;
        setImgPlacas(data.url);
      }
    }
  };

  const getUserLogeado = async () => {
    const service = new UsuariosService();
    const usuario = await service.getLogedUser();

    if (usuario !== null) {
      const variable = usuario as IUsuario;
      setSesion(variable);
    }
  };

  const getUsuarioAprobador = async () => {
    const service = new UsuariosService();
    const respuesta = await service.getById(cotizacion.aprobado_por_usuarioId);

    if (respuesta.status == 200) {
      const data = respuesta.data as IUsuario;
      setUsuarioAprobador(data);
    }
  };

  const aprobarCotizacion = async () => {
    //TODO: Obtener el id del usuario de la sesionsuar

    const service = new UsuariosService();
    const user = await service.getLogedUser();

    const payloadCotizacion = {
      is_aprobado: true,
      aprobado_por_usuarioId: user?.id!,
    } as ICotizacionTecnico;

    const serviceCotizacion = new CotizacionTecnicoService();
    const respuestaCotizacion = await serviceCotizacion.update(
      payloadCotizacion,
      cotizacion.id!
    );

    const payloadTicket = {
      estado: "EN PROCESO",
    } as ITicket;

    const serviceTicket = new TicketsService();
    const respuestaTicket = await serviceTicket.update(
      payloadTicket,
      cotizacion.ticketId!
    );

    if (respuestaTicket.status === 400) {
      onClose();
      onCloseImgLlegada();
      toast({
        title: "Oops.. Algo salio mal",
        description: respuestaTicket.message,
        position: "bottom-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Se acepto cotizacion Con exito",
        description: "Se aprobo cotizacion con exito",
        position: "bottom-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }

    Router.back();
  };

  useEffect(() => {
    getUserLogeado();
    getImagenUpload();
    getUsuarioAprobador();
  }, [cotizacion]);

  return (
    <div>
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
        <Text fontWeight="bold" fontSize="25px">
          Cotización del Técnico
        </Text>
        <FormControl paddingTop={15}>
          <FormLabel htmlFor="Solución y Cotización del Técnico">
            Solución y Cotización del Técnico
          </FormLabel>
          <Input
            variant="unstyled"
            isReadOnly
            placeholder="Solución y Cotización del Técnico"
            id="solucion_cotizacion_del_tecnico"
            borderColor="twitter.100"
            value={cotizacion.solucion_tecnico}
          />
        </FormControl>
        <SimpleGrid columns={[1, 1, 2]} spacing={5}>
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="Fecha y Hora de Contacto">
              Fecha y Hora de Contacto
            </FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              placeholder="Fecha y Hora de Contacto"
              id="hora_de_contacto"
              borderColor="twitter.100"
              value={moment(cotizacion.fecha_contacto).format("LLL")}
            />
          </FormControl>

          {/*<FormControl paddingTop={15}>
            <FormLabel htmlFor="Hora de Cierre">Hora de Cierre</FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              placeholder="Hora de Cierre"
              id="hora_de_cierre"
              borderColor="twitter.100"
              //value={cotizacion.checkInId}
            />
          </FormControl>*/}
        </SimpleGrid>
        <SimpleGrid columns={[1, 1, 3]} spacing={5}>
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="Costo de Mano de Obra">
              Costo de Mano de Obra
            </FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                variant="unstyled"
                isReadOnly
                paddingLeft={5}
                placeholder="Costo de Mano de Obra"
                id="costo_de_mano_de_obra"
                borderColor="twitter.100"
                fontWeight={"bold"}
                textColor={"red"}
                value={cotizacion.costo_mano_obra}
              />
            </InputGroup>
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="Costo de Materiale">
              Costo de Materiales
            </FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                variant="unstyled"
                isReadOnly
                paddingLeft={5}
                placeholder="Costo de Materiale"
                id="costo_de_materiales"
                borderColor="twitter.100"
                fontWeight={"bold"}
                textColor={"red"}
                value={cotizacion.costo_materiales}
              />
            </InputGroup>
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="total">Monto Total</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                children={<MdOutlineAttachMoney />}
              />
              <Input
                isReadOnly
                variant="unstyled"
                id="total"
                min={0}
                placeholder="0.00"
                paddingLeft={5}
                type="number"
                borderColor="twitter.100"
                fontWeight={"bold"}
                textColor={"red"}
                value={cotizacion.total_cotizacion}
              />
            </InputGroup>
          </FormControl>
        </SimpleGrid>
        <Divider orientation="vertical" paddingTop={30} />
        <Heading padding={5} as="h4" size="md">
          Evidencia
        </Heading>

        <SimpleGrid columns={[2, null, 3]} spacing="40px">
          <Box
            mt={1}
            p={1}
            bgColor="facebook.500"
            borderRadius={10}
            boxShadow="2xl"
            height={230}
            width={230}
            alignContent={"center"}
          >
            {imgLlegada ? (
              <Image
                src={imgLlegada}
                onClick={OnOpenImgLLegada}
                alt={`Imagen de Llegada`}
                unoptimized={true}
                quality={100}
                height={200}
                width={200}
                layout="responsive"
              />
            ) : (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            )}
            <Heading marginTop={2} as="h4" size="md" textAlign={"center"}>
              Llegada
            </Heading>
          </Box>

          <Box
            mt={1}
            p={1}
            bgColor="facebook.500"
            borderRadius={10}
            boxShadow="2xl"
            height={230}
            width={230}
            alignContent={"center"}
          >
            {imgPresolucion ? (
              <Image
                src={imgPresolucion}
                onClick={onOpen}
                alt={`Imagen del Problema`}
                unoptimized={true}
                quality={100}
                height={200}
                width={200}
                layout="responsive"
              />
            ) : (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            )}
            <Heading marginTop={2} as="h4" size="md" textAlign={"center"}>
              Problemática
            </Heading>
          </Box>

          {imgPlacas ? (
            <Box
              mt={1}
              p={1}
              bgColor="facebook.500"
              borderRadius={10}
              boxShadow="2xl"
              height={230}
              width={230}
              alignContent={"center"}
            >
              {cotizacion.img_placasId != null ? (
                <Image
                  src={imgPlacas}
                  onClick={OnOpenImgPlacas}
                  alt={`Imagen de Plcas`}
                  unoptimized={true}
                  quality={100}
                  height={200}
                  width={200}
                  layout="responsive"
                />
              ) : (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              )}
              <Heading marginTop={2} as="h4" size="md" textAlign={"center"}>
                Placas
              </Heading>
            </Box>
          ) : null}
        </SimpleGrid>
        <Box marginTop={"40px"} margin={"50px"} height="80px">
          {cotizacion.is_aprobado ? null : (
            <Button
              margin={"50px"}
              colorScheme={"green"}
              paddingLeft={8}
              paddingRight={8}
              onClick={aprobarCotizacion}
            >
              Aprobar
            </Button>
          )}

          {/*<Button variant="outline" colorScheme={"red"}>
            Rechazar
        </Button>*/}
          <FormControl paddingTop={5}>
            <FormLabel htmlFor="Se aprobo la cotizacion ">
              Se aprobo cotizacion por :
            </FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              id="aprobado_por_usuarioId"
              borderColor="twitter.100"
              value={usuarioAprobador?.usuario!}
            />
          </FormControl>
        </Box>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} isCentered size={"3xl"}>
        <ModalOverlay backdropBlur="10px" />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Text fontWeight="bold" fontSize="25px">
              Evidencia del Poblema
            </Text>
          </ModalHeader>
          <ModalBody padding={"5%"}>
            <Center>
              <img
                src={imgPresolucion}
                alt={`Antes de solucionar`}
                width={400}
              />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        onClose={onCloseImgLlegada}
        isOpen={isOpenImgLlegada}
        isCentered
        size={"3xl"}
      >
        <ModalOverlay backdropBlur="10px" />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Text fontWeight="bold" fontSize="25px">
              Evidencia de Llegada
            </Text>
          </ModalHeader>
          <ModalBody padding={"2%"}>
            <Center>
              <img src={imgLlegada} alt={`Imagen llamada`} width={400} />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        onClose={onCloseImgPlacas}
        isOpen={isOpenImgPlacas}
        isCentered
        size={"3xl"}
      >
        <ModalOverlay backdropBlur="10px" />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Text fontWeight="bold" fontSize="25px">
              Evidencia de Placas
            </Text>
          </ModalHeader>
          <ModalBody padding={"2%"}>
            <Center>
              <img src={imgPlacas} alt={`Placas del auto`} width={400} />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
