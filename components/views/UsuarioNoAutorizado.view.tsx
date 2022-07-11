import { AuthService } from "@/services/auth.service";
import { Center, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const UsuarioNoAutorizado = () => {
  useEffect(() => {
    const service = new AuthService();
    service.logout();
    const delay = setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <Center h={"100vh"}>
      <SimpleGrid columns={[1, 1, 1]} placeItems="center" spacing={5}>
        <Heading>Usuario No Autorizado</Heading>
        <Heading as="h2" size={"xl"} color="red">
          Error 401
        </Heading>
        <Text>Redirigiendo al login</Text>
        <Spinner size="xl" />
      </SimpleGrid>
    </Center>
  );
};

export default UsuarioNoAutorizado;
