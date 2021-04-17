import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends PureComponent {
  render() {
    const { searchResults, onAdd } = this.props;
    return (

      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={searchResults} listType="add" onAdd={onAdd} />
      </div>
    );
  }
}

SearchResults.propTypes = {
  onAdd: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchResults;
