import React from "react";
import PropTypes from "prop-types";

import Input from "~/components/Input";
import Button from "~/components/Button";
import DatePicker from "~/components/DatePicker";

import labels from "~/constants/labels";

import { TaskType } from "~/models/task";

import {
  Item,
  Content,
  Header,
  ContentEditItem,
  ContentEditInputs,
  ContentEditDate,
  ContentEditDescription,
  ContentEditActions
} from "./style";

const initialState = {
  title: {
    text: "",
    valid: false,
    error: ""
  },
  description: {
    text: "",
    valid: false,
    error: ""
  },
  todoWithin: {
    date: new Date(),
    valid: false,
    error: ""
  }
};

class EditableTaskComponent extends React.PureComponent {
  static defaultProps = {
    task: undefined
  };

  state = initialState;

  handleOnTextChange = name => e =>
    this.setState({
      [name]: { text: e.target.value, valid: true, error: "" }
    });

  handleOnDateChange = e => {
    this.setState({
      todoWithin: { date: e.target.value, valid: true, error: "" }
    });
  };

  handleOnButtonConfirmClick = () => {
    const { onCreate } = this.props;
    const { title, description, todoWithin } = this.state;
    if (title.text === "") {
      return;
    }
    onCreate({
      title: title.text,
      description: description.text,
      todoWithin: todoWithin.date
    });
    this.setState(initialState);
  };

  render() {
    const { task, onUndo } = this.props;
    const { title, description, todoWithin } = this.state;
    return (
      <Item>
        <Content>
          <ContentEditItem>
            <ContentEditInputs>
              <Header paddingTop>
                <Input
                  value={title.text}
                  placeholder={labels.placeHolderTitle}
                  onChange={this.handleOnTextChange("title")}
                  size="large"
                />
              </Header>
              <ContentEditDate>
                <DatePicker
                  size="small"
                  calendarClassName="dark-calendar"
                  onChange={this.handleOnDateChange}
                  value={todoWithin.date}
                  minDate={new Date()}
                  locale="en-US"
                  clearIcon={<i className="icon-delete" />}
                  calendarIcon={<i className="icon-calendar" />}
                />
              </ContentEditDate>
              <ContentEditDescription>
                <Input
                  value={description.text}
                  placeholder="Type a description"
                  onChange={this.handleOnTextChange("description")}
                  size="small"
                />
              </ContentEditDescription>
            </ContentEditInputs>
            <ContentEditActions>
              <Button onClick={onUndo}>UNDO</Button>
              <Button color="accent" onClick={this.handleOnButtonConfirmClick}>
                {"CONFIRM"}
              </Button>
            </ContentEditActions>
          </ContentEditItem>
        </Content>
      </Item>
    );
  }
}

EditableTaskComponent.propTypes = {
  onUndo: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  task: TaskType
};

export default EditableTaskComponent;
