import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";
import scroll from "scroll";
import ButtonScroll from "../../layout/ButtonScroll";
import Category from ".";
import Fade from "../../anims/Fade";

import * as todoFiltersActions from "../../../actions/todoFiltersActions";
import categoryAll from "../../../constants/config";

import { getCategoriesFilterList } from "../../../selectors/todoFiltersSelectors";

class CategoriesFilter extends React.Component {
  chips = undefined;

  handleLeftScrollClick = () => {
    if (this.chips) {
      this.moveChipsScroll(-this.chips.clientWidth);
    }
  };

  handleRightScrollClick = () => {
    if (this.chips) {
      this.moveChipsScroll(this.chips.clientWidth);
    }
  };

  moveChipsScroll = delta => {
    if (this.chips) {
      const nextScrollLeft = this.chips.scrollLeft + delta;
      scroll.left(this.chips, nextScrollLeft);
    }
  };

  render() {
    const { categoryList, onDeleteCategory, onCilckCategory } = this.props;
    return (
      <div id="content-categories-filter">
        <ButtonScroll onClick={this.handleLeftScrollClick} direction="left" />
        <div
          className="categories-filter"
          ref={node => {
            this.chips = node;
          }}
        >
          <TransitionGroup
            style={{
              display: "inherit",
              paddingLeft: "1.25em",
              paddingRight: "1.25em"
            }}
          >
            {categoryList.map(category => (
              <Fade key={category.id}>
                <Category
                  key={category.id}
                  category={category}
                  selected={category.selected}
                  onDelete={onDeleteCategory}
                  onClick={onCilckCategory}
                />
              </Fade>
            ))}
          </TransitionGroup>
        </div>
        <ButtonScroll onClick={this.handleRightScrollClick} direction="right" />
      </div>
    );
  }
}

CategoriesFilter.propTypes = {
  categoryList: PropTypes.arrayOf(
    PropTypes.shape({
      selected: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onDeleteCategory: PropTypes.func,
  onCilckCategory: PropTypes.func.isRequired
};

CategoriesFilter.defaultProps = {
  onDeleteCategory: undefined
};

const mapStateToProps = state => ({
  categoryList: getCategoriesFilterList(state)
});

const mapDispatchToProps = dispatch => ({
  onDeleteCategory: category => {
    dispatch(todoFiltersActions.deleteCategory(category.id));
  },
  onCilckCategory: (category, e) => {
    if (
      e.target.tagName.toLowerCase() !== "i" &&
      e.target.tagName.toLowerCase() !== "button"
    ) {
      if (category.id === categoryAll.id) {
        dispatch(todoFiltersActions.selectCategoryAll());
      } else {
        dispatch(todoFiltersActions.selectCategory(category));
      }
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesFilter);
