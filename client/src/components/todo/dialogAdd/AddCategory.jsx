import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import labels from "../../../constants/labels";
import { ADD_TASK } from "../../../constants/steps";
import { addCategory } from "../../../actions/todoFiltersActions";
import { showMessageInfo } from "../../../actions/messageActions";

class AddCategory extends React.Component {
  state = {
    name: ""
  };

  onInputTextChange = e => {
    this.setState({ name: e.target.value });
  };

  onButtonAddClick = () => {
    const { name } = this.state;
    const { dispatch } = this.props;
    if (name === "") {
      dispatch(showMessageInfo(labels.msgNameRequired));
      return;
    }
    dispatch(addCategory(name, this.onCategoryCreated));
  };

  onCategoryCreated = selectedCategory => {
    const { onNext } = this.props;
    onNext({ stepId: ADD_TASK, options: { selectedCategory } });
  };

  render() {
    return (
      <div className="content-add-category">
        <h2>{labels.titleAddCategory}</h2>
        <div>
          <input
            className="main-input"
            type="text"
            placeholder={labels.placeholderName}
            onChange={this.onInputTextChange}
          />
        </div>
        <div>
          <button className="main-button" onClick={this.onButtonAddClick}>
            {labels.buttonAdd}
          </button>
        </div>
      </div>
    );
  }
}

AddCategory.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

export default connect()(AddCategory);
