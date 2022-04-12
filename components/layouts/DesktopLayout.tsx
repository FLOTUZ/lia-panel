import { BsFilterLeft } from "react-icons/bs";
import { Box, Center, Grid, GridItem } from "@chakra-ui/react";

import { useState } from "react";
import Navbar from "@/common/Navbar";

interface IDesktopLayout {
  children?: React.ReactNode;
}

const DesktopLayout = ({ children }: IDesktopLayout) => {
  return (
    <Grid
      h="100vh"
      templateRows="repeat(1, 1fr)"
      templateColumns={"repeat( 9, 1fr)"}
      gap={0}
      
    >
      <GridItem
        
        width={"fit-content"}
        colSpan={1}
        shadow="sm"
      >
        <Navbar />
      </GridItem>
      <GridItem colSpan={8} bg="#f5f5f5" padding={2}>
        {children}
      </GridItem>
    </Grid>
  );
};
export default DesktopLayout;
