// @flow
import React from "react";
import ButtonDelete from "./components/ButtonDelete";

import { Chip, Text } from "./style";

import type { Category } from "../../../models/category";

type Props = {
  +category: Category,
  +onDelete?: Category => void,
  +onClick: Category => void
};

const CategoryComponent = ({ category, onClick, onDelete }: Props) => {
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
      (e.target.tagName.toLowerCase() === "i" ||
        e.target.tagName.toLowerCase() === "button") &&
      onDelete !== undefined
    ) {
      onDelete(category);
    }
  };

  return (
    <Chip onClick={onChipClick} role="presentation">
      <Text>{category.name}</Text>
      {onDelete !== undefined && <ButtonDelete onClick={onDeleteClick} />}
    </Chip>
  );
};

CategoryComponent.defaultProps = {
  onDelete: undefined
};

export default CategoryComponent;
