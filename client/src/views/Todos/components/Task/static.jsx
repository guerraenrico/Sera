import React from "react";
import PropTypes from "prop-types";

import { Draggable } from "react-beautiful-dnd";
import Collapse from "~/components/anims/Collapse";
import Fade from "~/components/anims/Fade";
import CategoryComponent from "../Category";
import ButtonComplete from "./ButtonComplete";
import ButtonDelete from "./ButtonDelete";
import CategoryAutocomplete from "./CategoryAutocomplete";
import { toSimpleDateFormat } from "~/utils/Common";
import labels from "~/constants/labels";

import { TaskType } from "~/models/task";

import {
  Item,
  Content,
  Handle,
  HandleIcon,
  Header,
  Title,
  ContentDate,
  Date,
  ContentCategories,
  ContentCategory,
  ContentDescription,
  Description
} from "./style";

class StaticTaskComponent extends React.PureComponent {
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

  categoriesToRender = task => {
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
    const { index, task, onDelete, onComplete } = this.props;
    const { collapsed } = this.state;
    return (
      <Draggable
        draggableId={task.id}
        index={index}
        isDragDisabled={task.completed}
      >
        {(provided, snapshot) => (
          <Item
            className={`${task.completed ? "completed" : ""}`}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Content isDragging={snapshot.isDragging}>
              <Handle {...provided.dragHandleProps}>
                <HandleIcon className="icon-handle" />
              </Handle>
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
                  <ButtonComplete
                    onClick={onComplete}
                    completed={task.completed}
                  />
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
            </Content>
          </Item>
        )}
      </Draggable>
    );
  }
}

StaticTaskComponent.propTypes = {
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
  onCategoryClick: PropTypes.func.isRequired,
  onSetCategory: PropTypes.func.isRequired,
  onCreateCategory: PropTypes.func.isRequired,
  onRemoveCategory: PropTypes.func.isRequired,
  task: TaskType.isRequired
};

export default StaticTaskComponent;
