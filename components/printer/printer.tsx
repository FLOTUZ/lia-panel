import {
  Box,
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

    <Button
          position={"fixed"}
          right={["30px", "105px"]}
          width={"130px"}
          height={"40px"}
          colorScheme="whatsapp"
          variant="solid"
          onClick={() => imprimirDoc(doc)}>Imprimir</Button>

      <>{doc}</>
     
    </>
  );
}

export default Printer;
