import {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {

    constructor(props){

        super(props);
        this.state = { searchTerm: '' };
    }
    search(){

        this.props.onSearch(this.state.searchTerm);
    }
    handleTermChange(e){

        let newVal = e.target.value;
        this.setState({searchTerm: newVal});
    }
    render(){

        return (

            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange.bind(this)} />
                <button className="SearchButton" onClick={this.search.bind(this)}>SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;