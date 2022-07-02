import { IAcuerdoConformidad, ITicket, IUsuario } from "@/services/api.models";

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
import { BsDownload } from "react-icons/bs";
import { useRouter } from "next/router";
import moment from "moment";
import { UsuariosService } from "@/services/usuarios.service";
import { AcuerdoConformidadService } from "@/services/acuerdo-conformidad.service";
import { useState } from "react";

interface IAcuerdoConformidadForm {
  acuerdoconformidad: IAcuerdoConformidad;
}

export const AcuerdoConformidadView = ({
  acuerdoconformidad,
}: IAcuerdoConformidadForm) => {
  const toast = useToast();

  const router = useRouter();

  const {
    isOpen: isOpenPDF,
    onOpen: onOpenPDF,
    onClose: onClosePDF,
  } = useDisclosure();

  const [usuarioAprobador, setUsuarioAprobador] = useState<IUsuario>();
  const aprobarAcuerdoConformidad = async () => {

    const service = new UsuariosService();
    const user = await service.getLogedUser();


    const payloadAcuerdoConformidad={
      is_aprobado: true,
      aprobado_por_usuarioId:user?.id!,

    }as IAcuerdoConformidad

    const serviceAcuerdo = new AcuerdoConformidadService();
    const respuestaAcuerdo = await serviceAcuerdo.update(
      payloadAcuerdoConformidad,
      acuerdoconformidad.id!,
    );


    const payloadTicket = {
      estado: "FINALIZADO",
    } as ITicket;

    const serviceTicket = new TicketsService();
    const respuestaTicket = await serviceTicket.update(
      payloadTicket,
      acuerdoconformidad.ticketId!
    );

    console.log(respuestaTicket);
    
    if (respuestaTicket.status === 200) {
      toast({
        title: "Ticket Finalizado",
        description: "Se finalizo el ticket",
        position: "bottom-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: `Oops.. Algo salio mal ${respuestaTicket.status}`,
        description: "No se pudo finalizar el ticket",
        position: "bottom-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    router.back();
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

        <SimpleGrid columns={[1, 1, 3]} spacing={5}>
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="hora_llegada_servicio">
              Hora de llegada del tecnico
            </FormLabel>
            <Input
              readOnly
              variant="unstyled"
              placeholder="Hora de llegada"
              id="hora_de_llegada"
              borderColor="twitter.100"
              value={moment(acuerdoconformidad?.hora_llegada_servicio).format(
                "LLL"
              )}
            />
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="hora_finalizacion_servicio">
              Hora de finalizacion del servicio
            </FormLabel>
            <Input
              readOnly
              variant="unstyled"
              placeholder="hora_finalizacion_servicio"
              id="hora_finalizacion_servicios"
              borderColor="twitter.100"
              value={moment(
                acuerdoconformidad?.hora_finalizacion_servicio.toString()
              ).format("LLL")}
            />
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="fecha de acuerdo">
              Fecha de firmado de acuerdo
            </FormLabel>
            <Input
              readOnly
              variant="unstyled"
              placeholder="Fecha"
              id="fecha_acuerdo"
              borderColor="twitter.100"
              value={moment(acuerdoconformidad?.fecha_acuerdo).format("LLL")}
            />
          </FormControl>

          <Stack paddingTop={15}>
            <Text fontWeight={"bold"}>Domicilio</Text>
            <Text>{acuerdoconformidad?.direccion}</Text>
          </Stack>
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
            <FormLabel htmlFor="Actividades_realizadas">
              Actividad Realizada
            </FormLabel>

            <Textarea
              readOnly
              variant="unstyled"
              placeholder="Actividades Realizadas"
              id="actividades_realizadas"
              borderColor="twitter.100"
              value={acuerdoconformidad?.actividades_realizadas}
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
        </SimpleGrid>

        <SimpleGrid
          columns={[1, 2, 3]}
          spacing="20px"
          minChildWidth="10rem"
          mt={"3rem"}
        >
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
          {acuerdoconformidad.is_aprobado ?  
             <FormControl paddingTop={5}>
            <FormLabel  htmlFor="Se aprobo el acuerdo ">
              Se aprobo el acuerdo por :
            </FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              id="aprobado_por_usuarioId"
              borderColor="twitter.100"
              value={usuarioAprobador?.usuario!}
            />
          </FormControl> : (
            <Button
              h={"3rem"}
              colorScheme={"green"}
              onClick={aprobarAcuerdoConformidad}
            >
              Aprobar Cierre
            </Button>
          )}
        </SimpleGrid>
      </Box>

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
