import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';

const API_KEY = 'AIzaSyCPBx-1oCI9fnq2LswyZ81LufkXRLR7u4k';

//class based component
class App extends Component {
  constructor (props){
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSelectVideo = this.handleSelectVideo.bind(this);


    this.videoSearch('surfboards');
    
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos,
        selectedVideo: videos[0]
      });
    });
  }

  render(){
    const videoSearchThrottled = _.debounce(this.handleSearchChange, 300);//only can run every 300 miliseconds
    return(
      <div>
        <SearchBar onSearcTermChange={videoSearchThrottled} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList 
          videos={this.state.videos} 
          onVideoSelect={this.handleSelectVideo}
        />
      </div>
    );
  } 

  handleSearchChange(term){
    this.videoSearch(term);
  }

  handleSelectVideo(selectedVideo){
    this.setState({
      selectedVideo
    })
  }
}

/*//functional component
const App = () => {
  return (
    
  )
}*/

ReactDOM.render(<App />, document.querySelector('.container'));