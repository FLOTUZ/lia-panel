import { AcuerdoConformidadService } from "@/services/acuerdo-conformidad.service";
import { IAcuerdoConformidad, IImagen, ITicket } from "@/services/api.models";
import { ImagenesService } from "@/services/imagenes.service";
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
import { BsDownload, BsPrinter } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";

interface IAcuerdoConformidadForm {
  acuerdoconformidad: IAcuerdoConformidad;
}

export const AcuerdoConformidadView = ({
  acuerdoconformidad,
}: IAcuerdoConformidadForm) => {
  const toast = useToast();

  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenPDF,
    onOpen: onOpenPDF,
    onClose: onClosePDF,
  } = useDisclosure();

  const aprobarAcuerdoConformidad = async () => {
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
        position: "bottom-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops.. Algo salio mal",
        description: respuestaAcuerdo.message,
        position: "bottom-right",
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

        <SimpleGrid
          columns={[1, 2, 3]}
          spacing="20px"
          minChildWidth="10rem"
          mt={"3rem"}
        >
          {acuerdoconformidad.isAprobado ? null : (
            <Button
              h={"3rem"}
              colorScheme={"green"}
              onClick={aprobarAcuerdoConformidad}
            >
              Aprobar Cierre
            </Button>
          )}

          <Button
            h={"3rem"}
            variant="outline"
            leftIcon={<BsPrinter size={"30px"} />}
            id="imprimirAcuerdoConformidad"
            colorScheme="red"
            onClick={onOpen}
          >
            Imprimir acuerdo
          </Button>

          <Button
            h={"3rem"}
            variant="outline"
            leftIcon={<BsDownload size={"30px"} />}
            id="imprimirAcuerdoConformidad"
            colorScheme="black"
            onClick={onOpenPDF}
          >
            Descargar Acuerdo
          </Button>
        </SimpleGrid>
      </Box>

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

      <Modal onClose={onOpenPDF} size={"full"} isOpen={isOpenPDF}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Acuerdo firmado</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <iframe
              height="800px"
              width="1280px"
              src={`${acuerdoconformidad.acuerdo_firmado}`}
            />
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
                onClick={onClosePDF}
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
