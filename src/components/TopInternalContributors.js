import React, { Component } from 'react';
import '../css/TopInternalContributors.css';

class TopInternalContributors extends Component {
  render() {
    const { result } = this.props;
    return (
      <div className="TopInternalContributors">
        <div className="Header">
          Top Internal Contributors
        </div>
        {result.length > 0 && 
          result.map((element, i) => {
            return (
              <div className="Result" key={"internal_contributors__"+i}>
                {i+1}: <a href={ element.url }> { element.contributor }</a> ({ element.repo } Repos) 
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default TopInternalContributors;