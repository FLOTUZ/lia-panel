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
import { AiOutlineSolution } from "react-icons/ai"
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
  const [DiagnosticoProblema, setDiagnosticoproblema] = useState("");
  const [SolucionTecnico, setSolucionTecnico] = useState("");
  const [FechaCotizacionTecnico, setFechaCotizacionTecnico] = useState("");
  const [CostoManoObra, setCostoManoObra] = useState<number>(0);
  const [CostoMateriales, setCostoMateriales] = useState<number>(0);
  const [TotalCotizacion, setTotalCotizacion] = useState<number>(0);
  const [IsAprobado, setIsAprobado] = useState(false);
  const [IdAprobado, setIdAprobado] = useState<number>(0);


  const CrearCotizacionDeTecnico = async () => {
    const data: ICotizacionTecnico = {
      diagnostico_problema: DiagnosticoProblema,
      solucion_tecnico: SolucionTecnico,
      fecha_contacto: FechaCotizacionTecnico,
      costo_mano_obra: CostoManoObra,
      costo_materiales: CostoMateriales,
      total_cotizacion: TotalCotizacion,
      isAprobado: IsAprobado,
      aprobado_por_usuarioId: IdAprobado,
    };

    const service = new CotizacionTecnicoService();
    const response = await service.create(data);
    const cotizacion = response.data as ICotizacionTecnico;
    setCrearCotizacion(cotizacion);

    if (response.status === 201) {
      onClose();
      toast({
        title: "Se creo Cotizacion Con exito",
        description: "Se creo Cotizacion con exito",
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

  const aprobarCotizacion = async () => {
    const payloadCotizacion = {
      isAprobado: true,
    } as ICotizacionTecnico;

    const serviceCotizacion = new CotizacionTecnicoService();
    const respuestaCotizacion = await serviceCotizacion.update(
      payloadCotizacion,
      cotizacion.id!
    );

    const dataCotizacion = respuestaCotizacion as ICotizacionTecnico;

    const playloadTicket = {
      estado: "EN PROCESO",
    } as ITicket;

    const serviceTicket = new TicketsService();
    const respuestaTicket = await serviceTicket.update(
      playloadTicket,
      cotizacion.ticketId!
    );

    const dataTicket = respuestaTicket.data as ICotizacionTecnico;

    if (respuestaCotizacion.status === 201) {
      onClose();
      toast({
        title: "Se acepto cotizacion Con exito",
        description: "Se aprobo cotizacion con exito",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops.. Algo salio mal",
        description: respuestaCotizacion.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }



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
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<AiOutlineSolution color='gray.300' />}
            />
            <Textarea
              variant="filled"
              id="solucion_cotizacion_del_tecnico"
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
              id="fecha_llamada"
              variant="filled"
              type="datetime-local"
              borderColor="twitter.100"
              value={FechaCotizacionTecnico}
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
                pointerEvents='none'
                children={<MdAttachMoney color='gray.300' />}
              />
              <Input
                variant="filled"
                placeholder="Costo de Mano de Obra"
                id="costo_de_mano_de_obra"
                borderColor="twitter.100"
                onChange={(e) => {
                  setCostoManoObra(e.target.valueAsNumber);
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
                pointerEvents='none'
                children={<MdAttachMoney color='gray.300' />}
              />
              <Input
                variant="filled"
                placeholder="Costo de Materiale"
                id="costo_de_materiales"
                borderColor="twitter.100"
                onChange={(e) => {
                  setCostoMateriales(e.target.valueAsNumber);
                }}
              />
            </InputGroup>
          </FormControl>
        </SimpleGrid>

        <SimpleGrid minChildWidth="120px" columns={2} spacing={10}>
          <Center marginTop={"30px"} h="100px" color="white">
            <Box margin={"50px"} height="80px">
              <Button
                colorScheme={"green"}
                onClick={aprobarCotizacion}
              >
                Aprobar
              </Button>
            </Box>
            <Box margin={"50px"} height="80px">
              <Button variant="outline"
               colorScheme={"red"}
                  onClick={CrearCotizacionDeTecnico}
              >

                Guardar
              </Button>
            </Box>
          </Center>
        </SimpleGrid>
      </Box>
    </div>
  );
};
