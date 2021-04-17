import PropTypes from 'prop-types';
import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.eventHandler.bind(this));
  }

  handleTermChange(e) {
    const newVal = e.target.value;
    this.setState({ searchTerm: newVal });
  }

  search() {
    const { onSearch } = this.props;
    const { searchTerm } = this.state;

    if (searchTerm) onSearch(searchTerm);
  }

  eventHandler({ key }) {
    const pressedKey = String(key);
    if (pressedKey === 'Enter') this.search();
    else {
      const inputEl = this.inputRef.current;

      if (pressedKey === 'Backspace') {
        inputEl.value = inputEl.value.substring(0, inputEl.value.length - 1);
      } else {
        inputEl.value += pressedKey;
      }
      this.setState({ searchTerm: inputEl.value });
    }
  }

  render() {
    return (

      <div className="SearchBar">
        <input ref={this.inputRef} placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange.bind(this)} />
        <button type="button" className="SearchButton" onClick={this.search.bind(this)}>SEARCH</button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
