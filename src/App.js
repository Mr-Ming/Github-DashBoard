import React, { Component } from 'react';
import Search from './components/Search';
import RepoByStars from './components/RepoByStars';
import RepoByForks from './components/RepoByForks';
import TopInternalContributors from './components/TopInternalContributors';
import TopExternalContributors from './components/TopExternalContributors';
import RepoByContributors from './components/RepoByContributors';
import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularRepoByStars: '',
      popularRepoByForks: '',
      popularRepoByContributors: '',
      topInternalContributors: '',
      topExternalContributors: ''
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
    result.sort((a,b) => (a.contributors < b.contributors) ? 1 : ((b.contributors < a.contributors) ? -1 : 0));

    this.setState({
      popularRepoByContributors: result
    })
  }

  handleTopInternalContributors = (result) => {
    result.sort((a,b) => (a.repo < b.repo) ? 1 : ((b.repo < a.repo) ? -1 : 0));
    this.setState({
      topInternalContributors: result
    })
  }

  handleTopExternalContributors = (result) => {
    this.setState({
      topExternalContributors: result
    })
  }

  render() {
    const { popularRepoByStars, popularRepoByForks, popularRepoByContributors, topInternalContributors, topExternalContributors } = this.state;

    return (
      <div className="App">
        <Search 
          onHandlePopularRepoByStars = { this.handlePopularRepoByStars }
          onHandlePopularRepoByForks = { this.handlePopularRepoByForks }
          onHandlePopularRepoByContributors = { this.handlePopularRepoByContributors }
          onHandleTopInternalContributors = { this.handleTopInternalContributors }
          onHandleTopExternalContributors = { this.handleTopExternalContributors }
        />
        <div className="Separator">
          <RepoByStars result = { popularRepoByStars }/>
          <TopInternalContributors result = { topInternalContributors } />
        </div>
        
        <div className="Separator">
          <RepoByForks result = { popularRepoByForks }/>
          <TopExternalContributors result = { topExternalContributors } />
        </div>  

        <div className="Separator">
          <RepoByContributors result = { popularRepoByContributors }/>
        </div>
      </div>
    );
  }
}

export default App;
