import React, {Component} from 'react';


class SearchBar extends Component {

  constructor(props){
    super(props);

    this.state = { 
      term: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);

  }
  render(){
    return(
     <div className='search-bar'>
      <input 
        placeholder='Seach for a video...'
        onChange = {this.handleInputChange}
        value = {this.state.term}
        />
     </div>
    )
  }

  handleInputChange(event){
    let term = event.target.value;
    this.setState({
      term
    });

    this.props.onSearcTermChange(term);
  }

}

export default SearchBar;