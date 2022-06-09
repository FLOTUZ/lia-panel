import ViewText from "@/common/ViewText";
import { ICotizacionTecnico, IImagen, ITicket } from "@/services/api.models";
import { CotizacionTecnicoService } from "@/services/cotizacion-tecnico.service";
import { ImagenesService } from "@/services/imagenes.service";
import { TicketsService } from "@/services/tickets.service";
import { PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import { AiOutlineSolution } from "react-icons/ai";
import Logo from "../../public/vercel.svg";
import { CrearCotizacionTecnico } from "./CotizacionTecnicoForm";
interface CrearCotizacionTecnicoManualProps {
  ticket: ITicket;
  cotizacion: ICotizacionTecnico;
}

export const CrearCotizacionTecnicoManual = ({
  ticket,
  cotizacion,
}: CrearCotizacionTecnicoManualProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [crearCotizacion, setCrearCotizacion] = useState<ICotizacionTecnico>();
  const [diagnosticoProblema, setDiagnosticoproblema] = useState("");
  const [solucionTecnico, setSolucionTecnico] = useState("");
  const [fechaCotizacionTecnico, setFechaCotizacionTecnico] = useState("");
  const [costoManoObra, setCostoManoObra] = useState<number>(0);
  const [costoMateriales, setCostoMateriales] = useState<number>(0);
  const [totalCotizacion, setTotalCotizacion] = useState<number>(0);
  const [isAprobado, setIsAprobado] = useState(false);
  const [idAprobado, setIdAprobado] = useState<number>(0);

  const CrearCotizacionDeTecnico = async () => {
    const data: ICotizacionTecnico = {
      diagnostico_problema: diagnosticoProblema,
      solucion_tecnico: solucionTecnico,
      fecha_contacto: new Date().toISOString(),
      costo_mano_obra: costoManoObra,
      costo_materiales: costoMateriales,
      total_cotizacion: totalCotizacion,
      isAprobado: isAprobado,
      tecnicoId: ticket.tecnicoId!,
      ticketId: ticket.id,
      aprobado_por_usuarioId: 1, //TODO: Sacar id de usuario desde la sesion
    };

    const service = new CotizacionTecnicoService();
    const response = await service.create(data);
    const cotizacion = response.data as ICotizacionTecnico;

    setCrearCotizacion(cotizacion);

    if (response.status === 201) {
      const ticketPayload = { estado: "COTIZADO" } as ITicket;
      const serviceTicket = new TicketsService();
      const responseTicket = await serviceTicket.update(
        ticketPayload,
        ticket.id!
      );
      const ticketData = response.data as ITicket;
      
      onClose();
      toast({
        title: "Se creo Cotizacion Con exito",
        description: "Se creo Cotizacion con exito",
        position:"bottom-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops.. Algo salio mal",
        description: response.message,
        position:"bottom-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const aprobarCotizacion = async () => {
    const payloadCotizacion = {
      isAprobado: true,
    } as ICotizacionTecnico;

    const serviceCotizacion = new CotizacionTecnicoService();
    const respuestaCotizacion = await serviceCotizacion.update(
      payloadCotizacion,
      cotizacion.id!
    );

    const playloadTicket = {
      estado: "EN PROCESO",
    } as ITicket;

    const serviceTicket = new TicketsService();
    const respuestaTicket = await serviceTicket.update(
      playloadTicket,
      cotizacion.ticketId!
    );

    if (respuestaCotizacion.status === 200) {
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
        description: respuestaCotizacion.message,
        position:"bottom-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const calcular = () => {
      let montoTotal = costoManoObra + costoMateriales;
  
      setTotalCotizacion(montoTotal);
    };
    calcular();
  });
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
          <FormLabel htmlFor="Diagnostico del problema">
            Diagnostico del problema
          </FormLabel>
          <InputGroup>
            <Textarea
              variant="filled"
              id="diagnostico_problema"
              borderColor="twitter.100"
              onChange={(e) => {
                setDiagnosticoproblema(e.target.value);
              }}
            />
          </InputGroup>
        </FormControl>
        <FormControl paddingTop={15}>
          <FormLabel htmlFor="Solución y Cotización del Técnico">
            Solución y Cotización del Técnico
          </FormLabel>
          <InputGroup>
            {/*<InputLeftElement
              pointerEvents="none"
              marginRight={20}
              children={<AiOutlineSolution color="gray.300" />}
            />*/}
            <Textarea
              variant="filled"
              id="solucion_tecnico"
              borderColor="twitter.100"
              onChange={(e) => {
                setSolucionTecnico(e.target.value);
              }}
            />
          </InputGroup>
        </FormControl>

        <SimpleGrid columns={[1, 1, 2]} spacing={5}>
          <FormControl isRequired paddingTop={15}>
            <FormLabel htmlFor="fecha_llamada">Fecha de la Llamada</FormLabel>
            <Input
              w={"fit-content"}
              id="fecha_contacto"
              variant="filled"
              type="datetime-local"
              borderColor="twitter.100"
              value={fechaCotizacionTecnico}
              onChange={(e) => {
                setFechaCotizacionTecnico(e.target.value);
              }}
            />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing={5}>
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="Costo de Mano de Obra">
              Costo de Mano de Obra
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdAttachMoney color="gray.300" />}
              />
              <Input
                variant="filled"
                placeholder="Costo de Mano de Obra"
                id="costo_mano_obra"
                borderColor="twitter.100"
                fontWeight={"bold"}
                onChange={(e) => {
                  setCostoManoObra(Number(e.target.value));
                }}
              />
            </InputGroup>
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="Costo de Materiale">
              Costo de Materiale
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdAttachMoney color="gray.300" />}
              />
              <Input
                variant="filled"
                placeholder="Costo de Materiale"
                id="costo_materiales"
                borderColor="twitter.100"
                fontWeight={"bold"}
                onChange={(e) => {
                  setCostoMateriales(Number(e.target.value));
                }}
              />
            </InputGroup>
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="Total cotizacion">Total cotizacion</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdAttachMoney color="gray.300" />}
              />
              <Input
                variant="filled"
                placeholder="Total cotizacion"
                id="total_cotizacion"
                borderColor="twitter.100"
                fontWeight={"bold"}
                textColor={"red"}
                onChange={(e) => {
                  setTotalCotizacion(Number(e.target.value));
                }}
                value={totalCotizacion}
              />
            </InputGroup>
          </FormControl>
        </SimpleGrid>

        <SimpleGrid minChildWidth="120px" columns={2} spacing={10}>
          <Center marginTop={"30px"} h="100px" color="white">
            <Box margin={"50px"} height="80px">
              <Button
                variant="outline"
                colorScheme={"red"}
                paddingLeft={8}
                paddingRight={8}
                onClick={CrearCotizacionDeTecnico}
              >
                Guardar
              </Button>
            </Box>
            <Box height="80px">
              <Button
                colorScheme={"green"}
                paddingLeft={8}
                paddingRight={8}
                onClick={aprobarCotizacion}
              >
                Aprobar
              </Button>
            </Box>
          </Center>
        </SimpleGrid>
      </Box>
    </div>
  );
};
