import ViewText from "@/common/ViewText";
import { ICotizacionTecnico, IImagen } from "@/services/api.models";
import { ImagenesService } from "@/services/imagenes.service";
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Tab,
  Table,
  TableCaption,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CrearCotizacionTecnicoProps {
  cotizacion: ICotizacionTecnico;
}

export const CrearCotizacionTecnico = ({
  cotizacion,
}: CrearCotizacionTecnicoProps) => {
  const [imagen, setImagen] = useState<IImagen>();
  const [uploadImage, setUploadImage] = useState<string>("");

  const getImagen = async () => {
    const service = new ImagenesService();
    const respuesta = await service.getById(cotizacion.preSolucionId);
    const data = respuesta.data as IImagen;
    setImagen(data);
  };

  const getImagenUpload = async () => {
    const service = new ImagenesService();
    const respuesta = await service.getUploadImage(1);
    const data = respuesta;

    setUploadImage(data);
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
            // value={cotizacion.solucion_tecnico}
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
              //value={}
            />
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="Hora de Cierre">Hora de Cierre</FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              placeholder="Hora de Cierre"
              id="hora_de_cierre"
              borderColor="twitter.100"
              //value={}
            />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing={5}>
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="Costo de Mano de Obra">
              Costo de Mano de Obra
            </FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              placeholder="Costo de Mano de Obra"
              id="costo_de_mano_de_obra"
              borderColor="twitter.100"
              //value={}
            />
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="Costo de Materiale">
              Costo de Materiale
            </FormLabel>
            <Input
              variant="unstyled"
              isReadOnly
              placeholder="Costo de Materiale"
              id="costo_de_materiales"
              borderColor="twitter.100"
              //value={}
            />
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
            <img height={200} src={uploadImage} alt="Evidencia 2" />
          </Box>
        </Center> 
        
        <Button  variant='outline' colorScheme={"green"} > Aprobar</Button>
        <Button colorScheme={"red"}> Rechazar</Button>
        </Box>
    </div>
  );
};
