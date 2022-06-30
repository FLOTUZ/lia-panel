import { ICiudad, IImagen, ITecnico, IUsuario } from "@/services/api.models";
import { CiudadesService } from "@/services/ciudades.service";
import { ImagenesService } from "@/services/imagenes.service";
import { UsuariosService } from "@/services/usuarios.service";
import {
  Avatar,
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
moment.locale("es");
import { FaUserAstronaut } from "react-icons/fa";
import { MdPhone, MdEmail, MdLocationOn, MdCheckCircle } from "react-icons/md";

interface VerInformacionTecnicoProps {
  tecnico: ITecnico;
}
export function VerInformacionTecnico({ tecnico }: VerInformacionTecnicoProps) {
  const [usuario, setUsuario] = useState<IUsuario>();
  const [imgTecnico, setImgTecnico] = useState<IImagen>();
  const [ciudad, setCiudad] = useState<ICiudad>();

  const getUsuarioTecnico = async () => {
    const service = new UsuariosService();
    const respuesta = await service.getById(tecnico.usuarioId!);

    if (respuesta.status === 200) {
      const data = respuesta.data as IUsuario;
      setUsuario(data);
    }
  };

  const getFotoTecnico = async () => {
    const service = new ImagenesService();
    const respuesta = await service.getById(usuario?.img_perfilId!);

    if (respuesta.status === 200) {
      const data = respuesta.data as IImagen;
      setImgTecnico(data);
    }
  };

  const getCiudadTecnico = async () => {
    const service = new CiudadesService();
    const respuesta = await service.getById(tecnico.ciudadId!);

    if (respuesta.status === 200) {
      const data = respuesta.data as ICiudad;
      setCiudad(data);
    }
  };

  useEffect(() => {
    getUsuarioTecnico();
    getCiudadTecnico();
  }, [tecnico]);

  useEffect(() => {
    getFotoTecnico();
  }, [usuario]);

  return (
    <>
      <Box m={2} bgColor={"white"} p={5} borderRadius={10} boxShadow={"lg"}>
        <Heading>Informacion Del Tecnico</Heading>

        <SimpleGrid columns={[1,1,3]} placeItems={"center"}>
          <Box width={150} overflow="hidden">
            <WrapItem>
              <Avatar
                size="2xl"
                name={`${tecnico?.nombre} ${tecnico?.apellido_paterno}`}
                src={imgTecnico ? imgTecnico.url : ""}
              />{" "}
            </WrapItem>
          </Box>

          <Box padding={5}>
            <Heading color="black" as="h6" size="xs">
              Informacion general
            </Heading>
            <Box padding={5}>
              <VStack spacing={3} alignItems="flex-start">
                <HStack minWidth={100}>
                  <FaUserAstronaut color="#1970F1" size="20px" />

                  <Text>{`${tecnico.nombre} ${tecnico.apellido_paterno} ${tecnico.apellido_materno}`}</Text>
                </HStack>

                <Text variant="unstyled" fontWeight={"bold"}>
                  Servicios
                </Text>

                <List spacing={3}>
                  {tecnico.Servicio?.map((servicio, index) => {
                    return (
                      <ListItem key={index}>
                        <ListIcon as={MdCheckCircle} color="green.500" />
                        {servicio.nombre}
                      </ListItem>
                    );
                  })}
                </List>
              </VStack>
            </Box>
          </Box>
          <Box>
            <Heading padding={5} color="black" as="h6" size="xs">
              Informacion de contacto
            </Heading>
            <Box>
              <VStack spacing={3} alignItems="flex-start">
                <InputGroup height="48px">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdPhone color="#1970F1" size="20px" />}
                  />
                  <Input
                    variant="unstyled"
                    isReadOnly
                    height="48px"
                    type="tel"
                    placeholder="Numero de telefono"
                    value={tecnico.telefono}
                  />
                </InputGroup>
                <InputGroup height="48px">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdEmail color="#1970F1" size="20px" />}
                  />
                  <Input
                    variant="unstyled"
                    isReadOnly
                    height="48px"
                    type="tel"
                    placeholder="Email"
                    value={usuario?.email}
                  />
                </InputGroup>
                <InputGroup height="48px">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdLocationOn color="#1970F1" size="20px" />}
                  />
                  <Input
                    variant="unstyled"
                    isReadOnly
                    height="48px"
                    type="tel"
                    placeholder="Localizacion"
                    value={ciudad?.nombre}
                  />
                </InputGroup>
              </VStack>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}
