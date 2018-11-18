import React, { Component } from 'react';
import '../css/TopExternalContributors.css';

class TopExternalContributors extends Component {
  render() {
    const { result } = this.props;
    return (
      <div className="TopExternalContributors">
        <div className="Header">
          Top External Contributors
        </div>
        {result.length > 0 &&
          result.map((element, i) => {
            return (
              <div className="Result" key={"external_contributors__"+i}>
                {i+1}: <a href="{ element.url }"> { element.contributor }</a> ({ element.repo } Repos) 
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default TopExternalContributors;