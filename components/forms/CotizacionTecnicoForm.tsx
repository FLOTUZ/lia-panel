import { ICotizacionTecnico, IImagen, ITicket } from "@/services/api.models";
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
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import Image from "next/image";
import { CloseIcon } from "@chakra-ui/icons";
import moment from "moment";
import Header from "@/common/Header";

interface CrearCotizacionTecnicoProps {
  cotizacion: ICotizacionTecnico;
  ticket: ITicket;
}

export const CrearCotizacionTecnico = ({
  cotizacion,ticket
}: CrearCotizacionTecnicoProps) => {
  const toast = useToast();
  const [imagen, setImagen] = useState<IImagen>();
  const [uploadImage, setUploadImage] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenImgLlegada, onOpen: OnOpenImgLLegada, onClose: onCloseImgLlegada } = useDisclosure();
  const { isOpen: isOpenImgPlacas, onOpen: OnOpenImgPlacas, onClose: onCloseImgPlacas } = useDisclosure();


  const getImagen = async () => {
    const service = new ImagenesService();
    const respuesta = await service.getById(cotizacion.preSolucionId!);
    const data = respuesta.data as IImagen;
    setImagen(data);
  };

  const getImagenUpload = async () => {
    if (imagen) {
      const service = new ImagenesService();
      const respuesta: any = await service.getUploadImage(
        cotizacion.preSolucionId!
      );

      const data = respuesta.data as IImagen;

      console.log(data);

      setUploadImage(data.url);
    }
  };

  const aprobarCotizacion = async () => {
    //TODO: Obtener el id del usuario de la sesion
    const payloadCotizacion = {
      is_aprobado: true,
      aprobado_por_usuarioId: 1,
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
    getImagen();
  }, []);

  useEffect(() => {
    getImagenUpload();
  }, [imagen]);

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

        <SimpleGrid columns={[2, null, 3]} spacing='40px'>
     
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

          {uploadImage ? (
            <Image
              src={uploadImage}
              onClick={OnOpenImgLLegada}
              alt={`Imagen de Llegada`}
              unoptimized={true}
              quality={100}
              height={200}
              width={200}
              layout="responsive"
            />
          ) : (
            <CircularProgress />
          )}
           <Heading marginTop={2}  as="h4" size="md" textAlign={"center"}>
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

          {uploadImage ? (
            <Image
              src={uploadImage}
              onClick={onOpen}
              alt={`Imagen del Problema`}
              unoptimized={true}
              quality={100}
              height={200}
              width={200}
              layout="responsive"
            />
          ) : (
            <CircularProgress />
          )}
           <Heading marginTop={2}  as="h4" size="md" textAlign={"center"}>
           Problemática
        </Heading>
        </Box>

        {ticket?.asistencia_vial && ticket?.is_servicio_foraneo? (
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
              {uploadImage ? (
                <Image
    
                  src={uploadImage}
                  onClick={OnOpenImgPlacas}
                  alt={`Imagen de Plcas`}
                  unoptimized={true}
                  quality={100}
                  height={200}
                  width={200}
                  layout="responsive"
                />
              ) : (
                <CircularProgress />
              )}
               <Heading marginTop={2}  as="h4" size="md" textAlign={"center"}>
               Placas
            </Heading>
            </Box>
          ):null}
      
       
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
        </Box>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} isCentered size={"4xl"}>
        <ModalOverlay backdropBlur="10px" />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Text fontWeight="bold" fontSize="25px">
              Evidencia del Poblema
            </Text>
          </ModalHeader>
          <ModalBody padding={"2%"}>
            <Center>
              <img src={uploadImage} alt={`Imagen de Problemática`} width={500} />
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button
              leftIcon={<CloseIcon />}
              colorScheme="red"
              variant="solid"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal onClose={onCloseImgLlegada} isOpen={isOpenImgLlegada} isCentered size={"4xl"}>
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
              <img src={uploadImage} alt={`Imagen de Llegada`} width={500} />
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button
              leftIcon={<CloseIcon />}
              colorScheme="red"
              variant="solid"
              onClick={onCloseImgLlegada}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal onClose={onCloseImgPlacas} isOpen={isOpenImgPlacas} isCentered size={"4xl"}>
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
              <img src={uploadImage} alt={`Imagen de Placas`} width={500} />
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button
              leftIcon={<CloseIcon />}
              colorScheme="red"
              variant="solid"
              onClick={onCloseImgPlacas}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
