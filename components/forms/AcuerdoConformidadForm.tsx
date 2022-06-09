import { AcuerdoConformidadService } from "@/services/acuerdo-conformidad.service";
import { IAcuerdoConformidad, IImagen, ITicket } from "@/services/api.models";
import { ImagenesService } from "@/services/imagenes.service"
import Router from "next/router";

import { TicketsService } from "@/services/tickets.service";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AcuerdoConformidadImprimible } from "components/imprimibles/acuerdo-conformidad.imprimible";
import Printer from "components/printer/printer";
import { useState, useEffect } from "react";
import { BsPrinter } from "react-icons/bs";

interface IAcuerdoConformidadForm {
  acuerdoconformidad: IAcuerdoConformidad;
}

export const AcuerdoConformidadView = ({
  acuerdoconformidad,
}: IAcuerdoConformidadForm) => {
  const toast = useToast();
  const [imagen, setImagen] = useState<IImagen>();
  const [uploadImage, setUploadImage] = useState<string>("");
  const [uploadFirma, setUploadFirma] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenFirma,
    onOpen: onOpenFirma,
    onClose: onCloseFirma,
  } = useDisclosure();

  const aprobarAcuerdoConformidad = async () => {
    //TODO: Obtener el id del usuario de la sesion
    const payloadAcuerdoConformidad = {
      isAprobado: true,
    } as IAcuerdoConformidad;

    const serviceAcuerdo = new AcuerdoConformidadService();
    const respuestaAcuerdo = await serviceAcuerdo.update(
      payloadAcuerdoConformidad,
      acuerdoconformidad.id!
    );

    

    const payloadTicket = {
      estado: "FINALIZADO",
    } as ITicket;

    const serviceTicket = new TicketsService();
    const respuestaTicket = await serviceTicket.update(
      payloadTicket,
      acuerdoconformidad.ticketId!
    );
    const dataTicket = respuestaTicket.data as IAcuerdoConformidad;

    

    if (respuestaTicket.status === 400) {
      onClose();
      toast({
        title: "Oops.. Algo salio mal",
        description: respuestaTicket.message,
        position:"bottom-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
 
    } else {
    
      toast({
        title: "Oops.. Algo salio mal",
        description: respuestaAcuerdo.message,
        position:"bottom-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    Router.back();

  };

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
          Acuerdo de Conformidad
        </Text>

        <FormControl paddingTop={15}>
          <FormLabel htmlFor="fecha de acuerdo">Fecha</FormLabel>
          <Input
            readOnly
            variant="unstyled"
            placeholder="Fecha"
            id="fecha_acuerdo"
            borderColor="twitter.100"
            value={acuerdoconformidad?.fecha_acuerdo}
          />
        </FormControl>

        <SimpleGrid columns={[1, 1, 2]} spacing={5}>
          <SimpleGrid columns={[1, 1, 2]} spacing={5}>
            <FormControl paddingTop={15}>
              <FormLabel htmlFor="hora_llegada_servicio">
                Hora de llegada
              </FormLabel>
              <Input
                readOnly
                variant="unstyled"
                placeholder="Hora de llegada"
                id="hora_de_llegada"
                borderColor="twitter.100"
                value={acuerdoconformidad?.hora_llegada_servicio}
              />
            </FormControl>

            <FormControl paddingTop={15}>
              <FormLabel htmlFor="hora_finalizacion_servicio">
                hora de finalizacion del servicio
              </FormLabel>
              <Input
                readOnly
                variant="unstyled"
                placeholder="hora_finalizacion_servicio"
                id="hora_finalizacion_servicios"
                borderColor="twitter.100"
                value={acuerdoconformidad?.hora_finalizacion_servicio.toString()}
              />
            </FormControl>
          </SimpleGrid>
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="direccion">Domicilio</FormLabel>
            <Input
              readOnly
              variant="unstyled"
              placeholder="direccion"
              id="domicilio"
              borderColor="twitter.100"
              value={acuerdoconformidad?.direccion}
            />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing={5}>
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="Descripcion del problema">
              Descripcion del problema
            </FormLabel>
            <Textarea
              readOnly
              variant="unstyled"
              placeholder="Descripcion del Problema"
              id="hora_de_contacto"
              borderColor="twitter.100"
              value={acuerdoconformidad?.descripcion_problema}
            />
          </FormControl>
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="observaciones">Observaciones</FormLabel>
            <Textarea
              readOnly
              variant="unstyled"
              placeholder="Observaciones"
              id="observaciones"
              borderColor="twitter.100"
              value={acuerdoconformidad?.observaciones?.toString()}
            />
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="Actividades_realizadas">
              Actividad Realizada
            </FormLabel>
            <Input
              readOnly
              variant="unstyled"
              placeholder="actividades_realizadas"
              id="actividades_realizadas"
              borderColor="twitter.100"
              value={acuerdoconformidad?.actividades_realizadas}
            />
          </FormControl>
        </SimpleGrid>
        {/*
        <SimpleGrid>
        <Center>
          <FormLabel>
              Firma cliente
           </FormLabel>
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
             
            <img
              height={200}
              src={uploadImage}
              alt="acuerdo_firmado"
              onClick={onOpenFirma}
            />
          </Box>
       
        
          <FormLabel>
              Evidencia
            </FormLabel>
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
            <img
              height={200}
              src={uploadFirma}
              alt="Evidencia 3"
              onClick={onOpen}
            />
          </Box>
        </Center>
        </SimpleGrid>
        */}

        <SimpleGrid columns={[2, 2, 1]} spacing="70px">
          <Box marginTop={"40px"} margin={"50px"}>
            {acuerdoconformidad.isAprobado ? null : (
              <Button
                margin={"50px"}
                colorScheme={"green"}
                onClick={aprobarAcuerdoConformidad}
              >
                Aprobar
              </Button>
            )}

            {/*<Button variant="outline" colorScheme={"red"}>
              Rechazar
            </Button>*/}
            <Button
              marginLeft={"50%"}
              variant="outline"
              leftIcon={<BsPrinter size={"30px"} />}
              id="imprimirAcuerdoConformidad"
              colorScheme="red"
              onClick={onOpen}
            >
              Imprimir acuerdo
            </Button>

          </Box>
        </SimpleGrid>
      </Box>

      {/*
         <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody padding={"5%"}>
            <img height={"250px"} src={uploadImage} alt="Evidencia 2" />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>*/}

      {/*
      <Modal onClose={onCloseFirma} isOpen={isOpenFirma} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody padding={"5%"}>
            <img height={"250px"} src={uploadFirma} alt="Evidencia 2" />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      */}

      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Impresión</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Printer doc={<AcuerdoConformidadImprimible />} />
          </ModalBody>
          <ModalFooter>
            <Stack
              align="center"
              paddingLeft={"60%"}
              spacing={4}
              direction="row"
            >
              <Button
                paddingLeft={10}
                paddingRight={10}
                colorScheme="red"
                variant="outline"
                onClick={onClose}
              >
                Cerrar
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
