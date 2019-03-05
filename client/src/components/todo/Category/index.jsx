// @flow
import React from "react";
import ButtonDelete from "./components/ButtonDelete";

import type { Category } from "../../../models/category";

type Props = {
  category: Category,
  onDelete?: Category => void,
  onClick: Category => void
};

const CategoryComponent = ({ category, onClick, onDelete }: Props) => {
  const onChipClick = e => {
    if (
      e.target.tagName.toLowerCase() !== "i" &&
      e.target.tagName.toLowerCase() !== "button"
    ) {
      onClick(category, e);
    }
  };

  const onDeleteClick = e => {
    if (
      e.target.tagName.toLowerCase() === "i" &&
      e.target.tagName.toLowerCase() === "button"
    ) {
      onDelete(category);
    }
  };

  return (
    <div
      className="category-chip align-items-center"
      onClick={onChipClick}
      role="presentation"
    >
      <span className="category-text">{category.name}</span>
      {onDelete !== undefined && <ButtonDelete onClick={onDeleteClick} />}
    </div>
  );
};

CategoryComponent.defaultProps = {
  onDelete: undefined
};

export default CategoryComponent;
