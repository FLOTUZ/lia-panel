import { ITecnico } from "@/services/api.models";
import { PhoneIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import moment from "moment";
moment.locale("es");
import "moment-timezone";
import "moment/locale/es";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import { FaUserAstronaut } from "react-icons/fa";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
  MdOutlineHomeRepairService,
  MdHomeRepairService,
} from "react-icons/md";

interface VerInformacionTecnicoProps {
  tecnico: ITecnico;
}
export function VerInformacionTecnico({ tecnico }: VerInformacionTecnicoProps) {
  return (
    <>
      <Container
        m={2}
        bgColor="white"
        padding={5}
        borderRadius={10}
        boxShadow="2xl"
        p="6"
        rounded="md"
        bg="white"
        maxW="full"
        mt={0}
        centerContent
        overflow="hidden"
      >
        <Heading>Informacion Del Tecnico</Heading>

        <SimpleGrid columns={[2, null, 3]} spacing={10}>
        
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Avatar
                    size="2xl"
                    name="Imagen de tecnico"
                    _hover={{ bg: "#000000" }}
                    src="https://bit.ly/sage-adebayo"
                  />{" "}
                </WrapItem>
              </Wrap>
            </Box>
    
        
          <Box>
            <Heading
              padding={5}
              marginLeft={"50px"}
              color="black"
              as="h6"
              size="xs"
            >
              Informacion general
            </Heading>
            <Box padding={5}>
              <VStack pl={0} spacing={3} alignItems="flex-start">
              <InputGroup height="48px" width="200px">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaUserAstronaut color="#1970F1" size="20px" />}
                  />
                  <Input
                    variant="unstyled"
                    isReadOnly
                    height="48px"
                    width="200px"
                    type="tel"
                    placeholder="Nombre"
                  />
                </InputGroup>
      
                <InputGroup height="48px" width="200px">
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <MdHomeRepairService color="#1970F1" size="20px" />
                    }
                  />
                  <Input
                    variant="unstyled"
                    isReadOnly
                    height="48px"
                    width="200px"
                    type="tel"
                    placeholder="Servicio"
                    
                  />
                </InputGroup>
              </VStack>
            </Box>
          </Box>
          <Box>
            <Heading
              padding={5}
              marginLeft={"50px"}
              color="black"
              as="h6"
              size="xs"
            >
              Informacion de contacto
            </Heading>
            <Box padding={5}>
              <VStack pl={0} spacing={3} alignItems="flex-start">
            
                <InputGroup height="48px" width="200px">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdPhone color="#1970F1" size="20px" />}
                  />
                  <Input
                    variant="unstyled"
                    isReadOnly
                    height="48px"
                    width="200px"
                    type="tel"
                    placeholder="Numero de telefono"
                  />
                </InputGroup>
                <InputGroup height="48px" width="200px">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdEmail color="#1970F1" size="20px" />}
                  />
                  <Input
                    variant="unstyled"
                    isReadOnly
                    height="48px"
                    width="200px"
                    type="tel"
                    placeholder="Email"
                  />
                </InputGroup>
                <InputGroup height="48px" width="200px">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdLocationOn color="#1970F1" size="20px" />}
                  />
                  <Input
                    variant="unstyled"
                    isReadOnly
                    height="48px"
                    width="200px"
                    type="tel"
                    placeholder="Localizacion"
                  />
                </InputGroup>
              </VStack>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </>
  );
}
