// @flow
import React from "react";
import { connect } from "react-redux";

import ButtonClose from "./ButtonClose";
import Visibility from "./Visibility";

import * as todoFiltersActions from "~/actions/todoFiltersActions";
import * as todoFiltersSelectors from "~/selectors/todoFiltersSelectors";

import DialogAnim from "~/components/anims/DialogAnim";

import { Dialog, Header, Container } from "./style";

type Props = {
  open: boolean,
  onClose: () => void,
  selectedFilter: string,
  onSwitch: string => void
};

const Filters = ({ onClose, open, selectedFilter, onSwitch }: Props) => {
  const handleOnSwitch = visibility => {
    onSwitch(visibility);
    onClose();
  };
  return (
    <DialogAnim in={open}>
      <Dialog>
        <Header>
          <ButtonClose onClick={() => onClose()} />
        </Header>
        <Container>
          <Visibility
            selectedFilter={selectedFilter}
            onSwitch={handleOnSwitch}
          />
        </Container>
      </Dialog>
    </DialogAnim>
  );
};

const mapStateToProps = state => ({
  selectedFilter: todoFiltersSelectors.getVisibilityFilter(state)
});

const mapDispatchToProps = dispatch => ({
  onSwitch: visibility => {
    dispatch(todoFiltersActions.changeVisibility(visibility));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
