import React, { Component } from 'react';
import Search from './components/Search';
import RepoByStars from './components/RepoByStars';
import RepoByForks from './components/RepoByForks';
import RepoByContributors from './components/RepoByContributors';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularRepoByStars: '',
      popularRepoByForks: '',
      popularRepoByContributors: '',
    };
  }

  handlePopularRepoByStars = (result) => {
    console.log(result.length);
    this.setState({
      popularRepoByStars: result
    })
  }

  handlePopularRepoByForks = (result) => {
    this.setState({
      popularRepoByForks: result
    })
  }

  handlePopularRepoByContributors = (result) => {
    //  this need time to fix the sorting
    //result = result.sort((a,b) => (a.contributors > b.contributors) ? 1 : ((b.contributors > a.contributors) ? -1 : 0));
    //  end 

    console.log(result);
    this.setState({
      popularRepoByContributors: result
    })
  }

  render() {
    const { popularRepoByStars, popularRepoByForks, popularRepoByContributors } = this.state;

    return (
      <div className="App">
        <Search 
          onHandlePopularRepoByStars = { this.handlePopularRepoByStars }
          onHandlePopularRepoByForks = { this.handlePopularRepoByForks }
          onHandlePopularRepoByContributors = { this.handlePopularRepoByContributors }
        />
        <RepoByStars result = { popularRepoByStars }/>
        <RepoByForks result = { popularRepoByForks }/>
        <RepoByContributors result = { popularRepoByContributors }/>
      </div>
    );
  }
}

export default App;
