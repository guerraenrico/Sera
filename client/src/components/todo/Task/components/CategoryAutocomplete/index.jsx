// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { TransitionGroup } from "react-transition-group";

import Resize from "../../../../anims/Resize";
import {
  addCategory,
  searchCategory
} from "../../../../../actions/todoFiltersActions";

import CategoryComponent from "../../../Category";
import type { Category } from "../../../../../models/category";

import {
  Container,
  ContentSearch,
  ContentSelectedCategory,
  ContentInput,
  Input,
  Suggestions,
  Suggestion,
  itemAnimationStyle
} from "./style";

const waitTime = 300;

type Props = {
  +selectedCategory?: Category,
  +withMargin: boolean,
  +doSearchCategory: (string, (Array<Category>) => void) => void,
  +onSelectCategory: Category => void,
  +onCancel: () => void
};

type State = {
  text: string,
  categories: Array<Category>,
  suggestionsVisible: boolean,
  inputHeight: number
};

class SearchComponent extends Component<Props, State> {
  static defaultProps = {
    selectedCategory: undefined
  };

  state = {
    text: "",
    categories: [],
    suggestionsVisible: false,
    inputHeight: 0
  };

  debounceSearch = undefined;

  contentSearch = undefined;

  constructor(props) {
    super(props);
    this.contentSearch = React.createRef();
  }

  componentDidMount() {
    this.debounceSearch = debounce(() => this.searchCategories(), waitTime, {
      leading: false,
      trailing: true
    });
    if (
      this.contentSearch !== undefined &&
      this.contentSearch.current !== undefined
    ) {
      this.setState({ inputHeight: this.contentSearch.current.clientHeight });
    }
    document.addEventListener("keydown", this.handleOnKeyPress, false);
  }

  componentWillUnmount() {
    if (this.debounceSearch !== undefined) {
      this.debounceSearch.cancel();
    }
    document.removeEventListener("keydown", this.handleOnKeyPress, false);
  }

  handleOnTextChange = e => {
    const text = e.target.value;
    this.setState({ text });
    if (this.debounceSearch !== undefined) {
      this.debounceSearch();
    }
  };

  handleOnInputBlur = () => {
    // this.setState({ suggestionsVisible: false, categories: [] });
    // this.cancel();
  };

  handleOnKeyPress = e => {
    if (e.key === "Enter") {
      console.log("do validate");
      return;
    }
    if (e.key === "Escape") {
      this.cancel();
    }
  };

  handleOnCategoryClick = category => {
    const { onSelectCategory } = this.props;
    this.setState({ text: "" });
    onSelectCategory(category);
  };

  handleOnCategoryClearClick = () => {};

  cancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  searchCategories = () => {
    const { text } = this.state;
    const { doSearchCategory } = this.props;
    if (text === "") {
      this.setState({ suggestionsVisible: false, categories: [] });
      return;
    }
    doSearchCategory(text, categories => {
      this.setState({ suggestionsVisible: true, categories });
    });
  };

  render() {
    const { text, categories, suggestionsVisible, inputHeight } = this.state;
    const { selectedCategory, withMargin } = this.props;
    let itemToRender = (
      <ContentInput>
        <Input
          value={text}
          placeholder="Type to search"
          onChange={e => this.handleOnTextChange(e)}
          onBlur={this.handleOnInputBlur}
          autoFocus
        />
      </ContentInput>
    );
    if (selectedCategory !== undefined && selectedCategory !== null) {
      itemToRender = (
        <ContentSelectedCategory>
          <CategoryComponent
            category={selectedCategory}
            onClick={() => {}}
            onDelete={this.handleOnCategoryClearClick}
            size="small"
          />
        </ContentSelectedCategory>
      );
    }
    return (
      <Container withMargin={withMargin}>
        <ContentSearch ref={this.contentSearch}>{itemToRender}</ContentSearch>
        <Suggestions
          top={inputHeight}
          className={`${suggestionsVisible ? "" : "empty"}`}
        >
          <TransitionGroup>
            {categories.map((category, i) => (
              <Resize
                key={category.id}
                style={itemAnimationStyle(i === categories.length - 1)}
              >
                <Suggestion>
                  <CategoryComponent
                    category={category}
                    onClick={this.handleOnCategoryClick}
                    size="small"
                  />
                </Suggestion>
              </Resize>
            ))}
          </TransitionGroup>
        </Suggestions>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  doSearchCategory: (text, callback) =>
    dispatch(searchCategory(text, callback)),
  doAddCategory: (text, callback) => dispatch(addCategory(text, callback))
});

export default connect(
  undefined,
  mapDispatchToProps
)(SearchComponent);
