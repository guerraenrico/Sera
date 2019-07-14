import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ButtonClose from "./ButtonClose";
import Visibility from "./Visibility";

import * as todoFiltersActions from "~/actions/todoFiltersActions";
import * as todoFiltersSelectors from "~/selectors/todoFiltersSelectors";

import DialogAnim from "~/components/anims/DialogAnim";

import { Dialog, Header, Container } from "./style";

const Filters = ({ onClose, open, selectedFilter, onSwitch }) => {
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

Filters.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  onSwitch: PropTypes.func.isRequired
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
