import { BsFilterLeft } from "react-icons/bs";
import { Box, Center, Grid, GridItem } from "@chakra-ui/react";

import { useState } from "react";
import Navbar from "@/common/Navbar";

const DesktopLayout = () => {
  const [hide, setHide] = useState({ hide: true, col: 25, span: 24 });

  const handleHide = () => {
    hide.hide === true
      ? setHide({ hide: false, col: 6, span: 5 })
      : setHide({ hide: true, col: 25, span: 24 });
  };

  return (
    <Grid
      h="100vh"
      templateRows="repeat(1, 1fr)"
      templateColumns={"repeat(" + hide.col + ", 1fr)"}
      gap={1}
    >
      <GridItem
        overflow="hidden"
        padding={0.5}
        colSpan={1}
        bgColor="white"
        shadow="sm"
      >
        <Navbar />
        <Box
          w="max-content"
          borderWidth={1}
          borderRadius={5}
          shadow="2xl"
          onClick={handleHide}
        >
          <Center>
            <BsFilterLeft size={30} />
          </Center>
        </Box>
      </GridItem>
      <GridItem colSpan={hide.span} bg="#f5f5f5"></GridItem>
    </Grid>
  );
};
export default DesktopLayout;
