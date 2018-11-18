import React, { Component } from 'react';
import '../css/Search.css';

const ENDPOINT_GITHUB_API = 'https://api.github.com';
const ENDPOINT_FOR_POPULAR_REPO = ENDPOINT_GITHUB_API + '/search/repositories?q=org:';
const ENDPOINT_FOR_REPO = ENDPOINT_GITHUB_API + '/repos/';
const ENDPOINT_FOR_ORGS = ENDPOINT_GITHUB_API + '/orgs/';
const SORT_BY_STARS_QUERY_PARAM = '&order=desc&sort=stars&per_page=25';
const SORT_BY_FORKS_QUERY_PARAM = '&order=desc&sort=forks&per_page=25';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	input: 'Mr-Ming',
    };
  }

  getPopularRepoByStars = (repo) => {
    const { onHandlePopularRepoByStars } = this.props;

    this.searchGithubApi(ENDPOINT_FOR_POPULAR_REPO + repo + SORT_BY_STARS_QUERY_PARAM).then((result) => {
      let data = result.items.map(function(element){
        return { 
          stars: element.stargazers_count,
          repo: element.full_name,
          url: element.html_url
        };
      });

      onHandlePopularRepoByStars(data);
    });
  }

  getPopularRepoByForks = (repo) => {
    const { onHandlePopularRepoByForks } = this.props;

    this.searchGithubApi(ENDPOINT_FOR_POPULAR_REPO + repo + SORT_BY_FORKS_QUERY_PARAM).then((result) => {
      let data = result.items.map(function(element){
        return {
          forks: element.forks,
          repo: element.full_name,
          url: element.html_url
        };
      });

      onHandlePopularRepoByForks(data);
    });
  }

  getRepoWithContributorData(repo) {
    const { onHandlePopularRepoByContributors, onHandleTopInternalContributors, onHandleTopExternalContributors } = this.props;

    fetch(ENDPOINT_FOR_POPULAR_REPO + repo + SORT_BY_FORKS_QUERY_PARAM)
      .then(response => response.json())
      .then(function (response) {
        var items = response.items;

        return Promise.all(items.map((item, index) => {
          return fetch(ENDPOINT_FOR_REPO + item.full_name + '/contributors')
                  .then(response => response.json())
                  .then(function(response) {
                    item.contributors = response.length;
                    item.contributor = response;
                    return item
                  });
        }));     
      })
      .then(function(items) {
        fetch(ENDPOINT_FOR_ORGS + repo + '/public_members')
          .then(response => response.json())
          .then(function(response) {
            let publicMembers;

            if (response.message === 'Not Found') {
              //  This isn't an organization but a member page
              console.log(response);
              publicMembers = [];
            } else {
              publicMembers = response.map((element) => {
                return element.login;
              })
            }
            
            const popularRepoByContributors = items.map((element, index) => {
              return { 
                contributors:  element.contributors,
                repo: element.full_name,
                url: element.html_url
              }
            });

            let topInternalContributors = [];
            let topExternalContributors = [];

            items.forEach(function(parent) {
              parent.contributor.forEach(function(child) {
                let existingContributorIndex = -1;
                let contributorSelector;

                if (publicMembers.includes(child.login)) {
                  contributorSelector = topInternalContributors;
                } else {
                  contributorSelector = topExternalContributors;
                }

                existingContributorIndex = contributorSelector.findIndex(function(obj) {
                  return obj.contributor === child.login
                });

                if (existingContributorIndex === -1) {
                  contributorSelector.push({
                    repo: 1,
                    contributor: child.login,
                    url: child.html_url
                  })
                } else {
                  contributorSelector[existingContributorIndex] = {
                    repo: contributorSelector[existingContributorIndex].repo+1,
                    contributor: child.login,
                    url: child.html_url
                  }
                }
              });
            });

            onHandlePopularRepoByContributors(popularRepoByContributors);
            onHandleTopInternalContributors(topInternalContributors);
            onHandleTopExternalContributors(topExternalContributors);

          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  searchGithubApi = (url) => {
    return fetch(url)
            .then(response => response.json())
            .then(function(json){
              return json
            })
  }

  handleInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  handleOnSubmit = (event) => {
    const { input } = this.state;

    event.preventDefault();

    this.getPopularRepoByStars(input);
    this.getPopularRepoByForks(input);
    this.getRepoWithContributorData(input);
  }

  render() {
    return (
      <div className="Search">
        <form onSubmit={this.handleOnSubmit}>
          Github Organization Name:
          <input
            type="textbox"
            placeholder="facebook"
            onChange={this.handleInputChange}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Search;