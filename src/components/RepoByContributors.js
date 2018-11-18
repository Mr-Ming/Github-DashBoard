import React, { Component } from 'react';
import '../css/RepoByContributors.css';

class RepoByContributors extends Component {
  render() {
    const { result } = this.props;

    return (
      <div className="RepoByContributors">
        <div className="Header">
          Popular Repo By Contributors
        </div>
        {result.length > 0 && 
          result.map((element, i) => {
            return (
              <div className="Result" key={"contributors__"+i}>
                {i+1}: <a href="{ url }">{ element.repo }</a> ({element.contributors}) 
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default RepoByContributors;