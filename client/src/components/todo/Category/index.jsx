// @flow
import React from "react";
import ButtonDelete from "./components/ButtonDelete";

import { Chip, Text } from "./style";

import type { Category } from "~/models/category";

type Normal = "normal";
type Small = "small";
type Size = Small | Normal;

type Props = {
  +category: Category,
  +onDelete?: Category => void,
  +onClick: Category => void,
  +size?: Size
};

const CategoryComponent = ({ category, onClick, onDelete, size }: Props) => {
  const onChipClick = e => {
    if (
      e.target.tagName.toLowerCase() !== "i" &&
      e.target.tagName.toLowerCase() !== "button"
    ) {
      onClick(category);
    }
  };

  const onDeleteClick = e => {
    if (
      // $FlowFixMe
      (e.target.tagName.toLowerCase() === "i" ||
        // $FlowFixMe
        e.target.tagName.toLowerCase() === "button") &&
      onDelete !== undefined
    ) {
      onDelete(category);
    }
  };

  return (
    <Chip onClick={onChipClick} className={size} role="presentation">
      <Text>{category.name}</Text>
      {onDelete !== undefined && <ButtonDelete onClick={onDeleteClick} />}
    </Chip>
  );
};

CategoryComponent.defaultProps = {
  onDelete: undefined,
  size: "normal"
};

export default CategoryComponent;
