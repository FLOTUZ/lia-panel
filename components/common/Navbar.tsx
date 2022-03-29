import { Button, Flex, Spacer, Stack } from "@chakra-ui/react";
import { MdSpaceDashboard } from "react-icons/md";
import { IoReceipt } from "react-icons/io5";

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
  ];
  return (
    <Flex>
      <Stack w="100%" marginTop={5}>
        {routes.map((route, key) => {
          return (
            <Button
              key={key}
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
          );
        })}
      </Stack>
    </Flex>
  );
};

export default Navbar;
