import {
  GridItem,
  Heading,
} from "@chakra-ui/react";

interface IKanbanColumn {
  columnName: string; //Heading de estado de la columna
  colorGridBg: string; //Color de fondo de la columna
  children?: React.ReactNode;
}

const KanbanColumn = ({
  columnName,
  colorGridBg,
  children,
}: IKanbanColumn): React.ReactElement => {
  return (
  
      <GridItem
        p={0.5}
        width={"18rem"}
        h={"fit-content"}
        colSpan={1}
        shadow="sm"
        borderRadius={"lg"}
        bgColor={colorGridBg}

      >

        <Heading
          h={"fit-content"}
          p={2}
          borderRadius={"lg"}
          size="lg"
          bgColor={"white"}
        >
          {columnName}
        </Heading>
        {children}
      </GridItem>
    
  );
};

export default KanbanColumn;
