// @flow
import React from "react";
import Input from "../../layout/Input";
import Button from "../../layout/Button";

import { toSimpleDateFormat } from "../../../utils/Common";
import labels from "../../../constants/labels";

import type { Task } from "../../../models/task";
import type { Category } from "../../../models/category";

import { Item, Header, ContentDate, Date } from "./style";

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
      date: undefined,
      valid: false,
      error: ""
    }
  };

  handleOnTextChange = (name: string) => e =>
    this.setState({
      [name]: { text: e.target.value, valid: false, error: "" }
    });

  render() {
    const { task, onUndo, onCreate } = this.props;
    const { title, description, todoWithin } = this.state;
    return (
      <Item>
        <Header>
          <Input
            value={title.text}
            placeholder="Type a title"
            onChange={this.handleOnTextChange("title")}
            size="large"
          />
        </Header>
        <ContentDate>
          <Input
            value={description.text}
            placeholder="Type a description"
            onChange={this.handleOnTextChange("description")}
            size="small"
          />
        </ContentDate>
        <Button onClick={onUndo}>UNDO</Button>
        <Button color="accent" onClick={onCreate}>
          CONFIRM
        </Button>
      </Item>
    );
  }
}

export default EditableTaskComponent;
