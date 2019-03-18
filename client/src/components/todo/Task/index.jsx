// @flow
import React from "react";
import Collapse from "../../anims/Collapse";
import Fade from "../../anims/Fade";
import CategoryComponent from "../Category";
import ButtonComplete from "./components/ButtonComplete";
import ButtonDelete from "./components/ButtonDelete";
import CategoryAutocomplete from "./components/CategoryAutocomplete";
import { toSimpleDateFormat } from "../../../utils/Common";
import labels from "../../../constants/labels";

import type { Task } from "../../../models/task";
import type { Category } from "../../../models/category";

import {
  Item,
  Header,
  Title,
  ContentDate,
  Date,
  ContentCategories,
  ContentCategory,
  ContentDescription,
  Description
} from "./style";

type Props = {
  +onDelete?: () => void,
  +onComplete?: () => void,
  +onCategoryClick: Category => void,
  +onSetCategory: Category => void,
  +onCreateCategory: string => void,
  +onRemoveCategory: Category => void,
  +task: Task
};
type State = {
  collapsed: boolean,
  addingCategory?: boolean
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

  dateToRender = () => {
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

  categoriesToRender = (task: Task) => {
    // const { addingCategory } = this.state;
    const {
      onCategoryClick,
      onSetCategory,
      onCreateCategory,
      onRemoveCategory
    } = this.props;
    const { categories } = task;
    if (categories === undefined) {
      return undefined;
    }
    return (
      <ContentCategories>
        {categories.map(cat => (
          <ContentCategory key={`cntcat${task.id}_${cat.id}`}>
            <CategoryComponent
              key={`${task.id}_${cat.id}`}
              category={cat}
              onClick={onCategoryClick}
              onDelete={onRemoveCategory}
              size="small"
            />
          </ContentCategory>
        ))}
        <CategoryAutocomplete
          onSelectCategory={onSetCategory}
          onCreateCategory={onCreateCategory}
          fullAddButton={categories.length === 0}
        />
      </ContentCategories>
    );
  };

  render() {
    const { task, onDelete, onComplete } = this.props;
    const { collapsed } = this.state;
    return (
      <Item className={`${task.completed ? "completed" : ""}`}>
        <Header>
          <Title onClick={() => this.onTitleClick()} role="presentation">
            {task.title}
          </Title>
          {onDelete !== undefined && (
            <Fade in={collapsed}>
              <ButtonDelete onClick={onDelete} />
            </Fade>
          )}
          {onComplete !== undefined && (
            <ButtonComplete onClick={onComplete} completed={task.completed} />
          )}
        </Header>
        <ContentDate>{this.dateToRender()}</ContentDate>
        {this.categoriesToRender(task)}
        <Collapse in={collapsed}>
          <ContentDescription key={task.description}>
            <Description
              className={`${
                task.description !== undefined && task.description !== ""
                  ? ""
                  : "empty"
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
