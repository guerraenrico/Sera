// @flow
import React from "react";

import ButtonClose from "./components/ButtonClose";
import Visibility from "./components/Visibility";

import DialogAnim from "../../anims/DialogAnim";

import { Dialog, Header, Container } from "./style";

type Props = {
  open: boolean,
  onClose: () => void
};

const Filters = ({ onClose, open }: Props) => {
  return (
    <DialogAnim in={open}>
      <Dialog>
        <Header>
          <ButtonClose onClick={() => onClose()} />
        </Header>
        <Container>
          <Visibility />
        </Container>
      </Dialog>
    </DialogAnim>
  );
};

export default Filters;
