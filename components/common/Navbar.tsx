import {
  Button,
  Center,
  Flex,
  SimpleGrid,
  Spacer,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  MdHomeRepairService,
  MdSupervisedUserCircle,
  MdVerifiedUser,
} from "react-icons/md";

import { IoBook, IoExit, IoReceipt } from "react-icons/io5";
import { IoMdMap } from "react-icons/io";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.jpeg";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/router";
import { UsuariosService } from "@/services/usuarios.service";
import { IUsuario } from "@/services/api.models";
import { useEffect, useState } from "react";

interface IRouteItem {
  name: string;
  path: string;
  icon: JSX.Element;
  rol: string[];
}

const Navbar = (hideNabar: any, setHideNabar: Function) => {
  const [sesion, setSesion] = useState<IUsuario>();

  const [isMayorQueHD] = useMediaQuery("(min-width: 700px)");

  const getUserLogeado = async () => {
    const service = new UsuariosService();
    const usuario = await service.getLogedUser();

    if (usuario !== null) {
      const variable = usuario as IUsuario;
      setSesion(variable);
    }
  };

  useEffect(() => {
    getUserLogeado();
  }, []);

  const router = useRouter();

  //Consultas el usuario logeado
  ///  TODO: usuario logeado

  const ROL = sesion?.rol;

  const routes: IRouteItem[] = [
    {
      name: "Tickets",
      path: "/tickets",
      icon: <IoReceipt size={32} />,
      rol: ["CAPTURISTA", "ADMIN"],
    },
    {
      name: "Técnicos",
      path: "/tecnicos",
      icon: <MdHomeRepairService size={32} />,
      rol: ["CAPTURISTA", "ADMIN"],
    },
    {
      name: "Usuarios",
      path: "/usuarios",
      icon: <MdSupervisedUserCircle size={32} />,
      rol: ["ADMIN"],
    },
    {
      name: "Servicios",
      path: "/servicios",
      icon: <IoBook size={32} />,
      rol: ["CAPTURISTA", "ADMIN"],
    },
    {
      name: "Seguros",
      path: "/aseguradoras",
      icon: <MdVerifiedUser size={32} />,
      rol: ["ADMIN"],
    },
    {
      name: "Estados",
      path: "/ciudades",
      icon: <IoMdMap size={32} />,
      rol: ["ADMIN"],
    },
  ];
  return (
    <Stack width="20vh" h="100vh" pos="fixed" p={2}>
      <Flex
        h="6rem"
        w="6rem"
        bgColor="gray.100"
        borderRadius={"full"}
        my="5"
        padding={1}
        alignSelf={"normal"}
      >
        {/*TODO: Poner Imagen de GPO LIAS*/}

        <Image src={Logo} alt="" />
      </Flex>
      {routes.map((route, key) => {
        return route.rol.includes(String(ROL)) ? (
          <Link key={key} href={route.path}>
            <a>
              <Button
                h="3.5rem"
                w="100%"
                bgColor="white"
                color="black"
                borderColor="gray.200"
                _hover={{
                  shadow: "xl",
                  borderColor: "gray",
                  bgColor: "black",
                  color: "white",
                }}
              >
                {isMayorQueHD ? (
                  <>
                    {route.icon}
                    <Spacer />
                    {route.name}
                    <Spacer />
                  </>
                ) : (
                  <SimpleGrid columns={[1, 1, 2]} justifyItems="center">
                    {route.icon}
                    {route.name}
                  </SimpleGrid>
                )}
              </Button>
            </a>
          </Link>
        ) : null;
      })}
      <Button
        h="3.5rem"
        w="100%"
        bgColor="white"
        color="black"
        borderColor="gray.200"
        _hover={{
          shadow: "xl",
          borderColor: "gray",
          bgColor: "black",
          color: "white",
        }}
        onClick={() => {
          const service = new AuthService();
          service.logout();
          router.push("/login");
        }}
      >
        {isMayorQueHD ? (
          <>
            <IoExit size={32} />
            <Spacer />
            Salir
            <Spacer />
          </>
        ) : (
          <SimpleGrid columns={[1, 1, 2]} justifyItems="center">
            <IoExit size={32} />
            Salir
          </SimpleGrid>
        )}
      </Button>
    </Stack>
  );
};

import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      data: null,
    },
  };
};

export default Navbar;
