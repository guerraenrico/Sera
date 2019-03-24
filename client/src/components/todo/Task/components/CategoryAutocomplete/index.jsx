// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { TransitionGroup } from "react-transition-group";

import ButtonAdd from "../ButtonAdd";

import Resize from "../../../../anims/Resize";
import { searchCategory } from "../../../../../actions/todoFiltersActions";

import CategoryComponent from "../../../Category";
import type { Category } from "../../../../../models/category";

import {
  Container,
  ContentSearch,
  ContentInput,
  Input,
  Suggestions,
  Suggestion,
  itemAnimationStyle
} from "./style";

const waitTime = 300;

type Props = {
  +withMargin: boolean,
  +doSearchCategory: (string, (Array<Category>) => void) => void,
  +onSelectCategory: Category => void,
  +onCreateCategory: string => void,
  +fullAddButton: boolean
};

type State = {
  text: string,
  categories: Array<Category>,
  suggestionsVisible: boolean,
  inputHeight: number,
  searchingCategory: boolean
};

class SearchComponent extends Component<Props, State> {
  state = {
    text: "",
    categories: [],
    suggestionsVisible: false,
    inputHeight: 0,
    searchingCategory: false
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
      // $FlowFixMe
      this.setState({ inputHeight: this.contentSearch.current.clientHeight });
    }
  }

  componentWillUnmount() {
    if (this.debounceSearch !== undefined) {
      this.debounceSearch.cancel();
    }
  }

  handleOnTextChange = e => {
    const text = e.target.value;
    this.setState({ text });
    if (this.debounceSearch !== undefined) {
      this.debounceSearch();
    }
  };

  handleOnInputFocus = () => {
    // $FlowFixMe
    document.addEventListener("keydown", this.handleOnKeyPress, false);
  };

  handleOnInputBlur = () => {
    this.cancel();
  };

  handleOnKeyPress = e => {
    const { onCreateCategory } = this.props;
    const { text } = this.state;
    if (e.key === "Enter") {
      if (text !== "") {
        onCreateCategory(text);
      }
      this.cancel();
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

  cancel = () => {
    // $FlowFixMe
    document.removeEventListener("keydown", this.handleOnKeyPress, false);
    this.setState({
      text: "",
      suggestionsVisible: false,
      categories: [],
      searchingCategory: false
    });
  };

  searchCategories = () => {
    const { text } = this.state;
    const { doSearchCategory } = this.props;
    if (text === "") {
      this.setState({ suggestionsVisible: false, categories: [] });
      return;
    }
    doSearchCategory(text, categories => {
      this.setState({ suggestionsVisible: categories.length > 0, categories });
    });
  };

  render() {
    const {
      text,
      categories,
      suggestionsVisible,
      inputHeight,
      searchingCategory
    } = this.state;
    const { withMargin, fullAddButton } = this.props;

    let contentAction = (
      <ButtonAdd onClick={() => this.setState({ searchingCategory: true })}>
        {fullAddButton ? "Category" : undefined}
      </ButtonAdd>
    );
    if (searchingCategory) {
      contentAction = (
        <ContentInput>
          <Input
            value={text}
            placeholder="Type to search"
            onChange={e => this.handleOnTextChange(e)}
            onFocus={this.handleOnInputFocus}
            onBlur={this.handleOnInputBlur}
            autoFocus
          />
        </ContentInput>
      );
    }
    return (
      <Container withMargin={withMargin}>
        <ContentSearch ref={this.contentSearch}>{contentAction}</ContentSearch>
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
  doSearchCategory: (text, callback) => dispatch(searchCategory(text, callback))
});

export default connect(
  undefined,
  mapDispatchToProps
)(SearchComponent);
