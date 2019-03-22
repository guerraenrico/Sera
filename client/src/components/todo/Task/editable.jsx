// @flow
import React from "react";

import Input from "../../layout/Input";
import Button from "../../layout/Button";
import DatePicker from "../../layout/DatePicker";

import { toSimpleDateFormat } from "../../../utils/Common";
import labels from "../../../constants/labels";

import type { Task } from "../../../models/task";
import type { Category } from "../../../models/category";

import {
  Item,
  Header,
  ContentEditItem,
  ContentEditInputs,
  ContentEditDate,
  ContentEditDescription,
  ContentEditActions
} from "./style";

export type EditableProps = {
  +onUndo: () => void,
  +onCreate: Task => void,
  +task?: Task
};

type ControlString = {
  text: string,
  valid: boolean,
  error: string
};

type ControlDate = {
  date: Date,
  valid: boolean,
  error: string
};

type State = {
  title: ControlString,
  description: ControlString,
  todoWithin: ControlDate
};

class EditableTaskComponent extends React.PureComponent<EditableProps, State> {
  static defaultProps = {
    task: undefined
  };

  state = {
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

  handleOnTextChange = (name: string) => e =>
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
  };

  render() {
    const { task, onUndo } = this.props;
    const { title, description, todoWithin } = this.state;
    return (
      <Item>
        <ContentEditItem>
          <ContentEditInputs>
            <Header>
              <Input
                value={title.text}
                placeholder="Type a title"
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
              CONFIRM
            </Button>
          </ContentEditActions>
        </ContentEditItem>
      </Item>
    );
  }
}

export default EditableTaskComponent;
