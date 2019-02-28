﻿// @flow
import React from "react";
import Collapse from "../../anims/Collapse";
import Fade from "../../anims/Fade";
import ButtonCompleteTask from "./ButtonCompleteTask";
import ButtonDeleteTask from "./ButtonDeleteTask";
import { toSimpleDateFormat } from "../../../utils/Common";
import labels from "../../../constants/labels";

import type { Task } from "../../../models/task";

import {
  Item,
  Header,
  Title,
  ContentDate,
  Date,
  ContentDescription,
  Description
} from "./style";

type Props = {
  onDelete?: () => void,
  onComplete?: Task => void,
  task: Task
};
type State = {
  collapsed: boolean
};

class TaskComponent extends React.Component<Props, State> {
  static defaultProps = {
    onDelete: undefined,
    onComplete: undefined
  };

  state = {
    collapsed: false
  };

  onTitleClick = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

  renderDate = () => {
    const { task } = this.props;
    if (task.completed) {
      return (
        <Date className="complete">
          {`${labels.labelPartialCompleted} ${
            task.completedAt ? toSimpleDateFormat(task.completedAt) : ""
          }`}
        </Date>
      );
    }
    return (
      <Date className="complete-within">
        {`${labels.labelPartialToCompleted} ${
          task.todoWithin
            ? toSimpleDateFormat(task.todoWithin)
            : labels.labelNotSet
        }`}
      </Date>
    );
  };

  render() {
    const { task, onDelete, onComplete } = this.props;
    const { collapsed } = this.state;
    return (
      <Item>
        <Header>
          <Title
            className={`${task.completed ? "task-title-completed" : ""}`}
            onClick={() => this.onTitleClick()}
            role="presentation"
          >
            {task.title}
          </Title>
          <Fade in={collapsed}>
            <ButtonDeleteTask onClick={onDelete} />
          </Fade>
          {onComplete !== undefined && (
            <ButtonCompleteTask
              onClick={onComplete}
              completed={task.completed}
            />
          )}
        </Header>
        <ContentDate>{this.renderDate()}</ContentDate>
        <Collapse in={collapsed}>
          <ContentDescription key={task.description}>
            <Description
              className={`${
                task.description !== undefined && task.description !== ""
                  ? "empty"
                  : ""
              }`}
            >
              {task.description !== undefined && task.description !== ""
                ? task.description
                : labels.labelNoDescription}
            </Description>
          </ContentDescription>
        </Collapse>
      </Item>
    );
  }
}

export default TaskComponent;
