import { Button, Flex, Spacer, Stack } from "@chakra-ui/react";
import {
  MdHomeRepairService,
  MdSpaceDashboard,
  MdSupervisedUserCircle,
  MdVerifiedUser,
} from "react-icons/md";
import { IoBook, IoReceipt } from "react-icons/io5";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/vercel.svg";

const Navbar = () => {
  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: <MdSpaceDashboard size={32} />,
    },
    {
      name: "Tickets",
      path: "/tickets",
      icon: <IoReceipt size={32} />,
    },
    {
      name: "Tecnicos",
      path: "/tecnicos",
      icon: <MdHomeRepairService size={32} />,
    },
    {
      name: "Usuarios",
      path: "/usuarios",
      icon: <MdSupervisedUserCircle size={32} />,
    },
    {
      name: "Servicios",
      path: "/servicios",
      icon: <IoBook size={32} />,
    },
    {
      name: "Aseguradoras",
      path: "/aseguradoras",
      icon: <MdVerifiedUser size={32} />,
    },
  ];
  return (
    <Stack width="20vh" h="100vh" pos="fixed" p={2}>
      <Flex
        h="5rem"
        w="5rem"
        bgColor="gray.100"
        borderRadius={"full"}
        my="5"
        padding={2}
        alignSelf={"center"}
      >
        {/*TODO: Poner Imagen de GPO LIAS*/}

        <Image src={Logo} alt="" />
      </Flex>
      {routes.map((route, key) => {
        return (
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
                {route.icon}
                <Spacer />
                {route.name}
                <Spacer />
              </Button>
            </a>
          </Link>
        );
      })}
    </Stack>
  );
};

export default Navbar;
