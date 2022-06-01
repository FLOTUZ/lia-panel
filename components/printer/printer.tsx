import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
      <Button onClick={() => imprimirDoc(doc)}>Imprimir</Button>
    </>
  );
}

export default Printer;
