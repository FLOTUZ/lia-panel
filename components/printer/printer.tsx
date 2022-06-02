import {
  Button,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";

interface PrinterProps {
  doc: JSX.Element;
}
function Printer({ doc }: PrinterProps) {
  const imprimirDoc = (nodo: any) => {
    const elemento = ReactDOMServer.renderToStaticMarkup(nodo);

    var myWindow = window.open("", "MsgWindow", "width=2480,height=3508");
    myWindow!.document.write(elemento);
    myWindow!.print();
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <>{doc}</>
      <Stack
        paddingTop={10}
        align="center"
        paddingLeft={"50%"}
        spacing={4}
        direction="row"
      >
        <Button
          paddingLeft={10} paddingRight={10}
          colorScheme="whatsapp"
          variant="solid"
          onClick={() => imprimirDoc(doc)}>Imprimir</Button>
      </Stack>
    </>
  );
}

export default Printer;
