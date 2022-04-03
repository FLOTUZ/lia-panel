import { Button, Flex, Spacer, Stack } from "@chakra-ui/react";
import { MdHomeRepairService, MdOutlineMedicalServices, MdSpaceDashboard } from "react-icons/md";
import { IoBook, IoReceipt } from "react-icons/io5";

import Link from "next/link";

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
      name: "Servicios",
      path: "/servicios",
      icon: <IoBook size={32} />,
    },
  ];
  return (
    <Flex>
      <Stack w="100%" marginTop={5}>
        {routes.map((route, key) => {
          return (
            <Link key={key} href={route.path}>
              <a>
                <Button
                  h="3rem"
                  w="100%"
                  bgColor="white"
                  color="black"
                  borderWidth="1px"
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
    </Flex>
  );
};

export default Navbar;
