import { ICotizacionTecnico, IImagen, ITicket } from "@/services/api.models";
import { CotizacionTecnicoService } from "@/services/cotizacion-tecnico.service";
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
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Progress,
  SimpleGrid,
  Text,
  toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";

interface CrearCotizacionTecnicoProps {
  cotizacion: ICotizacionTecnico;
}

export const CrearCotizacionTecnico = ({
  cotizacion,
}: CrearCotizacionTecnicoProps) => {
  const toast = useToast();
  const [imagen, setImagen] = useState<IImagen>();
  const [uploadImage, setUploadImage] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getImagen = async () => {
    const service = new ImagenesService();
    const respuesta = await service.getById(cotizacion.preSolucionId!);
    const data = respuesta.data as IImagen;
    setImagen(data);
  };

  const getImagenUpload = async () => {
    if (imagen) {
      const service = new ImagenesService();
      const respuesta = await service.getUploadImage(cotizacion.preSolucionId!);
      const data = respuesta;

      setUploadImage(data);
    }
  };

  const aprobarCotizacion = async () => {
    //TODO: Obtener el id del usuario de la sesion
    const payloadCotizacion = {
      isAprobado: true,
      aprobado_por_usuarioId: 1,
    } as ICotizacionTecnico;

    const serviceCotizacion = new CotizacionTecnicoService();
    const respuestaCotizacion = await serviceCotizacion.update(
      payloadCotizacion,
      cotizacion.id!
    );

    console.log(respuestaCotizacion);

    const payloadTicket = {
      estado: "EN PROCESO",
    } as ITicket;

    const serviceTicket = new TicketsService();
    const respuestaTicket = await serviceTicket.update(
      payloadTicket,
      cotizacion.ticketId!
    );

    if (respuestaTicket.status === 202) {
      onClose();
      toast({
        title: "Se acepto cotizacion Con exito",
        description: "Se aprobo cotizacion con exito",
        position:"bottom-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops.. Algo salio mal",
        description: respuestaTicket.message,
        position:"bottom-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
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
              value={cotizacion.fecha_contacto}
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

        <SimpleGrid columns={[1, 1, 2]} spacing={5}>
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
                placeholder="Costo de Mano de Obra"
                id="costo_de_mano_de_obra"
                borderColor="twitter.100"
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
                placeholder="Costo de Materiale"
                id="costo_de_materiales"
                borderColor="twitter.100"
                value={cotizacion.costo_materiales}
              />
            </InputGroup>
          </FormControl>
        </SimpleGrid>

        <Center>
          <Divider orientation="vertical" paddingTop={30} />

          <Box
            m={2}
            bgColor="white"
            padding={5}
            borderRadius={10}
            boxShadow="2xl"
            p="6"
            height={200}
            width={200}
            paddingLeft={10}
          >
            {uploadImage ? (
              <img
                height={200}
                src={uploadImage}
                alt="Evidencia 2"
                onClick={onOpen}
              />
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Center>

        <Box marginTop={"40px"} margin={"50px"} height="80px">
          {console.log(cotizacion)}
          {cotizacion.isAprobado ? null : (
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

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody padding={"5%"}>
            <img height={"250px"} src={uploadImage} alt="Evidencia 2" />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
