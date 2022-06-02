import { IAcuerdoConformidad, IImagen } from "@/services/api.models";
import { ImagenesService } from "@/services/imagenes.service";
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface IAcuerdoConformidadForm {
  acuerdoconformidad: IAcuerdoConformidad;
}

export const AcuerdoConformidadForm = ({
  acuerdoconformidad,
}: IAcuerdoConformidadForm) => {
  const [imagen, setImagen] = useState<IImagen>();
  const [uploadImage, setUploadImage] = useState<string>("");
  const [uploadFirma, setUploadFirma] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenFirma,
    onOpen: onOpenFirma,
    onClose: onCloseFirma,
  } = useDisclosure();
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
            variant="filled"
            placeholder="Fecha"
            id="fecha_acuerdo"
            borderColor="twitter.100"
          />
        </FormControl>

        <SimpleGrid columns={[1, 1, 2]} spacing={5}>
          <SimpleGrid columns={[1, 1, 2]} spacing={5}>
            <FormControl paddingTop={15}>
              <FormLabel htmlFor="hora_llegada_servicio">
                Hora de llegada
              </FormLabel>
              <Textarea
                variant="filled"
                placeholder="Hora de llegada"
                id="hora_de_llegada"
                borderColor="twitter.100"
              />
            </FormControl>

            <FormControl paddingTop={15}>
              <FormLabel htmlFor="hora_finalizacion_servicio">
                hora de finalizacion del servicio
              </FormLabel>
              <Input
                variant="filled"
                placeholder="hora_finalizacion_servicio"
                id="hora_finalizacion_servicios"
                borderColor="twitter.100"
              />
            </FormControl>
          </SimpleGrid>
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="direccion">Domicilio</FormLabel>
            <Input
              variant="filled"
              placeholder="direccion"
              id="domicilio"
              borderColor="twitter.100"
            />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing={5}>
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="Descripcion del problema">
              Descripcion del problema
            </FormLabel>
            <Textarea
              variant="filled"
              placeholder="Descripcion del Problema"
              id="hora_de_contacto"
              borderColor="twitter.100"
            />
          </FormControl>
          <FormControl paddingTop={15}>
            <FormLabel htmlFor="observaciones">Observaciones</FormLabel>
            <Textarea
              variant="filled"
              placeholder="Observaciones"
              id="observaciones"
              borderColor="twitter.100"
            />
          </FormControl>

          <FormControl paddingTop={15}>
            <FormLabel htmlFor="Actividades_realizadas">
              Actividad Realizada
            </FormLabel>
            <Input
              variant="filled"
              placeholder="actividades_realizadas"
              id="actividades_realizadas"
              borderColor="twitter.100"
            />
          </FormControl>
        </SimpleGrid>

        <Center>
          <Divider orientation="horizontal" paddingTop={30} />

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
        </Center>

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
            <img
              height={200}
              src={uploadFirma}
              alt="Evidencia 3"
              onClick={onOpen}
            />
          </Box>
        </Center>

        <Box marginTop={"40px"} margin={"50px"} height="80px">
          <Button margin={"50px"} colorScheme={"green"}>
            Aprobar
          </Button>

          <Button variant="outline" colorScheme={"red"}>
            Rechazar
          </Button>
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
    </div>
  );
};
